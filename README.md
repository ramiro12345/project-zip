# project-zip
Prueba de tecnica 

Creacion de la base de datos

CREATE DATABASE db-zip;

Creacion de la tabla

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  filename TEXT,
  filepath TEXT,
  filetype TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Pasos para la funcionalidad (Backend)

Se debe ingresar ala carpeta de backend, y desde la terminal se debe instalar las dependencias "npm install" necesarias para la funcionalidad, 
se re comuenda hacer desde la terminal una vez estando en la ruta del backend el siguiente comando, "node --max-old-space-size=4096 index.js".

Se debe configurar la conexion de la base de datos para poder almacenar, visulizar los datos almacenados en la base de datos, verifcar los datos en "backend/db/index.js".

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'XXXXXXXXXXX', // remplazar aqui por la contraseña local de la base de datos
  database: 'db-zip',
  port: 5432,
});

reemplazar los datos necesarios segun la confiduracion de la maquina, y configuracion de la base de datos.

Pasos para la funcionalidad (FrontEnd)

Instalar las dependencias del proyecto del frontend, "npm install", una vez instalada se debe hacer correr el proyecto con "ng serve"

En la pestaña "Subir ZIP" se debe colocar el link para hacer la descarga del .zip.

En la pestaña "Estado del proceso" una vez que se realice el proceso de descarga y la subida de archivos se podra visualizar en la vista en una tabla, con paginado de 10 archivos.

Nota: Antes de levantar el proyecto frontEnd, se debe tener instalado el cli de Angular