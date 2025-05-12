import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importar useSelector
import { HomePage } from '../home/pages/HomePage';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { DashboardRouter } from '../dashboard/routes/DashboardRouter';
import { FormularioHistorial } from '../helpers/FormularioHistorial';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {PlanesContacto} from '../dashboard/pages/PlanesContacto';

export const AppRouter = () => {
  // Obtener el estado de autenticación desde Redux
  const { status } = useSelector((state) => state.auth);

  // Verificar si el estado es "checking" (cuando se está verificando la autenticación)
  if (status === 'checking') {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<HomePage />} />

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={status === 'authenticated' ? <Navigate to="/home" /> : <AuthRouter />} />

      {/* Ruta protegida con verificación de autenticación */}
      <Route path="/home/*" element={status === 'authenticated' ? <DashboardRouter /> : <Navigate to="/auth/login" />} />

      {/* Otras rutas */}
      <Route path="/formulario-historial-peso" element={<FormularioHistorial />} />

      <Route path="/home/" element={status === 'authenticated' ? <DashboardRouter /> : <Navigate to="/auth/login" />} />

      <Route path='/planes/:nombrePlan' element={<PlanesContacto/>} />


      {/* Redirigir rutas desconocidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
