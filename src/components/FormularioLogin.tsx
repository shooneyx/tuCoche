import { useState } from "react";
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router';

const Boton = styled.button`
  background-color: #5CBEFF;
  border: 1px solid #5CBEFF;
  color: #ffff;
  padding: 5px;
`

function FormularioLogin(){
  const [correo, setCorreo] = useState(""); //estado -> input titulo
  const [contrasena, setContrasena] = useState(""); //estado -> input descripcion

  const location = useLocation(); //para saber en qué pagina esta el usuario
  const isLogin = location.pathname === '/login';

  const navegar = useNavigate();

  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await correo, contrasena;

      setCorreo("");
      setContrasena("");

      if(isLogin){
        navegar("/coches")
      }

    } catch (err) {
      console.error("No se ha podido hacer", err);
    }
  };

  return (
    <>
      <div>
        <h1>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h1>
        <form onSubmit={enviarDatos}>
          <div>
            <label>
              Titulo
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </label>

            <label>
              Descripción
              <input
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </label>

            <Boton type="submit">
                {isLogin ? 'Login' : 'Registrarse'}
            </Boton>

          </div>
        </form>
      </div>
    </>
  );
}
export default FormularioLogin;