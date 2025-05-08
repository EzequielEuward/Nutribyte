import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export const FAQSection = () => {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, px: 2 }} id="FAQ">
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center">
                Preguntas Frecuentes
            </Typography>

            {[
                {
                    title: '¿ Qué es S.I.N TACC ?',
                    content: 'S.I.N TACC es una herramienta que facilita la gestión nutricional para profesionales en el área de salud. Ofrece funcionalidades como la creación de dietas, seguimiento de pacientes y más.'
                },
                {
                    title: '¿Cómo empiezo a usar la aplicación?',
                    content: 'Para comenzar a usar S.I.N TACC, solo tienes que registrarte como profesional de la salud. Una vez registrado, podrás acceder a todas las funcionalidades para gestionar tus pacientes y crear dietas personalizadas.'
                },
                {
                    title: '¿Cuáles son las formas de pago disponibles?',
                    content: 'Cualquiera de las dos versiones se pueden abonar a través de una transferencia bancaria o por Mercado Pago. Pueden solicitar los datos para el pago a info@siscon.com.ar o info@sintacc.com'
                },
                {
                    title: '¿Puedo dar de baja el usuario en cualquier momento?',
                    content: 'Sí. No existe ningún tipo de contrato para los usuarios, se pueden dar de baja cuando quieran. Si después de un tiempo es necesario volver a trabajar, podemos activarlo nuevamente y trabajar con los datos cargados ya que estos no se pierden.'
                },
                {
                    title: '¿SINTACC funciona con cualquier Sistema Operativo?',
                    content: 'SINTACC en su versión web funciona con cualquier sistema operativo. Para utilizarlo solo debes tener un navegador web. Nosotros recomendamos Google Chrome.'
                },
                {
                    title: '¿Puedo enviar información por E-mail?',
                    content: 'Sí. El software permite enviar vía E-mail planes alimentarios, planillas para registro diario de alimentos, registro diario de alimentos y glucemia, registro diario de actividad física, curva de peso y otros archivos en formato Word o PDF que el profesional crea necesarios. También se pueden adjuntar recetas en formato PDF.'
                },
                {
                    title: '¿Que seguridad ofrece para proteger la seguridad de los datos del pacientes?',
                    content: 'Ofrecemos metodo 2FA '
                }
            ].map((faq, index) => (
                <Accordion
                    key={index}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                        borderRadius: '8px',
                        mb: 2,
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        <Typography variant="h6">{faq.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ textAlign: 'justify', fontSize: '1.15rem', lineHeight: 1.8 }}
                        >
                            {faq.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FAQSection;
