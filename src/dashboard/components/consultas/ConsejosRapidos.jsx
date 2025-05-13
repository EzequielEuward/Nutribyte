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
  useTheme,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

export const ConsejosRapidos = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Grid item xs={12} md={6}>
      <Accordion
        elevation={0}
        sx={{
          backgroundColor: isDark ? 'rgba(40, 40, 40, 0.6)' : 'rgba(240, 240, 240, 0.6)',
          border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
          borderRadius: 2,
          backdropFilter: 'blur(2px)',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: isDark ? '#fff' : '#555' }} />}>
          <Typography variant="h6" sx={{ color: isDark ? '#fff' : '#555' }}>
            💡 Consejos Rápidos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {[
              "Usa el buscador por DNI para acceder rápido al historial",
              "Verifica siempre los datos antropométricos",
              "Revisa el historial antes de nueva consulta"
            ].map((text, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon>
                  <EmojiObjectsIcon sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: 14,
                      color: isDark ? theme.palette.text.primary : '#333',
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default ConsejosRapidos;
