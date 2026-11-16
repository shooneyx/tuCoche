import usePost from "./CRUD/POST";
import { useState } from "react";

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


function NuevoCoche(){
    const [titulo, setTitulo] = useState(datosAnteriores?.titulo || ""); //estado -> input titulo
    const [descripcion, setDescripcion] = useState(datosAnteriores?.descripcion || ""); //estado -> input descripcion
    const [responsable, setResponsable] = useState(datosAnteriores?.responsable || ""); //estado -> input responsable 

    const guardarCoche = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await onClose(titulo, descripcion, responsable);

            setTitulo("");
            setDescripcion("");
            setResponsable("");

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

                <Boton type="submit">Guardar</Boton>
            </div>
            </form>
        </div>
        </>
    );
}
export default NuevoCoche;