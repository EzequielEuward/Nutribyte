import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import { obtenerAlimentos } from "../../../../store/plans/"; 

export const FoodSearchModal = ({ open, onClose, onSelectFood }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { alimentos, isLoadingAlimentos, errorAlimentos } = useSelector((state) => state.plan);

  // Cargar alimentos cuando se abre el modal
  useEffect(() => {
    if (open) {
      dispatch(obtenerAlimentos());
    }
  }, [open, dispatch]);

  // Filtra los alimentos en base al texto ingresado
  const filteredFoods = alimentos.filter((food) =>
    food.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Mapear los campos de la API a la estructura esperada
  const handleSelectFood = (food) => {
    const mappedFood = {
      id: food.idAlimento,
      nombre: food.nombre,
      carbs: food.carbohidratos,
      protein: food.proteinas,
      fats: food.grasasTotales,
      cantidad: 100 // Valor por defecto
    };
    onSelectFood(mappedFood);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Buscar Alimento</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Buscar alimento"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Box>

        {errorAlimentos && (
          <Alert severity="error" sx={{ my: 2 }}>
            {errorAlimentos}
          </Alert>
        )}

        {isLoadingAlimentos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ maxHeight: 300, overflowY: "auto" }}>
            {filteredFoods.map((food) => (
              <ListItem
                key={food.idAlimento}
                button
                onClick={() => handleSelectFood(food)}
                divider
              >
                <ListItemText
                  primary={food.nombre}
                  secondary={`Carbs: ${food.carbohidratos}g | Proteína: ${food.proteinas}g | Grasas: ${food.grasasTotales}g`}
                />
              </ListItem>
            ))}
            {filteredFoods.length === 0 && !isLoadingAlimentos && (
              <ListItem>
                <ListItemText primary="No se encontraron alimentos" />
              </ListItem>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodSearchModal;