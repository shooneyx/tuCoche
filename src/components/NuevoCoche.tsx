import usePost from "./CRUD/POST";
import { useState } from "react";

type Coche = {
    onClose: (
        marca: string,
        modelo: string,
        ano: string,
        precio: string,
        fechaMatriculacion: string,
        combustible: string,
        urlImagen?: string | null,
    ) => Promise<void>;

    datosAnteriores?: {
        marca: string;
        modelo: string;
        ano: string;
        precio: string;
        fechaMatriculacion: string;
        combustible: string;
        urlImagen?: string | null;
     };
};
  
function NuevoCoche( {onClose, datosAnteriores}:Coche ){
    const [marca, setMarca] = useState(datosAnteriores?.marca || ""); //estado -> input titulo
    const [modelo, setModelo] = useState(datosAnteriores?.modelo || ""); //estado -> input descripcion
    const [ano, setAno] = useState(datosAnteriores?.ano || ""); //estado -> input responsable 
    const [precio, setPrecio] = useState(datosAnteriores?.precio || ""); //estado -> input titulo
    const [fechaMatriculacion, setFechaMatriculacion] = useState(datosAnteriores?.fechaMatriculacion || ""); //estado -> input descripcion
    const [combustible, setCombustible] = useState(datosAnteriores?.combustible || ""); //estado -> input responsable 
    const [urlImagen, setUrlImagen] = useState(datosAnteriores?.urlImagen || ""); //estado -> input responsable 

    const guardarCoche = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await onClose(marca, modelo, ano, precio, fechaMatriculacion, combustible, urlImagen,);

            setMarca("");
            setModelo("");
            setAno("");
            setPrecio("");
            setFechaMatriculacion("");
            setCombustible("");
            setUrlImagen("");

        } catch (err) {
            console.error("No se pudo guardar la tarea", err);
        }
    };

    const {isLoading, error } = usePost<Coche[]>("http://localhost:3000/coches/nuevo");

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

                <button type="submit">Guardar</button>
            </div>
            </form>
        </div>
        </>
    );
}
export default NuevoCoche;