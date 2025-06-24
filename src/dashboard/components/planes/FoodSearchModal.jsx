import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
  Box, CircularProgress, Alert, Checkbox, Typography, Divider, Paper,
  Tooltip
} from "@mui/material";
import { obtenerAlimentos } from "../../../store/plans";
import { FixedSizeList as VirtualList } from "react-window";
import { FoodGroupFilter } from './';
import { useTheme } from "@emotion/react";

export const FoodSearchModal = ({
  open,
  onClose,
  onConfirmSelection,
  alimentosSugeridos = []
}) => {
  const dispatch = useDispatch();
  const [grupoFiltro, setGrupoFiltro] = useState("");
  const [searchText, setSearchText] = useState("");
  const [seleccionados, setSeleccionados] = useState({});
  const { alimentos, isLoadingAlimentos, errorAlimentos } = useSelector((state) => state.plan);
  const theme = useTheme();
  useEffect(() => {
    if (open) {
      dispatch(obtenerAlimentos());
      setSearchText("");
      setSeleccionados({});
    }
  }, [open]);

  const handleToggle = (id) => {
    setSeleccionados((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const colorPorGrupo = {
    Frutas: "#1f77b4",
    Verduras: "#ff7f0e",
    Cereales: "#2ca02c",
    Legumbres: "#d62728",
    Lácteos: "#9467bd",
    Carnes: "#8c564b",
    Huevos: "#e377c2",
    Grasas: "#7f7f7f",
    Azúcares: "#bcbd22",
    Otros: "#17becf"
  };

  const filteredFoods = useMemo(() => {
    return alimentos.filter(food =>
      food.nombre.toLowerCase().includes(searchText.toLowerCase()) &&
      (grupoFiltro === "" || food.grupoAlimenticio === grupoFiltro)
    );
  }, [alimentos, searchText, grupoFiltro]);

  const seleccionadosFinales = useMemo(() => {
    const todos = [...alimentosSugeridos, ...filteredFoods];
    const unicos = todos.filter((a, i, self) =>
      seleccionados[a.idAlimento] &&
      i === self.findIndex(f => f.idAlimento === a.idAlimento)
    );
    return unicos.map(a => ({ ...a, gramos: 100 }));
  }, [seleccionados, alimentosSugeridos, filteredFoods]);


  const Row = ({ index, style }) => {
    const food = filteredFoods[index];
    const isEven = index % 2 === 0;
    return (
      <Box
        style={style}
        display="flex"
        justifyContent="space-between"
        px={2}
        py={1.5}
        alignItems="center"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: isEven
            ? theme.palette.mode === 'light'
              ? "#fafafa"
              : "#2a2a2a"
            : theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Box>
          <Typography fontWeight={600} color="text.primary">
            {food.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Carbs: {food.carbohidratos}g | Proteínas: {food.proteinas}g | Grasas: {food.grasasTotales}g
          </Typography>
        </Box>
        <Tooltip title="Agregar alimento" arrow>
          <Checkbox
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              '&.Mui-checked': {
                color: theme.palette.success.main,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            checked={!!seleccionados[food.idAlimento]}
            onChange={() => handleToggle(food.idAlimento)}
          />
        </Tooltip>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pb: 0, fontWeight: 'bold', color: theme.palette.text.primary, }}>Buscar o seleccionar alimento</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <FoodGroupFilter
            grupos={[...new Set(alimentos.map(a => a.grupoAlimenticio))]}
            grupoSeleccionado={grupoFiltro}
            onChange={setGrupoFiltro}
          />
          <TextField
            label="Buscar alimento por nombre"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              mt: 2,
              '& label.Mui-focused': {
                color: theme.palette.text.primary, // o theme.palette.primary.main
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.text.primary, // o theme.palette.primary.main
                },
              },
            }}
            inputProps={{ maxLength: 60 }}
          />
        </Box>

        {alimentosSugeridos.length > 0 && (
          <Box mb={4} sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Alimentos sugeridos por tipo de plan
            </Typography>
            <Paper variant="outlined">
              {alimentosSugeridos.map((food) => (
                <Box
                  key={food.idAlimento}
                  display="flex"
                  justifyContent="space-between"
                  px={2} py={1}
                  sx={{ borderBottom: "1px solid #eee" }}
                >
                  <Box>
                    <Typography fontWeight={500} color="text.primary">{food.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Carbs: {food.carbohidratos}g | Proteínas: {food.proteinas}g | Grasas: {food.grasasTotales}g
                    </Typography>
                  </Box>
                  <Checkbox
                    checked={!!seleccionados[food.idAlimento]}
                    onChange={() => handleToggle(food.idAlimento)}
                  />
                </Box>
              ))}
            </Paper>
            <Divider sx={{ my: 3 }} />
          </Box>
        )}

        {errorAlimentos && <Alert severity="error">{errorAlimentos}</Alert>}
        {isLoadingAlimentos ? (
          <Box textAlign="center" py={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper
            variant="outlined"
            sx={{
              height: 300,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: 8,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme.palette.mode === "light" ? "#f0f0f0" : "#2c2c2c",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.mode === "light" ? "#bbb" : "#666",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: theme.palette.mode === "light" ? "#999" : "#888",
              },
              scrollbarWidth: "thin", // Firefox
              scrollbarColor:
                theme.palette.mode === "light"
                  ? "#bbb #f0f0f0"
                  : "#666 #2c2c2c",
            }}
          >
            <VirtualList
              height={300}
              itemCount={filteredFoods.length}
              itemSize={72}
              width="100%"
            >
              {Row}
            </VirtualList>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Tooltip title="Selecciona los alimentos que deseas agregar" arrow>
        <Button onClick={onClose} variant="contained" color="error">
          Cancelar
        </Button>
        </Tooltip>
        <Tooltip title="Agrega los alimentos seleccionados al plan" arrow>
        <Button
          variant="contained"
          onClick={() => {
            onConfirmSelection(seleccionadosFinales);
            setSeleccionados({});
            onClose();
          }}
          sx={{
            backgroundColor: theme.palette.secondary.button,
            '&:hover': { backgroundColor: theme.palette.primary.button },
            color: theme.palette.text.buscar,
          }}
        >
          Agregar seleccionados
        </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default FoodSearchModal;
