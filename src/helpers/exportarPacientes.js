import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

export const exportarPacientes = (pacientes) => {
  const dataFormateada = pacientes.map(p => ({
    DNI: p.persona.dni,
    Apellido: p.persona.apellido,
    Nombre: p.persona.nombre,
    FechaNacimiento: p.persona.fechaNacimiento,
    Sexo: p.persona.sexoBiologico,
    Email: p.persona.email,
    Telefono: p.persona.telefono,
    HistoriaClinica: p.historiaClinica,
    Estado: p.estadoPaciente,
    Activo: p.activo,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataFormateada);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const nombreArchivo = `Paciente_${fecha}.xlsx`;
  saveAs(blob, nombreArchivo);

  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Archivo exportado correctamente',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

export default exportarPacientes;