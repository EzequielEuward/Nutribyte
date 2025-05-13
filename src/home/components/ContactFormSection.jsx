import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const ContactFormSection = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const serviceId = "service_sqgvzyv";
            const templateId = "template_2vneeai";
            const publicKey = "Mo3yOmhJ4dF4wGsg5";

            const formData = {
                subject: `Consulta de ${nombre}`,
                to_name: "Equipo de SINTACC",
                from_name: nombre,
                from_email: email,
                message: mensaje
            };

            try {
                await emailjs.send(serviceId, templateId, formData, publicKey);
                Swal.fire({
                    title: '¡Éxito!',
                    text: `Se envió tu pregunta al mail de sintacc.software@gmail.com`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                setNombre("");
                setEmail("");
                setMensaje("");
            } catch (error) {
                console.error('Error al enviar el correo:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validateNombre = (nombre) => {
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return nombreRegex.test(nombre);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!nombre.trim()) {
            newErrors.nombre = 'Por favor, ingrese su nombre';
        } else if (!validateNombre(nombre)) {
            newErrors.nombre = 'El nombre solo debe contener letras y espacios';
        }

        if (!email.trim() || !validateEmail(email)) {
            newErrors.email = 'Correo electrónico inválido';
        }

        if (!mensaje.trim()) {
            newErrors.mensaje = 'Por favor, ingrese su mensaje';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <Box id="contacto" py={{ xs: 6, md: 12 }} bgcolor="grey.100" textAlign="center">
            <Container maxWidth="sm">
                <Typography variant="h4" component="h2" fontWeight="bold">
                    Contáctanos
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={2} mb={4}>
                    ¿Tienes alguna pregunta o sugerencia? No dudes en ponerte en contacto con nosotros.
                </Typography>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        margin="normal"
                        value={nombre}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(input)) {
                                setNombre(input);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        margin="normal"
                        value={email}
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Mensaje"
                        multiline
                        rows={4}
                        name="mensaje"
                        margin="normal"
                        value={mensaje}
                        error={!!errors.mensaje}
                        helperText={errors.mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Enviar mensaje
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default ContactFormSection;
