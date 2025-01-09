import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const ContactFormSection = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

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
                    text: `Se envió tu pregunta al mail de ezequieleuwardd@gmail.com`,
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
    );
};

export default ContactFormSection;
