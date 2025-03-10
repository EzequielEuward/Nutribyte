import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { login } from "./store/auth/";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    const authToken = sessionStorage.getItem("authToken");

    if (userData && authToken) {
      const user = JSON.parse(userData);
      dispatch(
        login({
          uid: user.idUsuario,
          username: user.userName,
          persona: user.persona,  
          rol: user.rol,
          matricula: user.matricula,
          especialidad: user.especialidad,
          token: authToken,
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
