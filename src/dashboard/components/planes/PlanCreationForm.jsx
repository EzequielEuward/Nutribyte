import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card, CardHeader, CardContent, CardActions,
  Button, Grid, TextField, FormControl, InputLabel,
  Select, MenuItem, useTheme,
  Tooltip
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { addDays } from "date-fns";
import { MealPlanTabs } from "./MealPlanTabs";

export const PlanCreationForm = ({
  planType,
  setPlanType,
  fechaInicio,
  setFechaInicio,
  setFechaFin,
  setObservaciones,
  alimentos,
  setAlimentos,
  alimentosDisponibles,
  onCancel,
  onGenerate
}) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      tipoPlan: planType,
      fechaInicio: fechaInicio,
      observaciones: ""
    }
  });

  const theme = useTheme();
  const tipoPlanSeleccionado = watch("tipoPlan");
  const fechaInicioSeleccionada = watch("fechaInicio");

  const alimentosPorTipo = {
    "Plan Personalizado": [0],
    "Plan Keto": [134, 651, 676, 663, 479, 44, 610, 569, 679, 26, 476, 670, 8, 62, 34, 39, 75, 653, 755],
    "Plan Hiper Calorico": [928, 364, 600, 603, 583, 684, 618, 495, 276, 77, 53, 494, 25, 109, 100, 134, 670, 676, 671, 503],
    "Plan Alto Calorico": [316, 151, 82, 254, 800, 125, 468, 583, 275, 676, 494, 329, 348, 671, 346, 252, 699, 160, 579],
    "Plan Vegetariano": [370, 275, 348, 252, 44, 468, 319, 99, 112, 680, 34, 351, 82, 219, 295, 26, 87, 60, 611, 22],
    "Plan Vegano": [370, 257, 293, 348, 20, 100, 160, 134, 801, 126, 155, 676, 121, 164, 23, 82, 91, 86, 60, 12],
    "Plan Sin T.A.C.C": [246, 329, 23, 87, 583, 468, 91, 75, 679, 264, 215, 168, 91, 112, 153, 104, 59, 124, 369, 319],
    "Plan Cardio Protector": [650, 161, 676, 663, 112, 114, 275, 458, 151, 44, 652, 10, 26, 126, 134, 87, 62, 635],
    "Plan Normo Calórico": [136, 168, 86, 26, 126, 62, 80, 403, 348, 459, 611, 579, 132, 635, 225, 121, 143, 42, 522, 34]
  };

  useEffect(() => {
    if (tipoPlanSeleccionado) {
      setPlanType(tipoPlanSeleccionado);
      const ids = alimentosPorTipo[tipoPlanSeleccionado] || [];
      const filtrados = alimentosDisponibles
        .filter((a) => ids.includes(a.idAlimento))
        .map((a) => ({ ...a, gramos: 100 }));
      setAlimentos(filtrados);
    }
  }, [tipoPlanSeleccionado]);

  useEffect(() => {
    if (fechaInicioSeleccionada) {
      setFechaInicio(fechaInicioSeleccionada);
      const fechaFinCalculada = addDays(new Date(fechaInicioSeleccionada), 30)
        .toISOString()
        .split("T")[0];
      setFechaFin(fechaFinCalculada);
    }
  }, [fechaInicioSeleccionada]);

  const onSubmit = (data) => {
    setObservaciones(data.observaciones);
    onGenerate();
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardHeader
        title="Crear Plan Alimenticio"
        subheader="Complete los detalles del plan alimenticio"
        sx={{ color: theme.palette.text.primary }}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Plan</InputLabel>
                <Controller
                  name="tipoPlan"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Tipo de Plan"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.text.primary,
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.text.primary,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                          },
                          '& input': {
                            color: theme.palette.text.primary,
                            caretColor: theme.palette.text.primary, // 👈 evita el cursor azul
                          },
                          '& input::selection': {
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                          },
                          '&:-webkit-autofill': {
                            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                            WebkitTextFillColor: theme.palette.text.primary,
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.text.primary,
                        }
                      }}
                    >
                      {Object.keys(alimentosPorTipo).map((plan) => (
                        <MenuItem key={plan} value={plan}>
                          {plan}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="fechaInicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Fecha de Inicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '& input': {
                          color: theme.palette.text.primary,
                          caretColor: theme.palette.text.primary, // 👈 evita el cursor azul
                        },
                        '& input::selection': {
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff',
                        },
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                          WebkitTextFillColor: theme.palette.text.primary,
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.text.primary,
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="observaciones"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Observaciones"
                    fullWidth
                    multiline
                    rows={3}
                    {...field}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.text.primary,
                        },
                        '& input': {
                          color: theme.palette.text.primary,
                          caretColor: theme.palette.text.primary, // 👈 evita el cursor azul
                        },
                        '& input::selection': {
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff',
                        },
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                          WebkitTextFillColor: theme.palette.text.primary,
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.text.primary,
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <MealPlanTabs
                alimentos={alimentos}
                setAlimentos={setAlimentos}
                alimentosSugeridos={alimentosPorTipo[tipoPlanSeleccionado] || []}
              />
            </Grid>
          </Grid>

          <CardActions sx={{ justifyContent: "flex-end", mt: 2, gap: 1 }}>
            <Tooltip title="Cancelar la creación del plan alimenticio">
              <Button
                variant="contained"
                onClick={onCancel}
                sx={{
                  color: theme.palette.text.buscar,
                  borderColor: theme.palette.estadoTurnos.cancelado,

                }}
              >
                Cancelar
              </Button>
            </Tooltip>
            <Tooltip title="Generar el plan alimenticio con los datos ingresados">
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: theme.palette.secondary.button,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.button
                  }
                }}
              >
                Generar Plan Alimenticio
              </Button>
            </Tooltip>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );

};

export default PlanCreationForm;
