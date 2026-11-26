import { useState } from "react";
import styled from '@emotion/styled';
import {useNavigate } from 'react-router';
import usePost from "./CRUD/POST";

const Boton = styled.button`
  background-color: #5CBEFF;
  border: 1px solid #5CBEFF;
  color: #ffff;
  padding: 5px;
`
type Usuario = {
    nombre: string,
    correo: string,
    contrasena: string,
    fechaNacimiento?: string;
}
type RespuestaUsuario = {
  mensaje: string,
  token: string,
  usuario: DatosUsuario;
}
type DatosUsuario = {
  nombre: string,
  correo: string,
  rol: string,
  fechaNacimiento?: string;
}

function NuevoUsuario(){
    const [nombre, setNombre] = useState(""); 
    const [correo, setCorreo] = useState(""); 
    const [contrasena, setContrasena] = useState(""); 
    const [fechaNacimiento, setFechaNacimiento] = useState(""); 

    const {POST, isLoading, error } = usePost<Usuario, RespuestaUsuario>("http://localhost:3000/usuarios/nuevo");

    const navegar = useNavigate();

    const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datos = {
            nombre,
            correo,
            contrasena,
            fechaNacimiento
        }

        try {
            if (datos.nombre.trim() === "" || datos.correo.trim() === "" || datos.contrasena.trim() === "") {
            return;
            }

            await POST(datos);

            setCorreo("");
            setContrasena("");

            navegar("/usuarios")

        } catch (err) {
            console.error("No se ha podido hacer", err);
        }
    };

    const botonVolver = () =>{
        navegar("/usuarios")
    }

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <div>
            <h1>Registrar nuevo usuario</h1>
            <form onSubmit={enviarDatos}>
            <div>
                <label>
                Nombre
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                </label>

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

                <label>
                Fecha Nacimiento
                <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                </label>
                <Boton onClick={botonVolver}>Volver</Boton>
                <Boton type="submit">Registrar</Boton>

            </div>
            </form>
        </div>
        </>
    );
}
export default NuevoUsuario;