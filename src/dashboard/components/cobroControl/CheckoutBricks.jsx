import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import { useDispatch } from 'react-redux';
import { CrearUsuario } from '../../../store/user/';

export const CheckoutBricks = ({ monto, nombrePlan, personaId, persona }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const obtenerPlanPagoId = (plan) => {
    const mapa = {
      "Básico": 1,
      "Premium": 2,
      "Elite": 3
    };
    return mapa[plan] || 0;
  };

  useEffect(() => {
    if (!window.MercadoPago) {
      console.error("SDK de MercadoPago no está cargado todavía.");
      return;
    }

    const mp = new window.MercadoPago("TEST-f6b14407-ffd6-4f4f-9f6a-95a5468fe83b", {
      locale: "es-AR"
    });

    mp.bricks().create("cardPayment", "cardPaymentBrick_container", {
      initialization: {
        amount: monto,
        payer: {
          email: persona?.email || ""
        }
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
        },
        onSubmit: async (formData) => {
          try {
            // 1. Confirmar pago con tu backend
            const pagoResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/Cobros/procesar-pago`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, plan: nombrePlan })
            });

            const result = await pagoResponse.json();

            if (result.status === "approved") {
              // 2. Crear usuario con thunk
              const userPayload = {
                rol: "Nutricionista",
                username: persona.email,
                userPassword: "Nutribyte1234",
                matricula_Profesional: "",
                especialidad: "",
                planUsuario: nombrePlan,
                estadoUsuario: "Activo",
                activo: true,
                persona: { id: personaId }
              };

              const usuarioCreado = await dispatch(CrearUsuario(userPayload)).unwrap();
              const usuarioId = usuarioCreado.id || usuarioCreado.usuarioId;

              // 3. Registrar cobro
              const nuevoCobro = {
                estado: "Pago",
                usuarioId,
                metodoPago: "MercadoPago",
                referenciaPago: result.id,
                periodoFacturado: new Date().toISOString().split("T")[0],
                planPagoId: obtenerPlanPagoId(nombrePlan),
                impuestos: 0,
                descuento: 0
              };

              const cobroResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/Cobros`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoCobro)
              });

              if (!cobroResponse.ok) {
                const errorText = await cobroResponse.text();
                console.error("❌ Error al crear el cobro:", cobroResponse.status, errorText);
                Swal.fire({
                  title: "Error",
                  text: "No se pudo registrar el cobro. Revisá la consola.",
                  icon: "error"
                });
                return;
              }

              // 4. Enviar mail
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

              // 5. Confirmación visual y redirección
              Swal.fire({
                title: "¡Cuenta creada y pago aprobado!",
                text: "Te hemos enviado un correo de confirmación.",
                icon: "success",
                confirmButtonText: "Aceptar"
              }).then(() => {
                navigate("/gracias", {
                  state: {
                    plan: nombrePlan,
                    email: persona.email,
                    monto: result.transaction_amount
                  }
                });
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
            console.error("Error al procesar el flujo completo:", error);
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
  }, [monto, nombrePlan, personaId, persona, dispatch, navigate]);

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
