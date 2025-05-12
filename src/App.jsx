import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { login } from "./store/auth/";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const authToken = localStorage.getItem("authToken");

    if (userData && authToken) {
      const user = JSON.parse(userData);
      

      dispatch(
        login({
          uid: user.idUsuario,
          username: user.username || user.userName,
          persona: user.persona,
          rol: user.rol,
          planUsuario: user.planUsuario,
          matricula: user.matricula_Profesional || user.matricula,
          especialidad: user.especialidad,
          token: authToken,
          requires2FA: user.requires2FA,
          twoFactorEnabled: user.twoFactorEnabled === true || user.twoFactorEnabled === "true",
        })
      );
    }
  }, [dispatch]);


  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};

export default App;
