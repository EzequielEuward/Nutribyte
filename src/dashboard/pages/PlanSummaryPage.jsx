// PlanSummaryPage.jsx

import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Divider, Button, Stack, Tooltip, IconButton } from '@mui/material';
import { PlanSummaryStep, PlanChart, TablaComidaSummary } from '../components/planes/';
import { DashboardLayout } from '../layout/DashboardLayout';
import DownloadIcon from '@mui/icons-material/Download';
import { PlanResumenStats } from '../components/planes/';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react';

export const PlanSummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resumenRef = useRef();
  const theme = useTheme();

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

  const handleDownload = () => {
    const input = resumenRef.current;

    html2canvas(input, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregar el contenido principal
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // 👉 Agregar imagen al final
      const finalImage = new Image();
      finalImage.src = '/porciones.png';

      finalImage.onload = () => {
        const aspectRatio = finalImage.width / finalImage.height;
        const imageWidth = pdfWidth;
        const imageHeight = pdfWidth / aspectRatio;

        pdf.addPage();
        pdf.addImage(finalImage, 'PNG', 0, 10, imageWidth, imageHeight);
        pdf.save(`${plan.tipoPlan}_Resumen.pdf`);
      };
    });
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        {/* Botón de descarga arriba */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Tooltip title="Volver">
            <IconButton sx={{ backgroundColor: theme.palette.background.arrow }} onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          {/* Botón de descarga a la derecha */}
          <Box flexGrow={1} />
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            color="primary"
          >
            Descargar Plan Completo
          </Button>
        </Stack>

        {/* Contenedor completo del resumen */}
        <Box ref={resumenRef} sx={{ backgroundColor: '#fff', color: '#000' }}>
          <PlanSummaryStep plan={plan} paciente={paciente} />
          <Grid>
            <PlanResumenStats plan={plan} /> {/* 🔥 nuevo componente aquí */}
          </Grid>
          <Divider sx={{ mt: 4 }} />
          <PlanChart alimentos={plan.alimentos || []} />
          <Divider sx={{ mt: 4 }} />
          <TablaComidaSummary plan={plan} />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default PlanSummaryPage;
