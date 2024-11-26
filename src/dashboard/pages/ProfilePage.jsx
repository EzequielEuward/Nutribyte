import { useState } from "react";
import { Typography, Box, Card, CardHeader, CardContent, Avatar, IconButton, Divider, TextField, useTheme, useMediaQuery } from "@mui/material";
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon, MailOutline, Phone, LocationOn, CalendarToday } from "@mui/icons-material";
import { DashboardLayout } from "../layout/DashboardLayout";
import { AppointmentsTable, MiniCalendar } from "../components/";

export const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "Joined January 2022",
    avatar: "/placeholder.svg?height=100&width=100",
  });

  const [appointments] = useState([
    { date: "2024-11-26", time: "10:00 AM", doctor: "Dr. Smith" },
    { date: "2024-11-28", time: "2:00 PM", doctor: "Dr. Johnson" },
    { date: "2024-12-01", time: "9:00 AM", doctor: "Dr. Lee" },
  ]);

  const [events] = useState([
    { date: "2024-11-26", title: "Consulta de seguimiento" },
    { date: "2024-11-28", title: "Revisión médica general" },
  ]);

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(userInfo);
  };

  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "left", width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left" }}>
          Ficha de Usuario
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', gap: 3 }}>
          {/* Ficha de Usuario */}
          <Card sx={{ flex: 1, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary, p: 2 }}>
            <CardHeader
              avatar={<Avatar src={userInfo.avatar} alt={userInfo.name} sx={{ width: 100, height: 100, bgcolor: theme.palette.primary.main }} />}
              title={isEditing ? <TextField name="name" value={editedInfo.name} onChange={handleChange} variant="standard" fullWidth inputProps={{ style: { fontSize: "1.5rem", fontWeight: "bold" } }} /> : <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>{userInfo.name}</Typography>}
              action={!isEditing ? (
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={handleSave} color="primary">
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel} color="error">
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            />
            <Divider sx={{ my: 2 }} />
            <CardContent>
              {isEditing ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Email" name="email" value={editedInfo.email} onChange={handleChange} variant="outlined" fullWidth />
                  <TextField label="Teléfono" name="phone" value={editedInfo.phone} onChange={handleChange} variant="outlined" fullWidth />
                  <TextField label="Ubicación" name="location" value={editedInfo.location} onChange={handleChange} variant="outlined" fullWidth />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body1">{userInfo.email}</Typography>
                  <Typography variant="body1">{userInfo.phone}</Typography>
                  <Typography variant="body1">{userInfo.location}</Typography>
                  <Typography variant="body1">{userInfo.joinDate}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Mini Calendario */}
          <Box sx={{ flex: 1 }}>
            <MiniCalendar events={events} />
          </Box>
        </Box>

        {/* Tabla de Turnos */}
        <AppointmentsTable appointments={appointments} />
      </Box>
    </DashboardLayout>
  );
};
