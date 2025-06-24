import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  Tab, Tabs,
  CardHeader,
} from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';
import { useTheme } from '@mui/material/styles';

export const CalculadoraAntropometricaPage = () => {
  const [datos, setDatos] = useState({
    sexo: '',
    pesoActual: '',
    talla: '',
    pesoHabitual: '',
    circBrazo: '',
    pliegueTriceps: '',
    pliegueBiceps: '',
    pliegueSubescapular: '',
    pliegueSupraespinal: '',
    pliegueAbdominal: '',
    pliegueMuslo: '',
    plieguePantorrilla: '',
    circCintura: '',
    circCadera: '',
  });

  const [resultado, setResultado] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const calcular = () => {
    const {
      sexo,
      pesoActual,
      talla,
      pliegueTriceps,
      pliegueBiceps,
      pliegueSubescapular,
      pliegueSupraespinal,
      pliegueAbdominal,
      pliegueMuslo,
      plieguePantorrilla,
      circBrazo,
      circCintura,
      circCadera,
    } = datos;



    const peso = parseFloat(datos.pesoActual.replace(',', '.'));
    let altura = parseFloat(datos.talla.replace(',', '.'));

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
      setResultado({ imc: 'Datos inválidos' });
      return;
    }

    if (altura > 10) altura = altura / 100;

    const imc = Math.round((peso / (altura * altura)) * 100) / 100;
    setResultado({ imc });

    const caloriasPerder = peso * 25;
    const caloriasMantener = peso * 30;
    const caloriasGanar = peso * 35;

    const suma4 = [
      pliegueTriceps,
      pliegueSubescapular,
      pliegueBiceps,
      pliegueSupraespinal,
    ].map(Number).reduce((a, b) => a + b, 0);

    const grasaCorporal = Math.round((suma4 * 10 / peso) * 100) / 100;
    const masaGrasa = Math.round((peso * grasaCorporal) / 100 * 100) / 100;
    const masaMagra = Math.round((peso - masaGrasa) * 100) / 100;

    const sumaPliegues = [
      pliegueTriceps,
      pliegueSubescapular,
      pliegueBiceps,
      pliegueSupraespinal,
      pliegueAbdominal,
      pliegueMuslo,
      plieguePantorrilla,
    ].map(Number).reduce((a, b) => a + b, 0);

    const circMediaBrazo = circBrazo - (0.314 * pliegueTriceps * 0.1);

    const porcentajeCirc = sexo.toLowerCase() === 'masculino'
      ? (circMediaBrazo / 25.3) * 100
      : (circMediaBrazo / 23.2) * 100;

    const cinturaCadera = circCintura / circCadera;

    setResultado({
      imc,
      caloriasPerder,
      caloriasMantener,
      caloriasGanar,
      grasaCorporal,
      masaGrasa,
      masaMagra,
      sumaPliegues,
      porcentajeCirc: Math.round(porcentajeCirc * 100) / 100,
      cinturaCadera: Math.round(cinturaCadera * 100) / 100,
    });
  };

  const theme = useTheme();


  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ color: theme.palette.text.primary }} >
          Calculadora Antropométrica
        </Typography>

        <Box
          sx={{
            mt: 3,
            backgroundColor: theme.palette.background.paper2 ?? theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 2,
            color: theme.palette.text.primary,
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 2,
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Tab
              label="IMC"
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab
              label="Calorías"
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab label="Grasa Corporal"
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
                },
              }} />
            <Tab label="Índice Cintura-Cadera"
              sx={{
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
                },
              }} />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabIndex === 0 && (
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper ?? theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
              >
                <Typography variant="h6" gutterBottom color="primary" sx={{ color: theme.palette.text.primary }} >Calculadora de IMC</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Peso (kg)" name="pesoActual" fullWidth value={datos.pesoActual} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Talla (m)" name="talla" fullWidth value={datos.talla} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={3}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ backgroundColor: theme.palette.secondary.button }}
                    onClick={() => {
                      let peso = parseFloat(datos.pesoActual.toString().replace(',', '.'));
                      let altura = parseFloat(datos.talla.toString().replace(',', '.'));

                      if (isNaN(peso) || isNaN(altura) || altura <= 0) {
                        setResultado({ imc: "Datos inválidos" });
                        return;
                      }

                      if (altura > 10) altura = altura / 100;

                      const imc = Math.round((peso / (altura * altura)) * 100) / 100;
                      const imcIdealMin = Math.round(18.5 * altura * altura * 100) / 100;
                      const imcIdealMax = Math.round(24.9 * altura * altura * 100) / 100;

                      setResultado({
                        imc,
                        PesoIdealMin: imcIdealMin,
                        pesoIdealMax: imcIdealMax,
                      });
                    }}
                  >
                    Calcular IMC
                  </Button>
                </Box>
              </Paper>
            )}

            {tabIndex === 1 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ color: theme.palette.text.primary }} >Calorías por Objetivo</Typography>
                <TextField label="Peso Actual (kg)" name="pesoActual" fullWidth value={datos.pesoActual} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                <Box textAlign="center" mt={3}>
                  <Button variant="contained" sx={{ backgroundColor: theme.palette.secondary.button }} size="large" onClick={() => {
                    const peso = parseFloat(datos.pesoActual);
                    if (!peso) return;
                    setResultado({
                      caloriasPerder: peso * 25,
                      caloriasMantener: peso * 30,
                      caloriasGanar: peso * 35
                    });
                  }}>
                    Calcular Calorías
                  </Button>
                </Box>
              </Paper>
            )}

            {tabIndex === 2 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ color: theme.palette.text.primary }} >Grasa Corporal</Typography>
                <Grid container spacing={2}>
                  {["pliegueTriceps", "pliegueSubescapular", "pliegueBiceps", "pliegueSupraespinal"].map((campo) => (
                    <Grid item xs={12} sm={6} md={3} key={campo}>
                      <TextField label={campo} name={campo} fullWidth value={datos[campo]} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <TextField label="Peso Actual (kg)" name="pesoActual" fullWidth value={datos.pesoActual} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={3}>
                  <Button variant="contained" size="large" sx={{ backgroundColor: theme.palette.secondary.button }} onClick={() => {
                    const suma4 = ["pliegueTriceps", "pliegueSubescapular", "pliegueBiceps", "pliegueSupraespinal"]
                      .map(key => parseFloat(datos[key]) || 0)
                      .reduce((a, b) => a + b, 0);
                    const peso = parseFloat(datos.pesoActual);
                    const grasaCorporal = Math.round((suma4 * 10 / peso) * 100) / 100;
                    const masaGrasa = Math.round((peso * grasaCorporal) / 100 * 100) / 100;
                    const masaMagra = Math.round((peso - masaGrasa) * 100) / 100;
                    setResultado({ grasaCorporal, masaGrasa, masaMagra });
                  }}>
                    Calcular Grasa Corporal
                  </Button>
                </Box>
              </Paper>
            )}

            {tabIndex === 3 && (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ color: theme.palette.text.primary }} >Índice Cintura/Cadera</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Circ. Cintura (cm)" name="circCintura" fullWidth value={datos.circCintura} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Circ. Cadera (cm)" name="circCadera" fullWidth value={datos.circCadera} onChange={handleChange} inputProps={{ maxLength: 4 }} />
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={3}>
                  <Button variant="contained" sx={{ backgroundColor: theme.palette.secondary.button }} size="large" onClick={() => {
                    const cintura = parseFloat(datos.circCintura);
                    const cadera = parseFloat(datos.circCadera);
                    const cinturaCadera = cintura / cadera;
                    setResultado({ cinturaCadera: Math.round(cinturaCadera * 100) / 100 });
                  }}>
                    Calcular Relación
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>

          {resultado && (
            <Card elevation={4} sx={{ mt: 4, borderRadius: 3, p: { xs: 2, md: 3 } }}>
              <CardHeader
                title="Resultados"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  {Object.entries(resultado).map(([key, val]) => {
                    const etiquetas = {
                      imc: 'Índice de Masa Corporal',
                      PesoIdealMin: 'Peso Ideal Mínimo',
                      pesoIdealMax: 'Peso Ideal Máximo',
                      caloriasPerder: 'Calorías para Perder Peso',
                      caloriasMantener: 'Calorías para Mantener Peso',
                      caloriasGanar: 'Calorías para Ganar Peso',
                      grasaCorporal: '% de Grasa Corporal',
                      masaGrasa: 'Masa Grasa (kg)',
                      masaMagra: 'Masa Magra (kg)',
                      sumaPliegues: 'Suma de Pliegues',
                      porcentajeCirc: '% Circ. Media Brazo',
                      cinturaCadera: 'Relación Cintura-Cadera',
                    };
                    return (
                      <Grid item xs={12} sm={6} md={4} key={key}>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {etiquetas[key] || key}
                          </Typography>
                          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                            {val}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default CalculadoraAntropometricaPage;