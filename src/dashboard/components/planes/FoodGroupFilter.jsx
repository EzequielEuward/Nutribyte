import { useTheme } from "@emotion/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const FoodGroupFilter = ({ grupos, grupoSeleccionado, onChange }) => {
  const theme = useTheme();

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        mb: 2,
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.custom.terteary, // cambia color del label en focus
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.custom.terteary, // cambia el borde
        },
      }}
    >
      <InputLabel>Grupo Alimenticio</InputLabel>
      <Select
        value={grupoSeleccionado}
        onChange={(e) => onChange(e.target.value)}
        label="Grupo Alimenticio"
      >
        <MenuItem value="">Todos</MenuItem>
        {grupos.map((grupo) => (
          <MenuItem key={grupo} value={grupo}>
            {grupo}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FoodGroupFilter;
