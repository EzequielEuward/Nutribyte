import React from 'react';
import { Container, Grid, Typography, Link, Divider, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoOficial from '../../assets/NutribyteSB.png';

export const FooterSection = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        color: '#ffffff',
        padding: '2rem 0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" gutterBottom>
                Sobre
              </Typography>
              <img
                onClick={() => {
                  const section = document.getElementById('hero');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }}

                src={LogoOficial}
                alt="Logo"
                style={{
                  width: '200px',
                  height: 'auto',
                  objectFit: 'contain',
                  marginLeft: '1rem',
                  marginBottom: '8px',
                  cursor: "pointer",
                }}
              />
            </Box>
            <Typography variant="body2">
              Transformando vidas a través de la nutrición personalizada y el bienestar integral.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Enlaces rápidos
            </Typography>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              <li>
                <Link href="/" color="inherit" underline="hover">Inicio</Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" color="inherit" underline="hover">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" color="inherit" underline="hover">
                  Politica de privacidad
                </Link>
              </li>
              <li>
                <Link href="#caracteristicas" color="inherit" underline="hover">Características</Link>
              </li>
              <li>
                <Link href="#planes" color="inherit" underline="hover">Planes</Link>
              </li>
              <li>
                <Link href="#contacto" color="inherit" underline="hover">Contacto</Link>
              </li>
              <li>
                <Link href="#FAQ" color="inherit" underline="hover">FAQ</Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:nutribite.software@gmail.com" color="inherit">nutribite.software@gmail.com</Link>
            </Typography>
            <Typography variant="body2">
              Teléfono: <Link href="tel:+5493512783658" color="inherit">(+54) 9 351 2783658</Link>
            </Typography>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, backgroundColor: theme.palette.secondary.main }} />

        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} NUTRIBITE. Todos los derechos reservados.
        </Typography>
      </Container>
    </footer>
  );
};

export default FooterSection;
