import { Navigate } from "react-router-dom";

export const handleLogged = () => {
  const log = sessionStorage.getItem('logueado');
  console.log(log);

  if (log === null) {
    return <Navigate to="/" replace />;
  }

  return null;
};
