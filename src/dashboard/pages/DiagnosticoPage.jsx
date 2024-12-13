import { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Box, Typography, Card, CardContent, CardHeader, Tabs, Tab, Button } from '@mui/material';

import { BuscarPacienteDiagnostico, InformacionPersonalDiagnostico, NuevoDiagnostico, Diagnostico } from '../components/';

export const DiagnosticoPage = () => {
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState({
    dni: '',
    motivoVisita: '',
    fecha: '',
    talla: '',
    pesoActual: '',
    pesoHabitual: '',
    circunferenciaBrazo: '',
    circunferenciaCintura: '',
    circunferenciaPantorrilla: '',
    pliegueBicipital: '',
    pliegueTricipital: '',
    pliegueSubescapular: '',
    pliegueSuprailiaco: '',
    observaciones: '',
  });

  const buscarPaciente = () => {
    setPaciente({
      nombre: "Juan Pérez",
      dni: "12345678",
      fechaNacimiento: "1985-05-15",
      telefono: "123-456-7890",
      email: "juan.perez@example.com",
      diagnosticos: [
        {
          fecha: "2023-05-15",
          motivoVisita: "Control de rutina",
          talla: 170,
          pesoActual: 75,
          pesoHabitual: 72,
          circunferenciaBrazo: 32,
          circunferenciaCintura: 85,
          circunferenciaPantorrilla: 38,
          pliegueBicipital: 10,
          pliegueTricipital: 15,
          pliegueSubescapular: 18,
          pliegueSuprailiaco: 20,
          observaciones: "El paciente muestra una leve ganancia de peso desde la última visita."
        }
      ]
    });
  };

  const handleNuevoDiagnosticoChange = (e) => {
    const { name, value } = e.target;
    setNuevoDiagnostico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarDiagnostico = (e) => {
    e.preventDefault();
    if (!paciente) return;

    const diagnostico = { ...nuevoDiagnostico, fecha: nuevoDiagnostico.fecha || new Date().toISOString().split('T')[0] };

    setPaciente((prev) => ({
      ...prev,
      diagnosticos: [...prev.diagnosticos, diagnostico],
    }));

    setNuevoDiagnostico({
      dni,
      motivoVisita: '',
      fecha: '',
      talla: '',
      pesoActual: '',
      pesoHabitual: '',
      circunferenciaBrazo: '',
      circunferenciaCintura: '',
      circunferenciaPantorrilla: '',
      pliegueBicipital: '',
      pliegueTricipital: '',
      pliegueSubescapular: '',
      pliegueSuprailiaco: '',
      observaciones: '',
    });

    setTabIndex(1); // Cambiar a la pestaña "Diagnósticos"
  };


  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Sistema de Nutrición - Diagnóstico de Pacientes
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box flex={{ xs: '1', md: '0.3' }}> {/* Cambio a 0.3 en md */}
            <BuscarPacienteDiagnostico dni={dni} setDni={setDni} buscarPaciente={buscarPaciente} />
          </Box>
          <Box flex={{ xs: '1', md: '0.7' }}> {/* Cambio a 0.7 en md */}
            <Card>
              <CardHeader title="Información del Paciente y Diagnósticos" />
              <CardContent>
                {paciente ? (
                  <Box>
                    <Tabs
                      value={tabIndex}
                      onChange={(e, newValue) => setTabIndex(newValue)}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <Tab label="Información Personal" />
                      <Tab label="Diagnósticos" />
                      <Tab label="Nuevo Diagnóstico" />
                    </Tabs>
                    {tabIndex === 0 && <InformacionPersonalDiagnostico paciente={paciente} />}
                    {tabIndex === 1 && <Diagnostico diagnosticos={paciente.diagnosticos} />}
                    {tabIndex === 2 && (
                      <NuevoDiagnostico
                        nuevoDiagnostico={nuevoDiagnostico}
                        handleNuevoDiagnosticoChange={handleNuevoDiagnosticoChange}
                        handleGuardarDiagnostico={handleGuardarDiagnostico}
                      />
                    )}
                    
                  </Box>
                ) : (
                  <Typography>
                    No se ha seleccionado ningún paciente. Por favor, busque un paciente utilizando su DNI.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

      </Box>
    </DashboardLayout>
  );
};

export default DiagnosticoPage;
