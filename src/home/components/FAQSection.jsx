import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export const FAQSection = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, px: 2 }}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center">
                Preguntas Frecuentes
            </Typography>

            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                 expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">¿ Qué es S.I.N TACC ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        S.I.N TACC es una herramienta que facilita la gestión nutricional para profesionales en el área de salud.
                        Ofrece funcionalidades como la creación de dietas, seguimiento de pacientes y más.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                   expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">¿Cómo empiezo a usar la aplicación?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        Para comenzar a usar S.I.N TACC, solo tienes que registrarte como profesional de la salud.
                        Una vez registrado, podrás acceder a todas las funcionalidades para gestionar tus pacientes y crear dietas personalizadas.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">¿Cuales son las formas de pago disponibles?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        Cualquiera de las dos versiones se pueden abonar a través de una transferencia bancaria o por Mercado Pago. Pueden solicitar los datos para el pago a info@siscon.com.ar o info@sintacc.com
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel4-content"
                    id="panel4-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">¿Puedo dar de baja el usuario en cualquier momento?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        Si. No existe ningún tipo de contrato para los usuarios, se pueden dar de baja cuando quieran. Si después de un tiempo es necesario volver a trabajar, podemos activarlo nuevamente y trabajar con los datos cargados ya que estos no se pierden.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel5'}
                onChange={handleChange('panel5')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel5-content"
                    id="panel5-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">SINTACC funciona con cualquier Sistema Operativo ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        SINTACC en su versión web funciona con cualquier sistema operativo. Para utilizarlo solo debes tener un navegador web. Notrosos recomendamos Google Chrome.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'panel6'}
                onChange={handleChange('panel6')}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `0 4px 6px ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                    mb: 2,
                }}
            >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
                    aria-controls="panel6-content"
                    id="panel6-header"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    <Typography variant="h6">¿ Puedo enviar información por E-mail ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        Si. El software permite enviar vía E-mail planes alimentarios, planillas para registro diario de alimentos, registro diario de alimentos y glucemia, registro diario de activiadad física, curva de peso y otros archivos en formato word o pfd que el profesional crea necesarios. También puedo adjuntar recetas en formato pdf.
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </Box>
    );
};

export default FAQSection;
