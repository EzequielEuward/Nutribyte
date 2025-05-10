import emailjs from 'emailjs-com';

export const enviarAlertaLimitePacientes = (email, nombreUsuario, cantidadPacientes) => {
  const serviceID = 'tu_service_id';
  const templateID = 'tu_template_id';
  const publicKey = 'tu_public_key';

  const templateParams = {
    to_email: email,
    usuario: nombreUsuario,
    cantidad: cantidadPacientes,
  };

  return emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then((response) => {
      console.log('✅ Correo enviado:', response.status, response.text);
    })
    .catch((err) => {
      console.error('❌ Error al enviar el correo:', err);
    });
};