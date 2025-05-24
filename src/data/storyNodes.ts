// Archivo: storyNodes.ts
import { StoryNode } from "./types";

export const storyNodes: Record<string, StoryNode> = {
  start: {
    text: (player) =>
      `Último año de instituto. Eres ${player?.position}. ¿Cómo empiezas tu camino hacia la NFL?`,
    options: (player) => {
      if (!player) return [];
      return [
        {
          label: "Entrenar fuerte desde el primer día",
          next: "early_training",
          effects: { fitness: 10 },
        },
        {
          label: "Buscar un mentor experimentado",
          next: "find_mentor",
          effects: { reputation: 5 },
        },
        {
          label: "Unirte al equipo de élite local",
          next: "join_elite_team",
          effects: { fame: 8, fitness: 5 },
        },
      ];
    },
  },
  early_training: {
    text: "Entrenas duro cada mañana. Tu cuerpo se fortalece.",
    options: [
      {
        label: "Participar en torneo regional",
        next: "regional_tournament",
        effects: { fitness: 5, fame: 5 },
      },
      {
        label: "Mantener rutina estricta",
        next: "routine_payoff",
        effects: { reputation: 5 },
      },
    ],
  },
  find_mentor: {
    text: "Un exjugador acepta ayudarte. Ganas consejos valiosos.",
    options: [
      {
        label: "Grabar sesiones para YouTube",
        next: "youtube_series",
        effects: { fame: 10 },
      },
      {
        label: "Mantener entrenamiento discreto",
        next: "quiet_progress",
        effects: { fitness: 5 },
      },
    ],
  },
  join_elite_team: {
    text: "Te unes al mejor equipo de tu zona. La competencia es dura.",
    options: [
      {
        label: "Ganar titularidad",
        next: "earn_spot",
        effects: { fitness: 5, reputation: 5 },
      },
      {
        label: "Observar desde el banquillo",
        next: "bench_observation",
        effects: { reputation: 3 },
      },
    ],
  },
  routine_payoff: {
    text: "Tu constancia es notada. Empiezas a destacar por tu disciplina.",
    options: [
      {
        label: "Siguiente etapa",
        next: "prep_challenge",
        effects: { reputation: 2 },
      },
    ],
  },
  youtube_series: {
    text: "Tus videos se viralizan. Aumenta tu visibilidad.",
    options: [
      {
        label: "Aprovechar fama para obtener patrocinio",
        next: "brand_deal",
        effects: { fame: 15 },
      },
    ],
  },
  quiet_progress: {
    text: "Mejoras sin llamar la atención. Los scouts discretos te siguen.",
    options: [
      {
        label: "Invitación secreta a campus",
        next: "secret_camp",
        effects: { fitness: 5, reputation: 5 },
      },
    ],
  },
  regional_tournament: {
    text: "Compites contra lo mejor del estado. Cada jugada cuenta.",
    options: [
      {
        label: "Ganaste el torneo",
        next: "tournament_win",
        effects: { fame: 15 },
      },
      {
        label: "Eliminado en semifinales",
        next: "tournament_lose",
        effects: { reputation: 5 },
      },
    ],
  },
  tournament_win: {
    text: "¡Campeón regional! Tu nombre suena en todos los medios locales.",
    options: [
      {
        label: "Seguir entrenando",
        next: "prep_challenge",
        effects: { fitness: 5 },
      },
    ],
  },
  tournament_lose: {
    text: "Perdiste, pero tu rendimiento impresionó a los ojeadores.",
    options: [
      {
        label: "Revisar errores y mejorar",
        next: "prep_challenge",
        effects: { reputation: 5 },
      },
    ],
  },
  brand_deal: {
    text: "Una marca deportiva menor te ofrece promoción.",
    options: [
      {
        label: "Aceptar trato",
        next: "sponsor_path",
        effects: { fame: 10 },
      },
      {
        label: "Rechazar y mantener independencia",
        next: "independent_path",
        effects: { reputation: 10 },
      },
    ],
  },
  sponsor_path: {
    text: "Tu imagen aparece en redes. Te reconocen por la calle.",
    options: [
      {
        label: "Utilizar visibilidad para eventos benéficos",
        next: "charity_game",
        effects: { reputation: 10 },
      },
    ],
  },
  independent_path: {
    text: "Valoran tu integridad. Ganas seguidores por ser auténtico.",
    options: [
      {
        label: "Seguir compartiendo entrenos",
        next: "build_trust",
        effects: { reputation: 5, fame: 5 },
      },
    ],
  },
  secret_camp: {
    text: "Un coach universitario te invita a un campus cerrado. Nadie lo sabrá.",
    options: [
      {
        label: "Impresionar en secreto",
        next: "underground_offer",
        effects: { fame: 5, reputation: 10 },
      },
    ],
  },
  earn_spot: {
    text: "Con trabajo y talento, te conviertes en titular.",
    options: [
      {
        label: "Primer partido oficial",
        next: "game_panel_1",
        effects: {},
      },
    ],
  },
  bench_observation: {
    text: "Aprendes desde el banquillo, esperando tu oportunidad.",
    options: [
      {
        label: "Tu oportunidad llega",
        next: "game_panel_1",
        effects: { reputation: 5 },
      },
    ],
  },
  prep_challenge: {
    text: (player, stats) =>
      stats.fitness >= 30
        ? "Has alcanzado un nivel físico impresionante. Se avecinan desafíos mayores."
        : "Aún debes trabajar más para estar listo para el siguiente nivel.",
    options: [
      {
        label: "Ir a juego decisivo",
        next: "game_panel_2",
        effects: {},
        condition: (player, stats) => stats.fitness >= 30,
      },
      {
        label: "Volver a entrenar",
        next: "early_training",
        effects: { fitness: 5 },
        condition: (player, stats) => stats.fitness < 30,
      },
    ],
  },
  charity_game: {
    text: "Participas en un evento benéfico. El público te adora.",
    options: [
      {
        label: "Pasar al siguiente capítulo",
        next: "draft_day",
        effects: { fame: 10, reputation: 10 },
      },
    ],
  },
  build_trust: {
    text: "Tu comunidad en redes confía cada vez más en ti.",
    options: [
      {
        label: "Evento benéfico organizado por ti",
        next: "charity_game",
        effects: { reputation: 10 },
      },
    ],
  },
};
