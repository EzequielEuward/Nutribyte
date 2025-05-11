export const verificarEstado2FA = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData || !userData.fechaCreacion) {
    return {
      twoFactorEnabled: true,
      tiempoExcedido: false,
      diasRestantes: 0,
    };
  }

  const fechaCreacion = new Date(userData.fechaCreacion);
  const hoy = new Date();
  const diffDias = Math.floor((hoy - fechaCreacion) / (1000 * 60 * 60 * 24));

  return {
    twoFactorEnabled: !!userData.twoFactorEnabled,
    tiempoExcedido: !userData.twoFactorEnabled && diffDias >= 3,
    diasRestantes: Math.max(0, 3 - diffDias),
  };
};