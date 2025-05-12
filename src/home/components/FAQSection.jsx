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
                    title: '¿Qué es S.I.N TACC?',
                    content:
                        'S.I.N TACC es una plataforma diseñada para profesionales de la salud que permite gestionar de forma eficiente la información nutricional de sus pacientes. Ofrece funcionalidades como la creación de planes alimentarios, seguimiento personalizado, control de evolución y mucho más.'
                },
                {
                    title: '¿Cómo empiezo a usar la aplicación?',
                    content:
                        'Para comenzar a utilizar S.I.N TACC, simplemente registrate como profesional de la salud. Una vez creado tu usuario, podrás acceder a todas las herramientas necesarias para gestionar pacientes, diseñar dietas y realizar seguimientos.'
                },
                {
                    title: '¿Cuáles son las formas de pago disponibles?',
                    content:
                        'Ambas versiones del sistema pueden abonarse mediante transferencia bancaria o a través de Mercado Pago. Para obtener los datos de pago, podés escribirnos a sintacc.software@gmail.com.'
                },
                {
                    title: '¿Puedo dar de baja mi usuario en cualquier momento?',
                    content:
                        'Sí. No existe ningún tipo de contrato obligatorio. Podés dar de baja tu cuenta en el momento que desees. Si en el futuro decidís retomar, podrás reactivar tu cuenta y continuar trabajando con toda la información previamente cargada.'
                },
                {
                    title: '¿S.I.N TACC funciona en cualquier sistema operativo?',
                    content:
                        'Sí. La versión web de S.I.N TACC es compatible con todos los sistemas operativos. Solo necesitás un navegador web moderno para acceder. Recomendamos utilizar Google Chrome para una mejor experiencia.'
                },
                {
                    title: '¿Puedo enviar información por e-mail desde la plataforma?',
                    content:
                        'Sí. La plataforma permite enviar por correo electrónico distintos documentos como planes alimentarios, registros diarios de alimentos, glucemia o actividad física, curvas de peso, recetas y otros archivos en formato Word o PDF que el profesional considere necesarios.'
                },
                {
                    title: '¿Qué medidas de seguridad ofrece S.I.N TACC para proteger los datos del paciente?',
                    content:
                        'S.I.N TACC cuenta con autenticación de doble factor (2FA) para mayor seguridad, y todos los datos se almacenan en servidores encriptados con acceso restringido exclusivamente al profesional autorizado.'
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
