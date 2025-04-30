import { TableRow, TableCell, TextField, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

export const FoodItem = ({ food, onQuantityChange, onRemove }) => {
  const handleChange = (e) => {
    onQuantityChange(food.id, e.target.value);
  };

  return (
    <TableRow>
      <TableCell>{food.nombre}</TableCell>
      <TableCell>{food.carbs}</TableCell>
      <TableCell>{food.protein}</TableCell>
      <TableCell>{food.fats}</TableCell>
      <TableCell>
        <TextField
          type="number"
          value={food.cantidad}
          onChange={handleChange}
          variant="outlined"
          size="small"
          sx={{ width: 80 }}
        />
      </TableCell>
      <TableCell>
        <Button variant="text" color="error" onClick={() => onRemove(food.id)}>
          <RemoveIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FoodItem;
