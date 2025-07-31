import { Box, Container, Grid, Typography, Card, CardContent, CardActions, IconButton, Avatar } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeveloperEzeImage from '../../assets/eze.jpg';
import DeveloperLeoImage from '../../assets/leo.jpg';
import DeveloperAlejoImage from '../../assets/alejo.jpg';
import DeveloperMeliImage from '../../assets/meli.jpg';
import DeveloperAgusImage from '../../assets/agus.jpg';
import placeholder from '../../assets/placeholder.png';


export const AboutSection = () => {
  const developers = [
    {
      name: "Ezequiel Euward",
      role: "Desarrollador",
      text: "Enfocado en diseño y optimización de recursos y rendimiento de la aplicación. ",
      github: "https://github.com/EzequielEuward",
      linkedin: "https://www.linkedin.com/in/ezequiel-euward/",
      img: DeveloperEzeImage,
    },
    {
      name: "Melina Vasquez",
      role: "Analista QA & testing y base de datos.",
      text: "Verifica que el producto cumpla con estandares y requisitos.",
      github: "https://github.com/Melina-Vasquez",
      linkedin: "https://www.linkedin.com/in/vasquezmelina/",
      img: DeveloperMeliImage,
    },
    {
      name: "Leonel Euward",
      role: "Desarrollador",
      text: "Enfocado en la seguridad y optimización de la aplicación en el servidor.",
      github: "https://github.com/LeoEuw",
      linkedin: "https://www.linkedin.com/in/leoeuw/",
      img: DeveloperLeoImage,
    },

    {
      name: "Alejo Bagasin",
      role: "Analista funcional",
      text: "Encargado de recopilar información.",
      github: "https://github.com/LeoEuw",
      linkedin: "https://www.linkedin.com/in/leoeuw/",
      img: DeveloperAlejoImage,
    },
    {
      name: "Agustin Lopez",
      role: "Proyect Management",
      text: "Encargado de gestionar el proyecto.",
      github: "https://github.com/LeoEuw",
      linkedin: "https://www.linkedin.com/in/leoeuw/",

      img: DeveloperAgusImage,

    }
  ];

  return (
    <Box id="about" py={{ xs: 6, md: 12 }} textAlign="center">
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Acerca de los desarrolladores
        </Typography>
        <Typography variant="body1" color="textSecondary" maxWidth="sm" mx="auto" mb={4}>
          Nutribyte fue desarrollada por un equipo de apasionados Analistas de Sistemas y Desarrolladores que trabajaron en conjunto para crear una herramienta que facilita la gestión nutricional de manera eficiente. El equipo detrás de esta solución incluye:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {developers.map((dev, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  maxWidth: 345,
                  mx: "auto",
                  transition: "transform 0.3s",
                  '&:hover': { transform: "scale(1.05)" },
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 350 
                }}
                raised
              >
                <Avatar
                  src={dev.img}
                  alt={dev.name}
                  sx={{ width: 100, height: 100, mx: "auto", mt: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{dev.name}</Typography>
                  <Typography color="textSecondary"><strong>{dev.role}</strong></Typography>
                  <hr />
                  <Typography color="textSecondary">{dev.text}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButton href={dev.github} target="_blank" color="primary">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href={dev.linkedin} target="_blank" color="primary">
                    <LinkedInIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
