import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { AddCircle, ListAlt, Description, Chat } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom"; 

export const QuickAccess = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 
  
  const quickAccessItems = [
    { icon: AddCircle, label: "Nueva Cita", color: theme.palette.appointmentTypes.firstConsult, route: "/home/paciente/" }, // Agregar ruta
    { icon: ListAlt, label: "Plan Nutricional", color: theme.palette.appointmentTypes.followUp, route: "/home/planes" }, // Agregar ruta
    { icon: Description, label: "Generar Informe", color: theme.palette.appointmentTypes.control, route: "/generar-informe" }, // Agregar ruta
    { icon: Chat, label: "Enviar Recordatorio", color: theme.palette.appointmentTypes.reminder, route: "/home/turnos" }, // Agregar ruta
  ];

  return (
    <Card variant="outlined" sx={{ marginTop: 2 }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Accesos Rápidos
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {quickAccessItems.map((item) => (
            <Grid item xs={6} sm={3} key={item.label}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: item.color.background,
                  color: item.color.text,
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: item.color.background,
                    opacity: 0.8,
                  },
                }}
                onClick={() => navigate(item.route)} 
              >
                <IconButton sx={{ color: item.color.text, fontSize: "32px", mb: 1 }}>
                  <item.icon />
                </IconButton>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
