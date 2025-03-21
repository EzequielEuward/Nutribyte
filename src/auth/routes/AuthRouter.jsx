import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importar useSelector
import { LoginPage } from '../pages/LoginPage';

export const AuthRouter = () => {
  // Obtener el estado de autenticación desde Redux
  const { status } = useSelector((state) => state.auth);

  // Si ya está autenticado, redirigir a /home
  if (status === 'authenticated') {
    return <Navigate to="/home" />;
  }

  return (
    <Routes>
      {/* Ruta de login */}
      <Route path="login" element={<LoginPage />} />
      {/* Redirigir a login si no está autenticado */}
      <Route path="*" element={<Navigate to="/auth/login" />} />W
    </Routes>
  );
};

export default AuthRouter;
