import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { crearPaciente, listarPacientes } from '../../../store/patient';
import Swal from 'sweetalert2';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton, Tooltip } from '@mui/material';

/**
 * Componente de importación de pacientes desde archivo Excel.
 * Puede usarse como ícono o como wrapper con children render-prop.
 */
export const ImportadorPacientes = ({ onSuccess, children }) => {
  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const pacientes = XLSX.utils.sheet_to_json(worksheet);

        let exitosos = 0;

        for (const p of pacientes) {
          try {
            const nuevoPaciente = {
              historialClinico: p.HistoriaClinica || '',
              estadoPaciente: p.Estado || 'activo',
              dni: p.DNI,
              apellido: p.Apellido,
              nombre: p.Nombre,
              fechaNacimiento: p.FechaNacimiento,
              sexo: p.Sexo,
              email: p.Email,
              telefono: p.Telefono,
            };

            await dispatch(crearPaciente(nuevoPaciente)).unwrap();
            exitosos++;
          } catch (err) {
            console.warn('Error con paciente:', p, err);
          }
        }

        await dispatch(listarPacientes());

        Swal.fire(
          'Importación completa',
          `Se importaron ${exitosos} pacientes con éxito.`,
          'success'
        );

        if (onSuccess) onSuccess(exitosos);
      } catch (err) {
        console.error('Error al procesar el archivo:', err);
        Swal.fire('Error', 'No se pudo importar el archivo. Verificá el formato.', 'error');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const triggerFileInput = () => {
    document.getElementById('input-importar-pacientes').click();
  };

  return (
    <>
      <input
        id="input-importar-pacientes"
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        hidden
      />

      {children ? (
        children(triggerFileInput)
      ) : (
        <Tooltip title="Importar desde Excel">
          <IconButton color="success" onClick={triggerFileInput} sx={{ backgroundColor: '#e8f5e9' }}>
            <UploadFileIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ImportadorPacientes;
