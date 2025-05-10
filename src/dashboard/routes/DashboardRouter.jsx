import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  DashboardPage, PatientPage, FoodPage, ProfilePage,
  CalendarPage, ConsultaPage, PlanesPage, RecipePage,
  ConfigPage, HistorialPeso, ConsumoPage, VersionPage,
  ControlDeSistemaPage, PlanSummaryPage, SeguridadMedidas, DetallePlan, ReportesPage,
  CalculadoraAntropometricaPage, PagosAndSuscripcionesPage

} from '../pages/';


export const DashboardRouter = () => {
  const { rol, planUsuario } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      {/* Navbar Drawer */}
      <Route path="perfil" element={<ProfilePage />} />
      <Route path="configuracion" element={<ConfigPage />} />
      <Route path="medidas-de-seguridad" element={<SeguridadMedidas />} />
      <Route path="informacion-planes" element={<DetallePlan planUsuario={planUsuario} />} />

      {/* Paciente */}
      <Route path="paciente" element={<PatientPage />} />
      <Route path="diagnostico" element={<ConsultaPage />} />

      {/* Alimentos */}
      <Route path="alimentos" element={<FoodPage />} />
      <Route path="recetas" element={<RecipePage />} />
      <Route path="planes" element={<PlanesPage />} />
      <Route path="planes/resumen-plan" element={<PlanSummaryPage />} />

      {/* Progreso */}
      <Route path="progreso/historial-peso" element={<HistorialPeso />} />
      <Route path="progreso/calorias-consumidas" element={<ConsumoPage />} />
      <Route path="turnos" element={<CalendarPage />} />

      <Route path="reportes" element={<ReportesPage />} />
      <Route path="pagos-y-suscripciones" element={<PagosAndSuscripcionesPage />} />

      {planUsuario === "Elite" && (
        <>
          <Route path="calculadora-antropometrica" element={<CalculadoraAntropometricaPage />} />
        </>

      )
      }

      {/* Solo los administradores pueden ver estas rutas */}
      {rol === "Administrador" && (
        <>
          <Route path="versiones" element={<VersionPage />} />
          <Route path="control-de-usuario" element={<ControlDeSistemaPage />} />
        </>
      )}

      




      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default DashboardRouter;
