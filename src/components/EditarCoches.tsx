import { useNavigate } from "react-router";
import usePut from "./CRUD/PUT";
import { useState } from "react";

type Coche = {
    marca: string,
    modelo: string,
    ano: number,
    precio: number,
    fechaMatriculacion: string,
    combustible: string,
    urlImagen?: string | null,
    id?: string,
}

type RespuestaCoche = { //usamos los links del servidor para usarlos en un boton para la tabla
    links: {
        prev: string | null;
        next: string | null;
    }
    data: Coche[];
};

type Props = {
    datosAnteriores?: Coche
};
  
function EditarCoche( {datosAnteriores}:Props ){
    const [marca, setMarca] = useState(datosAnteriores?.marca || ""); 
    const [modelo, setModelo] = useState(datosAnteriores?.modelo || ""); 
    const [ano, setAno] = useState(datosAnteriores?.ano?.toString() || "");
    const [precio, setPrecio] = useState(datosAnteriores?.precio?.toString() || "");
    const [fechaMatriculacion, setFechaMatriculacion] = useState(datosAnteriores?.fechaMatriculacion || "");
    const [combustible, setCombustible] = useState(datosAnteriores?.combustible || ""); 
    const [urlImagen, setUrlImagen] = useState(datosAnteriores?.urlImagen || ""); 

    const id = datosAnteriores?.id;
    const {PUT, isLoading, error } = usePut<Coche, RespuestaCoche>(`http://localhost:3000/coches/${id}/editar`);

    const navegar = useNavigate();

    const guardarCoche = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) return;
        const datos: Coche = {
            id,
            marca, 
            modelo, 
            ano: Number(ano),
            precio: Number(precio), 
            fechaMatriculacion,
            combustible,
            urlImagen
        }

        try {
            //1º valida
            if (datos.marca.trim() === "" || datos.modelo.trim() === "" || datos.ano < 1885  || datos.precio <= 0 || datos.fechaMatriculacion.trim() === "" || datos.combustible.trim() === "") {
                return;
            }

            //2º espera a los datos de post
            await PUT(datos);

            //3º limpia pantalla
            setMarca("");
            setModelo("");
            setAno("");
            setPrecio("");
            setFechaMatriculacion("");
            setCombustible("");
            setUrlImagen("");

             //4º redirige a panel coches
            navegar("/coches");

        } catch (err) {
            console.error("No se pudo guardar la tarea", err);
        }
    };

    const botonVolver = () =>{
        navegar("/coches")
    }

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <div>
            <h1>Formulario</h1>
            <form onSubmit={guardarCoche}>
            <div>
                <label>
                Marca
                <input
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                />
                </label>

                <label>
                Modelo
                <input
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />
                </label>

                <label>
                Año de Creación del Coche
                <input
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                />
                </label>

                <label>
                Precio
                <input
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                </label>

                <label>
                Fecha de Matriculación
                <input
                    value={fechaMatriculacion}
                    onChange={(e) => setFechaMatriculacion(e.target.value)}
                />
                </label>

                <label>
                Combustible
                <input
                    value={combustible}
                    onChange={(e) => setCombustible(e.target.value)}
                />
                </label>

                <label>
                Añade una imagen del coche
                <input
                    value={urlImagen}
                    onChange={(e) => setUrlImagen(e.target.value)}
                />
                </label>

                <button onClick={botonVolver}>Volver</button>
                <button type="submit">Guardar</button>
            </div>
            </form>
        </div>
        </>
    );
}
export default EditarCoche;