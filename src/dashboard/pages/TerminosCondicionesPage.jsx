import { useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ContactFormSection } from '../../home/components';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const TerminosCondicionesPage = () => {
    const [checked, setChecked] = useState(false);
    const [formValid, setFormValid] = useState(false); // ⬅️ nuevo
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAceptar = async () => {
        try {
            const serviceId = "service_sqgvzyv";
            const templateId = "template_2vneeai";
            const publicKey = "Mo3yOmhJ4dF4wGsg5";

            const formData = {
                subject: "Aceptación de Términos y Condiciones",
                to_name: "Equipo de SINTACC",
                from_name: "Usuario Prueba",
                from_email: "no-reply@sintacc.com",
                message: "El usuario prueba ha aceptado los términos y condiciones del servicio.",
            };

            await emailjs.send(serviceId, templateId, formData, publicKey);

            Swal.fire({
                title: '¡Gracias!',
                text: 'Tu aceptación fue registrada correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });

      
             navigate("/#hero");

        } catch (error) {
            console.error("Error al enviar aceptación:", error);
            Swal.fire("Error", "No se pudo registrar tu aceptación. Intenta de nuevo.", "error");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Botón de volver */}
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">Volver</Typography>
            </Box>

            <Card elevation={4}>
                <CardHeader
                    sx={{ backgroundColor: theme.palette.grey[100], textAlign: 'center', py: 3 }}
                    title={<Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">Términos y Condiciones</Typography>}
                />
                <Divider />
                <CardContent sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
                    <Typography variant="body1" fontWeight={600} gutterBottom>
                        Servicio de Plataforma SINTACC para Profesionales Nutricionistas Independientes
                    </Typography>
                    <Typography paragraph>
                        Bienvenido a nuestra plataforma para profesionales nutricionistas independientes. Un Sofware de nutricionistas donde podrás gestionar tu consultorio de manera eficiente. Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente antes de continuar desplegando cada titulo y sección de dichos terminos.
                    </Typography>

                    {[
                        { title: 'Uso del Servicio', content: " Nuestra plataforma está diseñada para que profesionales nutricionistas independientesgestionen sus actividades cotidianas en el consultorio de manera eficiente. Al registrarte yutilizar nuestros servicios, aceptas cumplir con todas las leyes y regulaciones aplicables.", },
                        { title: 'Planes de Contratación y Pago', content: ' Ofrecemos diferentes opciones de planes de contratación con funcionalidades variadas. El pago de dichos planes se realizará mediante transferencia bancaria, tarjeta de crédito odébito de forma mensual o con la opción de pago único anual. De no realizarse el pagocorrespondiente, luego de un mes de avisos y alertas en el sistema y vía email, sesuspenderá el servicio de la plataforma de forma automática y nos pondremos en contactovia mail.' },
                        { title: 'Datos Sensibles de los Pacientes', content: 'Es importante destacar que todos los datos que se van a encontrar en SINTACC, de los usuarios nutricionistas como el de los pacientes registrados a la muestra que son reales han sido autorizados con consentimiento por parte de la persona dando el consentimiento para que sean visibles teniendo resguardo en la ley (25326) nivel nacional. Si la persona que brindo sus datos reales quiere conocer como estan sus datos registrados en la base de datos se lo dará de forma gratuita dentro de los 10 días corridos teniendo en cuenta el día de que el lo solicito. Cualquier error en estos datos sensibles se debe solucionar dentro de los 5 dias hábiles sin ningún costo, con la opción de ser suprimidos o hacerlos secretos. En esta etapa del producto de software tiene como fin académicos, los datos de pacientes que no son reales son tomados como válidos ya que simulan la cantidad y necesidad de datos de acuerdo a lo solicitado generados por una herramienta inteligente. Es importante destacar que nuestra plataforma maneja datos sensibles de los pacientes a los cuales tendrán acceso los profesionales nutricionistas. Por lo tanto, es responsabilidad de los usuarios proteger y salvaguardar esta información de acuerdo con las leyes de protección de datos vigentes.' },
                        { title: 'Propiedad Intelectual', content: 'Todos los derechos de propiedad intelectual relacionados con la plataforma, incluyendo marcas, logotipos, y software, son propiedad exclusiva de la SINTACC software. Se prohíbe la reproducción o distribución no autorizada de cualquier material presente en la plataforma.' },
                        { title: 'Limitación de Responsabilidad', content: 'La empresa no se hace responsable por cualquier daño, pérdida o perjuicio causado por el uso de la plataforma, incluyendo la interrupción del servicio o la pérdida de datos de información o secciones que no se encuentren contemplados por nuestro sistema. Los profesionales nutricionistas son responsables de mantener copias de seguridad de su información de secciones o información no contemplada en los módulos de la plataforma del software.' },
                        { title: 'Modificaciones de los Términos y Condiciones', content: 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se notificará a los usuarios sobre los cambios realizados, y el uso continuado de la plataforma constituye la aceptación de las modificaciones. Al aceptar estos términos y condiciones, estás formalizando un acuerdo legal con nuestra plataforma para el uso de nuestros servicios. Si tienes alguna pregunta o inquietud, no dudes en contactarnos. ¡Gracias por confiar en nosotros! SINTACC.' }
                    ].map(({ title, content }, index) => (
                        <Accordion key={index} disableGutters elevation={0}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>{title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{content}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <Typography mt={4}>
                        Al aceptar estos términos y condiciones, estás formalizando un acuerdo legal...
                    </Typography>
                </CardContent>

                <Divider />

                {/* Checkbox y validación */}
                <CardActions
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        px: 3,
                        py: 2
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.target.checked);
                                    if (!e.target.checked) setFormValid(false); // reset si desmarca
                                }}
                            />
                        }
                        label="He leído y acepto los términos y condiciones"
                    />
                </CardActions>

                {/* Mostrar formulario solo si se acepta */}
                {checked && (
                    <>
                        <Divider />
                        <Box mt={4} textAlign="center">
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                ¿Tenés dudas o consultas antes de continuar?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" mb={2}>
                                Completá el formulario para enviarnos tus preguntas. Es necesario enviarlo para continuar.
                            </Typography>
                        </Box>

                        {/* Se le pasa un setFormValid desde el padre */}
                        <ContactFormSection onFormValidityChange={setFormValid} />
                    </>
                )}

                <Box textAlign="center" pb={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!checked }
                        onClick={handleAceptar}
                    >
                        Aceptar
                    </Button>
                </Box>
            </Card>
        </Container>
    );
};

export default TerminosCondicionesPage;
