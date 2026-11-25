import { useState } from "react";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import usePost from "./CRUD/POST";

const Boton = styled.button`
  background-color: #5CBEFF;
  border: 1px solid #5CBEFF;
  color: #ffff;
  padding: 5px;
`
type Usuario = {
  correo: string,
  contrasena: string,
}

function FormularioLogin(){
  const [correo, setCorreo] = useState(""); //estado -> input titulo
  const [contrasena, setContrasena] = useState(""); //estado -> input descripcion

  //const location = useLocation(); //para saber en qué pagina esta el usuario
  //const isLogin = location.pathname === '/login';

  const {POST, isLoading, error } = usePost<Usuario>("http://localhost:3000/login");

  const navegar = useNavigate();

  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datos = {
      correo,
      contrasena
    }

    try {
      if (datos.correo.trim() === "" || datos.contrasena.trim() === "") {
        return;
      }

      await POST(datos);

      setCorreo("");
      setContrasena("");

      navegar("/coches")

    } catch (err) {
      console.error("No se ha podido hacer", err);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={enviarDatos}>
          <div>
            <label>
              Correo
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </label>

            <label>
              Contraseña
              <input
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </label>

            <Boton type="submit">Login</Boton>
            
          </div>
        </form>
      </div>
    </>
  );
}
export default FormularioLogin;