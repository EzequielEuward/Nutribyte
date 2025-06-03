import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Paper, Grid,
  TextField, Checkbox, FormGroup, FormControlLabel,
  Button, Divider, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const opcionesSemana = ["1", "2", "3", "4"];
const opcionesComidas = [
  "20 comidas. Realice las cuatro comidas diarias (desayuno, almuerzo, merienda y cena).",
  "15 comidas. Realice 3 comidas diarias (desayuno, almuerzo, merienda y cena).",
  "12 comidas. Realice 2 comidas diarias o menos (desayuno, almuerzo, merienda y cena)."
];
// const opcionesColaciones = [13, 12, 6, 5, 3, "Otro"];
const opcionesColaciones = [13, 12, 6, 5, 3];
const opcionesLacteos = [
  "Leche descremada fluida", "Leche en polvo", "Yogur estimado"
];
const opcionesBebidas = [
  "Agua. 15 Litros", "Agua. 10 Litros", "Te, infusiones con edulcorante", "Te, infusiones con azucar",
  "Mate cebado", "Jugos naturales", "Licuados con fruta de leche", "Licuados de fruta con agua",
  "Gaseosas 1L/semana", "Gaseosas 2L+/semana", "Aguas saborizadas 1L/semana", "Aguas saborizadas 2L+/semana",
  "Alcohol 1L/semana", "Alcohol 2L+/semana"
];
const opcionesCereales = [
  "Pan de salvado", "Galletas de salvado (31)", "Galletas de salvado (<20)", "Copos de maiz (100-500g)",
  "Copos de maiz (500-1000g)", "Quinoa pop (100-500g)", "Quinoa pop (500-1000g)",
  "Amaranto pop (100-500g)", "Amaranto pop (500-1000g)", "Avena crocante (100-500g)",
  "Avena crocante (500-1000g)", "Granola avena (100-500g)", "Granola avena (500-1000g)"
];
const opcionesProteinas = [
  "Lomo(vacuna)",
  "Cuadril(vacuna)",
  "Jamon cuadrado(vacuna)",
  "Bola de lomo(vacuna)",
  "Nalga(vacuna)",
  "Paleta(vacuna)",
  "Peceto(vacuna)",
  "Palomita(vacuna)",
  "Bocado(vacuna)",
  "Lomo de atún (pescado)",
  "Mero(pescado)",
  "Salmon(pescado)",
  "Bacalao(pescado)",
  "Merluza(pescado)",
  "Trucha(pescado)",
  "Carpa(pescado)",
  "Pollo sin piel",
  "Porcina",
  "Queso untable",
  "Queso ricota",
  "Queso de rallar",
];
const opcionesSemillas = [
  "Semillas de chía",
  "Semillas de lino",
  "Semillas de sésamo",
  "Semillas de girasol",
  "Semillas de amapola",
  "Semillas de zapallo",
];
const opcionesFrutas = [
  "Anana", "Cereza", "Circuela", "Damasco", "Pera", "Fresa", "Kiwi", "Durazno", "Mango",
  "Frambuesa", "Arandano", "Manzana", "Naranja", "Mandarina", "Pomelo", "Sandia", "Melon", "Uva", "Banana", "Papaya"
];
const opcionesAceitesYGrasas = ["Aceite de oliva", "Mantequilla", "Margarina", "Aceite de girasol", "Aceite de maíz"];
const opcionesCondimentos = ["Sal", "Azúcar", "Aceite de oliva", "Vinagre", "Especias", "Salsas"];
const opcionesDulces = [
  "1 1/2 cucharada sopera de mermelada dietética",
  "1 1/2 cucharada sopera de dulce de leche light",
  "1 1/2 cucharada sopera de dulce de leche clásico",
  "1 1/2 cucharada sopera de mermelada clásica",
  "2 cucharadas sopera de mermelada dietética",
  "2 cucharadas sopera de dulce de leche light",
  "2 cucharadas de dulce de leche clásico",
  "2 cucharadas de mermelada clásica",
  "3 o mas cucharadas soperas de mermelada dietetica",
  "3 o mas de cucharadas soperas de dulce de leche light",
  "3 o mas de cucharadas soperas de dulce de leche clasico",
  "3 o mas cucharadas de mermelada clasica"];

const opcionesExtras = ["Frutos secos", "Semillas", "Frutas secas", "Otros"];

export const FormularioConsumoHabitos = () => {
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get('idUser');
  const idPaciente = searchParams.get('idPaciente');
  const idConsumo = searchParams.get('idConsumo');

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idConsumoHabitos, setIdConsumoHabitos] = useState(null);



  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      semana: '',
      colacionesDiarias: '',
      colacionesSemanales: '',
      bebidas: [],
      bebidasOtro: '',
      lacteos: [],
      lacteosOtro: '',
      semillas: [],
      semillasOtro: '',
      proteinas: [],
      proteinasOtro: '',
      frutas: [],
      frutasOtro: '',
      aceitesGrasas: [],
      aceitesGrasasOtro: '',
      condimentos: [],
      condimentosOtro: '',
      dulces: [],
      dulcesOtro: '',
      extras: [],
      extrasOtro: '',
      observaciones: ''
    }
  });

  

  useEffect(() => {
    const fetchHabitoExistente = async () => {
      if (!idUser || !idPaciente || !idConsumo) return;

      try {
        const { data } = await axios.get(`https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/paciente/${idPaciente}?idUsuario=${idUser}`);
        const existente = data.find((h) => Number(h.idConsumo) === Number(idConsumo));

        if (existente) {
          // Generar valores normalizados para reset
          const convertir = (valor) =>
            typeof valor === "string" ? valor.split(", ").map(v => v.trim()) : [String(valor)];

          reset({
            semana: String(existente.semana || ''),
            comidasDiarias: convertir(existente.comidasDiarias),
            comidasOtro: '',
            colacionesDiarias: convertir(existente.colacionesDiarias),
            colacionesOtro: '',
            bebidas: convertir(existente.bebidas),
            bebidasOtro: '',
            lacteos: convertir(existente.lacteos),
            lacteosOtro: '',
            cereales: convertir(existente.cereales),
            cerealesOtro: '',
            proteinas: convertir(existente.proteinas),
            proteinasOtro: '',
            semillas: convertir(existente.semillas),
            semillasOtro: '',
            frutas: convertir(existente.frutas),
            frutasOtro: '',
            aceitesGrasas: convertir(existente.aceitesGrasas),
            aceitesGrasasOtro: '',
            condimentos: convertir(existente.condimentos),
            condimentosOtro: '',
            dulces: convertir(existente.dulces),
            dulcesOtro: '',
            extras: convertir(existente.extras),
            extrasOtro: '',
            observaciones: existente.observaciones || ''
          });

          setModoEdicion(true);
          setIdConsumoHabitos(existente.idConsumoHabitos);
        }
      } catch (error) {
        console.error("❌ Error al buscar hábitos:", error);
      }
    };

    fetchHabitoExistente();
  }, [idUser, idPaciente, idConsumo, reset]);

  const concatenar = (array, otro) => {
    return [...array, otro?.trim()].filter(Boolean).join(', ');
  };

  const onSubmit = async (data) => {
    const payload = {
      idConsumo: Number(idConsumo),
      semana: Number(data.semana),
      colacionesDiarias: concatenar(data.colacionesDiarias, data.colacionesOtro),
      comidasDiarias: concatenar(data.comidasDiarias, data.comidasOtro),
      bebidas: concatenar(data.bebidas, data.bebidasOtro),
      lacteos: concatenar(data.lacteos, data.lacteosOtro),
      cereales: concatenar(data.cereales, data.cerealesOtro),
      proteinas: concatenar(data.proteinas, data.proteinasOtro),
      semillas: concatenar(data.semillas, data.semillasOtro),
      frutas: concatenar(data.frutas, data.frutasOtro),
      aceitesGrasas: concatenar(data.aceitesGrasas, data.aceitesGrasasOtro),
      condimentos: concatenar(data.condimentos, data.condimentosOtro),
      dulces: concatenar(data.dulces, data.dulcesOtro),
      extras: concatenar(data.extras, data.extrasOtro),
      observaciones: data.observaciones,
    };

    try {
      if (modoEdicion && idConsumoHabitos) {
        await axios.put(`https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos/${idConsumoHabitos}`, payload);
        Swal.fire("Actualizado", "Los hábitos fueron actualizados correctamente", "success")
          .then(() => window.history.back());
      } else {
        await axios.post("https://sintacc-api-deploy.azurewebsites.net/api/ConsumoHabitos", payload);
        Swal.fire("Guardado", "Los hábitos fueron registrados correctamente", "success")
          .then(() => window.history.back());
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar el formulario", "error");
    }
  };

  const renderCheckboxGroup = (label, name, options, otroName) => (
    <Grid item xs={12}>
      <Typography variant="subtitle1">{label}</Typography>
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            control={
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value?.includes(opt) || false}
                    onChange={(e) => {
                      const value = e.target.checked
                        ? [...(field.value || []), opt]
                        : field.value.filter((v) => v !== opt);
                      field.onChange(value);
                    }}
                  />
                )}
              />
            }
            label={opt}
          />
        ))}
        {otroName && (
          <Controller
            name={otroName}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Otro"
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          />
        )}
      </FormGroup>
    </Grid>
  );

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Formulario de Hábitos Nutricionales
        </Typography>
        {modoEdicion && (
          <Typography variant="subtitle2" color="text.secondary">
            Estás editando un registro ya existente.
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="semana"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <InputLabel>Semana</InputLabel>
                    <Select {...field} label="Semana">
                      {opcionesSemana.map((op) => (
                        <MenuItem key={op} value={op}>{`Semana ${op}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {renderCheckboxGroup("Comidas diarias", "comidasDiarias", opcionesComidas, "comidasOtro")}
            {renderCheckboxGroup("Colaciones diarias", "colacionesDiarias", opcionesColaciones, "colacionesOtro")}
            {renderCheckboxGroup("Bebidas", "bebidas", opcionesBebidas, "bebidasOtro")}
            {renderCheckboxGroup("Lácteos", "lacteos", opcionesLacteos, "lacteosOtro")}
            {renderCheckboxGroup("Cereales integrales", "cereales", opcionesCereales, "cerealesOtro")}
            {renderCheckboxGroup("Proteínas", "proteinas", opcionesProteinas, "proteinasOtro")}
            {renderCheckboxGroup("Semillas", "semillas", opcionesSemillas, "semillasOtro")}
            {renderCheckboxGroup("Frutas", "frutas", opcionesFrutas, "frutasOtro")}
            {renderCheckboxGroup("Aceites y Grasas", "aceitesGrasas", opcionesAceitesYGrasas, "aceitesGrasasOtro")}
            {renderCheckboxGroup("Condimentos", "condimentos", opcionesCondimentos, "condimentosOtro")}
            {renderCheckboxGroup("Dulces", "dulces", opcionesDulces, "dulcesOtro")}
            {renderCheckboxGroup("Extras", "extras", opcionesExtras, "extrasOtro")}


            <Grid item xs={12}>
              <Controller
                name="observaciones"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Observaciones" fullWidth multiline rows={3} />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Guardar Hábitos
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default FormularioConsumoHabitos;
