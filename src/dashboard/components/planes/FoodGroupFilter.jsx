import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const FoodGroupFilter = ({ grupos, grupoSeleccionado, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
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
