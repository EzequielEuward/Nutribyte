import axios from "axios";
import { checkingCredentials, login, logout } from "./authSlice";

const api = axios.create({
  baseURL: "https://localhost:7041/api/Usuarios",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

export const startLoginWithUsernameAndPassword = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await api.post("/login", { username, password });

      if (data.isSuccess && data.result) {
        const user = data.result.usuario; 
        const token = data.result.token; 


        if (!user || !user.idUsuario) {
          throw new Error("El ID del usuario no fue recibido correctamente.");
        }

        const persona = user.persona || {}; 
        const userPersona = {
          nombre: persona.nombre || "",
          apellido: persona.apellido || "",
          email: persona.email || "",
          telefono: persona.telefono || "",
          sexoBiologico: persona.sexoBiologico || "",
        };

        const matricula = user.matricula_Profesional || "";
        const especialidad = user.especialidad || "";
        const rol = user.rol || "";

        dispatch(
          login({
            uid: user.idUsuario,
            username,
            rol,
            persona: userPersona,
            matricula,
            especialidad,
            token,
          })
        );

        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            idUsuario: user.idUsuario,
            userName: username,
            rol,
            persona: userPersona,
            matricula,
            especialidad,
          })
        );


        return { isSuccess: true, result: { usuario: user, token } };
      } else {
        console.error("Error al hacer login:", data.message);
        dispatch(logout({ errorMessage: data.message }));
        return { isSuccess: false, errorMessage: data.message };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error desconocido";
      console.error("Error al iniciar sesión:", errorMessage);
      dispatch(logout({ errorMessage }));
      return { isSuccess: false, errorMessage };
    }
  };
};

// ✅ **Cerrar sesión corregido**
export const startLogout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      dispatch(logout());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};
