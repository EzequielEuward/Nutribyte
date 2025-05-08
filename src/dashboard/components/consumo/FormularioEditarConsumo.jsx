import { useForm, FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {ConsumoAlimentosTable} from "./"; 
import { format } from "date-fns";

export const FormularioEditarConsumo = ({ open, onClose, consumo, onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      fecha: "",
      consumoAlimentos: [],
    }
  });

  const { register, handleSubmit, reset } = methods;
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    if (consumo) {
      reset({
        fecha: format(new Date(consumo.fecha), "yyyy-MM-dd"),
      });
      const conAlimentos = consumo.consumoAlimentos.map(a => ({
        ...a.alimento,
        gramos: a.cantidad
      }));
      setAlimentos(conAlimentos);
    }
  }, [consumo]);

  const handleFormSubmit = (data) => {
    const payload = {
      idConsumo: consumo.idConsumo,
      idPaciente: consumo.idPaciente, // ✅ necesario para el backend
      fecha: data.fecha,
      consumoAlimentos: alimentos.map(a => ({
        idAlimento: a.idAlimento,
        cantidad: a.gramos || 0
      }))
    };
    onSubmit(payload);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Consumo</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Fecha"
                  type="date"
                  fullWidth
                  {...register("fecha")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Alimentos Consumidos</Typography>
                <ConsumoAlimentosTable
                  alimentos={alimentos}
                  setAlimentos={setAlimentos}
                  alimentosSugeridos={[]}
                />
              </Grid>
            </Grid>

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={onClose} variant="outlined">Cancelar</Button>
              <Button type="submit" variant="contained">Guardar Cambios</Button>
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioEditarConsumo;
