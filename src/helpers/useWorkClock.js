import { useEffect, useState } from "react";
import { differenceInHours, isWithinInterval, parse } from "date-fns";

export const useWorkClock = (horaInicio, horaFin) => {
  const [horasPasadas, setHorasPasadas] = useState(0);
  const [horasTotales, setHorasTotales] = useState(0);

  useEffect(() => {
    const now = new Date();
    const inicio = parse(horaInicio, "HH:mm", now);
    const fin = parse(horaFin, "HH:mm", now);

    const updateHoras = () => {
      const ahora = new Date();
      if (isWithinInterval(ahora, { start: inicio, end: fin })) {
        setHorasPasadas(Math.max(0, Math.min(differenceInHours(ahora, inicio), differenceInHours(fin, inicio))));
      } else {
        setHorasPasadas(0);
      }
      setHorasTotales(differenceInHours(fin, inicio));
    };

    updateHoras();
    const interval = setInterval(updateHoras, 60 * 1000); // actualiza cada minuto

    return () => clearInterval(interval);
  }, [horaInicio, horaFin]);

  return { horasPasadas, horasTotales };
};
