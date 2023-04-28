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


const registrarUsuario = (req, res) => {
  const correo = req.body.correo;
  const password = req.body.password;
  const name = req.body.name;
  const apellidos = req.body.apellidos;
  const alias = req.body.alias;
  const fecha_nac = req.body.fecha_nac; // añadimos la constante fecha_nac
  const query = `SELECT * FROM usuarios WHERE correo_electronico = '${correo}' OR alias = '${alias}'`;

  connection.query(query, (error, results) => {
      if (error) {
          return res.status(401).send('Error en la base de datos');
      }

      if (results.length > 0) {
          return res.status(401).send('El usuario ya existe. ¡Entra con tu cuenta!');
      } else {
         const queryInsert = `INSERT INTO usuarios (nombre, apellidos, alias, correo_electronico, contrasena, fecha_nac) VALUES ('${name}', '${apellidos}', '${alias}', '${correo}', '${password}', '${fecha_nac}')`; // añadimos la constante fecha_nac en la consulta SQL
          connection.query(queryInsert, (error) => {
              if (error) {
                  return res.status(401).send('Error en la base de datos 2');
              }
              return res.send('Usuario registrado correctamente ¡Ahora puedes entrar con tu cuenta!');
          });
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


server.post('/registro', registrarUsuario,(req,res)=>{
    res.send("Correcto")
});

server.get('/', (req, res) => {
  res.send('Bienvenido al sistema de publicaciones del equipo 7');
});

  server.post('/publicaciones',(req,res)=>{
    const { des_publicacion } = req.body;
    const query = `INSERT INTO publicaciones (des_publicacion) VALUES (?)`;
  connection.query(query, [des_publicacion], (error, results) => {
    if (error) throw error;

    res.json({
      id: results.insertId,
      des_publicacion
    });
  });
  })
  

server.listen(port, () => console.log('Servidor iniciado en el puerto 3000'));