const zipService = require('../services/zip.service');
const db = require('../db');

exports.processZip = async (req, res) => {
  console.log("DADADA:", req)
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL requerida' });

  try {
    const savedFiles = await zipService.downloadAndExtractZip(url);

    for (const file of savedFiles) {
      await db.query(
        'INSERT INTO files (filename, filepath, filetype) VALUES ($1, $2, $3)',
        [file.filename, file.filepath, file.filetype]
      );
    }

    res.json({ success: true, files: savedFiles });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Error al procesar ZIP' });
  }
};

exports.getFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await db.query(
      'SELECT * FROM files LIMIT $1 OFFSET $2', 
      [limit, offset]
    );

    const countResult = await db.query('SELECT COUNT(*) FROM files');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: rows,
      total: total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener archivos');
  }
};
