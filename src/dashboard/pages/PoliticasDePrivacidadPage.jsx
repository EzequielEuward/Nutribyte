import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  Link,
  Paper,
  Grid,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const PoliticasDePrivacidadPage = () => {
  const navigate = useNavigate();

  const secciones = [
    {
      title: 'Información que Recopilamos',
      content: [
        'Al registrarse en nuestra plataforma, se le pedirá que proporcione cierta información personal como su nombre completo, documento de identidad, correo electrónico, teléfono, fecha de nacimiento y datos de tarjeta de forma segura.',
        'También recopilamos información sobre el uso de la plataforma, incluidos los servicios utilizados e interacciones para mejorar nuestros servicios.'
      ]
    },
    {
      title: 'Uso de la Información',
      content: [
        'Utilizamos la información para brindar, mantener y mejorar nuestros servicios.',
        'Los datos de pago se utilizan exclusivamente para procesar pagos por servicios contratados.',
        'No vendemos ni compartimos su información personal con terceros salvo lo detallado en esta política.'
      ]
    },
    {
      title: 'Seguridad de la Información',
      content: [
        'Empleamos medidas de seguridad para proteger la información, aunque no se puede garantizar seguridad absoluta en transmisiones por Internet.'
      ]
    },
    {
      title: 'Acceso y Control de su Información',
      content: [
        'Puede acceder y actualizar su información desde su cuenta.',
        'Puede solicitar la eliminación de su información en cualquier momento, justificando el motivo.'
      ]
    },
    {
      title: 'Cambios a esta Política de Privacidad',
      content: [
        'Nos reservamos el derecho de modificar esta política. Los cambios serán notificados por la plataforma o correo electrónico.'
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Volver
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 } }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Política de Privacidad
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', bgcolor: 'primary.main' }} />
        </Box>

        <Typography variant="body1" fontSize={18} mb={4}>
          NUTRIBITE respeta su privacidad y se compromete a protegerla. Esta política explica cómo recopilamos, usamos y
          protegemos su información personal.
        </Typography>

        {secciones.map(({ title, content }, idx) => (
          <Box key={idx} mb={5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <ul>
              {content.map((txt, i) => (
                <li key={i}>
                  <Typography variant="body1" mb={1}>{txt}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        ))}

        <Box mt={6} p={3} bgcolor="blue.50" borderLeft={4} borderColor="primary.main" borderRadius={1}>
          <Typography variant="body1" fontWeight="medium">
            Al registrarse y utilizar nuestros servicios, usted acepta los términos de esta política de privacidad.
          </Typography>
        </Box>

        <Box mt={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body1">
            Si tiene preguntas sobre esta política, puede escribirnos a{' '}
            <Link href="mailto:nutribite.software@gmail.com" color="primary">
              nutribite.software@gmail.com
            </Link>
            .
          </Typography>
        </Box>

        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            size="large"
          >
            Volver al inicio
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PoliticasDePrivacidadPage;
