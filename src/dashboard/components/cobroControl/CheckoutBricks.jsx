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
    console.error("❌ SDK de MercadoPago no cargado");
    return;
  }

  console.log("✅ MercadoPago SDK detectado");

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
        console.log("✅ Brick cargado con éxito");
        setLoading(false);
      },
      onSubmit: async (formData) => {
        console.log("🧾 Datos del formulario enviados:", formData);
        // el resto igual...
      },
      onError: (error) => {
        console.error("❌ Error en el Brick:", error);
        alert(`Error en Mercado Pago: ${error.message}`);
      }
    }
  }).catch(error => {
    console.error("❌ Error al crear el brick:", error);
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
