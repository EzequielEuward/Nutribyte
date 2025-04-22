
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { PlanSummaryStep } from '../components/food/planes/';
import { DashboardLayout } from '../layout/DashboardLayout';

export const PlanSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.plan) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">
          No se encontró el plan. Por favor, vuelve a la sección de planes.
        </Typography>
      </Box>
    );
  }

  const { plan, paciente } = state;

  return (
    <DashboardLayout>

      <Box sx={{ p: 4 }}>
        <PlanSummaryStep
          plan={plan}
          paciente={paciente}
          onEdit={() => navigate('/planes')}
        />

      </Box>
    </DashboardLayout>
  );
};

export default PlanSummaryPage;
