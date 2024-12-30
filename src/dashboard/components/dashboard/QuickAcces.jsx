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

const quickAccessItems = [
  { icon: AddCircle, label: "Nueva Cita", color: { backgroundColor: "#E3F2FD", color: "#1E88E5" } }, // Blue
  { icon: ListAlt, label: "Plan Nutricional", color: { backgroundColor: "#E8F5E9", color: "#43A047" } }, // Green
  { icon: Description, label: "Generar Informe", color: { backgroundColor: "#F3E5F5", color: "#8E24AA" } }, // Purple
  { icon: Chat, label: "Enviar Recordatorio", color: { backgroundColor: "#FFF8E1", color: "#F9A825" } }, // Yellow
];

export const QuickAccess = () => {
  return (
    <Card variant="outlined" sx={{marginTop:2}}>
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
                  ...item.color,
                  height: "100px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: item.color.backgroundColor,
                    opacity: 0.8,
                  },
                }}
              >
                <IconButton sx={{ color: item.color.color, fontSize: "32px", mb: 1 }}>
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
}

export default QuickAccess;