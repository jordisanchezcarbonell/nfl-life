"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerStep {
  id: string;
  label: string;
  order: number;
  description?: string;
}

interface Props {
  currentNode: string;
  onNavigate?: (nodeId: string) => void;
}

const allSteps: CareerStep[] = [
  {
    id: "highschool",
    label: "🏫 High School",
    order: 1,
    description: "Tus años iniciales como jugador",
  },
  {
    id: "camp",
    label: "🏕️ Campus Elite",
    order: 2,
    description: "Participaste en un campamento de élite",
  },
  {
    id: "college",
    label: "🎓 Universidad",
    order: 3,
    description: "Jugaste en el nivel universitario",
  },
  {
    id: "game_panel_1",
    label: "🏈 Partido 1",
    order: 4,
    description: "Primer partido oficial de la temporada",
  },
  {
    id: "game_panel_2",
    label: "🏈 Partido 2",
    order: 5,
    description: "Partido bajo presión y clima complicado",
  },
  {
    id: "draft",
    label: "📺 Draft NFL",
    order: 6,
    description: "Te enfrentas al gran momento del draft",
  },
  {
    id: "agent",
    label: "🤝 Agente",
    order: 7,
    description: "Negociaciones y oportunidades con agentes",
  },
  {
    id: "nfl_team",
    label: "💼 Firma en NFL",
    order: 8,
    description: "Firma oficial con tu primer equipo",
  },
  {
    id: "superbowl",
    label: "🏆 Super Bowl",
    order: 9,
    description: "Tu objetivo final: la gloria absoluta",
  },
];

export default function CareerMap({ currentNode, onNavigate }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [maxReached, setMaxReached] = useState(0);

  const currentIndex = useMemo(() => {
    const index = allSteps.findIndex((s) => s.id === currentNode);
    return index === -1 ? 0 : index;
  }, [currentNode]);

  useEffect(() => {
    const stored = localStorage.getItem("career_max");
    if (stored) {
      setMaxReached(Math.max(parseInt(stored), currentIndex));
    } else {
      setMaxReached(currentIndex);
    }
  }, []);

  useEffect(() => {
    if (currentIndex > maxReached) {
      setMaxReached(currentIndex);
      localStorage.setItem("career_max", String(currentIndex));
    }
  }, [currentIndex, maxReached]);

  const colorFor = (idx: number) => {
    if (idx < currentIndex) return "bg-green-500 text-white cursor-pointer";
    if (idx === currentIndex) return "bg-yellow-400 text-black cursor-pointer";
    if (idx <= maxReached) return "bg-gray-400 text-black cursor-pointer";
    return "bg-gray-600 text-gray-400 cursor-not-allowed";
  };

  return (
    <div className="relative flex flex-col gap-4 w-full max-w-3xl mx-auto py-8">
      <h2 className="text-xl font-bold text-center mb-2">Mapa de Carrera</h2>
      <div className="flex flex-wrap gap-4 justify-center relative">
        {allSteps.map((step, idx) => {
          const isAccessible = idx <= maxReached;
          return (
            <motion.button
              key={step.id}
              onClick={() => {
                if (isAccessible && onNavigate) onNavigate(step.id);
              }}
              onMouseEnter={() => setHovered(step.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative rounded-xl px-4 py-2 min-w-[120px] text-center text-sm font-medium shadow ${colorFor(
                idx
              )}`}
            >
              {step.label}
              <AnimatePresence>
                {hovered === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full mt-2 z-10 w-48 text-xs bg-black text-white p-2 rounded shadow-xl pointer-events-none"
                  >
                    <p className="font-semibold mb-1">{step.label}</p>
                    <p>{step.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
