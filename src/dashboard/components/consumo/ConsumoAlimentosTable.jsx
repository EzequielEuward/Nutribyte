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
  Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FoodSearchModal from "../planes/FoodSearchModal";
import { useTheme } from "@emotion/react";

export const ConsumoAlimentosTable = ({ alimentos, setAlimentos }) => {

  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);

  const handleAddSelectedFoods = (seleccionadosFinales) => {
    const existentesIds = new Set(alimentos.map((a) => a.idAlimento));
    const nuevos = seleccionadosFinales
      .filter((a) => !existentesIds.has(a.idAlimento))
      .map((a) => ({ ...a, gramos: 0 }));

    setAlimentos((prev) => [...prev, ...nuevos]);
  };

  const handleRemoveFood = (id) => {
    setAlimentos(alimentos.filter((a) => a.idAlimento !== id));
  };

  const handleGramosChange = (id, value) => {
    setAlimentos((prev) =>
      prev.map((a) =>
        a.idAlimento === id ? { ...a, gramos: parseFloat(value) || 0 } : a
      )
    );
  };

  return (
    <Paper elevation={1}>
      <Box sx={{ p: 2 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Alimento</TableCell>
                <TableCell>Gramos</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alimentos.map((a) => (
                <TableRow key={a.idAlimento}>
                  <TableCell>{a.nombre}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={a.gramos}
                      onChange={(e) => handleGramosChange(a.idAlimento, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Sacar alimento de la lista" arrow>
                      <Button
                        color="error"
                        variant="text"
                        onClick={() => handleRemoveFood(a.idAlimento)}
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
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ mt: 2, color: theme.palette.text.tertiary, backgroundColor: theme.palette.primary.main }}
        >
          Agregar alimento
        </Button>

        <FoodSearchModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConfirmSelection={handleAddSelectedFoods}
        />
      </Box>
    </Paper>
  );
};

export default ConsumoAlimentosTable;
