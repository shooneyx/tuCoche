import { createContext, useEffect } from "react";
import { useState } from "react";

//tipamos los token aunque los tenemos en usestate para poder usarlos en context porque esta fuera de la funcion
type Token = { 
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>; 
}
type Props = {
    children: React.ReactNode;
}

export const AuthContext = createContext<Token | null>(null);

//crear contexto donde se puede usar useconext
function AuthProvider({children}:Props){
    const [token, setToken] = useState<string | null>(() => { 
        return localStorage.getItem("token"); //para guardar el token por si recargas la pagina
    });

    useEffect(() =>{ //si se actualiza el token, cambia el localsotrage tambien
        if(token !== null){
            localStorage.setItem("token", token);
        } else{
            localStorage.removeItem("token");
        }

    },[token])

    return(
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;