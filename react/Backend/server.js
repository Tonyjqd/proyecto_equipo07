const express = require('express');
const server = express();
const cors = require('cors');
const port = 3000;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const extname = require('path').extname;
require('dotenv').config();
server.use(express.json());
server.use(cors());
const mysql = require('mysql2');
const req = require('express/lib/request');
const secretKey = process.env.SECRET_KEY;
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
// Middleware para validar la contraseña
const validarPassword = (req, res, next) => {
  const correo = req.body.correo;
  const password = req.body.password;
  const query = 'SELECT contrasena, admin FROM usuarios WHERE correo_electronico = ?';
  connection.query(query, [correo], (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length > 0) {
      const storedPassword = results[0].contrasena;
      

      bcrypt.compare(password, storedPassword, (error, result) => {
        if (error) {
          return res.status(500).send('Error en el servidor');
        }
        if (result) {
          req.admin = results[0].admin; 
          next();
        } else {
          return res.status(400).send('Contraseña incorrecta');
        }
      });
    } else {
      return res.status(400).send('El correo es incorrecto');
    }
  });
};
function generarToken(correo, admin) {
  const token = jwt.sign({ correo, admin }, secretKey, { expiresIn: "2h" });
  return token;
}
function verificarJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.usuario = decoded; // Agrega la información decodificada a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}
server.post('/login', validarCorreo, validarPassword, (req, res) => {
  const correo = req.correo;
  const admin = req.admin;
  const token = generarToken(correo,admin);
  res.json({ logueado: true, usuario: correo, token, admin : admin });
});
const registrarUsuario = (req, res) => {
  const correo = req.body.correo;
  const password = req.body.password;
  const name = req.body.nombre;
  const apellidos = req.body.apellidos;
  const alias = req.body.alias;
  const fecha_nac = req.body.fechaNac;
  bcrypt.hash(password,8, (error,hash)=>{
    if(error) throw error;
    const query = `SELECT * FROM usuarios WHERE correo_electronico = '${correo}' OR alias = '${alias}'`;
  connection.query(query, (error, results) => {
      if (error) {
          return res.status(401).send('Error en la base de datos');
      }
      if (results.length > 0) {
          return res.status(401).send('El usuario ya existe. ¡Entra con tu cuenta!');
      } else {
         const queryInsert = `INSERT INTO usuarios (nombre, apellidos, alias, correo_electronico, contrasena, fecha_nac) VALUES ('${name}', '${apellidos}', '${alias}', '${correo}', '${hash}', '${fecha_nac}')`; // añadimos la constante fecha_nac en la consulta SQL
          connection.query(queryInsert, (error) => {
              if (error) {
                  return res.status(401).send('Error en la base de datos 2');
              }
              return res.send('Usuario registrado correctamente ¡Ahora puedes entrar con tu cuenta!');
          });
      }
  });
  })
  
};
server.get('/perfil/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM usuarios WHERE id_usuario = '${id}'`;
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
server.patch('/perfil/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario;
  const nuevoPerfil = req.body;

  // Actualizar el perfil con los nuevos datos
  connection.query(
    'UPDATE usuarios SET ? WHERE id_usuario = ?',
    [nuevoPerfil, id_usuario],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el perfil' });
      }

      // Obtener la información actualizada del perfil
      connection.query(
        'SELECT * FROM usuarios WHERE id_usuario = ?',
        [id_usuario],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al obtener el perfil actualizado' });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
          }

          const perfilActualizado = results[0];
          return res.json({ message: 'Perfil actualizado con éxito', perfil: perfilActualizado });
        }
      );
    }
  );
});

const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = multer({ 
  storage: multer.diskStorage({
    destination: '../my-app/public/imagenes',
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${fileExtension}`);
    }
  })/* ,
  fileFilter: (req, imagen, cb) => {
    if (MIMETYPES.includes(imagen.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error ('Tipo de archivo no soportado'));
    }
  },
  limits: { fileSize: 10000000 } */
}); 


server.post('/actualizarImagen', (req, res) => {
  const { nombreArchivo } = req.body; 
  const sql = `UPDATE usuarios SET imagen = ? WHERE id_usuario = ?`;
  const params = [`/imagenes/${nombreArchivo}`, req.body.id_usuario]; 

  connection.query(sql, params, (error, results) => {
    if (error) {
      console.error('Error al actualizar la ruta de imagen en la base de datos:', error);
      res.status(500).json({ message: 'Error al actualizar la ruta de imagen en la base de datos.' });
      return;
    }
    res.status(200).json({ message: 'Ruta de imagen actualizada correctamente.' });
  });
});


server.post('/upload', upload.single('imagen'), (req, res) => {
  const nombreArchivo = req.file.filename;
  res.status(200).json({nombreArchivo });
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
server.get('/publicaciones-usuarios',verificarJWT,(req,res)=>{
  const query = `SELECT publicaciones.*, usuarios.alias, usuarios.imagen, usuarios.correo_electronico
  FROM publicaciones
  INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario
  ORDER BY publicaciones.fecha_publicacion DESC`;
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

server.get('/publicaciones',verificarJWT, (req, res) => {
const userId = req.headers['user-id'];
const query = `
SELECT DISTINCT publicaciones.*, usuarios.alias, usuarios.imagen, usuarios.correo_electronico
FROM publicaciones
INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario
INNER JOIN amigos ON (publicaciones.id_usuario = amigos.id_usuario OR publicaciones.id_usuario = amigos.id_amigo)
WHERE amigos.id_usuario = ${userId} OR amigos.id_amigo = ${userId}
ORDER BY publicaciones.fecha_publicacion DESC;
`;
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


// Endpoint para obtener las solicitudes de amistad
server.get('/solicitudes_amistad', (req, res) => {
  const idSolicitado = req.query.id_solicitado;
  const consulta = 'SELECT * FROM equipo7.solicitudes_amistad WHERE id_solicitado = ?';

  // Ejecutar la consulta en la base de datos y obtener las solicitudes de amistad
  connection.query(consulta, [idSolicitado], (error, resultados) => {
    if (error) {
      console.error('Error al obtener las solicitudes de amistad servidor:', error);
      res.status(500).json({ error: 'Error al obtener las solicitudes de amistad servidor' });
    } else {
      res.json(resultados);
    }
  });
});


server.get('/usuarios/:idSolicitante', (req, res) => {
  const idSolicitante = req.params.idSolicitante;

  // Aquí se realizaría la consulta SQL utilizando el idSolicitante
  const consultaSQL = `SELECT nombre, apellidos FROM usuarios WHERE id_usuario = ?`;
  const valores = [idSolicitante];

  // Ejecutar la consulta SQL y obtener los resultados
  connection.query(consultaSQL, valores, (error, resultados) => {
    if (error) {
      console.error('Error al obtener el nombre y apellidos:', error);
      res.status(500).json({ error: 'Error al obtener el nombre y apellidos' });
    } else {
      if (resultados.length > 0) {
        const usuario = resultados[0];
        res.json({ nombre: usuario.nombre, apellidos: usuario.apellidos });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});



//BORRAR SOLICITUD AMISTAD
server.delete('/solicitudes_amistad', (req, res) => {
  const { idSolicitante, idUsuario } = req.query;

  // Realiza la consulta SQL para eliminar la solicitud de amistad
  const query = `
    DELETE FROM equipo7.solicitudes_amistad
    WHERE id_usuario = ${idSolicitante} AND id_solicitado = ${idUsuario};
  `;

  // Ejecuta la consulta SQL en tu base de datos
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error al eliminar la solicitud:', err);
      res.status(500).json({ error: 'Error al eliminar la solicitud' });
    } else {
      console.log('Solicitud eliminada');
      console.log('Resultados de la consulta:', result);
      res.json({ message: 'Solicitud eliminada correctamente' });
    }
  });
});



//ACEPTAR SOLICITUD AMISTAD

server.delete('/solicitudes_amistad', (req, res) => {
  const idSolicitante = req.query.idSolicitante;
  const idUsuario = req.query.idUsuario;

  const sql = 'DELETE FROM solicitudes_amistad WHERE id_usuario = ? AND id_solicitado = ?';
  const values = [idSolicitante, idUsuario];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al eliminar la solicitud:', error);
      res.status(500).json({ error: 'Error al eliminar la solicitud' });
    } else {
      console.log('Solicitud eliminada:', results);
      res.status(200).json({ message: 'Solicitud eliminada' });
    }
  });
});




server.post('/amigos', (req, res) => {
  const idSolicitante = req.body.idSolicitante;
  const idAmigo = req.body.idAmigo;

  const checkDuplicateQuery = 'SELECT COUNT(*) AS count FROM amigos WHERE (id_usuario = ? AND id_amigo = ?) OR (id_usuario = ? AND id_amigo = ?)';
  const checkDuplicateValues = [idSolicitante, idAmigo, idAmigo, idSolicitante];

  connection.query(checkDuplicateQuery, checkDuplicateValues, (error, results) => {
    if (error) {
      console.error('Error al verificar la duplicidad:', error);
      res.status(500).json({ error: 'Error al verificar la duplicidad' });
    } else {
      const count = results[0].count;
      if (count > 0) {
        res.status(400).json({ error: 'La amistad ya existe' });
      } else {
        const insertQuery = 'INSERT INTO amigos (id_usuario, id_amigo) VALUES (?, ?)';
        const insertValues = [idSolicitante, idAmigo];

        connection.query(insertQuery, insertValues, (error, results) => {
          if (error) {
            console.error('Error al añadir la amistad:', error);
            res.status(500).json({ error: 'Error al añadir la amistad' });
          } else {
            console.log('Amistad añadida:', results);
            res.status(200).json({ message: 'Amistad añadida' });
          }
        });
      }
    }
  });
});






server.get('/usuario', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en la consulta de usuarios' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});



server.get('/usuarios', (req, res) => {
  connection.query('SELECT nombre, apellidos, correo_electronico, imagen, id_usuario FROM equipo7.usuarios', (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

server.get('/amigos/:id_logueado', (req, res) => {
  const id_logueado = req.params.id_logueado;
  console.log(id_logueado);
  console.log(typeof id_logueado);

  const query = `
    SELECT id_amigo
    FROM amigos
    WHERE id_usuario = '${id_logueado}'
    UNION
    SELECT id_usuario
    FROM amigos
    WHERE id_amigo = '${id_logueado}'
  `;

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error en la base de datos');
    }

    if (results.length > 0) {
      const datos = results;
      res.json(datos);
    } else {
      // No se encontraron datos, retornar una respuesta vacía o un mensaje adecuado
      res.json([]);
    }
  });
});


server.get('/solicitudes_amistad/:usuarioLogueadoId/:amigoId', (req, res) => {
  const usuarioLogueadoId = req.params.usuarioLogueadoId;
  const amigoId = req.params.amigoId;

  const sql = `
    SELECT *
    FROM solicitudes_amistad
    WHERE (id_usuario = ${usuarioLogueadoId} AND id_solicitado = ${amigoId})
    OR (id_solicitado = ${usuarioLogueadoId} AND id_usuario = ${amigoId})
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.log('Error al obtener las solicitudes de amistad:', err);
      res.status(500).send('Error al obtener las solicitudes de amistad');
    } else {
      if (results.length > 0) {
        res.json({ estado: 'solicitud_pendiente' });
      } else {
        res.json({ estado: 'agregar_amigo' });
      }
    }
  });
});




server.post("/solicitudes_amistad", (req, res) => {
  const id_logueado = req.body.id_logueado;
  const amigoId = req.body.amigoId;
  connection.query(
    "SELECT * FROM solicitudes_amistad WHERE id_usuario = ? AND id_solicitado = ?",
    [id_logueado, amigoId],
    (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        console.log("El dato ya existe");
        res.json({ message: "El dato ya existe" });
      } else {
        connection.query(
          "INSERT INTO solicitudes_amistad (id_usuario, id_solicitado) VALUES (?, ?)",
          [id_logueado, amigoId],
          (error, results) => {
            if (error) throw error;
            console.log(results);
            res.json(results);
          }
        );
      }
    }
  );
});





server.delete("/amigos/:id_amigo", (req, res) => {
  const id_logueado = req.body.id_logueado;
  const id_amigo = req.params.id_amigo;
  connection.query(
    "DELETE FROM amigos WHERE (id_usuario = '" + id_logueado + "' AND id_amigo = '" + id_amigo + "') OR (id_usuario = '" + id_amigo + "' AND id_amigo = '" + id_logueado + "')",
    (error, results) => {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

//BÚSQUEDA
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

