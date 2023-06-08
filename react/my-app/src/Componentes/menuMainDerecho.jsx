import React, { useState, useEffect } from 'react';

const MenuDerecho = () => {
  const idUsuario = sessionStorage.getItem('id_usuario');
  
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    comprobarSolicitudesAmistad();
  }, []);

  const comprobarSolicitudesAmistad = () => {
    console.log(idUsuario);
    fetch(`http://localhost:3000/solicitudes_amistad?id_solicitado=${idUsuario}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          console.log('Solicitudes de amistad encontradas:', data);
          const idSolicitantes = data
            .map(solicitud => solicitud.id_usuario)
            .filter(id => id !== idUsuario); // Filtrar el id de la persona logueada
          obtenerNombreApellidos(idSolicitantes);
        } else {
          console.log('No se encontraron solicitudes de amistad');
        }
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes de amistad:', error);
      });
  };

  const obtenerNombreApellidos = (idSolicitantes) => {
    Promise.all(
      idSolicitantes.map(idSolicitante =>
        fetch(`http://localhost:3000/usuarios/${idSolicitante}`).then(response => response.json())
      )
    )
      .then(data => {
        const solicitudesData = data.map((usuario, index) => ({
          idSolicitante: idSolicitantes[index],
          nombre: usuario.nombre,
          apellidos: usuario.apellidos
        }));
        setSolicitudes(solicitudesData);
        console.log('Solicitudes de amistad obtenidas:', solicitudesData);
      })
      .catch(error => {
        console.error('Error al obtener los nombres y apellidos:', error);
      });
  };

  const borrarSolicitud = (idSolicitante) => {
    const idUsuario = sessionStorage.getItem('id_usuario');

    fetch(`http://localhost:3000/solicitudes_amistad?idSolicitante=${idSolicitante}&idUsuario=${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Solicitud eliminada:', data);
        const updatedSolicitudes = solicitudes.filter(solicitud => solicitud.idSolicitante !== idSolicitante);
        setSolicitudes(updatedSolicitudes);
        // Realiza las acciones adicionales después de eliminar la solicitud
        // Por ejemplo, puedes actualizar la lista de solicitudes llamando a comprobarSolicitudesAmistad()
        comprobarSolicitudesAmistad();
      })
      .catch(error => {
        console.error('Error al eliminar la solicitud:', error);
      });
  };


  const aceptarSolicitud = (idSolicitante) => {
    const idUsuario = sessionStorage.getItem('id_usuario');
  
    // Primer fetch para eliminar la solicitud
    fetch(`http://localhost:3000/solicitudes_amistad?idSolicitante=${idSolicitante}&idUsuario=${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Solicitud eliminada:', data);
        const updatedSolicitudes = solicitudes.filter(solicitud => solicitud.idSolicitante !== idSolicitante);
        setSolicitudes(updatedSolicitudes);
        // Realiza las acciones adicionales después de eliminar la solicitud
        // Por ejemplo, puedes actualizar la lista de solicitudes llamando a comprobarSolicitudesAmistad()
        comprobarSolicitudesAmistad();
        // Segundo fetch para añadir la amistad
        fetch(`http://localhost:3000/amigos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idSolicitante: idUsuario,
            idAmigo: idSolicitante
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Amistad añadida:', data);
            // Realiza las acciones adicionales después de añadir la amistad
          })
          .catch(error => {
            console.error('Error al añadir la amistad:', error);
          });
      })
      .catch(error => {
        console.error('Error al eliminar la solicitud:', error);
      });
  };

  return (
    <>
      {solicitudes.map((solicitud, index) => (
        <div className="d-grid a gap-2 d-md-block p-4" key={index}>
          <p className="nombre titulos">
            <b>{solicitud.nombre} {solicitud.apellidos}</b>
          </p>
          <div className="boton-menu-main-right">
            <button className="btn a1 btn-success aceptar" type="button" onClick={() => aceptarSolicitud(solicitud.idSolicitante)}>
              Aceptar Solicitud
            </button>
            <button className="btn a1 btn-danger rechazar" type="button" onClick={() => borrarSolicitud(solicitud.idSolicitante)}>
              Rechazar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export { MenuDerecho };
