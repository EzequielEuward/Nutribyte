import { useState } from "react";
import {
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FoodSearchModal from "./FoodSearchModal";

export const MealPlanTabs = ({ alimentos, setAlimentos }) => {
  const [openModal, setOpenModal] = useState(false);

  // Función para cambiar la cantidad de un alimento
  const handleQuantityChange = (idAlimento, newQuantity) => {
    let gramos = parseInt(newQuantity || 0, 10);
    // Validar entre 1 y 10000
    gramos = Math.min(Math.max(gramos, 1), 10000);

    setAlimentos(alimentos.map(item =>
      item.idAlimento === idAlimento ? { ...item, gramos } : item
    ));
  };

  // Función para quitar un alimento de la lista
  const handleRemoveFood = (idAlimento) => {
    setAlimentos(alimentos.filter(item => item.idAlimento !== idAlimento));
  };

  const handleAddFoodFromModal = (food) => {
    const nuevoAlimento = {
      idAlimento: food.idAlimento || food.id, 
      nombre: food.nombre,
      carbohidratos: food.carbohidratos,
      proteinas: food.proteinas,
      grasasTotales: food.grasasTotales,
      grupoAlimenticio: food.grupoAlimenticio,
      calorias: food.calorias,
      gramos: food.gramos,
    };
    
    
    

    setAlimentos([...alimentos, nuevoAlimento]);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Paper elevation={1}>
      <Box sx={{ p: 2 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Alimento</TableCell>
                <TableCell>Carbs (g)</TableCell>
                <TableCell>Proteína (g)</TableCell>
                <TableCell>Grasas Totales (g)</TableCell>
                <TableCell>Cantidad (g)</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alimentos.map((food) => (
                <TableRow key={food.idAlimento}>
                  <TableCell>{food.nombre}</TableCell>
                  <TableCell>{food.carbohidratos}</TableCell>
                  <TableCell>{food.proteinas}</TableCell>
                  <TableCell>{food.grasasTotales}</TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={food.gramos}
                      onChange={(e) => handleQuantityChange(food.idAlimento, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveFood(food.idAlimento)}

                    >
                      <RemoveIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{ mt: 2 }}
        >
          Agregar alimento
        </Button>
      </Box>

      {/* Modal para buscar y seleccionar alimentos */}
      <FoodSearchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelectFood={handleAddFoodFromModal}
      />
    </Paper>
  );
};

export default MealPlanTabs;
