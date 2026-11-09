import { useState } from "react";
import styled from '@emotion/styled';


interface Login { //traemos del padre, el boton y los datos de Tarea
    correo: string,
    contrasena: string,
}

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
        <h1>Formulario</h1>
        <form onSubmit={guardarTarea}>
          <div>
            <label>
              Titulo
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>

            <label>
              Descripción
              <input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </label>

            <label>
              Responsable
              <input
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
            </label>

            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Formulario;