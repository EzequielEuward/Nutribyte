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
  Tooltip,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FoodSearchModal from "./FoodSearchModal";


export const MealPlanTabs = ({ alimentos, setAlimentos, alimentosSugeridos }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const handleAddSelectedFoods = (seleccionadosFinales) => {
    const existentesIds = new Set(alimentos.map(a => a.idAlimento));
    const nuevosSinDuplicados = seleccionadosFinales
      .filter(a => !existentesIds.has(a.idAlimento))
      .map(a => ({ ...a, gramos: 100 })); // 👈 Fijamos los gramos

    setAlimentos(prev => [...prev, ...nuevosSinDuplicados]);
  };

  const handleRemoveFood = (idAlimento) => {
    setAlimentos(alimentos.filter(item => item.idAlimento !== idAlimento));
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
                    <Tooltip title="Eliminar alimento" arrow>
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => handleRemoveFood(food.idAlimento)}
                      >
                        <RemoveIcon />
                      </Button>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{ mt: 2 , color: theme.palette.text.primary, borderColor: theme.palette.primary.main,  '&:hover': {
                  backgroundColor: theme.palette.secondary.main
                } }}
        >
          Agregar alimento
        </Button>
      </Box>

      <FoodSearchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirmSelection={handleAddSelectedFoods}
      />
    </Paper>
  );
};

export default MealPlanTabs;
