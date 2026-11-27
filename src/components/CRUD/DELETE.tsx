import { useState } from "react";
import useAuth from "../../context/UseAuth";

//T --> represneta datos enviados, R --> datos recibidos
function useDelete() {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState<string | null>(null);

    const { token } = useAuth();

    async function DELETE(url:string){

        setIsLoadingDelete(true);
        setErrorDelete(null);

        try{
            const respuesta = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                method: "DELETE",
            })

            if (!respuesta.ok) throw new Error("Error HTTP"); //comrpueba si la peticin ha salido bien

        } catch(err){
            const mensaje = err instanceof Error ? err.message : "Error al hacer DELETE";
            setErrorDelete(mensaje);
            throw err;
        } finally {
            setIsLoadingDelete(false);
        }
    }

return { DELETE, isLoadingDelete, errorDelete }}

export default useDelete;