import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LogoOficial from '../../assets/NutribyteSB.png';

export const FooterSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #2b2d42 20%, #7E57C2 80%)',
        color: '#ffffff',
        padding: '2rem 0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Sección Sobre + Logo */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-start',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Sobre
              </Typography>
              <Box
                component="img"
                src={LogoOficial}
                alt="Logo"
                onClick={() => {
                  const section = document.getElementById('hero');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }}
                sx={{
                  maxWidth: 150,
                  height: 'auto',
                  mt: isMobile ? 1 : 0,
                  ml: isMobile ? 0 : 2,
                  cursor: 'pointer',
                }}
              />
            </Box>
            <Typography variant="body2" mt={2}>
              Transformando vidas a través de la nutrición personalizada y el bienestar integral.
            </Typography>
          </Grid>

          {/* Enlaces */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom textAlign={isMobile ? 'center' : 'left'}>
              Enlaces rápidos
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, textAlign: isMobile ? 'center' : 'left' }}>
              {[
                { text: 'Inicio', href: '/' },
                { text: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
                { text: 'Política de Privacidad', href: '/politica-de-privacidad' },
                { text: 'Características', href: '#caracteristicas' },
                { text: 'Planes', href: '#planes' },
                { text: 'Contacto', href: '#contacto' },
                { text: 'FAQ', href: '#FAQ' },
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  <Link href={link.href} color="inherit" underline="hover">
                    {link.text}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom textAlign={isMobile ? 'center' : 'left'}>
              Contacto
            </Typography>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <Typography variant="body2">
                Email:{' '}
                <Link href="mailto:nutribyte.software@gmail.com" color="inherit">
                  nutribyte.software@gmail.com
                </Link>
              </Typography>
              <Typography variant="body2">
                Teléfono:{' '}
                <Link href="tel:+5493512783658" color="inherit">
                  (+54) 9 351 2783658
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: theme.palette.secondary.main }} />

        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} NUTRIBYTE. Todos los derechos reservados.
        </Typography>
      </Container>
    </footer>
  );
};

export default FooterSection;
