import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importar useSelector
import { HomePage } from '../home/pages/HomePage';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { DashboardRouter } from '../dashboard/routes/DashboardRouter';
import { FormularioConsumoHabitos } from '../helpers/FormularioConsumoHabitos';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { PlanesContacto } from '../dashboard/pages/PlanesContacto';
import { RouteTracker } from '../helpers';
import RecuperarPasswordPage from '../auth/pages/RecuperarContraseñaPage';
import CambiarContraseñaPage from '../auth/pages/CambiarContraseñaPage';
import VerificarCuentaPage from '../dashboard/pages/VerificarCuentaPage';
import TerminosCondicionesPage from '../dashboard/pages/TerminosCondicionesPage';
import PoliticasDePrivacidadPage from '../dashboard/pages/PoliticasDePrivacidadPage';

export const AppRouter = () => {
  // Obtener el estado de autenticación desde Redux
  const { status } = useSelector((state) => state.auth);

  // Verificar si el estado es "checking" (cuando se está verificando la autenticación)
  if (status === 'checking') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RouteTracker />
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<HomePage />} />

        {/* Rutas de autenticación */}
        <Route path="/auth/*" element={status === 'authenticated' ? <Navigate to="/home" /> : <AuthRouter />} />

        {/* Ruta protegida con verificación de autenticación */}
        <Route path="/home/*" element={status === 'authenticated' ? <DashboardRouter /> : <Navigate to="/auth/login" />} />

        {/*Rutas para la recuperacion de la contraseña*/}
        <Route path="/recuperarContraseña" element={<RecuperarPasswordPage />} />
        <Route path="/recuperar" element={<CambiarContraseñaPage />} />
        <Route path="/Verificar-Cuenta" element={<VerificarCuentaPage />} />

        {/* Otras rutas */}
        <Route path="/habitos-y-consumos" element={<FormularioConsumoHabitos />} />

        <Route path="/terminos-y-condiciones" element={<TerminosCondicionesPage />} />
        <Route path="/politica-de-privacidad" element={<PoliticasDePrivacidadPage />} />

        <Route path="/home/" element={status === 'authenticated' ? <DashboardRouter /> : <Navigate to="/auth/login" />} />

        <Route path='/planes/:nombrePlan' element={<PlanesContacto />} />


        {/* Redirigir rutas desconocidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRouter;
