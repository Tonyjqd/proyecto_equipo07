const express = require('express');
const server = express();
const cors = require('cors');
const port = 3000;
server.use(express.json());
server.use(cors());

const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'equipo7'
});

const validarCorreo = (req, res, next) => {
  const correo = req.body.correo;
  const query = `SELECT correo_electronico FROM usuarios WHERE correo_electronico = '${correo}'`;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }

    if (results.length > 0) {
      req.correo = correo; // Guardamos el correo del usuario en el objeto req
      next();
    } else {
      return res.status(400).send('El correo es incorrecto');
    }
  });
};

const validarPassword = (req, res, next) => {
  const correo = req.body.correo;
  const password = req.body.password;
  const query = `SELECT contrasena, alias FROM usuarios WHERE correo_electronico = '${correo}'`;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }

    if (results.length > 0 && results[0].contrasena === password) {
      req.alias = results[0].alias; // Guardamos el alias del usuario en el objeto req
      next();
    } else {
      return res.status(400).send('Password incorrecto');
    }
  });
};

const datos= (req,res,next)=>{
  const correo = req.correo; // Obtenemos el correo del usuario del objeto req
  const query = `SELECT * FROM usuarios WHERE correo_electronico = '${correo}'`;
  connection.query(query,(error,results)=>{
    if (error){
      return res.status(500).send('Error en la base de datos');
    } else {
      const datos = results;
      req.datosUsuario = datos;
      next();
    }
  });
};

server.get('/perfil/:correo', (req, res) => {
  const correo = req.params.correo;
  const query = `SELECT * FROM usuarios WHERE correo_electronico = '${correo}'`;
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length > 0) {
      const datos = results[0];
      res.json(datos);
    } else {
      return res.status(400).send('El correo es incorrecto');
    }
  });
});

server.post('/login', validarCorreo, validarPassword, (req, res) => {
  const correo = req.correo;
  const alias = req.alias;
  res.json({ logueado: true, usuario: correo, alias: alias });
});

server.listen(port, () => console.log('Servidor iniciado en el puerto 3000'));
