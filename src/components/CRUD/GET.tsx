import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../context/UseAuth";

function useGet<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true); setError(null); setData(null);
    
    async function cargar() {
        try {
            const res = await fetch(url, { 
                signal: controller.signal,
                headers: {
                    Authorization: `Bearer ${token}`, //pasamos el token por header
                } 
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json: T = await res.json();
            if (!controller.signal.aborted) setData(json);
        } catch (err) {
            if (!controller.signal.aborted)
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            if (!controller.signal.aborted) setIsLoading(false);
        }
    }
    void cargar();
    return () => controller.abort();
    }, [url, token]);

return { data, isLoading, error }}

export default useGet;