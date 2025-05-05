import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { EditProfileForm } from '../components/profile/EditProfileForm';
import { DashboardLayout } from '../layout/DashboardLayout';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const ProfilePage = () => {
  const { username, rol, persona, matricula, especialidad } = useSelector((state) => state.auth || {});
  const { nombre, apellido, email, telefono, sexoBiologico } = persona || {};

  const [isOpen, setIsOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [avatarOptionsOpen, setAvatarOptionsOpen] = useState(false);
  const [ultimaSesion, setUltimaSesion] = useState(null);

useEffect(() => {
  const savedDate = localStorage.getItem("ultimaSesion");
  if (savedDate) setUltimaSesion(savedDate);
}, [persona]);



  const getDefaultAvatar = (sexo) => {
    if (sexo === 'M') return '/avatares/male.png';
    if (sexo === 'F') return '/avatares/female.png';
    return '/avatares/default.png';
  };

  const getAvatarFromLocalStorage = () => {
    return localStorage.getItem('avatarSeleccionado') || getDefaultAvatar(sexoBiologico);
  };

  const handleAvatarChange = (src) => {
    localStorage.setItem('avatarSeleccionado', src);
    setAvatarSrc(src);
    setAvatarOptionsOpen(false);
    Swal.fire("Avatar actualizado", "Tu avatar ha sido modificado correctamente.", "success");

  };

  useEffect(() => {
    setAvatarSrc(getAvatarFromLocalStorage());
  }, [sexoBiologico]);

  const avatarChoices = () => {
    if (sexoBiologico === 'M') return ['/avatares/male.png', '/avatares/male2.png'];
    if (sexoBiologico === 'F') return ['/avatares/female.png', '/avatares/female2.png'];
    return ['/avatares/default.png', '/avatares/default2.png'];
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 4 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardHeader
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            title={<Typography variant="h5" sx={{ fontSize: '2rem' }}>Perfil del Nutricionista</Typography>}
            subheader={<Typography sx={{ fontSize: '0.875rem', color: '#6c757d' }}>Detalles del profesional</Typography>}
          // action={
          //   <Button onClick={() => setIsOpen(true)} variant="outlined" sx={{ minWidth: 'auto' }}>
          //     <EditIcon sx={{ fontSize: '1.5rem' }} />
          //   </Button>
          // }
          />
          <CardContent>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 128, height: 128, mb: 1 }}>
                  <img src={avatarSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Avatar>
                <Button size="small" onClick={() => setAvatarOptionsOpen(true)}>Cambiar Avatar</Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Usuario:</Typography><Typography variant="body1">{username || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Nombre</Typography><Typography variant="body1">{nombre || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Apellido</Typography><Typography variant="body1">{apellido || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Email</Typography><Typography variant="body1">{email || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>rol</Typography><Typography variant="body1">{rol || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Teléfono</Typography><Typography variant="body1">{telefono || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body1">
                    {sexoBiologico === "M" ? "Masculino" : sexoBiologico === "F" ? "Femenino" : "No disponible"}
                  </Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Matrícula Profesional</Typography><Typography variant="body1">{matricula || "No disponible"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography variant="body2" sx={{ fontWeight: 500, color: '#6c757d' }}>Especialidad</Typography><Typography variant="body1">{especialidad || "No disponible"}</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px solid #ddd', pt: 2, mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                Último ingreso: {ultimaSesion || "No disponible"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <EditProfileForm onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog> */}

      <Dialog open={avatarOptionsOpen} onClose={() => setAvatarOptionsOpen(false)}>
        <DialogTitle>Seleccioná tu Avatar</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
            {avatarChoices().map((src) => (
              <Grid item key={src}>
                <Avatar
                  src={src}
                  sx={{ width: 80, height: 80, cursor: 'pointer', border: avatarSrc === src ? '2px solid #1976d2' : '2px solid transparent' }}
                  onClick={() => handleAvatarChange(src)}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProfilePage;
