import { useTheme } from "@emotion/react"
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material"
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export const PatientCard = ({patients}) => {

    const theme =useTheme()
  return (
    <>
       {/* Sección de métricas */}
       <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          {/* Tarjeta: Turnos de Hoy */}
          <Card
            sx={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "200px",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.contrastText, color: theme.palette.primary.main }}>
                <EventIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Turnos de Hoy</Typography>
                <Typography variant="h4">0</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Tarjeta: Total Pacientes */}
          <Card
            sx={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "200px",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar sx={{ bgcolor: theme.palette.secondary.contrastText, color: theme.palette.secondary.main }}>
                <PeopleIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Total Pacientes</Typography>
                <Typography variant="h4">{patients.length}</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Tarjeta: Turnos Pendientes */}
          <Card
            sx={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "200px",
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar sx={{ bgcolor: theme.palette.error.contrastText, color: theme.palette.error.main }}>
                <PendingActionsIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Turnos Pendientes</Typography>
                <Typography variant="h4">0</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
    </>
  )
}

export default PatientCard;
