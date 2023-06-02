
import { Link } from 'react-router-dom';
import '../nav.css';

export function Nav({children}) {

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link to='/Home' className="navbar-brand twicla">Twicla</Link>
        <label className="switch">
          <input type="checkbox" id="toggle-dark-mode" />
          <span className="slider round"></span>
        </label>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">FAQ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Términos de uso</a>
            </li>
            
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
}
