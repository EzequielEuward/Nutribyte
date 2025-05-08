import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { format } from "date-fns";
import {ConsumoAlimentosTable} from "./"; 

export const FormularioNuevoConsumo = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: {
      fecha: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const { register, handleSubmit, reset } = methods;
  const [alimentos, setAlimentos] = useState([]);

  const handleFormSubmit = (data) => {
    if (!alimentos.length) {
      alert("Debe agregar al menos un alimento");
      return;
    }

    const payload = {
      ...data,
      consumoAlimentos: alimentos.map((a) => ({
        idAlimento: a.idAlimento,
        cantidad: a.gramos,
      })),
    };

    onSubmit(payload, reset);
    setAlimentos([]);
  };

  return (
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
            <Typography variant="h6" sx={{ mt: 2 }}>
              Alimentos Consumidos
            </Typography>
            <ConsumoAlimentosTable
              alimentos={alimentos}
              setAlimentos={setAlimentos}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Guardar Consumo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FormularioNuevoConsumo;
