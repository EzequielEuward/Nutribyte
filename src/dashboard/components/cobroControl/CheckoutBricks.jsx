import { useEffect, useState } from 'react';

export const CheckoutBricks = ({ monto }) => {
  const [loading, setLoading] = useState(true);

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
          console.log("👉 Datos a enviar al backend:", formData);
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Cobros/generar-link-pago`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log("Resultado del backend:", result);
          } catch (error) {
            console.error("Error al enviar al backend:", error);
          }
        },
        onError: (error) => {
          console.error("Error en el Brick:", error);
        }
      }
    });
  }, [monto]);

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
