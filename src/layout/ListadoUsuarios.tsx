import styled from "@emotion/styled";
import Navbar from "../components/Navbar";
import useGet from "../components/CRUD/GET";
import { useState } from "react";
import { useNavigate } from "react-router";

const ContenedorPagina = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr auto; //nav, main, footer

`
const ContenedorLista = styled.div`
    margin: 30px 50px 10px 50px;
    display: grid;
    grid-template-rows: 50px, auto; //boton, panelLista

    button{
        background-color: #5CBEFF;
        border-radius: 5px;
        border: 1px solid #5CBEFF;
        color: #ffff;
        padding: 8px;
        justify-self: start;
        margin-bottom: 10px;
    }

`
const TablaCoches = styled.table`
    border-collapse: collapse;
    border: 1px solid #5CBEFF;
    justify-content: center;

    th{
        border: 1px solid #5CBEFF;
        align-items: center;
    }

    td{
        padding-left: 5px;
        border: 1px solid #5CBEFF;
    }
`
type Coche = {
    _id: string;
    marca: string;
    modelo: string;
    ano: number;
    precio: number;
    combustible: string;
};

type Usuario = {
    id: string;
    nombre: string,
    correo: string,
    rol: string,
    fechaNacimiento?: string;
    coches: Coche[];
}

type RespuestaUsuario = {
    links: {
        prev: string | null;
        next: string | null;
    }
    token: string,
    data: Usuario[];
}


function ListadoUsuarios(){
    const [url, setUrl] = useState("http://localhost:3000/usuarios");
    const { data, isLoading, error } = useGet<RespuestaUsuario>(url);

    const next = () => {
        const dataNext = data?.links.next;

        if(!dataNext){ //si no existe o es null
            return;
        } else{
            setUrl(dataNext);
        }
       
    }
    const prev = () => {
        const dataPrev = data?.links.prev;

        if(!dataPrev){ //si no existe o es null
            return;
        } else{
            setUrl(dataPrev);
        }
       
    }
    const navegar = useNavigate();
    const botonNuevoCoche = () =>{
        navegar("/coches/nuevo")
    }

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <>  
            <ContenedorPagina>
                <Navbar />
                <ContenedorLista>
                    <button onClick={botonNuevoCoche}>Añadir coche</button>
                    <button onClick={prev} disabled={!data?.links.prev}>Prev</button>
                    <button onClick={next} disabled={!data?.links.next}>Next</button>
                    {/* panel con lista de coches -> si tiene coche muestra coches, si no tiene ninguno muestra mensaje
                    aun no tiene coches a su nombre */}
                    <TablaCoches>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Sus coches</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map(t =>
                                <tr key={t.id}>
                                    <td>{t.nombre}</td>
                                    <td>{t.correo}</td>
                                    <td>{t.rol}</td>
                                    <td>{t.fechaNacimiento}</td>
                                    
                                    {t.coches.map((coche) => (
                                        <td key={coche._id}>
                                            {coche.marca} {coche.modelo}
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>

                    </TablaCoches>
                </ContenedorLista>
            </ContenedorPagina>
        </>
    )
}
export default ListadoUsuarios;