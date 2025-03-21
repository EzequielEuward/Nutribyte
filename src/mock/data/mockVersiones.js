export const getMockVersions = () => {
    return Promise.resolve([
      {
        id: "v1.2.5",
        date: "2025-03-18",
        time: "14:32",
        author: "María García",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        authorInitials: "MG",
        changes: 12,
        status: "stable", // stable | prerelease | obsolete
        shortDescription: "Actualización de interfaz de usuario y corrección de errores",
        longDescription:
          "En esta versión se realizaron ajustes importantes en la interfaz para mejorar la experiencia de usuario, además de corregir varios errores menores reportados por los usuarios.",
      },
      {
        id: "v1.2.4-beta",
        date: "2025-03-10",
        time: "09:00",
        author: "Carlos Pérez",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        authorInitials: "CP",
        changes: 5,
        status: "prerelease",
        shortDescription: "Versión de prueba con nuevas funciones experimentales",
        longDescription:
          "Esta es una versión de prueba que incluye la integración de la API externa de pagos y un nuevo módulo de reportes avanzados. Puede presentar inestabilidades.",
      },
      {
        id: "v1.2.3",
        date: "2025-02-25",
        time: "17:10",
        author: "María García",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        authorInitials: "MG",
        changes: 8,
        status: "obsolete",
        shortDescription: "Corrección de errores críticos en seguridad",
        longDescription:
          "Se corrigieron vulnerabilidades de seguridad críticas y se mejoró la gestión de tokens de autenticación. Esta versión quedó obsoleta tras la salida de la 1.2.4-beta.",
      },
      {
        id: "v1.2.2",
        date: "2025-02-10",
        time: "11:45",
        author: "Ana López",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        authorInitials: "AL",
        changes: 10,
        status: "stable",
        shortDescription: "Integración con API externa y mejoras de UX/UI",
        longDescription:
          "Se añadió la integración con la API de proveedores y se realizaron mejoras generales en la experiencia de usuario. Correcciones menores en la interfaz.",
      },
    ]);
  };
  