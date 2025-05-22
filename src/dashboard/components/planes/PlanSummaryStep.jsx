import { Box, Typography, Stack, Button, Paper, Grid, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { PLAN_TEMPLATES } from '../../../mock/data/planTemplates';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import { useTheme } from '@emotion/react';

export const PlanSummaryStep = ({ plan, paciente }) => {
  const config = PLAN_TEMPLATES[plan.tipoPlan] || {};
  const resumenRef = useRef();
  const theme = useTheme();

  return (
    <Box ref={resumenRef}>
      <Stack spacing={4} sx={{ mt: 4, px: { xs: 2, md: 6 } }} >
        {/* Título principal */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
            {plan.tipoPlan}
          </Typography>
          <Typography variant="subtitle1">
            {config.descripcion || 'Descripción no disponible para este tipo de plan.'}
          </Typography>
        </Box>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f5f5f5', color: '#000' }}>
          <Typography variant="h6" gutterBottom>
            Información Nutricional
          </Typography>

          {/* Macronutrientes dinámicos */}
          <Grid container spacing={2} mt={2} sx={{ backgroundColor: "#f7f7f7f7", p: 2, borderRadius: 2 }}>
            {(config.macronutrientes || []).map((m, i) => (
              <Grid item xs={12} md={4} key={i} sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
                <Paper sx={{ p: 2, borderLeft: `5px solid ${m.color}`, backgroundColor: "#f7f7f7" }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: m.color }}>
                    {m.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>{m.porcentaje} - {m.descripcion}</Typography>
                  <Typography variant="body2" sx={{ color: "black" }} mt={1}><strong>Fuentes:</strong> {m.fuentes}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Beneficios dinámicos */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Beneficios del Plan</Typography>
            <Stack spacing={1}>
              {(config.beneficios || []).map((beneficio, i) => (
                <Box key={i} display="flex" alignItems="center" gap={1}>
                  <CheckCircleIcon color="success" fontSize="small" />
                  <Typography variant="body2">{beneficio}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Typography variant="caption" color="text.secondary">
            Nota: Este plan es una guía general...
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
export default PlanSummaryStep;
