import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AddCircle, ListAlt, Description, Chat } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export const QuickAccess = ({onRecordatorio}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const quickAccessItems = [
    { icon: AddCircle, label: "Registro de paciente", tooltip: "Ir a crear una consulta", color: theme.palette.appointmentTypes.firstConsult, route: "/home/paciente", },
    { icon: ListAlt, label: "Plan Nutricional", tooltip: "Ir a crear un plan nutricional", color: theme.palette.appointmentTypes.followUp, route: "/home/planes", },
    { icon: Description, label: "Reportes", tooltip: "Ir a reportes", color: theme.palette.appointmentTypes.control, route: "/home/reportes", },
    { icon: Chat, label: "Enviar Recordatorio", tooltip: "Enviar recordatorio por email", color: theme.palette.appointmentTypes.reminder, onClick: () => onRecordatorio() }

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
              <Tooltip title={item.tooltip} arrow>
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
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick(); // ejecuta onRecordatorio
                    } else if (item.route) {
                      navigate(item.route);
                    }
                  }}
                >
                  <IconButton
                    sx={{
                      color: item.color.text,
                      fontSize: "32px",
                      mb: 1,
                      pointerEvents: "none", // evita que se separe el hover entre icono y tooltip
                    }}
                  >
                    <item.icon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
