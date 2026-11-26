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

function FormularioRegistro(){
    const [nombre, setNombre] = useState(""); 
    const [correo, setCorreo] = useState(""); 
    const [contrasena, setContrasena] = useState(""); 
    const [fechaNacimiento, setFechaNacimiento] = useState(""); 

    const {POST, isLoading, error } = usePost<Usuario, RespuestaUsuario>("http://localhost:3000/auth/register");

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

            navegar("/login")

        } catch (err) {
            console.error("No se ha podido hacer", err);
        }
    };

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <div>
            <h1>Registrarse</h1>
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

                <Boton type="submit">Registrar</Boton>

            </div>
            </form>
        </div>
        </>
    );
}
export default FormularioRegistro;