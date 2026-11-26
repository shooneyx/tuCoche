import { useState } from "react";

//T --> represneta datos enviados, R --> datos recibidos
function usePut<T, R>(url:string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function PUT(datos:T){
        setIsLoading(true);
        setError(null);

        try{
            const respuesta = await fetch(url, {
                headers: {
                "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(datos),
            })

            if (!respuesta.ok) throw new Error("Error HTTP"); //comrpueba si la peticin ha salido bien
            const json: R = await respuesta.json();
            return json;

        } catch(err){
            const mensaje = err instanceof Error ? err.message : "Error al hacer POST";
            setError(mensaje);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

return { PUT, isLoading, error }}

export default usePut;