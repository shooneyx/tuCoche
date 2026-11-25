import { useContext } from "react";
import { AuthContext } from "./AuthContext";

//funcion para poder acceder a los datos de token y poder usarlos
function useAuth(){
    const datosToken = useContext(AuthContext);

    if (datosToken === null){
        throw new Error ("No tiene autorización");
    } 

    const {token, setToken} = datosToken;

    return(
        {token, setToken}
    )
}
export default useAuth;