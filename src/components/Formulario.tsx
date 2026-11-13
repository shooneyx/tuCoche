import { useState } from "react";
import styled from '@emotion/styled';

const Boton = styled.button`
  background-color: blue;
  border: 1px solid blue;
  color: white;
  padding: 5px;
`

function Formulario(){
  const [correo, setCorreo] = useState(""); //estado -> input titulo
  const [contrasena, setContrasena] = useState(""); //estado -> input descripcion

  const guardarTarea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await correo, contrasena;

      setCorreo("");
      setContrasena("");

    } catch (err) {
      console.error("No se pudo guardar la tarea", err);
    }
  };

  return (
    <>
      <div>
        <h1>Formulario Login</h1>
        <form onSubmit={guardarTarea}>
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

            <Boton type="submit">Login</Boton>
          </div>
        </form>
      </div>
    </>
  );
}
export default Formulario;