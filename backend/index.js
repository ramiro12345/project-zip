const express = require('express');
const cors = require('cors');
require('dotenv').config();

const zipRoutes = require('./routes/zip.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', zipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
