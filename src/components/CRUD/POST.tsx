import { useState } from "react";

type Coche = {
    marca: string,
    modelo: string,
    ano: string,
    precio: string,
    fechaMatriculacion: string,
    combustible: string,
    urlImagen?: string | null,
};

function usePost<T>(url:string) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function POST(datos:T){

        //objetc.values -> obtine todos los valores del objeto
        //every -> comprueba que todos cumplan la condición.
        //datos as objetc -> es como le decimos a TypeScript que trate datos como un objeto.
        if (Object.values(datos as object).filter(valor => typeof valor === "string" && valor.trim() !== "")) {
            setError("Los campos obligatorios no pueden estar vacios");
            return;
        }
        setIsLoading(true);
        setError(null);

        try{
            const datos = { 
                marca: marca, 
                modelo: modelo,
                ano: ano,
                precio: precio,
                fechaMatriculacion: fechaMatriculacion,
                combustible: combustible,
                urlImagen: urlImgaen,
            } 

            const respuesta = await fetch(url, {
                headers: {
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(nuevoCoche),
            })

        } catch(err){
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoading(false);
        }
    
    void POST;
    }

return { POST, isLoading, error }}

export default usePost;