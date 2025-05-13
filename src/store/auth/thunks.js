import axios from "axios";
import { checkingCredentials, login, logout } from "./authSlice";
import { disableDarkMode } from "../ui/uiSlice";

const api = axios.create({
  baseURL: "https://sintacc-api-deploy.azurewebsites.net/api/Usuarios",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});


export const startLoginWithUsernameAndPassword = ({ username, password, codigo2FA }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      const payload = { username, password };
      if (codigo2FA) payload.codigo2FA = codigo2FA;

      const { data } = await api.post("/login", payload);

      // ⚠️ Si requiere 2FA, detener login y retornar info
      if (data.requires2FA || data.result?.requires2FA) {

        const usuario = data.result?.usuario || null;

        return Promise.resolve({
          isSuccess: false,
          requires2FA: true,
          result: usuario ? { usuario } : null,
        });
      }

      const user = data.result.usuario;
      const token = data.result.token;

      if (!user || !user.idUsuario || !token) {
        console.error("🔴 No se recibió un ID de usuario válido o token faltante");
        throw new Error("Datos de sesión incompletos.");
      }
      const requires2FA = user.twoFactorEnabled || false;

      dispatch(
        login({
          uid: user.idUsuario,
          username: user.userName || username,
          rol: user.rol || "",
          planUsuario: user.planUsuario || "",
          persona: {
            nombre: user.persona?.nombre || "",
            apellido: user.persona?.apellido || "",
            email: user.persona?.email || "",
            telefono: user.persona?.telefono || "",
            sexoBiologico: user.persona?.sexoBiologico || "",
          },
          matricula: user.matricula_Profesional || "",
          especialidad: user.especialidad || "",
          token,
          requires2FA,
          twoFactorEnabled: !!user.twoFactorEnabled,
        })
      );

      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userData", JSON.stringify({
        ...user,
        twoFactorEnabled: !!user.twoFactorEnabled
      }));
      sessionStorage.setItem("ultimaSesion", new Date().toLocaleString("es-AR"));

      return {
        isSuccess: true,
        result: { usuario: user, token },
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
      console.error("🔴 Error al iniciar sesión:", errorMessage);
      dispatch(logout({ errorMessage }));
      return Promise.reject(new Error(errorMessage));
    }
  };
};


export const startActivate2FA = ({ idUsuario, token }) => {
  return async () => {
    try {
      const { data } = await api.post(`/${idUsuario}/verificar-2fa`, { token });

      return {
        isSuccess: data.isSuccess,
        token: data.result?.token || null,
      };
    } catch (error) {
      console.error("Error al verificar 2FA:", error.response?.data || error.message);
      return { isSuccess: false };
    }
  };
};

export const startGenerarQR2FA = (idUsuario) => {
  return async () => {
    try {
      const { data } = await api.post(`/${idUsuario}/activar-2fa`);
      return {
        isSuccess: true,
        qrCodeImage: data.qrCodeImageBase64,
        secretKey: data.secretKey,
      };
    } catch (error) {
      console.error("Error al generar QR 2FA:", error.response?.data || error.message);
      return { isSuccess: false };
    }
  };
};

export const startDebug2FA = (username) => {
  return async () => {
    try {
      const { data } = await api.get(`/Debug-2fa/${username}`);
      return { ...data };
    } catch (error) {
      console.error("Error al debuggear código 2FA:", error.message);
      return null;
    }
  };
};

export const startVerify2FA = ({ idUsuario, token }) => {
  return async () => {
    try {
      const { data } = await api.post(`/verificar-2fa`, { idUsuario, token });

      const user = data.usuario;

      // ✅ Guardar en localStorage el usuario actualizado
      sessionStorage.setItem("userData", JSON.stringify({
        ...user,
        twoFactorEnabled: !!user.twoFactorEnabled
      }));

      return {
        isSuccess: true,
        token: data.token,
        usuario: user,
      };
    } catch (error) {
      console.error("Error al verificar 2FA:", error.response?.data || error.message);
      return { isSuccess: false };
    }
  };
};
// ✅ **Cerrar sesión corregido**

export const startLogout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("ultimaSesion");
      sessionStorage.clear();
      dispatch(disableDarkMode());
      dispatch(logout());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};
export const startVerificarCuenta = (token) => {
  return async () => {
    try {
      const response = await api.get(`/verificar?token=${token}`);
      return {
        isSuccess: true,
        message: response.data
      };
    } catch (error) {
      const message = error.response?.data || "No se pudo conectar con el servidor.";
      console.error("Error al verificar cuenta:", message);
      return {
        isSuccess: false,
        message
      };
    }
  };
};