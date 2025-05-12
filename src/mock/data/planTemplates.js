export const PLAN_TEMPLATES = {
  "Plan Keto": {
    descripcion: 'Enfocado en la reducción de carbohidratos y aumento de grasas saludables.',
    macronutrientes: [
      {
        label: 'Grasas Saludables',
        porcentaje: '70%',
        color: '#3f51b5',
        fuentes: 'Aceite de coco, aguacate, frutos secos, salmón',
        descripcion: 'Fuente principal de energía en la dieta cetogénica.',
      },
      {
        label: 'Proteínas',
        porcentaje: '25%',
        color: '#4caf50',
        fuentes: 'Carne, pollo, huevos, pescados',
        descripcion: 'Ayuda al mantenimiento muscular y regeneración celular.',
      },
      {
        label: 'Carbohidratos',
        porcentaje: '5%',
        color: '#ff9800',
        fuentes: 'Verduras verdes, bayas',
        descripcion: 'Muy limitados en esta dieta para inducir cetosis.',
      },
    ],
    beneficios: [
      'Favorece la pérdida de grasa corporal',
      'Mejora la claridad mental',
      'Reduce niveles de insulina y glucosa',
      'Aumenta energía estable durante el día',
    ],
  },

  "Plan Hiper Calorico": {
    descripcion: 'Diseñado para incrementar la ingesta calórica total, ideal para aumentar de peso y masa muscular.',
    macronutrientes: [
      {
        label: 'Carbohidratos',
        porcentaje: '50%',
        color: '#2196f3',
        fuentes: 'Arroz, pasta, pan integral, papa',
        descripcion: 'Fuente principal de energía para promover el superávit calórico.',
      },
      {
        label: 'Proteínas',
        porcentaje: '30%',
        color: '#4caf50',
        fuentes: 'Carnes magras, huevos, legumbres',
        descripcion: 'Favorece el desarrollo muscular en combinación con actividad física.',
      },
      {
        label: 'Grasas Saludables',
        porcentaje: '20%',
        color: '#f44336',
        fuentes: 'Frutos secos, aceite de oliva, palta',
        descripcion: 'Aumentan la densidad calórica de la dieta.',
      },
    ],
    beneficios: [
      'Favorece el aumento de peso saludable',
      'Promueve la síntesis muscular',
      'Mejora el rendimiento físico',
    ],
  },

  "Plan Alto Calorico": {
    descripcion: 'Plan indicado para personas con requerimientos energéticos elevados, como deportistas o pacientes con bajo peso.',
    macronutrientes: [
      {
        label: 'Carbohidratos',
        porcentaje: '55%',
        color: '#2196f3',
        fuentes: 'Fideos, batatas, frutas secas',
        descripcion: 'Base energética que permite un mayor rendimiento físico.',
      },
      {
        label: 'Proteínas',
        porcentaje: '25%',
        color: '#4caf50',
        fuentes: 'Leche, carnes, tofu, legumbres',
        descripcion: 'Soporte estructural y muscular esencial.',
      },
      {
        label: 'Grasas',
        porcentaje: '20%',
        color: '#ff5722',
        fuentes: 'Quesos, aceites vegetales, mantequilla de maní',
        descripcion: 'Incrementan el valor calórico sin aumentar el volumen de comida.',
      },
    ],
    beneficios: [
      'Aumenta la disponibilidad energética',
      'Previene pérdida de masa muscular',
      'Apoya la recuperación en procesos clínicos',
    ],
  },

  "Plan Personalizado": {
    descripcion: 'Diseñado a medida para cada paciente, teniendo en cuenta sus objetivos, preferencias y necesidades específicas.',
    macronutrientes: [],
    beneficios: [
      'Adaptado 100% al paciente',
      'Flexible en su ejecución',
      'Favorece la adherencia a largo plazo',
    ]
  },
  "Plan Vegetariano": {
    descripcion: 'Plan basado en alimentos de origen vegetal, ideal para personas que excluyen carnes pero incluyen huevos y lácteos.',
    macronutrientes: [
      {
        label: 'Carbohidratos Complejos',
        porcentaje: '50%',
        color: '#2196f3',
        fuentes: 'Avena, arroz integral, legumbres, frutas',
        descripcion: 'Aportan energía sostenida y fibra para una digestión saludable.',
      },
      {
        label: 'Proteínas Vegetales',
        porcentaje: '25%',
        color: '#4caf50',
        fuentes: 'Lentejas, tofu, huevos, yogur, quinoa',
        descripcion: 'Esenciales para el mantenimiento muscular y funciones celulares.',
      },
      {
        label: 'Grasas Saludables',
        porcentaje: '25%',
        color: '#ff9800',
        fuentes: 'Aceite de oliva, palta, frutos secos',
        descripcion: 'Contribuyen a la salud cardiovascular y hormonal.',
      },
    ],
    beneficios: [
      'Reduce el riesgo de enfermedades cardiovasculares',
      'Favorece la salud digestiva por su alto contenido en fibra',
      'Promueve una alimentación ética y sostenible',
      'Contribuye al control de peso y niveles de colesterol',
    ]
  },
  "Plan Vegano": {
    descripcion: 'Plan completamente basado en alimentos de origen vegetal, excluyendo todo tipo de productos animales.',
    macronutrientes: [
      {
        label: 'Carbohidratos Complejos',
        porcentaje: '55%',
        color: '#2196f3',
        fuentes: 'Cereales integrales, frutas, legumbres',
        descripcion: 'Proveen energía sostenible y fibra dietética.',
      },
      {
        label: 'Proteínas Vegetales',
        porcentaje: '25%',
        color: '#4caf50',
        fuentes: 'Tofu, tempeh, legumbres, quinoa, seitán',
        descripcion: 'Aportan aminoácidos esenciales para mantener masa muscular y funciones vitales.',
      },
      {
        label: 'Grasas Saludables',
        porcentaje: '20%',
        color: '#ff9800',
        fuentes: 'Frutos secos, semillas, aceite de oliva, palta',
        descripcion: 'Fundamentales para funciones hormonales y absorción de vitaminas liposolubles.',
      },
    ],
    beneficios: [
      'Reduce el riesgo de enfermedades crónicas',
      'Favorece la salud intestinal y digestiva',
      'Disminuye el impacto ambiental de la alimentación',
      'Apoya el control del colesterol y la presión arterial',
    ]
  },
  "Plan Normo Calórico": {
    descripcion: 'Plan equilibrado diseñado para mantener el peso corporal estable y cubrir los requerimientos nutricionales diarios.',
    macronutrientes: [
      {
        label: 'Carbohidratos',
        porcentaje: '50%',
        color: '#2196f3',
        fuentes: 'Arroz, avena, legumbres, frutas',
        descripcion: 'Proveen energía diaria y son clave para el funcionamiento cerebral y muscular.',
      },
      {
        label: 'Proteínas',
        porcentaje: '20%',
        color: '#4caf50',
        fuentes: 'Carnes magras, huevos, lácteos, legumbres',
        descripcion: 'Esenciales para la reparación y mantenimiento de tejidos corporales.',
      },
      {
        label: 'Grasas Saludables',
        porcentaje: '30%',
        color: '#ff9800',
        fuentes: 'Aceite de oliva, palta, frutos secos, semillas',
        descripcion: 'Aportan energía y son necesarias para funciones hormonales y absorción de vitaminas.',
      },
    ],
    beneficios: [
      'Mantiene el peso corporal de forma saludable',
      'Proporciona energía sostenida durante el día',
      'Favorece una alimentación balanceada y variada',
      'Ayuda a prevenir deficiencias nutricionales',
    ]
  }


};

export default PLAN_TEMPLATES;
