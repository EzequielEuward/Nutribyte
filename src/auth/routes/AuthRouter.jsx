import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../../dashboard/pages/DashboardPage'; 


const isAuthenticated = true; 

export const AuthRouter = () => {
  return (
    <Routes>
      {/* Ruta de login */}
      <Route path="login" element={<LoginPage />} />

      {isAuthenticated ? (
        <Route path="*" element={<Navigate to="/dashboard" />} />
      ) : (
        <Route path="*" element={<Navigate to="/auth/login" />} />
      )}

      {/* Otras rutas para el dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AuthRouter;