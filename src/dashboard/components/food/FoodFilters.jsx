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
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import debounce from "lodash.debounce";

export const FoodFilters = ({ onFilterChange }) => {
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [calorias, setCalorias] = useState([0, 500]);
  const [proteinas, setProteinas] = useState([0, 50]);
  const [carbohidratos, setCarbohidratos] = useState([0, 100]);
  const [azucares, setAzucares] = useState([0, 100]);
  const [grasasTotales, setGrasasTotales] = useState([0, 50]);
  const [grasasSaturadas, setGrasasSaturadas] = useState([0, 20]);
  const [grasasInsaturadas, setGrasasInsaturadas] = useState([0, 50]);
  const [fibraDietetica, setFibraDietetica] = useState([0, 50]);
  const [sodio, setSodio] = useState([0, 2000]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // ✅ Debounce para nombre
  const debouncedNombreChange = useMemo(
    () =>
      debounce((value) => {
        onFilterChange((prev) => ({ ...prev, nombre: value }));
      }, 300),
    [onFilterChange]
  );

  useEffect(() => {
    return () => debouncedNombreChange.cancel();
  }, [debouncedNombreChange]);

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
        max={max}
      />
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          label="Min"
          type="number"
          value={value[0]}
          onChange={(e) => {
            const newMin = Number(e.target.value);
            setValue([newMin, value[1]]);
          }}
          inputProps={{ min, max }}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Max"
          type="number"
          value={value[1]}
          onChange={(e) => {
            const newMax = Number(e.target.value);
            setValue([value[0], newMax]);
          }}
          inputProps={{ min, max }}
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => {
              const value = e.target.value;
              setNombre(value);
              debouncedNombreChange(value);
            }}
            variant="outlined"
          />
        </Grid>
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
            <MenuItem value="Frutas">Frutas</MenuItem>
            <MenuItem value="Vegetales">Vegetales</MenuItem>
            <MenuItem value="Proteínas">Proteínas</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ textAlign: "right" }}>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
            <Tooltip title="Aplicar filtros avanzados">
              <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                Aplicar filtros
              </Button>
            </Tooltip>
            <Tooltip title="Mostrar/Ocultar filtros avanzados">
              <IconButton onClick={() => setAdvancedOpen(!advancedOpen)}>
                {advancedOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      <Collapse in={advancedOpen}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {renderRangeFilter("Calorías", calorias, setCalorias, 0, 500)}
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
