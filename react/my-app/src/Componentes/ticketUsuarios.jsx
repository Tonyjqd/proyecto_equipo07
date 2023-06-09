import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

export function Ticket() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/usuario')
      .then(response => response.json())
      .then(data => setUserList(data))
      .catch(error => console.error('Error:', error));
  }, []);

  console.log(userList);

  const exportToExcel = () => {
    // Eliminar el campo 'contrasena' del objeto de usuario
    const transformedData = userList.map(({ contrasena, ...user }) => user);

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  return (
    <button className="btn a col-12 btn-lg btn-primary" onClick={exportToExcel} type="button">
      Admin
    </button>
  );
}
