import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const userData = sessionStorage.getItem("userData");

        if (token && userData) {
            const user = JSON.parse(userData);
            dispatch(login({
                uid: user.uid,
                username: user.username,
                rol: user.rol,
                nombre: user.nombre,
                apellido: user.apellido,
                token,
            }));
        } else {
            dispatch(logout());
        }

        setChecking(false);
    }, [dispatch]);

    return checking ? "checking" : status;
};
