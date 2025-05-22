import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const ContactFormSection = ({ onFormValidityChange }) => {
    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const serviceId = "service_h4trynq";
            const templateId = "template_kfsw0kj";
            const publicKey = "TUV-qDnUQB0ApBLDY";

            const formData = {
                subject: `Consulta de ${nombre} ${apellido}`,
                to_name: "Equipo de Nutribyte",
                from_name: `${nombre}`,
                from_surname: `${apellido}`,
                from_email: email,
                message: mensaje
            };

            try {
                await emailjs.send(serviceId, templateId, formData, publicKey);
                if (onFormValidityChange) onFormValidityChange(false);
                Swal.fire({
                    title: '¡Éxito!',
                    text: `Se envió tu pregunta al mail de nutribyte.software@gmail.com`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    setTimeout(() => {
                        if (onFormValidityChange) onFormValidityChange(false);
                    }, 8000);
                }
                );
                setNombre("");
                setApellido("");
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

        if (!apellido.trim()) {
            newErrors.apellido = 'Por favor, ingrese su apellido';
        } else if (!validateNombre(apellido)) {
            newErrors.apellido = 'El apellido solo debe contener letras y espacios';
        }

        setErrors(newErrors);

        const isValid = Object.keys(newErrors).length === 0;
        if (onFormValidityChange) onFormValidityChange(isValid); // ✅ acá

        return isValid;
    };


    const validateField = (name, value) => {
        let error = "";

        if (name === "nombre" || name === "apellido") {
            if (!value.trim()) {
                error = `Por favor, ingrese su ${name}`;
            } else if (!validateNombre(value)) {
                error = `El ${name} solo debe contener letras y espacios`;
            }
        }

        if (name === "email") {
            if (!value.trim()) {
                error = 'Por favor, ingrese su correo';
            } else if (!validateEmail(value)) {
                error = 'Correo electrónico inválido';
            }
        }

        if (name === "mensaje") {
            if (!value.trim()) {
                error = 'Por favor, ingrese su mensaje';
            }
        }

        setErrors(prev => ({ ...prev, [name]: error }));
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
                        label="Apellido"
                        name="apellido"
                        margin="normal"
                        inputProps={{ maxLength: 45 }}
                        value={apellido}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(input)) {
                                setApellido(input);
                                validateField("apellido", input);
                            }
                        }}
                        onBlur={(e) => validateField("apellido", e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        margin="normal"
                        value={nombre}
                        error={!!errors.nombre}
                        inputProps={{ maxLength: 45 }}
                        helperText={errors.nombre}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(input)) {
                                setNombre(input);
                                validateField("nombre", input);
                            }
                        }}
                        onBlur={(e) => validateField("nombre", e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        margin="normal"
                        inputProps={{ maxLength: 50 }}
                        value={email}
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            validateField("email", value);
                        }}
                        onBlur={(e) => validateField("email", e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Mensaje"
                        multiline
                        rows={4}
                        name="mensaje"
                        margin="normal"
                        inputProps={{ maxLength: 500 }}
                        value={mensaje}
                        error={!!errors.mensaje}
                        helperText={errors.mensaje}
                        onChange={(e) => {
                            const value = e.target.value;
                            setMensaje(value);
                            validateField("mensaje", value);
                        }}
                        onBlur={(e) => validateField("mensaje", e.target.value)}
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
