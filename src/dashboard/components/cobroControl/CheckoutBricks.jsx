import { useEffect, useState } from 'react';

export const CheckoutBricks = ({ monto, nombrePlan }) => {
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

          console.log("👉 Datos a enviar al backend:", datosConPlan);

          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Cobros/procesar-pago`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(datosConPlan)
            });

            const result = await response.json();
            console.log("Resultado del backend:", result);

            if (result.status === "approved") {
              alert("✅ ¡Pago aprobado con éxito!");
            } else {
              alert(`❌ Pago rechazado: ${result.status_detail}`);
            }
          } catch (error) {
            console.error("Error al enviar al backend:", error);
            alert("❌ Error al procesar el pago.");
          }
        },
        onError: (error) => {
          console.error("Error en el Brick:", error);
          alert(`Error en Mercado Pago: ${error.message}`);
        }
      }
    });
  }, [monto, nombrePlan]);

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
