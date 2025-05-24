/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import PlayerSetup from "./PlayerSetup";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import CareerMap from "./CareerMap";
import PlayerStatsPanel from "./PlayerStatsPanel";
import PlayerCard from "./PlayerCard";
import { PlayerStats, usePlayerData } from "@/hooks/usePlayerData";
import { storyNodes } from "@/data/storyNodes";

const GamePanel = dynamic(() => import("./GamePanel"), { ssr: false });
const GamePanel2 = dynamic(() => import("./GamePanel2"), { ssr: false });

function getTier(total: number) {
  if (total >= 180) return "Leyenda";
  if (total >= 120) return "Élite";
  if (total >= 60) return "Promesa";
  return "Rookie";
}

function getTierColor(tier: string) {
  return (
    {
      Rookie: "bg-gray-400",
      Promesa: "bg-green-500",
      Élite: "bg-yellow-400",
      Leyenda: "bg-purple-500",
    }[tier] || "bg-gray-400"
  );
}

export default function StoryPage() {
  const [currentNode, setCurrentNode] = useState("start");
  const [showStats, setShowStats] = useState(false);
  const { playerData, updatePlayerData, resetPlayerData } = usePlayerData();
  const totalXP =
    (playerData?.stats.fame || 0) +
    (playerData?.stats.fitness || 0) +
    (playerData?.stats.reputation || 0);
  const tier = getTier(totalXP);

  useEffect(() => {
    const savedNode = localStorage.getItem("nfl_current_node");
    if (savedNode && storyNodes[savedNode]) {
      setCurrentNode(savedNode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nfl_current_node", currentNode);
  }, [currentNode]);

  const handleOptionClick = (next: string, effects: Partial<PlayerStats>) => {
    if (!playerData) return;

    const updatedStats = {
      ...playerData.stats,
      fame: playerData.stats.fame + (effects.fame || 0),
      fitness: playerData.stats.fitness + (effects.fitness || 0),
      reputation: playerData.stats.reputation + (effects.reputation || 0),
    };

    updatePlayerData({ stats: updatedStats });
    setCurrentNode(next);
  };

  const handleReset = () => {
    localStorage.removeItem("nfl_current_node");
    localStorage.removeItem("career_max");
    resetPlayerData();
    window.location.reload();
  };

  if (!playerData) {
    return (
      <PlayerSetup
        onStart={() => {
          const saved = localStorage.getItem("nfl_player");
          if (saved) {
            const parsed = JSON.parse(saved);
            updatePlayerData({
              name: parsed.name,
              position: parsed.position,
              avatar: parsed.avatar,
              stats: {
                fame: 0,
                fitness: 0,
                reputation: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                touchdowns: 0,
                interceptions: 0,
                season: 1,
                week: 1,
              },
            });
          }
        }}
      />
    );
  }

  const node = storyNodes[currentNode];

  if (!node) {
    return (
      <div className="text-red-500 text-center p-4">
        Nodo no encontrado: <strong>{currentNode}</strong>
      </div>
    );
  }

  const options =
    typeof node.options === "function"
      ? node.options(playerData, {
          ...playerData.stats,
          season: playerData.stats.season ?? 1,
          week: playerData.stats.week ?? 1,
        })
      : node.options;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 lg:col-span-2 mb-6 bg-gray-800 rounded-xl px-4 py-3 text-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-white">Nivel: {tier}</span>
            <div className="w-64 h-2 bg-gray-700 rounded">
              <div
                className={`h-2 rounded ${getTierColor(tier)}`}
                style={{
                  width: `${Math.min(
                    (playerData.stats.fame +
                      playerData.stats.fitness +
                      playerData.stats.reputation) /
                      3,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-gray-400">
            Partidos: {playerData.stats.gamesPlayed} · TDs:{" "}
            {playerData.stats.touchdowns} · INT:{" "}
            {playerData.stats.interceptions}
          </div>
        </div>
        {/* LEFT PANEL */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
          {/* Mostrar solo en desktop */}
          <div className="hidden lg:block">
            <CareerMap currentNode={currentNode} />
          </div>
          {/* Mostrar en mobile con toggle */}
          <div className="block lg:hidden mb-4">
            <details className="bg-gray-800 rounded-md">
              <summary className="cursor-pointer px-4 py-2 font-semibold">
                📍 Ver progreso
              </summary>
              <div className="p-4">
                <CareerMap currentNode={currentNode} />
              </div>
            </details>
          </div>

          <div className="flex justify-between items-center mb-4 mt-6">
            <h1 className="text-3xl font-bold">NFL Life</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStats((prev) => !prev)}
                className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
              >
                {showStats ? "Ocultar stats" : "Ver stats"}
              </button>
              <button
                onClick={handleReset}
                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Reiniciar
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <Image
              src={playerData.avatar}
              alt="Avatar del jugador"
              width={64}
              height={64}
              className="rounded-full border-4 border-blue-500"
            />
            <div>
              <p className="text-xl font-semibold">{playerData.name}</p>
              <p className="text-sm text-gray-400">{playerData.position}</p>
              <p className="text-xs text-gray-500">
                📆 Temporada {playerData.stats.season} - Semana{" "}
                {playerData.stats.week}
              </p>
            </div>
          </motion.div>

          {node.component === "GamePanel" ? (
            <GamePanel
              onFinish={(result) => {
                const updated = {
                  ...playerData.stats,
                  gamesPlayed: playerData.stats.gamesPlayed + 1,
                };
                if (result === "win") {
                  updated.gamesWon += 1;
                  updated.touchdowns += 1;
                  updated.fame += 10;
                  updated.reputation += 5;
                  setCurrentNode("game1_result_win");
                } else {
                  updated.interceptions += 1;
                  updated.fitness += 3;
                  updated.reputation -= 3;
                  setCurrentNode("game1_result_lose");
                }
                updatePlayerData({ stats: updated });
              }}
            />
          ) : node.component === "GamePanel2" ? (
            <GamePanel2
              onFinish={(result) => {
                const updated = {
                  ...playerData.stats,
                  gamesPlayed: playerData.stats.gamesPlayed + 1,
                };
                if (result === "win") {
                  updated.gamesWon += 1;
                  updated.touchdowns += 2;
                  updated.fame += 15;
                  updated.fitness -= 5;
                  updated.reputation += 10;
                  setCurrentNode("game2_result_win");
                } else {
                  updated.interceptions += 1;
                  updated.fitness -= 5;
                  updated.reputation -= 5;
                  setCurrentNode("game2_result_lose");
                }
                updatePlayerData({ stats: updated });
              }}
            />
          ) : (
            <>
              <p className="mb-6 text-lg leading-relaxed">
                {typeof node.text === "function"
                  ? node.text(playerData, {
                      ...playerData.stats,
                      season: playerData.stats.season ?? 1,
                      week: playerData.stats.week ?? 1,
                    })
                  : node.text}
              </p>

              <div className="space-y-4">
                {options.length === 0 ? (
                  <p className="text-green-400 bg-green-900 bg-opacity-30 p-3 rounded">
                    🎉 Fin del capítulo. ¡Gracias por jugar!
                  </p>
                ) : (
                  options.map(
                    (
                      option: {
                        next: string;
                        effects: any;
                        label:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactPortal
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | null
                              | undefined
                            >
                          | null
                          | undefined;
                      },
                      idx: Key | null | undefined
                    ) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleOptionClick(option.next, option.effects)
                        }
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded text-lg"
                      >
                        {option.label}
                      </button>
                    )
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden lg:block bg-gray-900 p-6 rounded-2xl shadow-xl">
          {showStats ? <PlayerCard /> : <PlayerStatsPanel />}
        </div>
        <div className="block lg:hidden mb-4">
          <details className="bg-gray-800 rounded-md">
            <summary className="cursor-pointer px-4 py-2 font-semibold">
              📊 Ver estadísticas
            </summary>
            <div className="p-4">
              {showStats ? <PlayerCard /> : <PlayerStatsPanel />}
            </div>
          </details>
        </div>
      </div>

      <footer className="mt-6 text-sm text-gray-400">
        NFL Life · v1 · Temporada {playerData.stats.season} · Semana{" "}
        {playerData.stats.week}
      </footer>
    </div>
  );
}
