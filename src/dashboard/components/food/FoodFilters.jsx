import { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Box,
  Collapse,
  Tooltip,
  Slider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import debounce from "lodash.debounce";

export const FoodFilters = ({ onFilterChange, gruposDisponibles = [] }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [calorias, setCalorias] = useState([0, 1000]);
  const [proteinas, setProteinas] = useState([0, 1000]);
  const [carbohidratos, setCarbohidratos] = useState([0, 1000]);
  const [azucares, setAzucares] = useState([0, 1000]);
  const [grasasTotales, setGrasasTotales] = useState([0, 1000]);
  const [grasasSaturadas, setGrasasSaturadas] = useState([0, 1000]);
  const [grasasInsaturadas, setGrasasInsaturadas] = useState([0, 1000]);
  const [fibraDietetica, setFibraDietetica] = useState([0, 1000]);
  const [sodio, setSodio] = useState([0, 1000]);

const [advancedOpen, setAdvancedOpen] = useState(false);

  const debouncedNombreChange = useMemo(
    () =>
      debounce((value) => {
        onFilterChange((prev) => ({ ...prev, nombre: value }));
      }, 300),
    [onFilterChange]
  );

  useEffect(() => () => debouncedNombreChange.cancel(), [debouncedNombreChange]);

  const handleApplyFilters = () => {
    onFilterChange({
      nombre,
      grupo,
      calorias,
      proteinas,
      carbohidratos,
      azucares,
      grasasTotales,
      grasasSaturadas,
      grasasInsaturadas,
      fibraDietetica,
      sodio,
    });
  };

  const renderRangeFilter = (label, value, setValue, min, max) => (
    <Grid item xs={12} sm={6} md={4}>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        valueLabelDisplay="auto"
        min={min}
        max={Math.min(max, 10000)}
        sx={{
          "& .MuiSlider-thumb": {
            color: theme.palette.primary.button,
          },
          "& .MuiSlider-track": {
            color: theme.palette.secondary.button,
          },
          "& .MuiSlider-rail": {
            color: theme.palette.grey[300],
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 1,
          flexDirection: isSmall ? "column" : "row", // vertical en móvil para no apretar inputs
        }}
      >
        <TextField
          label="Min"
          type="number"
          value={value[0]}
          onChange={(e) => {
            const val = Math.max(min, Math.min(10000, +e.target.value || 0));
            setValue([val, value[1]]);
          }}
          inputProps={{
            min,
            max: 10000,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Max"
          type="number"
          value={value[1]}
          onChange={(e) => {
            const val = Math.max(min, Math.min(10000, +e.target.value || 0));
            setValue([value[0], val]);
          }}
          inputProps={{
            min,
            max: 10000,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Nombre */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              debouncedNombreChange(e.target.value);
            }}
            variant="outlined"
          />
        </Grid>

        {/* Grupo Alimenticio */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            fullWidth
            label="Grupo Alimenticio"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="">Todos</MenuItem>
            {gruposDisponibles.map((g, idx) => (
              <MenuItem key={idx} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Botones */}
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            textAlign: isSmall ? "center" : "right",
            display: "flex",
            justifyContent: isSmall ? "center" : "flex-end",
            alignItems: "center",
            gap: 1,
            mt: isSmall ? 2 : 0,
          }}
        >
          <Tooltip title="Aplicar filtros avanzados">
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette.secondary.button }}
              onClick={handleApplyFilters}
              size={isSmall ? "small" : "medium"}
            >
              Aplicar filtros
            </Button>
          </Tooltip>

          <Tooltip title="Mostrar/Ocultar filtros avanzados">
            <IconButton onClick={() => setAdvancedOpen(!advancedOpen)}>
              {advancedOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {/* Filtros avanzados */}
      <Collapse in={advancedOpen}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3} sx={{ padding: isSmall ? 1 : 2 }}>
            {renderRangeFilter("Calorías", calorias, setCalorias, 0, 1000)}
            {renderRangeFilter("Proteínas (g)", proteinas, setProteinas, 0, 50)}
            {renderRangeFilter("Carbohidratos (g)", carbohidratos, setCarbohidratos, 0, 100)}
            {renderRangeFilter("Azúcares (g)", azucares, setAzucares, 0, 100)}
            {renderRangeFilter("Grasas Totales (g)", grasasTotales, setGrasasTotales, 0, 50)}
            {renderRangeFilter("Grasas Saturadas (g)", grasasSaturadas, setGrasasSaturadas, 0, 20)}
            {renderRangeFilter("Grasas Insaturadas (g)", grasasInsaturadas, setGrasasInsaturadas, 0, 50)}
            {renderRangeFilter("Fibra Dietética (g)", fibraDietetica, setFibraDietetica, 0, 50)}
            {renderRangeFilter("Sodio (mg)", sodio, setSodio, 0, 2000)}
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FoodFilters;
