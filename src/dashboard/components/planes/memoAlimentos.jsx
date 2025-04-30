import { ListItem, FormControlLabel, Checkbox, ListItemText } from "@mui/material";
import { memo } from "react";

export const memoAlimentos = memo(({ alimento, checked, onToggle }) => (
  <ListItem divider disableGutters>
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => onToggle(alimento.idAlimento)}
        />
      }
      label={
        <ListItemText
          primary={alimento.nombre}
          secondary={`Carbs: ${alimento.carbohidratos}g | Prot: ${alimento.proteinas}g | Grasas: ${alimento.grasasTotales}g`}
        />
      }
    />
  </ListItem>
));

export default memoAlimentos;
