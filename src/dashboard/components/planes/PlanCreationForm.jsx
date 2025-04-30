import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardContent, CardActions, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      tipoPlan: planType,
      fechaInicio: fechaInicio,
      observaciones: ""
    }
  });

  const tipoPlanSeleccionado = watch("tipoPlan");
  const fechaInicioSeleccionada = watch("fechaInicio");

  const alimentosPorTipo = {
    "Plan Estandar": [0, 1],
    "Plan Keto": [0, 1, 2],
    "Plan Hiper Calorico": [0, 1, 2, 3],
    "Plan Alto Calorico": [0, 1, 2, 3, 4],
    "Plan Hiper Proteico": [0, 1, 2, 3, 4, 5],
    "Plan Vegetariano": [0, 1, 2, 3, 4, 5, 6],
    "Plan Vegano": [0, 1, 2, 3, 4, 5, 6, 7],
    "Plan Sin T.A.C.C": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "Plan Cardio Protector": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    "Plan Normo Calórico": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
    onGenerate(); // llama a la función externa
  };

  return (
    <Card>
      <CardHeader
        title="Crear Plan Alimenticio"
        subheader="Complete los detalles del plan alimenticio"
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
                    <Select {...field} label="Tipo de Plan">
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="observaciones"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Observaciones"
                    fullWidth
                    {...field}
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

          <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              Generar Plan Alimenticio
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlanCreationForm;
