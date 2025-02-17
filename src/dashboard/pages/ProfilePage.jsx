
import { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { EditProfileForm } from '../components/profile/EditProfileForm';
import { DashboardLayout } from '../layout/DashboardLayout';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { username, rol, persona, matricula, especialidad } = useSelector((state) => state.auth || {}); 
  
  const { nombre, apellido, email, telefono, sexoBiologico } = persona || {};



  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 4 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardHeader
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            title={
              <Typography variant="h5" sx={{ fontSize: '2rem' }}>
                Perfil del Nutricionista
              </Typography>
            }
            subheader={<Typography sx={{ fontSize: '0.875rem', color: '#6c757d' }}>Detalles del profesional</Typography>}
            action={
              <Button onClick={() => setIsOpen(true)} variant="outlined" sx={{ minWidth: 'auto' }}>
                <EditIcon sx={{ fontSize: '1.5rem' }} />
              </Button>
            }
          />
          <CardContent>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Avatar sx={{ width: 128, height: 128 }}>
                  <img src="/placeholder.svg" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Usuario:</Typography>
                    <Typography variant="body1">{username || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Nombre</Typography>
                    <Typography variant="body1">{nombre || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Apellido</Typography>
                    <Typography variant="body1">{apellido || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Email</Typography>
                    <Typography variant="body1">{email || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>rol</Typography>
                    <Typography variant="body1">{rol || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Teléfono</Typography>
                    <Typography variant="body1">{telefono || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Sexo Biológico</Typography>
                    <Typography variant="body1">{sexoBiologico ? (sexoBiologico === "m" ? "Masculino" : "Femenino") : "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Matrícula Profesional</Typography>
                    <Typography variant="body1">{matricula || "No disponible"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Especialidad</Typography>
                    <Typography variant="body1">{especialidad || "No disponible"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ borderTop: '1px solid #ddd', pt: 2, mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                Último ingreso: 29/12/2024 08:12:22
              </Typography>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                Fecha de creación: 26/06/2016 10:06:58
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <EditProfileForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProfilePage;
