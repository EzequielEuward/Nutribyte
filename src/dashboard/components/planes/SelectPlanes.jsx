import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const SelectPlanes = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: { xs: "flex-start", md: "flex-start" },
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          minWidth: { xs: "100%", sm: "250px" },
          maxWidth: "300px",
        }}
      >
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel
            sx={{
              color: theme.palette.text.primary,
              '&.Mui-focused': {
                color: theme.palette.text.secondary,
              },
            }}
          >
            Seleccionar plan
          </InputLabel>
          <Select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            label="Seleccionar plan"
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.custom.primary,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '& .MuiSvgIcon-root': {
                color: theme.palette.text.primary,
              },
            }}
          >
            <MenuItem value={10}>Hiper Calórico</MenuItem>
            <MenuItem value={20}>Alto Calórico</MenuItem>
            <MenuItem value={30}>Hiper Proteico</MenuItem>
            <MenuItem value={40}>Vegetariano</MenuItem>
            <MenuItem value={50}>Vegano</MenuItem>
            <MenuItem value={60}>Sin T.A.C.C</MenuItem>
            <MenuItem value={70}>Normo Calórico</MenuItem>
            <MenuItem value={80}>Cardio Protector</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SelectPlanes;
