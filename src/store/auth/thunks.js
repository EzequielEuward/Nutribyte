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
  
        console.log("Respuesta de la API:", data);
  
        if (data.isSuccess) {
          const user = data.result;
          const token = user.token;
          const persona = user.usuario?.persona || {};
          const userPersona = {
            nombre: persona.nombre || "",
            apellido: persona.apellido || "",
            email: persona.email || "",
            telefono: persona.telefono || "",
            sexoBiologico: persona.sexoBiologico || "",
          };
          const matricula = user.usuario?.matricula_Profesional || "";
          const especialidad = user.usuario?.especialidad || "";
          const rol = user.usuario?.rol || "";
  
          // Despachamos el login con todos los datos requeridos
          dispatch(login({
            uid: user.idUsuario,
            username: username,
            rol: rol,
            persona: userPersona,  // Toda la información de persona
            matricula: matricula,   // Asignamos matricula
            especialidad: especialidad,   // Asignamos especialidad
            token,
          }));
  
          // Guardamos los datos relevantes en sessionStorage
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('userData', JSON.stringify({
            idUsuario: user.idUsuario,
            userName: username,
            rol: rol,
            persona: userPersona,  // Guardamos persona también
            matricula,
            especialidad,
          }));
  
          console.log(sessionStorage.getItem('userData'));
  
          return { isSuccess: true, result: { usuario: user, token } };
        } else {
          console.error("Error al hacer login:", data.message);
          dispatch(logout({ errorMessage: data.message }));
          return { isSuccess: false, errorMessage: data.message };
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        console.error("Error al iniciar sesión:", errorMessage);
        dispatch(logout({ errorMessage }));
        return { isSuccess: false, errorMessage };
      }
    };
  };
  

// **Cerrar sesión**
export const startLogout = () => {
    return async (dispatch) => {
        try {
            // Eliminar datos de sessionStorage
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userData");
            dispatch(logout()); // Despachar logout
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
};
