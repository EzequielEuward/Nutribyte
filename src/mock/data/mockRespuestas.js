export const mockRespuestas = [
    {
        trigger:['hola', 'buenos dias', 'buenas tardes', 'saludos']  ,
        response: '¡Hola! Soy tu asistente virtual de Nutrición. ¿En qué puedo ayudarte hoy con alimenticios, nutrideas o dietas?'
    },
    {
        trigger: ['planes para perder peso', 'planes para adelgazar', 'planes bajar de peso', 'planes nutricionales para bajar de peso', 'cómo perder peso'],
        response: 'Los planes nutricionales que suelen ayudar a perder peso o adelgazar son: el plan hiperproteico, ya que favorece la saciedad y la preservación de masa muscular; los planes vegetariano y vegano, siempre que se controlen las calorías; y el plan cardio protector, que incluye recomendaciones para mejorar la salud cardiovascular y puede ayudar a reducir peso. En cambio, los planes hipercalórico y alto calórico están orientados a ganar peso o masa muscular, mientras que el plan sin TACC está diseñado para personas con intolerancia al gluten y el normocalórico busca mantener el peso actual.'
    },
    {
        trigger:  ['hidratar', 'hidratación', 'agua', 'beber agua', 'cómo hidratarse'],
        response: 'La hidratación es clave para tu salud. Bebe al menos 8 vasos de agua al día, evita bebidas azucaradas y consume frutas y verduras con alta cantidad de agua.'
    },
    {
        trigger:  ['verduras con agua', 'frutas con agua', 'frutas y verduras con gran cantidad de agua', 'cuales verduras y frutas tiene agua', 'frutas y verduras para hidratarse'],
        response: 'Las frutas y verduras con mayor contenido de agua incluyen el pepino, la sandía, el melón, el apio, el tomate, la lechuga, la calabaza, la fresa, la naranja y la piña. Estas opciones son excelentes para mantenerte hidratado, ya que su alto contenido de agua ayuda a complementar la ingesta diaria de líquidos.'
    },
    {
        trigger: ['dieta vegetariana', 'vegana', 'soy vegetariano', 'vegetariano', 'vegano'] ,
        response: 'En una dieta vegetariana o vegana, es importante incluir fuentes variadas de proteínas como legumbres, tofu y frutos secos, además de cuidar la ingesta de vitamina B12, hierro y omega-3.'
    },
    {
        trigger: ['planes para ganar peso', 'planes para aumentar masa', 'aumentar masa muscular', 'quiero ganar peso', 'planes para ganar peso'],
        response: 'Para ganar peso o aumentar masa muscular, los planes más adecuados son el hipercalórico y el alto calórico, ya que proporcionan un superávit de calorías. Además, el plan hiperproteico ayuda a desarrollar masa muscular al aportar proteínas esenciales. Los planes vegetariano y vegano también pueden adaptarse para este objetivo si se controlan las calorías y se asegura un buen aporte proteico. En cambio, el plan normocalórico busca mantener el peso actual y el plan cardio protector está enfocado en la salud cardiovascular.'
    },
  
    {
        trigger: ['dieta vegetariana', 'dieta vegana', 'plan vegetariano vegetariano', 'plan alimenticio vegetariano', 'plan vegano'],
        response: 'Los planes que corresponden a dietas vegetarianas y veganas incluyen una alimentación basada en plantas. Estos planes se centran en consumir variedad de vegetales, frutas, legumbres, cereales integrales, frutos secos y semillas. En el caso del plan vegano, se excluyen todos los productos de origen animal, mientras que en el vegetariano se pueden incluir lácteos y huevos. Es importante asegurarse de obtener todos los nutrientes necesarios, como proteínas, vitamina B12, hierro y omega-3.'
    },
    {
        trigger: ['tips para comer sano', 'consejos para una dieta saludable', 'cómo comer mejor'],
        response:'Para comer sano y mantener una dieta equilibrada, aquí tienes algunos consejos útiles:\n' +
                'Prioriza alimentos naturales y frescos como frutas, verduras, legumbres y cereales integrales.\n' +
                'Limita el consumo de alimentos procesados, azúcares refinados y grasas saturadas.\n' +
                'Controla el tamaño de las porciones y come varias veces al día para mantener el metabolismo activo.\n' +
                'Mantente bien hidratado, preferentemente con agua.\n' +
                'Incorpora proteínas magras en tus comidas para mantener la masa muscular.\n' +
                'Evita saltarte comidas y procura tener horarios regulares.\n' +
                'Practica actividad física regularmente para complementar una buena nutrición.\n' +
                'Si tienes alguna duda específica o quieres recomendaciones personalizadas, ¡estaré encantado de ayudarte!'
    },

    {
        trigger: ['quiero opciones', 'planes alimenticios', 'ideas de menu','ideas de comidas', 'nutriidieas', 'inicio'],
        response: `¡Hola! Por favor, selecciona el número del plan alimenticio que te interesa:
                    1) Hipercalórico
                    2) Alto Calórico
                    3) Hiper Proteico
                    4) Vegetariano
                    5) Vegano
                    6) Sin T.A.C.C.
                    7) Normocalórico
                    8) Cardio Protector
        
                    Escribe el número correspondiente para recibir más información.`
    },
    {
        trigger: ['1', 'uno', 'hipercalorico', 'hipercalórico'],
        response: `Opciones para el plan Hiper Proteico:

                    - Bebida:
                        • Licuado de Proteína y Frutas

                    - Merienda:
                        • Tortilla de Claras con Espinaca
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
                    
    },
    {
        trigger: ['2', 'dos', 'vegano'],
        response: `Opciones para el plan Vegano:

                    - Ensalada:
                        • Ensalada de Garbanzos y Verduras
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
    },
    {
        trigger: ['3', 'tres', 'cardio protector'],
        response: `Opciones para el plan Cardio Protector:

                    - Plato principal:
                        • Salmón al Horno con Vegetales

                    - Bebida:
                        • Smoothie Verde
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
    },
    {
        trigger: ['4', 'cuatro', 'alto calorico'],
        response:`Opciones para el plan Alto Calórico:

                    - Plato principal:
                        • Pasta Carbonara
                    Puedes encontrar mas ideas en la seccion de NutriIdeas` 
    },
    {
        triggers: ['5', 'cinco', 'normo calorico', 'normocalorico'],
        response: `Opciones para el plan Normo Calorico:
    
                    - Desayuno:
                        • Porridge de Avena y Frutas
    
                    - Plato principal:
                        • Fideos Integrales con Salsa de Tomate y Albahaca
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
      },
      {
        triggers: ['6', 'seis', 'hiper calorico', 'hipercalorico'],
        response: `Opciones para el plan Hiper Calorico:
    
                    - Desayuno:
                        • Tostadas de Palta y Huevo
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
      },
      {
        triggers: ['7', 'siete', 'vegetariano'],
        response: `Opciones para el plan Vegetariano:
    
                    - Plato principal:
                        • Ensalada de Quinoa y Vegetales
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
      },
      {
        triggers: ['8', 'ocho', 'sin t.a.c.c.', 'sin tacc'],
        response: `Opciones para el plan Sin T.A.C.C.:
    
                    - Merienda:
                        • Galletas de Coco y Almendra
                    Puedes encontrar mas ideas en la seccion de NutriIdeas`
      },
      {
        triggers: ['default', '1', '>*', 'dewlkamp', 'nada'],
        response: `No entendí tu respuesta. Por favor escribe un número del 1 al 8 para seleccionar un plan, o escribe 'inicio' para ver las opciones nuevamente.`
      },

      {
        triggers: ['ayuda', 'necesito ayuda', 'puedes ayudarme', 'soporte', 'ayudame'],
        response: '¡Hola! ¿En qué puedo ayudarte? Puedes preguntarme sobre planes alimenticios, recetas, consejos nutricionales y más.'
      },


];
