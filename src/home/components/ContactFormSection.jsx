import Swal from 'sweetalert2';
import { useState } from 'react';

import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const ContactFormSection = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                Swal.fire({
                    title: '¡Éxito!',
                    text: `Se envió tu pregunta al mail de ezequieleuwardd@gmail.com`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } catch (error) {
                console.error('Error al mostrar mensaje de éxito:', error);
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const validateForm = () => {
        const errors = {};
        if (!nombre.trim()) {
            errors.nombre = 'Por favor, ingrese su nombre';
        }
        if (!email.trim() || !validateEmail(email)) {
            errors.email = 'Correo electrónico inválido';
        }
        if (!mensaje.trim()) {
            errors.mensaje = 'Por favor, ingrese su mensaje';
        }
        if (Object.keys(errors).length > 0) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, corrija los siguientes errores',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            Object.keys(errors).forEach((field) => {
                document.querySelector(`[name="${field}"]`).focus();
                document.querySelector(`[name="${field}"]`).setAttribute('error', errors[field]);
            });
            return false;
        }
        return true;
    };

    return (
        <>
            <Box id="contact" py={{ xs: 6, md: 12 }} bgcolor="grey.100" textAlign="center">
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
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            margin="normal"
                            value={email}
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
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Enviar mensaje
                        </Button>
                    </form>
                </Container>
            </Box>
        </>
    )
}

export default ContactFormSection;
