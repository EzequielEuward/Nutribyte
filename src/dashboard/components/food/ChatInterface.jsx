import { useState, useRef, useEffect } from 'react';
import { Button, TextField, Box, IconButton, CircularProgress, Typography } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { mockRespuestas } from '../../../mock/data/mockRespuestas';

export const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setStatus('streaming');

    // Normalizar input
    const inputLower = userMessage.toLowerCase();

    // Buscar coincidencia
    const match = mockRespuestas.find((responseObj) =>
      responseObj.trigger &&
      responseObj.trigger.some((trigger) =>
        inputLower.includes(trigger.toLowerCase())
      )
    );

    // Si no hay coincidencia, mostrar mensaje de error
    const response = match
      ? match.response
      : "Lo siento, no entendí tu mensaje. Escribí 'inicio' para ver las opciones disponibles.";

    // Respuesta rápida sin delay innecesario
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setStatus('');
  };

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        width: '350px',
        height: '500px',
        backgroundColor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6">Chat con Asistente</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>¡Hola! ¿En qué puedo ayudarte hoy?</Box>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.300',
                  color: message.role === 'user' ? 'white' : 'black',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))
        )}
        {status === 'streaming' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: '8px', padding: '8px', borderTop: '1px solid #ccc' }}>
        <TextField
          fullWidth
          value={input}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Escribe un mensaje..."
          size="small"
        />
        <IconButton type="submit" color="primary" disabled={status === 'streaming' || !input.trim()}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInterface;
