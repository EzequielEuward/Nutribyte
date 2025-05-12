import { useSelector } from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";

export const useGenerarFacturaPDF = () => {
  const usuario = useSelector((state) => state.auth.usuario);

  const generarFacturaPDF = (cobro) => {
    const doc = new jsPDF();
    const paciente = cobro.paciente?.persona || {};
    const profesional = usuario?.persona || {};

    const fecha = new Date(cobro.fechaCreacion).toLocaleDateString();
    const nroFactura = `0000${String(cobro.cobroPacienteId).padStart(4, '0')}`;
    const nombrePaciente = `${paciente.nombre} ${paciente.apellido}`;
    const total = cobro.total.toFixed(2);
    const impuestos = cobro.impuestos.toFixed(2);
    const descuento = cobro.descuento.toFixed(2);
    const monto = cobro.monto.toFixed(2);

    doc.setFontSize(16);
    doc.text("S.I.N.T.A.C.C", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("DOCUMENTO NO VALIDO COMO FACTURA", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`${profesional.nombre || "Profesional"} ${profesional.apellido || ""}`, 20, 30);
    doc.text(`Dirección: ${profesional.direccion || "Av. Siempre Viva 742"}`, 20, 36);
    doc.text(`CUIT: 20-12345678-9`, 20, 42);
    doc.text(`Monotributista | Inicio de Actividad: 01/01/2024`, 20, 48);
    doc.text(`Atención al cliente: ${profesional.telefono || "351-1234567"}`, 20, 54);

    doc.setFontSize(14);
    doc.text(`Factura N°: ${nroFactura}`, 160, 30, { align: "right" });
    doc.text(`Fecha: ${fecha}`, 160, 36, { align: "right" });

    doc.setFontSize(12);
    doc.text("Datos del paciente:", 20, 65);
    doc.text(`Nombre: ${nombrePaciente}`, 20, 71);
    doc.text(`DNI: ${paciente.dni}`, 20, 77);
    doc.text(`Email: ${paciente.email}`, 20, 83);
    doc.text(`Teléfono: ${paciente.telefono}`, 20, 89);

    doc.autoTable({
      startY: 100,
      head: [["Descripción", "Importe"]],
      body: [
        ["Consulta médica", `$${monto}`],
        ["IVA (21%)", `$${impuestos}`],
        ["Descuento", `-$${descuento}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { halign: "right" },
    });

    const afterTableY = doc.lastAutoTable.finalY;

    doc.setFontSize(12);
    doc.text(`TOTAL: $${total}`, 160, afterTableY + 10, { align: "right" });
    doc.text(`Forma de pago: ${cobro.metodoPago}`, 20, afterTableY + 20);
    if (cobro.referenciaPago) {
      doc.text(`Referencia: ${cobro.referenciaPago}`, 20, afterTableY + 28);
    }

    doc.text("INFORMACIÓN PARA EL PAGO", 20, afterTableY + 40);
    doc.text(`Banco: Bancor`, 20, afterTableY + 46);
    doc.text(`Cuenta: 987-654321/0`, 20, afterTableY + 52);
    doc.text(`Beneficiario: ${profesional.nombre || "Profesional"} ${profesional.apellido || ""}`, 20, afterTableY + 58);

    doc.text("Recibimos la suma de pesos:", 20, afterTableY + 72);
    doc.text(`$${total} (pesos argentinos)`, 20, afterTableY + 78);
    doc.text("En concepto de servicios prestados", 20, afterTableY + 84);

    doc.save(`Factura_B_${paciente.apellido || "Paciente"}.pdf`);
  };

  return { generarFacturaPDF };
};

export default useGenerarFacturaPDF;
