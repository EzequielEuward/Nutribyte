import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { crearPaciente, listarPacientes } from '../../../store/patient';
import { useCallback, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Paper, Box, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

export const ImportadorPacientes = ({ onSuccess, children }) => {
  const dispatch = useDispatch();
  const [modalAbierto, setModalAbierto] = useState(false);

  const columnasEsperadas = ['DNI', 'Apellido', 'Nombre', 'FechaNacimiento', 'Sexo'];

  const validarFormato = (fila) => {
    return columnasEsperadas.every((col) => fila[col] && fila[col].toString().trim() !== '');
  };

  const parseFecha = (valor) => {
    if (valor instanceof Date) {
      return valor.toISOString().split('T')[0];
    }

    // Soporta seriales de Excel como 37185
    if (!isNaN(valor) && Number(valor) > 30000 && Number(valor) < 60000) {
      const parsed = XLSX.SSF.parse_date_code(valor);
      if (parsed) {
        const yyyy = parsed.y;
        const mm = String(parsed.m).padStart(2, '0');
        const dd = String(parsed.d).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      }
    }

    const str = valor?.toString().trim();
    if (!str) return null;

    const formatos = [
      { regex: /^\d{2}\/\d{2}\/\d{4}$/, sep: '/' },
      { regex: /^\d{2}-\d{2}-\d{4}$/, sep: '-' },
      { regex: /^\d{4}-\d{2}-\d{2}$/, sep: '-' },
      { regex: /^\d{4}\/\d{2}\/\d{2}$/, sep: '/' },
    ];

    for (const formato of formatos) {
      if (formato.regex.test(str)) {
        const parts = str.split(formato.sep);
        if (parts[0].length === 4) return `${parts[0]}-${parts[1]}-${parts[2]}`;
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }

    return null;
  };

  const procesarArchivo = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const pacientes = XLSX.utils.sheet_to_json(worksheet);

        let exitosos = 0;
        let errores = [];

        for (const [index, p] of pacientes.entries()) {
          if (!validarFormato(p)) {
            errores.push(`Fila ${index + 2}: Datos incompletos`);
            continue;
          }

          const fechaParseada = parseFecha(p.FechaNacimiento);
          if (!fechaParseada) {
            errores.push(`Fila ${index + 2}: Fecha inválida (${p.FechaNacimiento})`);
            continue;
          }

          const nuevoPaciente = {
            historialClinico: p.HistoriaClinica || '',
            estadoPaciente: p.Estado || 'activo',
            dni: p.DNI,
            apellido: p.Apellido,
            nombre: p.Nombre,
            fechaNacimiento: fechaParseada,
            sexo: (() => {
              const s = (p.Sexo || '').toLowerCase();
              if (s === 'masculino' || s === 'm') return 'M';
              if (s === 'femenino' || s === 'f') return 'F';
              return '';
            })(),
            email: p.Email || '',
            telefono: String(p.Telefono || '').replace(/\D/g, ''),
            activo: (() => {
              if (typeof p.Activo === 'boolean') return p.Activo;
              if (typeof p.Activo === 'string') return p.Activo.toLowerCase() === 'true';
              return true;
            })(),
          };

          try {
            await dispatch(crearPaciente(nuevoPaciente)).unwrap();
            exitosos++;
          } catch (err) {
            errores.push(`Fila ${index + 2}: Error al guardar (DNI: ${p.DNI})`);
          }
        }

        await dispatch(listarPacientes());

        if (errores.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Importación parcial',
            html: `<b>${exitosos} pacientes cargados correctamente.</b><br><ul style="text-align:left">${errores
              .slice(0, 5)
              .map((e) => `<li>${e}</li>`)
              .join('')}</ul>${errores.length > 5 ? '<br>Y más...' : ''}`,
          });
        } else {
          Swal.fire('Importación completa', `Se importaron ${exitosos} pacientes correctamente.`, 'success');
        }

        if (onSuccess) onSuccess(exitosos);
        setModalAbierto(false);
      } catch (err) {
        console.error('Error al procesar el archivo:', err);
        Swal.fire('Error', 'Error procesando el archivo. Verificá el formato.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      procesarArchivo(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = () => {
    Swal.fire('Archivo no válido', 'Solo se aceptan archivos .xlsx, .xls o .csv', 'error');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const handleAbrirModal = () => setModalAbierto(true);
  const handleCerrarModal = () => setModalAbierto(false);

  return (
    <>
      {children ? children(handleAbrirModal) : null}

      <Dialog open={modalAbierto} onClose={handleCerrarModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, textAlign: 'center', pt: 3 }}>
          Importar pacientes desde Excel
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              px: 2,
              py: 2,
              mb: 2,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Formato requerido:
            </Typography>

            <List dense disablePadding sx={{ pl: 1 }}>
              <ListItem disableGutters>
                <ListItemText primary="DNI (obligatorio)" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Apellido (obligatorio)" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Nombre (obligatorio)" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Fecha Nacimiento (ej: 21/10/2001 o 2001-10-21)" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Genero biologico (masculino/femenino o m/f)" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Email" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Teléfono " />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Historia clínica" />
              </ListItem>
            </List>
          </Box>
 
          <Divider sx={{ my: 3 }} />

          <Paper
            {...getRootProps()}
            elevation={2}
            sx={{
              border: '2px dashed #4caf50',
              p: 3,
              textAlign: 'center',
              backgroundColor: '#f1f8e9',
              cursor: 'pointer',
              borderRadius: 2,
              transition: '0.3s',
              '&:hover': { backgroundColor: '#e8f5e9' },
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              {isDragActive ? 'Soltá el archivo...' : 'Arrastrá un archivo o hacé clic para subir'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Formatos soportados: .xlsx, .xls, .csv
            </Typography>
          </Paper>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleCerrarModal}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportadorPacientes;
