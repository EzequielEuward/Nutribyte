export const mockRespuestas = [
  {
    trigger: ["hola", "buenos dias", "buenas tardes", "saludos"],
    response:
      "¡Hola! Soy tu asistente virtual de Nutrición. ¿En qué puedo ayudarte hoy con alimenticios, nutrideas o dietas?",
  },
  {
    trigger: [
      "plan para perder peso",
      "plan para adelgazar",
      "plan bajar de peso",
      "plan nutricionales para bajar de peso",
      "cómo perder peso",
    ],
    response:
      "Los plan nutricionales que suelen ayudar a perder peso o adelgazar son: el plan hiperproteico, ya que favorece la saciedad y la preservación de masa muscular; los planes vegetariano y vegano, siempre que se controlen las calorías; y el plan cardio protector, que incluye recomendaciones para mejorar la salud cardiovascular y puede ayudar a reducir peso. En cambio, los planes hipercalórico y alto calórico están orientados a ganar peso o masa muscular, mientras que el plan sin TACC está diseñado para personas con intolerancia al gluten y el normocalórico busca mantener el peso actual.",
  },
  {
    trigger: [
      "hidratar",
      "hidratación",
      "agua",
      "beber agua",
      "cómo hidratarse",
    ],
    response:
      "La hidratación es clave para tu salud. Bebe al menos 8 vasos de agua al día, evita bebidas azucaradas y consume frutas y verduras con alta cantidad de agua.",
  },
  {
    trigger: [
      "verduras con agua",
      "frutas con agua",
      "frutas y verduras con gran cantidad de agua",
      "cuales verduras y frutas tiene agua",
      "frutas y verduras para hidratarse",
    ],
    response:
      "Las frutas y verduras con mayor contenido de agua incluyen el pepino, la sandía, el melón, el apio, el tomate, la lechuga, la calabaza, la fresa, la naranja y la piña. Estas opciones son excelentes para mantenerte hidratado, ya que su alto contenido de agua ayuda a complementar la ingesta diaria de líquidos.",
  },
  {
    trigger: [
      "dieta vegetariana",
      "vegana",
      "soy vegetariano",
      "vegetariano",
      "vegano",
    ],
    response:
      "En una dieta vegetariana o vegana, es importante incluir fuentes variadas de proteínas como legumbres, tofu y frutos secos, además de cuidar la ingesta de vitamina B12, hierro y omega-3.",
  },
  {
    trigger: [
      "plan para ganar peso",
      "plan para aumentar masa",
      "aumentar masa muscular",
      "quiero ganar peso",
      "plan para ganar peso",
    ],
    response:
      "Para ganar peso o aumentar masa muscular, los plan más adecuados son el hipercalórico y el alto calórico, ya que proporcionan un superávit de calorías. Además, el plan hiperproteico ayuda a desarrollar masa muscular al aportar proteínas esenciales. Los planes vegetariano y vegano también pueden adaptarse para este objetivo si se controlan las calorías y se asegura un buen aporte proteico. En cambio, el plan normocalórico busca mantener el peso actual y el plan cardio protector está enfocado en la salud cardiovascular.",
  },

  {
    trigger: [
      "dieta vegetariana",
      "dieta vegana",
      "plan vegetariano vegetariano",
      "plan alimenticio vegetariano",
      "plan vegano",
    ],
    response:
      "Los planes que corresponden a dietas vegetarianas y veganas incluyen una alimentación basada en plantas. Estos planes se centran en consumir variedad de vegetales, frutas, legumbres, cereales integrales, frutos secos y semillas. En el caso del plan vegano, se excluyen todos los productos de origen animal, mientras que en el vegetariano se pueden incluir lácteos y huevos. Es importante asegurarse de obtener todos los nutrientes necesarios, como proteínas, vitamina B12, hierro y omega-3.",
  },
  {
    trigger: [
      "tips para comer sano",
      "consejos para una dieta saludable",
      "cómo comer mejor",
    ],
    response:
      "Para comer sano y mantener una dieta equilibrada, aquí tienes algunos consejos útiles:\n" +
      "Prioriza alimentos naturales y frescos como frutas, verduras, legumbres y cereales integrales.\n" +
      "Limita el consumo de alimentos procesados, azúcares refinados y grasas saturadas.\n" +
      "Controla el tamaño de las porciones y come varias veces al día para mantener el metabolismo activo.\n" +
      "Mantente bien hidratado, preferentemente con agua.\n" +
      "Incorpora proteínas magras en tus comidas para mantener la masa muscular.\n" +
      "Evita saltarte comidas y procura tener horarios regulares.\n" +
      "Practica actividad física regularmente para complementar una buena nutrición.\n" +
      "Si tienes alguna duda específica o quieres recomendaciones personalizadas, ¡estaré encantado de ayudarte!",
  },

  {
    trigger: [
      "quiero opciones",
      "planes",
      "planes alimenticios",
      "ideas de menu",
      "ideas de comidas",
      "nutriidieas",
      "inicio",
    ],
    response: `¡Hola! Por favor, selecciona el número del plan alimenticio que te interesa:
                    1) Hipercalórico
                    2) Alto Calórico
                    3) Hiper Proteico
                    4) Vegetariano
                    5) Vegano
                    6) Sin T.A.C.C.
                    7) Normocalórico
                    8) Cardio Protector
        
                    Escribe solamente el número correspondiente para recibir más información.`,
  },
  {
    plan: 'Hiper Proteico',
    trigger: ['1', 'uno', 'hiperproteico', 'hiper proteico', 'proteico'],
    response: `PLAN HIPER PROTEICO 🍗🥚\n\nEste plan está diseñado para personas que buscan aumentar su masa muscular o requieren un mayor aporte proteico en su alimentación.\n\n🍹 Bebida recomendada:\n  • Licuado de Proteína y Frutas\n\n🥪 Merienda:\n  • Tortilla de Claras con Espinaca\n\n💡 Tip: Ideal para quienes hacen entrenamiento de fuerza.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Vegano',
    trigger: ['2', 'dos', 'vegano', 'plan vegano', 'alimentación vegana'],
    response: `PLAN VEGANO 🌱🥑\n\nPensado para personas que no consumen productos de origen animal y desean mantener una alimentación equilibrada.\n\n🥗 Ensalada:\n  • Ensalada de Garbanzos y Verduras\n\n💡 Tip: Asegurate de incluir vitamina B12 en tu dieta.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Cardio Protector',
    trigger: ['3', 'tres', 'cardio protector', 'cardioprotector', 'plan corazón'],
    response: `PLAN CARDIO PROTECTOR ❤️🥗\n\nDiseñado para personas que desean cuidar su salud cardiovascular mediante una dieta equilibrada.\n\n🍽️ Plato principal:\n  • Salmón al Horno con Vegetales\n\n🥤 Bebida:\n  • Smoothie Verde\n\n💡 Tip: Rico en ácidos grasos omega-3.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Alto Calórico',
    trigger: ['4', 'cuatro', 'alto calorico', 'altocalórico', 'plan engorde'],
    response: `PLAN ALTO CALÓRICO 🍝🍞\n\nEste plan es ideal para personas que necesitan aumentar de peso o requieren un aporte energético elevado.\n\n🍽️ Plato principal:\n  • Pasta Carbonara\n\n💡 Tip: Asegurate de distribuir las calorías en 5 o 6 comidas.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Normo Calórico',
    trigger: ['5', 'cinco', 'normo calorico', 'normocalorico', 'balanceado'],
    response: `PLAN NORMO CALÓRICO 🍽️⚖️\n\nIdeal para personas que desean mantener su peso actual con una alimentación equilibrada.\n\n🍓 Desayuno:\n  • Porridge de Avena y Frutas\n\n🍝 Plato principal:\n  • Fideos Integrales con Salsa de Tomate y Albahaca\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Hiper Calórico',
    trigger: ['6', 'seis', 'hiper calorico', 'hipercalorico', 'hipercalórico'],
    response: `PLAN HIPER CALÓRICO 🍳🥑\n\nIdeal para deportistas o personas con requerimientos calóricos altos.\n\n🍳 Desayuno:\n  • Tostadas de Palta y Huevo\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Vegetariano',
    trigger: ['7', 'siete', 'vegetariano', 'plan vegetariano', 'alimentación vegetariana'],
    response: `PLAN VEGETARIANO 🥦🍚\n\nPara quienes no consumen carnes pero sí derivados de origen animal como huevos o lácteos.\n\n🍲 Plato principal:\n  • Ensalada de Quinoa y Vegetales\n\n💡 Tip: Combiná legumbres y cereales para asegurar proteínas completas.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    plan: 'Sin T.A.C.C.',
    trigger: ['8', 'ocho', 'sin tacc', 'sin t.a.c.c.', 'libre de gluten', 'celíaco', 'celiaco'],
    response: `PLAN SIN T.A.C.C. 🌾🚫\n\nDiseñado para personas con intolerancia al gluten o enfermedad celíaca.\n\n🍪 Merienda:\n  • Galletas de Coco y Almendra (sin gluten)\n\n💡 Tip: Verificá siempre los sellos en los alimentos.\n\n👉 Más ideas en la sección NutriIdeas.`
  },
  {
    trigger: ['default', '>*', 'ninguno', 'no sé', 'nada', 'no entiendo'],
    response: `❗ No entendí tu respuesta.\n\nPor favor, escribe un número del 1 al 8 para seleccionar un plan, o escribe "inicio" para ver las opciones nuevamente.`
  },
  {
    trigger: ['ayuda', 'necesito ayuda', 'puedes ayudarme', 'soporte', 'ayudame', 'help'],
    response: `👋 ¡Hola! Estoy aquí para ayudarte.\n\nPodés preguntarme sobre planes alimenticios, recetas, consejos nutricionales y más. Escribí un número del 1 al 8 para ver un plan específico.`
  }
];