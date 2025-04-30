import { ListItem, ListItemText, Checkbox } from "@mui/material";
import { memo } from "react";

const FoodRow = ({ food, checked, onToggle }) => (
  <ListItem
    divider
    secondaryAction={
      <Checkbox checked={checked} onChange={() => onToggle(food.idAlimento)} />
    }
  >
    <ListItemText
      primary={food.nombre}
      secondary={`Carbs: ${food.carbohidratos}g | Proteína: ${food.proteinas}g | Grasas: ${food.grasasTotales}g`}
    />
  </ListItem>
);

export default memo(FoodRow);
