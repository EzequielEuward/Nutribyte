// MealPlanTabs.jsx
import { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
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

// Estado inicial para cada comida (tabs)
const initialMealState = {
  desayuno: [
    { id: 1, nombre: "Alimento ejemplo 1", carbs: 30, protein: 10, fats: 5, cantidad: 100 },
  ],
  almuerzo: [
    { id: 2, nombre: "Alimento ejemplo 2", carbs: 20, protein: 5, fats: 2, cantidad: 50 },
  ],
  merienda: [],
  cena: [],
  snacks: [],
};

export const MealPlanTabs = () => {
  const [selectedTab, setSelectedTab] = useState("desayuno");
  const [meals, setMeals] = useState(initialMealState);
  const [openModal, setOpenModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Maneja el cambio de cantidad en la tabla
  const handleQuantityChange = (mealKey, id, newQuantity) => {
    setMeals((prev) => {
      const updatedMeals = { ...prev };
      updatedMeals[mealKey] = updatedMeals[mealKey].map((item) =>
        item.id === id
          ? { ...item, cantidad: parseInt(newQuantity || 0, 10) }
          : item
      );
      return updatedMeals;
    });
  };

  // Maneja la eliminación de un alimento en la tabla
  const handleRemoveFood = (mealKey, id) => {
    setMeals((prev) => {
      const updatedMeals = { ...prev };
      updatedMeals[mealKey] = updatedMeals[mealKey].filter((item) => item.id !== id);
      return updatedMeals;
    });
  };

  // Agrega el alimento obtenido desde el modal a la pestaña actual
  const handleAddFoodFromModal = (food) => {
    setMeals((prev) => {
      const updatedMeals = { ...prev };
      updatedMeals[selectedTab] = [
        ...updatedMeals[selectedTab],
        {
          ...food,
          // Puedes generar un id único o usar el id del alimento seleccionado
          id: Date.now(), 
        },
      ];
      return updatedMeals;
    });
    // Cierra el modal
    setOpenModal(false);
  };

  // Abre el modal en lugar de agregar un alimento "dummy"
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Paper elevation={1}>
      {/* Tabs para seleccionar la comida */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Desayuno" value="desayuno" />
        <Tab label="Almuerzo" value="almuerzo" />
        <Tab label="Merienda" value="merienda" />
        <Tab label="Cena" value="cena" />
        <Tab label="Snacks" value="snacks" />
      </Tabs>

      {/* Contenido de la pestaña seleccionada */}
      <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Alimento</TableCell>
                <TableCell>Carbs (g)</TableCell>
                <TableCell>Proteína (g)</TableCell>
                <TableCell>Grasas (g)</TableCell>
                <TableCell>Cantidad (g)</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meals[selectedTab].map((food) => (
                <TableRow key={food.id}>
                  <TableCell>{food.nombre}</TableCell>
                  <TableCell>{food.carbs}</TableCell>
                  <TableCell>{food.protein}</TableCell>
                  <TableCell>{food.fats}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={food.cantidad}
                      onChange={(e) =>
                        handleQuantityChange(selectedTab, food.id, e.target.value)
                      }
                      variant="outlined"
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveFood(selectedTab, food.id)}
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
