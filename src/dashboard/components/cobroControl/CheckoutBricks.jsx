import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';

export const CheckoutBricks = ({ monto, nombrePlan, personaId, persona }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!window.MercadoPago) {
      console.error("SDK de MercadoPago no está cargado todavía.");
      return;
    }

    const mp = new window.MercadoPago("TEST-f6b14407-ffd6-4f4f-9f6a-95a5468fe83b", {
      locale: "es-AR"
    });

    console.log("API_URL:", import.meta.env.VITE_API_URL);

    mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
      initialization: {
        amount: monto,
      },
      customization: {
        paymentMethods: {
          creditCard: "all",
          debitCard: "all",
        }
      },
      callbacks: {
        onReady: () => {
          setLoading(false);
          console.log("Brick listo");
        },
        onSubmit: async (formData) => {
          const datosConPlan = {
            ...formData,
            plan: nombrePlan
          };

          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Cobros/procesar-pago`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(datosConPlan)
            });

            const result = await response.json();

            if (result.status === "approved") {
              await emailjs.send("service_h4trynq", "template_eyj0jve", {
                nombre: persona?.nombre || "No especificado",
                apellido: persona?.apellido || "No especificado",
                email: persona?.email || "No disponible",
                telefono: persona?.telefono || "No disponible",
                dni: persona?.dni || "No capturado",
                plan: nombrePlan,
                monto: monto,
                transaction_id: result.id || "No disponible",
                estado: result.status || "No disponible"
              }, "TUV-qDnUQB0ApBLDY");

              navigate("/gracias", {
                state: {
                  plan: nombrePlan,
                  email: result.payer?.email || "No disponible",
                  monto: result.transaction_amount
                }
              });
            } else {
              Swal.fire({
                title: "Pago rechazado",
                text: `Detalle: ${result.status_detail}`,
                icon: "error",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
            }
          } catch (error) {
            console.error("Error al enviar al backend:", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al procesar el pago.",
              icon: "error",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        },
        onError: (error) => {
          console.error("Error en el Brick:", error);
          alert(`Error en Mercado Pago: ${error.message}`);
        },
      }
    });
  }, [monto, nombrePlan, personaId, persona]);

  return (
    <>
      {loading && (
        <p style={{ textAlign: "center", marginBottom: 10 }}>
          Cargando formulario de pago...
        </p>
      )}
      <div
        id="cardPaymentBrick_container"
        style={{ minHeight: 300, width: "100%" }}
      />
    </>
  );
};

export default CheckoutBricks;
