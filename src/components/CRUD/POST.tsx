import { useState } from "react";

type Coche = {
    marca: string;
    modelo: string;
    ano: string;
    precio: string;
    fechaMatriculacion: string;
    combustible: string;
    urlImagen?: string | null;
    usuario: string;
};

function usePost<T>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    async function POST(url, nuevoElemento){
        setIsLoading(true); setError(null);

        if(marca.trim() === "" || modelo.trim() === "" || ano.trim() === "" || precio.trim() === "" || fechaMatriculacion.trim() === "" || combustible.trim() === ""){ //valida que no este vacio o hayan espacios
            return;

        }else{
            try{
                const nuevoCoche = { 
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
        
        void POST(url, nuevoCoche);
        };

return { POST, isLoading, error }}}

export default usePost;