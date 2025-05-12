import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

export const ConsejosRapidos = () => {
  return (
    <Grid item xs={12} md={6}>
      <Accordion
        elevation={0}
        sx={{
          backgroundColor: 'rgba(240, 240, 240, 0.6)', // fondo gris semitransparente
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          backdropFilter: 'blur(2px)', // efecto vidrio suave
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#555' }}>
            💡 Consejos Rápidos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <EmojiObjectsIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary="Usa el buscador por DNI para acceder rápido al historial"
                primaryTypographyProps={{ sx: { fontSize: 14, color: '#333' } }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <EmojiObjectsIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary="Verifica siempre los datos antropométricos"
                primaryTypographyProps={{ sx: { fontSize: 14, color: '#333' } }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <EmojiObjectsIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary="Revisa el historial antes de nueva consulta"
                primaryTypographyProps={{ sx: { fontSize: 14, color: '#333' } }}
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default ConsejosRapidos;
