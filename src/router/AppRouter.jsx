import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { DashboardRouter } from '../dashboard/routes/DashboardRouter'; 

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth/*" element={<AuthRouter />} />

      <Route path="/home/*" element={<DashboardRouter />} />
      

    </Routes>
  );
};

export default AppRouter;