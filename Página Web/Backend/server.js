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

server.patch('/perfil/:correo', (req, res) => {
  const correo = req.params.correo;
  const nuevoPerfil = req.body;
  // Buscar el perfil en la base de datos
  connection.query(
    'SELECT * FROM usuarios WHERE correo_electronico = ?',
    [correo],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al buscar el perfil' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
      }
      // Actualizar el perfil con los nuevos datos
      const perfil = results[0];
      const perfilActualizado = { ...nuevoPerfil,
      };
      if (nuevoPerfil.correo_electronico && perfil.correo_electronico !== nuevoPerfil.correo_electronico) {
      perfilActualizado.correo_electronico = nuevoPerfil.correo_electronico;
      }
      else{
        perfilActualizado.correo_electronico= perfil.correo_electronico
      }
      connection.query(
        'UPDATE usuarios SET ? WHERE correo_electronico = ?',
        [perfilActualizado, correo],
        error => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al actualizar el perfil' });
          }
          return res.json({ message: 'Perfil actualizado con éxito' });
        }
      );
    }
  );
});

server.post('/login', validarCorreo, validarPassword, (req, res) => {
  const correo = req.correo;
  const alias = req.alias;
  res.json({ logueado: true, usuario: correo, alias: alias });
});


server.post('/registro', registrarUsuario,(req,res)=>{
    res.send("Correcto")
});

server.get('/main/:correo', (req, res) => {
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
  })
});
server.get('/publicaciones', (req, res) => {
const query = `SELECT publicaciones.*, usuarios.alias, usuarios.imagen, usuarios.correo_electronico
  FROM publicaciones 
  INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario 
  ORDER BY publicaciones.fecha_publicacion DESC`
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length > 0) {
      const datos = results;
      res.json(datos);
    } else {
      return res.status(400).send('El correo es incorrecto');
    }
  });
});
server.post('/publicaciones', (req, res) => {
  const { publicacion, id } = req.body;
  const query = `INSERT INTO publicaciones (id_usuario, des_publicacion) VALUES (?,?)`;
  connection.query(query, [id, publicacion], (error, results) => {
    if (error) throw error;
    res.json({ message: "Publicacion realizada" });
  });
});

/*AMIGOS*/
server.get('/usuarios', (req, res) => {
  connection.query('SELECT nombre, apellidos, correo_electronico, imagen, id_usuario FROM equipo7.usuarios', (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

server.get('/amigos/:id_logueado', (req, res) => {
  const id_logueado = req.params.id_logueado;
  const query = (`SELECT * FROM amigos WHERE  id_usuario = '${id_logueado}'`);
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length > 0) {
      const datos = results;
      res.json(datos);
    } else {
      return res.status(400).send('ID no valida o sin amigos');
    }
  });
});
server.post("/amigos", (req, res) => {
  const id_logueado = req.body.id_logueado;
  const amigoId = req.body.amigoId;
  connection.query(
    "INSERT INTO amigos (id_usuario, id_amigo) VALUES (?, ?)",
    [id_logueado, amigoId],
    (error, results) => {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});
server.get('/buscar', (req, res) => {
  const username = req.query.username;

  // Ejecutar la consulta de búsqueda
  const query = `SELECT * FROM usuarios WHERE nombre = '${username}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

server.listen(port, () => console.log('Servidor iniciado en el puerto 3000'));