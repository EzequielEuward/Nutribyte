import { Drawer, Box, Typography, IconButton, List, ListItem, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import {
  LocalDining as FoodIcon,
  Whatshot as CaloriesIcon,
  FitnessCenter as ProteinIcon,
  Grain as CarbsIcon,
  Cake as SugarIcon,
  Fastfood as FatIcon,
  Spa as UnsaturatedFatIcon,
  FiberManualRecord as FiberIcon,
  BatteryAlert as SodiumIcon,
} from "@mui/icons-material";

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 350,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px 0 0 16px",
    overflow: "hidden",
  },
});

const StyledBox = styled(Box)({
  backgroundColor: "#f4f6f9",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "24px",
});

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

const StyledListItem = styled(ListItem)({
  padding: "8px 0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const FoodDrawer = ({ open, onClose, data }) => {
  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
      <StyledBox>
        <Header>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {data.nombre}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Header>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ flex: 1, overflowY: "auto" }}>
          <StyledListItem>
            <FoodIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Grupo Alimenticio:</strong> {data.grupoAlimenticio}
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <CaloriesIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Calorías:</strong> {data.calorias} kcal
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <ProteinIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Proteínas:</strong> {data.proteinas} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <CarbsIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Carbohidratos:</strong> {data.carbohidratos} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <SugarIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Azúcares:</strong> {data.azucares} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <FatIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Grasas Totales:</strong> {data.grasasTotales} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <UnsaturatedFatIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Grasas Insaturadas:</strong> {data.grasasInsaturadas} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <FiberIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Fibra Dietética:</strong> {data.fibraDietetica} g
            </Typography>
          </StyledListItem>
          <StyledListItem>
            <SodiumIcon color="primary" />
            <Typography variant="body1" color="text.primary">
              <strong>Sodio:</strong> {data.sodio} mg
            </Typography>
          </StyledListItem>
        </List>
      </StyledBox>
    </StyledDrawer>
  );
};

export default FoodDrawer;