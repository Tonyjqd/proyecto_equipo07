import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const AccountMenu = (props) => {
    const {usuarioLogueadoId} = props;
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
    
  };

  return (
    <div className="container-fluid" style={{ position: 'relative' }}>
      <button className="btn btn-default account-button" onClick={handleButtonClick}>
        menu
      </button>
      {showMenu ? (
        <div className="cuenta menu-animado" onClick={handleButtonClick}>
          <button className="btn btn-primary boton-friends" type="button">Edit</button>
          <button className="btn btn-primary boton-friends" type="button">Chat</button>
          <Link to={`/perfil/${usuarioLogueadoId}`}><button className="btn btn-primary boton-friends1" type="button">Profile</button>
                </Link>
        </div>
      ) : null}
    </div>
  );
}

export {AccountMenu};
