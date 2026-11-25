import { useState } from "react";

function usePost<T>(url:string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function POST(datos:T){

        //objetc.values -> obtine todos los valores del objeto
        //every -> comprueba que todos cumplan la condición.
        //datos as objetc -> es como le decimos a TypeScript que trate datos como un objeto.
        setIsLoading(true);
        setError(null);

        try{
            const respuesta = await fetch(url, {
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(datos),
            })

            if (!respuesta.ok) throw new Error("Error HTTP"); //comrpueba si la peticin ha salido bien
            const json: T = await respuesta.json();
            return json;

        } catch(err){
            const mensaje = err instanceof Error ? err.message : "Error al hacer POST";
            setError(mensaje);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

return { POST, isLoading, error }}

export default usePost;