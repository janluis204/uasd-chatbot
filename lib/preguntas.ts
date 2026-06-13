/**
 * Preguntas sugeridas organizadas por categoría temática.
 * Cubren los temas principales del Estatuto Orgánico de la UASD.
 */
export interface PreguntaCategoria {
  categoria: string;
  preguntas: string[];
}

export const PREGUNTAS_SUGERIDAS: PreguntaCategoria[] = [
  {
    categoria: "Identidad y Misión",
    preguntas: [
      "¿Qué es la Universidad Autónoma de Santo Domingo?",
      "¿Cuál es la misión de la UASD?",
      "¿Cuáles son los fines de la Universidad?",
      "¿Cuáles son las funciones fundamentales de la UASD?",
      "¿Qué establece el Estatuto sobre la autonomía universitaria?",
      "¿Cuáles son los principios que orientan a la Universidad?",
    ],
  },
  {
    categoria: "Gobierno y Estructura",
    preguntas: [
      "¿Cómo está organizada la Universidad?",
      "¿Cuáles son los organismos de gobierno de la UASD?",
      "¿Qué es el Claustro Mayor?",
      "¿Qué es el Claustro Menor?",
      "¿Qué es el Consejo Universitario?",
      "¿Quiénes integran el Consejo Universitario?",
      "¿Cuáles son las atribuciones del Consejo Universitario?",
    ],
  },
  {
    categoria: "Autoridades",
    preguntas: [
      "¿Cuáles son las funciones del Rector?",
      "¿Cuáles son las funciones de los Vicerrectores?",
      "¿Cuáles son las funciones de los Decanos?",
      "¿Cuáles son las funciones de los Directores de Escuela?",
    ],
  },
  {
    categoria: "Facultades y Escuelas",
    preguntas: [
      "¿Qué son las Facultades?",
      "¿Cómo se organizan las Facultades?",
      "¿Qué son los Consejos Directivos de Facultad?",
      "¿Qué son las Escuelas?",
      "¿Qué establece el Estatuto sobre los Recintos, Centros y Subcentros?",
    ],
  },
  {
    categoria: "Personal Docente",
    preguntas: [
      "¿Qué establece el Estatuto sobre el personal docente?",
      "¿Cuáles son los derechos del personal docente?",
      "¿Cuáles son los deberes del personal docente?",
    ],
  },
  {
    categoria: "Estudiantes",
    preguntas: [
      "¿Qué establece el Estatuto sobre los estudiantes?",
      "¿Cuáles son los derechos de los estudiantes?",
      "¿Cuáles son los deberes de los estudiantes?",
      "¿Qué establece el Estatuto sobre la representación estudiantil?",
    ],
  },
  {
    categoria: "Funciones Académicas",
    preguntas: [
      "¿Qué establece el Estatuto sobre la investigación?",
      "¿Qué establece el Estatuto sobre el postgrado?",
      "¿Qué establece el Estatuto sobre la extensión universitaria?",
      "¿Qué establece el Estatuto sobre el bienestar universitario?",
    ],
  },
  {
    categoria: "Normativa",
    preguntas: [
      "¿Qué establece el Estatuto sobre el régimen disciplinario?",
      "¿Qué establece el Estatuto sobre el patrimonio universitario?",
    ],
  },
];

// Lista plana de todas las preguntas (útil para búsqueda rápida)
export const TODAS_LAS_PREGUNTAS: string[] = PREGUNTAS_SUGERIDAS.flatMap(
  (cat) => cat.preguntas
);
