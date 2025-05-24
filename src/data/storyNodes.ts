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

  game_panel_2: {
    text: "",
    options: [],
    component: "GamePanel2",
  },
  game2_result_win: {
    text: "🏆 ¡Increíble actuación bajo presión! Tu fama se dispara y los medios te mencionan como futura estrella.",
    options: [
      {
        label: "🎯 Declararte elegible para el draft profesional",
        next: "nfl_draft",
        effects: { fame: 20, reputation: 15 },
      },
    ],
  },
  game2_result_lose: {
    text: "💧 El clima y la presión te pasaron factura, pero tu esfuerzo no pasó desapercibido para los ojeadores.",
    options: [
      {
        label: "🔁 Seguir entrenando para intentarlo de nuevo",
        next: "nfl_draft",
        effects: { fitness: 10, reputation: 5 },
      },
    ],
  },
  nfl_draft: {
    text: "🎤 Día del draft. El salón está lleno de cámaras. Los equipos anuncian sus selecciones. ¿Qué esperas?",
    options: [
      {
        label: "🟢 Primera ronda",
        next: "draft_result_top",
        effects: { fame: 30 },
      },
      {
        label: "🟡 Ronda media",
        next: "draft_result_mid",
        effects: { reputation: 10 },
      },
      {
        label: "🔴 Última ronda o no drafteado",
        next: "draft_result_late",
        effects: { fitness: 5 },
      },
    ],
  },
  draft_result_top: {
    text: "🌟 ¡Felicidades! Has sido seleccionado en la primera ronda. Te espera una carrera brillante como estrella emergente.",
    options: [],
  },
  draft_result_mid: {
    text: "📈 Fuiste elegido en una ronda intermedia. Te queda todo por demostrar, pero tienes potencial de sobra.",
    options: [],
  },
  draft_result_late: {
    text: "💼 No saliste en las primeras rondas, pero lograste una oportunidad. ¡A trabajar duro para ganarte el puesto!",
    options: [],
  },
};
