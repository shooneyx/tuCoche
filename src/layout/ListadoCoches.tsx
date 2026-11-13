import styled from "@emotion/styled";
import Navbar from "../components/Navbar";

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


function ListadoCoches(){
    return(
        <>  
            <ContenedorPagina>
                <Navbar />
                <ContenedorLista>
                    <button>Añadir coche</button>
                    {/* panel con lista de coches -> si tiene coche muestra coches, si no tiene ninguno muestra mensaje
                    aun no tiene coches a su nombre */}
                    <TablaCoches>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año de Creación</th>
                        <th>Precio</th>
                        <th>Fecha de Matriculación</th>
                        <th>Combustible</th>
                        <th>Imagen</th> {/* son urls */}
                        <th>Propietario</th> {/* Usuario al que pertnece el coche */}

                        <tr>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                            <td>Prueba</td>
                        </tr>
                        
                    </TablaCoches>
                </ContenedorLista>
            </ContenedorPagina>
        </>
    )
}
export default ListadoCoches;