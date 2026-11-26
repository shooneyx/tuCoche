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
    id: string;
    marca: string;
    modelo: string;
    ano: number;
    precio: number;
    fechaMatriculacion: string;
    combustible: string;
    urlImagen?: string | null;
    usuario: string;
};

type RespuestaCoche = { //usamos los links del servidor para usarlos en un boton para la tabla
    links: {
        prev: string | null;
        next: string | null;
    }
    data: Coche[];
};



function ListadoCoches(){
    const [url, setUrl] = useState("http://localhost:3000/coches");
    const { data, isLoading, error } = useGet<RespuestaCoche>(url);

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
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año de Creación</th>
                                <th>Precio</th>
                                <th>Fecha de Matriculación</th>
                                <th>Combustible</th>
                                <th>Imagen</th>
                                <th>Propietario</th> 
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.map(t =>
                                <tr key={t.id}>
                                    <td>{t.marca}</td>
                                    <td>{t.modelo}</td>
                                    <td>{t.ano}</td>
                                    <td>{t.precio}</td>
                                    <td>{t.fechaMatriculacion}</td>
                                    <td>{t.combustible}</td>
                                    <td>{t.urlImagen}</td>
                                    <td>{t.usuario}</td>
                                    <td>
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </TablaCoches>
                </ContenedorLista>
            </ContenedorPagina>
        </>
    )
}
export default ListadoCoches;