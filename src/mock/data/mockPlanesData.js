export const planesInfo = {
  // Plan Hipercalórico (10) - (Manteniendo el ejemplo que me diste)
  10: {
    titulo: "Hiper Calórico",
    descripcion: "Diseñado para aumentar peso con un alto aporte calórico y nutrientes esenciales.",
    objetivo: "Lograr un aumento de peso saludable de 0.5-1 kg por semana mediante un superávit calórico controlado de 300-500 kcal sobre el gasto energético diario.",
    indicaciones: "Recomendado para personas con IMC <18.5, metabolismo acelerado o atletas en fase de volumen muscular. Contraindicado en obesidad o resistencia a la insulina.",
    rangoCalorico: {
      minimo: 2500,
      maximo: 4000,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.6-2.2g/kg peso corporal",
        ejemplo: "75kg → 120-165g/día",
        importancia: "Para síntesis muscular y evitar catabolismo"
      },
      carbohidratos: {
        rango: "4-7g/kg peso corporal",
        ejemplo: "75kg → 300-525g/día",
        tipos: "40% complejos, 30% fibrosos, 30% simples peri-entreno"
      },
      grasas: {
        rango: "0.8-1.2g/kg peso corporal",
        ejemplo: "75kg → 60-90g/día",
        tipos: "Monoinsaturadas > Poliinsaturadas > Saturadas"
      }
    },
    estadisticasPlan: [
      "Kcal Diarias: 3200",
      "Proteínas: 160g",
      "Carbohidratos: 400g",
      "Grasas: 90g"
    ],
    distribucionComidas: {
      frecuencia: "5-6 comidas cada 2.5-3 horas",
      ejemplo: [
        "Desayuno: 700 kcal (avena, huevos, fruta, mantequilla de maní)",
        "Media mañana: 500 kcal (batido hipercalórico, frutos secos)",
        "Almuerzo: 800 kcal (arroz, carne, vegetales, aceite oliva)",
        "Merienda: 600 kcal (pasta, atún, aguacate)",
        "Cena: 700 kcal (papa, pollo, vegetales)",
        "Pre-sueño: 500 kcal (requesón, almendras, miel)"
      ]
    },
    alimentosClave: [
      {
        grupo: "Carbohidratos", items: [
          "Avena",
          "Arroz basmati",
          "Quinoa",
          "Boniato",
          "Plátano"
        ]
      },
      {
        grupo: "Proteínas", items: [
          "Pechuga pollo",
          "Salmón",
          "Huevos",
          "Carne magra",
          "Proteína suero"
        ]
      },
      {
        grupo: "Grasas", items: [
          "Aguacate",
          "Aceite oliva",
          "Frutos secos",
          "Semillas",
          "Pescado azul"
        ]
      }
    ],
    beneficiosSalud: [
      "Aumento masa muscular en entrenamiento de fuerza",
      "Mejora recuperación post-ejercicio",
      "Aumenta reservas glucógeno muscular",
      "Previene catabolismo en deportes de resistencia"
    ],
    riesgos: [
      "Ganancia excesiva de grasa si superávit >500 kcal",
      "Posible resistencia insulínica con exceso carbohidratos simples",
      "Sobrecarga digestiva por volumen alimenticio"
    ],
  },
  // Plan Alto Calórico (20)
  20: {
    titulo: "Alto Calórico",
    descripcion: "Diseñado para deportistas con altos requerimientos energéticos y volumen de entrenamiento intenso.",
    objetivo: "Mantener el rendimiento atlético en disciplinas de alta demanda energética mediante un aporte calórico elevado pero equilibrado.",
    indicaciones: "Recomendado para atletas de resistencia (maratonistas, ciclistas) o fuerza-potencia (halterofilia, rugby). Contraindicado en sedentarios.",
    rangoCalorico: {
      minimo: 2800,
      maximo: 3500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.4-1.8g/kg peso corporal",
        ejemplo: "70kg → 98-126g/día",
        importancia: "Reparación tisular y mantenimiento muscular"
      },
      carbohidratos: {
        rango: "5-7g/kg peso corporal",
        ejemplo: "70kg → 350-490g/día",
        tipos: "50% complejos, 30% fibrosos, 20% peri-entreno"
      },
      grasas: {
        rango: "0.9-1.1g/kg peso corporal",
        ejemplo: "70kg → 63-77g/día",
        tipos: "Monoinsaturadas 50%, Poliinsaturadas 30%, Saturadas 20%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 3000",
      "Proteínas: 140g",
      "Carbohidratos: 420g",
      "Grasas: 80g"
    ],
    distribucionComidas: {
      frecuencia: "5-6 comidas + suplementos peri-entreno",
      ejemplo: [
        "Desayuno: 700 kcal (avena, huevos, plátano, miel)",
        "Pre-entreno: 400 kcal (batata, pollo, aceite oliva)",
        "Post-entreno: 600 kcal (arroz, pescado, vegetales, fruta)",
        "Almuerzo: 800 kcal (pasta, ternera, salsa tomate, queso)",
        "Merienda: 300 kcal (yogur griego, granola, mantequilla almendras)",
        "Cena: 600 kcal (arroz salvaje, salmón, espárragos)"
      ],
    },
    alimentosClave: [
      {
        grupo: "Carbohidratos", items: [
          "Batata",
          "Quinoa",
          "Avena",
          "Plátano",
          "Pasta integral"
        ]
      },
      {
        grupo: "Proteínas", items: [
          "Pechuga pavo",
          "Salmón",
          "Claras huevo",
          "Lomo cerdo",
          "Proteína whey"
        ]
      },
      {
        grupo: "Grasas", items: [
          "Aceite oliva",
          "Aguacate",
          "Nueces de Brasil",
          "Semillas chía",
          "Salmón"
        ]
      }
    ],
    beneficiosSalud: [
      "Optimiza rendimiento en entrenamientos prolongados",
      "Previene el sobreentrenamiento",
      "Acelera la recuperación muscular",
      "Mantiene la función inmunológica"
    ],
    riesgos: [
      "Posible aumento grasa corporal si no hay gasto equivalente",
      "Sobrecarga digestiva en comidas pre-entreno",
      "Desequilibrio electrolítico si no se hidrata adecuadamente"
    ],
  },
  // Plan Hiperproteico (30)
  30: {
    titulo: "Hiper Proteico",
    descripcion: "Enfocado en maximizar la síntesis proteica muscular con alto contenido de proteínas y control estricto de carbohidratos.",
    objetivo: "Estimular al máximo la hipertrofia muscular en fase de volumen o preservar masa magra en fase de definición.",
    indicaciones: "Recomendado para culturistas, fisicoculturistas o personas con alta demanda proteica. Precaución en problemas renales.",
    rangoCalorico: {
      minimo: 2200,
      maximo: 3000,
    },
    macronutrientes: {
      proteinas: {
        rango: "2.2-2.8g/kg peso corporal",
        ejemplo: "80kg → 176-224g/día",
        importancia: "Máxima estimulación MPS (síntesis proteica muscular)"
      },
      carbohidratos: {
        rango: "1.5-2.5g/kg peso corporal",
        ejemplo: "80kg → 120-200g/día",
        tipos: "70% complejos, 30% fibrosos"
      },
      grasas: {
        rango: "0.8-1.2g/kg peso corporal",
        ejemplo: "80kg → 64-96g/día",
        tipos: "Monoinsaturadas 40%, Saturadas 30%, Poliinsaturadas 30%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 2500",
      "Proteínas: 200g",
      "Carbohidratos: 180g",
      "Grasas: 90g"
    ],
    distribucionComidas: {
      frecuencia: "5-6 comidas con proteína cada 3 horas",
      ejemplo: [
        "Desayuno: 500 kcal (claras huevo, avena, almendras)",
        "Media mañana: 400 kcal (pollo, arroz basmati, brócoli)",
        "Almuerzo: 600 kcal (ternera, quinoa, espinacas, aceite oliva)",
        "Merienda: 400 kcal (proteína whey, aguacate, espárragos)",
        "Cena: 600 kcal (salmón, batata, coles de Bruselas)"
      ],
    },
    alimentosClave: [
      {
        grupo: "Proteínas", items: [
          "Claras huevo",
          "Pechuga pollo",
          "Filete ternera",
          "Proteína isolate",
          "Queso cottage"
        ],
      },
      {
        grupo: "Carbohidratos", items: [
          "Avena",
          "Batata",
          "Arroz basmati",
          "Brócoli",
          "Espárragos"
        ]
      },
      {
        grupo: "Grasas", items: [
          "Yema huevo",
          "Aceite coco",
          "Mantequilla almendras",
          "Aceite oliva",
          "Aguacate"
        ]
      }
    ],
    beneficiosSalud: [
      "Máxima retención de masa muscular en déficit calórico",
      "Mayor termogénesis por efecto térmico de las proteínas",
      "Mejor control del apetito y saciedad",
      "Óptima recuperación post-entrenamiento"
    ],
    riesgos: [
      "Posible sobrecarga renal en predisposición genética",
      "Estreñimiento por bajo consumo de fibra",
      "Mal aliento (halitosis) por cetosis leve",
      "Posible déficit energético en atletas de resistencia"
    ],
  },
  // Plan Vegetariano (40)
  40: {
    titulo: "Vegetariano",
    descripcion: "Dieta equilibrada que excluye carnes pero incluye lácteos, huevos y proteínas vegetales combinadas.",
    objetivo: "Asegurar un adecuado aporte de aminoácidos esenciales mediante combinación estratégica de proteínas vegetales y animales (lácteos/huevos).",
    indicaciones: "Recomendado para personas que desean reducir consumo de carne manteniendo alto valor biológico proteico.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.2-1.6g/kg peso corporal",
        ejemplo: "65kg → 78-104g/día",
        importancia: "Combinar legumbres + cereales para proteína completa"
      },
      carbohidratos: {
        rango: "3-5g/kg peso corporal",
        ejemplo: "65kg → 195-325g/día",
        tipos: "60% complejos, 30% fibrosos, 10% naturales"
      },
      grasas: {
        rango: "0.7-1.0g/kg peso corporal",
        ejemplo: "65kg → 45-65g/día",
        tipos: "Monoinsaturadas 50%, Poliinsaturadas 30%, Saturadas 20%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 2100",
      "Proteínas: 90g",
      "Carbohidratos: 280g",
      "Grasas: 65g"
    ],
    distribucionComidas: {
      frecuencia: "3 comidas principales + 2 snacks proteicos",
      ejemplo: [
        "Desayuno: 600 kcal (tostadas integrales, huevos, aguacate, queso)",
        "Media mañana: 300 kcal (yogur griego con nueces y miel)",
        "Almuerzo: 700 kcal (lentejas con arroz, vegetales, aceite oliva)",
        "Merienda: 300 kcal (batido de proteína de suero con frutos rojos)",
        "Cena: 500 kcal (quinoa, garbanzos, espinacas, queso feta)"
      ]
    },
    alimentosClave: [
      {
        grupo: "Proteínas", items: [
          "Huevos",
          "Queso cottage",
          "Yogur griego",
          "Lentejas",
          "Garbanzos"
        ]
      },
      {
        grupo: "Combinaciones", items: [
          "Arroz + lentejas",
          "Quinoa + garbanzos",
          "Maíz + frijoles"
        ]
      },
      {
        grupo: "Vegetales", items: [
          "Espinacas",
          "Brócoli",
          "Coliflor",
          "Zanahorias"
        ]
      },
      {
        grupo: "Grasas", items: [
          "Aceite oliva",
          "Aguacate",
          "Nueces",
          "Semillas"
        ]
      }
    ],
    beneficiosSalud: [
      "Reduce riesgo de enfermedades cardiovasculares",
      "Mayor consumo de fibra y antioxidantes",
      "Menor ingesta de grasas saturadas",
      "Mejor salud intestinal por prebióticos naturales"
    ],
    riesgos: [
      "Posible déficit de hierro hemínico",
      "Carencia de vitamina B12 si no se suplementa",
      "Dificultad para alcanzar requerimientos proteicos en algunos casos"
    ],
  },
  // Plan Vegano (50)
  50: {
    titulo: "Vegano",
    descripcion: "Dieta 100% basada en plantas, sin ningún producto de origen animal.",
    objetivo: "Cubrir todas las necesidades nutricionales mediante combinación estratégica de alimentos vegetales, con especial atención a nutrientes críticos.",
    indicaciones: "Recomendado para personas que buscan una alimentación ética y sostenible. Requiere planificación cuidadosa.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.4-1.8g/kg peso corporal",
        ejemplo: "60kg → 84-108g/día",
        importancia: "Combinar legumbres + cereales + frutos secos diariamente"
      },
      carbohidratos: {
        rango: "4-6g/kg peso corporal",
        ejemplo: "60kg → 240-360g/día",
        tipos: "60% complejos, 30% fibrosos, 10% naturales"
      },
      grasas: {
        rango: "0.7-1.0g/kg peso corporal",
        ejemplo: "60kg → 42-60g/día",
        tipos: "Monoinsaturadas 40%, Poliinsaturadas 40%, Saturadas 20%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 2000",
      "Proteínas: 85g",
      "Carbohidratos: 270g",
      "Grasas: 60g"
    ],
    distribucionComidas: {
      frecuencia: "3 comidas principales + 2-3 snacks",
      ejemplo: [
        "Desayuno: 600 kcal (tofu revuelto, tostadas integrales, aguacate)",
        "Media mañana: 300 kcal (batido de proteína de guisante con plátano)",
        "Almuerzo: 700 kcal (quinoa, lentejas, vegetales, aceite linaza)",
        "Merienda: 200 kcal (puñado de nueces y frutos secos)",
        "Cena: 500 kcal (garbanzos, arroz integral, espinacas, tahini)"
      ],
    },
    alimentosClave: [
      {
        grupo: "Proteínas", items: [
          "Tofu",
          "Tempeh",
          "Seitán",
          "Lentejas",
          "Garbanzos"
        ]
      },
      {
        grupo: "Combinaciones", items: [
          "Arroz + frijoles",
          "Quinoa + garbanzos",
          "Maíz + lentejas"
        ],
      },
      {
        grupo: "Vegetales", items: [
          "Espinacas",
          "Kale",
          "Brócoli",
          "Coles"
        ],
      },
      {
        grupo: "Grasas", items: [
          "Aceite linaza",
          "Nueces",
          "Semillas chía",
          "Aguacate"
        ],
      },
      {
        grupo: "Fortificados", items: [
          "Levadura nutricional",
          "Leches vegetales enriquecidas"
        ]
      }
    ],
    beneficiosSalud: [
      "Mayor consumo de fitoquímicos protectores",
      "Excelente perfil de ácidos grasos esenciales",
      "Alta densidad de micronutrientes por caloría",
      "Beneficios ambientales y éticos"
    ],
    riesgos: [
      "Déficit de vitamina B12 (requiere suplementación)",
      "Posible carencia de hierro, zinc y calcio",
      "Dificultad para alcanzar proteína completa diaria",
      "Bajo aporte de creatina y carnosina naturalmente"
    ],
  },
  // Plan Sin TACC (60)
  60: {
    titulo: "Sin TACC (Libre de Gluten)",
    descripcion: "Dieta estricta sin trigo, avena, cebada ni centeno para personas con celiaquía o sensibilidad al gluten.",
    objetivo: "Mantener la salud intestinal y prevenir síntomas mediante la eliminación total de gluten y prevención de contaminación cruzada.",
    indicaciones: "Obligatorio para celíacos. Precaución con productos procesados y contaminación cruzada.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.0-1.4g/kg peso corporal",
        ejemplo: "70kg → 70-98g/día",
        importancia: "Priorizar carnes magras, huevos y lácteos naturales"
      },
      carbohidratos: {
        rango: "3.5-5g/kg peso corporal",
        ejemplo: "70kg → 245-350g/día",
        tipos: "Quinoa, arroz, maíz, trigo sarraceno como bases"
      },
      grasas: {
        rango: "0.8-1.1g/kg peso corporal",
        ejemplo: "70kg → 56-77g/día",
        tipos: "Monoinsaturadas 50%, Poliinsaturadas 30%, Saturadas 20%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 2000",
      "Proteínas: 80g",
      "Carbohidratos: 280g",
      "Grasas: 60g"
    ],
    distribucionComidas: {
      frecuencia: "3 comidas principales + 2 snacks",
      ejemplo: [
        "Desayuno: 500 kcal (huevos, pan sin gluten, aguacate, fruta)",
        "Media mañana: 300 kcal (yogur con granola sin gluten y nueces)",
        "Almuerzo: 700 kcal (arroz integral, pollo, vegetales, aceite oliva)",
        "Merienda: 200 kcal (fruta con queso fresco)",
        "Cena: 500 kcal (salmón, quinoa, espárragos)"
      ],
    },
    alimentosClave: [
      {
        grupo: "Cereales Seguros", items: [
          "Quinoa",
          "Arroz integral",
          "Maíz",
          "Trigo sarraceno",
          "Amaranto"
        ],
      },
      {
        grupo: "Proteínas", items: [
          "Carnes frescas",
          "Pescados",
          "Huevos",
          "Legumbres",
          "Lácteos"
        ],
      },
      {
        grupo: "Vegetales", items: [
          "Todos frescos y naturales"
        ]
      },
      {
        grupo: "Alimentos Riesgo", items: [
          "Salsas",
          "Embutidos",
          "Productos procesados"
        ],
      },
    ],
    beneficiosSalud: [
      "Curación de la mucosa intestinal en celíacos",
      "Desaparición de síntomas digestivos",
      "Prevención de complicaciones a largo plazo",
      "Mejor absorción de nutrientes"
    ],
    riesgos: [
      "Déficit de fibra si no se consumen pseudocereales",
      "Mayor costo de productos especializados",
      "Posible déficit de vitaminas B en dieta restrictiva"
    ],
  },
  // Plan Normocalórico (70)
  70: {
    titulo: "Normo Calórico",
    descripcion: "Dieta equilibrada para mantenimiento de peso con balance energético neutro.",
    objetivo: "Mantener el peso corporal y salud metabólica mediante equilibrio exacto entre ingesta y gasto calórico.",
    indicaciones: "Ideal para población general sin objetivos de cambio de peso. Ajustar según actividad física.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "0.8-1.2g/kg peso corporal",
        ejemplo: "75kg → 60-90g/día",
        importancia: "Mantenimiento de masa magra y funciones vitales"
      },
      carbohidratos: {
        rango: "3-5g/kg peso corporal",
        ejemplo: "75kg → 225-375g/día",
        tipos: "60% complejos, 30% fibrosos, 10% naturales"
      },
      grasas: {
        rango: "0.6-1.0g/kg peso corporal",
        ejemplo: "75kg → 45-75g/día",
        tipos: "Monoinsaturadas 50%, Poliinsaturadas 30%, Saturadas 20%"
      },
    },
    estadisticasPlan: [
      "Kcal Diarias: 2000",
      "Proteínas: 80g",
      "Carbohidratos: 250g",
      "Grasas: 50g"
    ],
    distribucionComidas: {
      frecuencia: "3 comidas principales + 1-2 snacks",
      ejemplo: [
        "Desayuno: 500 kcal (pan integral, huevo, aguacate, fruta)",
        "Media mañana: 200 kcal (yogur con almendras)",
        "Almuerzo: 700 kcal (arroz, pescado, ensalada, aceite oliva)",
        "Cena: 500 kcal (pollo, quinoa, vegetales al vapor)"
      ],
    },
    alimentosClave: [
      {
        grupo: "Carbohidratos", items: [
          "Arroz integral",
          "Avena",
          "Quinoa",
          "Pan integral"
        ],
      },
      {
        grupo: "Proteínas", items: [
          "Pescado",
          "Pollo",
          "Huevos",
          "Legumbres"
        ],
      },
      {
        grupo: "Vegetales", items: [
          "Brócoli",
          "Espinacas",
          "Zanahorias",
          "Pimientos"
        ],
      },
      {
        grupo: "Grasas", items: [
          "Aceite oliva",
          "Aguacate",
          "Nueces",
          "Semillas"
        ],
      }
    ],
    beneficiosSalud: [
      "Mantenimiento de peso estable",
      "Prevención de enfermedades metabólicas",
      "Balance hormonal óptimo",
      "Energía sostenida sin fluctuaciones"
    ],
    riesgos: [
      "Posible aumento de peso si actividad física disminuye",
      "Déficit de nutrientes si variedad insuficiente"
    ],
  },
  // Plan Cardioprotector (80)
  80: {
    titulo: "Cardio Protector",
    descripcion: "Dieta enfocada en salud cardiovascular con énfasis en grasas saludables, fibra y antioxidantes.",
    objetivo: "Mejorar el perfil lipídico, reducir inflamación y prevenir enfermedades cardiovasculares.",
    indicaciones: "Recomendado para personas con antecedentes familiares o factores de riesgo cardiovascular.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.0-1.4g/kg peso corporal",
        ejemplo: "70kg → 70-98g/día",
        importancia: "Priorizar pescados azules y proteínas vegetales"
      },
      carbohidratos: {
        rango: "2.5-3.5g/kg peso corporal",
        ejemplo: "70kg → 175-245g/día",
        tipos: "70% complejos, 30% fibrosos"
      },
      grasas: {
        rango: "0.9-1.3g/kg peso corporal",
        ejemplo: "70kg → 63-91g/día",
        tipos: "Monoinsaturadas 50%, Poliinsaturadas 30%, Saturadas 20%"
      }
    },
    estadisticasPlan: [
      "Kcal Diarias: 2000",
      "Proteínas: 90g",
      "Carbohidratos: 200g",
      "Grasas: 70g"
    ],
    distribucionComidas: {
      frecuencia: "3 comidas principales + 1 snack",
      ejemplo: [
        "Desayuno: 500 kcal (avena, nueces, frutos rojos, linaza)",
        "Almuerzo: 700 kcal (salmón, quinoa, espárragos, aceite oliva)",
        "Merienda: 200 kcal (puñado de almendras y manzana)",
        "Cena: 600 kcal (atún, lentejas, espinacas, aguacate)"
      ]
    },
    alimentosClave: [
      {
        grupo: "Grasas Saludables", items: [
          "Salmón",
          "Atún",
          "Aceite oliva",
          "Nueces",
          "Aguacate"
        ]
      },
      {
        grupo: "Fibras Solubles", items: [
          "Avena",
          "Manzana",
          "Legumbres",
          "Brócoli",
          "Zanahoria"
        ]
      },
      {
        grupo: "Antioxidantes", items: [
          "Frutos rojos",
          "Té verde",
          "Cúrcuma",
          "Chocolate negro"
        ]
      },
      {
        grupo: "Alimentos Restringir", items: [
          "Grasas trans",
          "Azúcares añadidos",
          "Exceso sodio"
        ]
      }
    ],
    beneficiosSalud: [
      "Reducción del colesterol LDL",
      "Aumento del colesterol HDL",
      "Disminución de la presión arterial",
      "Reducción de la inflamación sistémica"
    ],
    riesgos: [
      "Posible déficit energético en deportistas",
      "Exceso de omega-6 si no se balancea con omega-3"
    ],
  },
  // Plan Keto (90)
  90: {
    titulo: "Keto",
    descripcion: "Dieta muy baja en carbohidratos que induce cetosis nutricional como estado metabólico alternativo.",
    objetivo: "Lograr y mantener niveles de cetonas en sangre de 0.5-3.0 mmol/L para beneficios metabólicos y neurológicos.",
    indicaciones: "Bajo supervisión profesional. Indicado para epilepsia refractaria, diabetes tipo 2 controlada, resistencia a insulina.",
    rangoCalorico: {
      minimo: 1500,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "1.2-1.8g/kg masa magra",
        ejemplo: "60kg masa magra → 72-108g/día",
        importancia: "Mantenimiento muscular sin afectar cetosis"
      },
      carbohidratos: {
        rango: "20-50g netos/día",
        ejemplo: "30g (solo vegetales fibrosos)",
        tipos: "Espinacas, brócoli, coliflor, aguacate"
      },
      grasas: {
        rango: "70-80% calorías totales",
        ejemplo: "1800 kcal → 140-160g/día",
        tipos: "Saturadas 40%, Monoinsaturadas 40%, Poliinsaturadas 20%"
      }
    },
    estadisticasPlan: [
      "Kcal Diarias: 1800",
      "Proteínas: 100g",
      "Carbohidratos: 30g",
      "Grasas: 140g"
    ],
    distribucionComidas: {
      frecuencia: "2-3 comidas/día (puede incluir ayuno intermitente)",
      ejemplo: [
        "Desayuno: 600 kcal (huevos con tocino, aguacate, espinacas)",
        "Almuerzo: 700 kcal (salmón con mantequilla, espárragos, champiñones)",
        "Cena: 500 kcal (pollo con piel, brócoli, queso gratinado)"
      ]
    },
    alimentosClave: [
      {
        grupo: "Grasas Saludables", items: [
          "Aceite coco",
          "Mantequilla",
          "Aguacate",
          "Nueces macadamia",
          "Aceite oliva"
        ]
      },
      {
        grupo: "Proteínas", items: [
          "Carnes grasas",
          "Pescados azules",
          "Huevos",
          "Quesos curados"
        ]
      },
      {
        grupo: "Vegetales", items: [
          "Espinacas",
          "Coles",
          "Brócoli",
          "Coliflor",
          "Espárragos"
        ]
      },
      {
        grupo: "Alimentos Restringidos", items: [
          "Cereales",
          "Azúcares",
          "Legumbres",
          "Tubérculos",
          "Frutas"
        ]
      }
    ],
    beneficiosSalud: [
      "Pérdida de peso acelerada inicial",
      "Mejor control glucémico en diabetes tipo 2",
      "Posible efecto neuroprotector en epilepsia",
      "Reducción de triglicéridos en sangre"
    ],
    riesgos: [
      "Cetogripe inicial (fatiga, dolor cabeza, irritabilidad)",
      "Posible déficit de micronutrientes",
      "Estreñimiento por falta de fibra",
      "No recomendado a largo plazo sin supervisión"
    ],
  },
  // Plan Estándar Saludable (100)
  100: {
    titulo: "Estándar Saludable",
    descripcion: "Dieta equilibrada basada en guías nutricionales internacionales (OMS, USDA) para población general.",
    objetivo: "Prevención de enfermedades crónicas mediante alimentación variada, suficiente y adecuada.",
    indicaciones: "Recomendado para mantenimiento de salud a largo plazo. Adaptable a todas las edades y condiciones.",
    rangoCalorico: {
      minimo: 1800,
      maximo: 2500,
    },
    macronutrientes: {
      proteinas: {
        rango: "10-15% calorías totales",
        ejemplo: "2000 kcal → 50-75g/día",
        importancia: "50% animal, 50% vegetal para variedad"
      },
      carbohidratos: {
        rango: "45-65% calorías totales",
        ejemplo: "2000 kcal → 225-325g/día",
        tipos: "<10% azúcares simples"
      },
      grasas: {
        rango: "25-35% calorías totales",
        ejemplo: "2000 kcal → 55-75g/día",
        tipos: "<10% saturadas, 15-20% monoinsaturadas, 5-10% poliinsaturadas"
      }
    },
    estadisticasPlan: [
      "Kcal Diarias: 2000",
      "Proteínas: 75g",
      "Carbohidratos: 250g",
      "Grasas: 65g"
    ],
    distribucionAlimentos: [
      {
        grupo: "Vegetales", raciones: "3-5/día (1 ración = 1 taza crudos)"
      },
      {
        grupo: "Frutas", raciones: "2-4/día (1 ración = 1 pieza mediana)"
      },
      {
        grupo: "Cereales", raciones: "6-8/día (1 ración = 1 rebanada pan)"
      },
      {
        grupo: "Proteínas", raciones: "2-3/día (1 ración = 100g carne)"
      },
      {
        grupo: "Lácteos", raciones: "2-3/día (1 ración = 1 vaso leche)"
      },
      {
        grupo: "Grasas", raciones: "3-5/día (1 ración = 1 cucharada aceite)"
      }
    ],
    alimentosClave: [
      {
        grupo: "Proteínas Variadas", items: [
          "Pescado",
          "Pollo",
          "Huevos",
          "Legumbres",
          "Lácteos"
        ]
      },
      {
        grupo: "Carbohidratos Complejos", items: [
          "Arroz integral",
          "Avena",
          "Quinoa",
          "Pan integral"
        ]
      },
      {
        grupo: "Vegetales", items: [
          "Brócoli",
          "Espinacas",
          "Zanahorias",
          "Pimientos"
        ]
      },
      {
        grupo: "Frutas", items: [
          "Manzana",
          "Plátano",
          "Naranja",
          "Fresas"
        ]
      },
      {
        grupo: "Grasas Saludables", items: [
          "Aceite oliva",
          "Aguacate",
          "Nueces",
          "Semillas"
        ]
      }
    ],
    beneficiosSalud: [
      "Reducción del 30% en riesgo cardiovascular",
      "Prevención de diabetes tipo 2",
      "Mantenimiento de peso saludable",
      "Optimización de la función digestiva",
      "Sostenibilidad a largo plazo"
    ],
    riesgos: [
      "Posibles déficits si no hay variedad suficiente",
      "Exceso de calorías si porciones no se controlan"
    ],
  }
};