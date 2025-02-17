import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui/"; 

export const PrivateRoute = () => {
    const status = useCheckAuth(); // Obtenemos el estado de autenticación

    if (status === "checking") {
        return <CheckingAuth />; // Mostrar animación de carga mientras se verifica
    }

    return status === "authenticated" ? <Outlet /> : <Navigate to="/auth/login" />;
};
