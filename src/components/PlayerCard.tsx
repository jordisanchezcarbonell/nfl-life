"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePlayerData } from "@/hooks/usePlayerData";

export default function PlayerCard() {
  const { playerData } = usePlayerData();

  if (!playerData) return null;

  const { name, position, avatar, stats } = playerData;
  const totalScore = stats.fame + stats.fitness + stats.reputation;

  const tier =
    totalScore >= 180
      ? "Leyenda"
      : totalScore >= 120
      ? "Élite"
      : totalScore >= 60
      ? "Promesa"
      : "Rookie";

  const tierColor = {
    Rookie: "border-gray-400",
    Promesa: "border-green-500",
    Élite: "border-yellow-400",
    Leyenda: "border-purple-500",
  }[tier];

  const bgGradient = {
    Rookie: "from-gray-600 to-gray-800",
    Promesa: "from-green-600 to-emerald-800",
    Élite: "from-yellow-400 to-orange-600",
    Leyenda: "from-purple-700 to-indigo-900",
  }[tier];

  const badges: string[] = [];
  if (stats.touchdowns >= 10) badges.push("🔥 MVP");
  if (stats.interceptions <= 2 && stats.gamesPlayed >= 5)
    badges.push("🧠 IQ Alto");
  if (stats.gamesWon >= 5) badges.push("🎯 Precisión");

  const renderBar = (label: string, value: number, color: string) => (
    <div>
      <p className="text-xs mb-0.5">{label}</p>
      <div className="w-full bg-black bg-opacity-30 rounded h-2">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${bgGradient} p-4 rounded-xl shadow-xl text-white w-full max-w-sm mx-auto animate-pulse`}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={avatar}
          alt="Avatar"
          width={80}
          height={80}
          className={`rounded-full border-4 ${tierColor}`}
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-gray-300">{position}</p>
          <p className="text-xs mt-1 px-2 py-0.5 rounded-full bg-black bg-opacity-30 inline-block">
            🏅 {tier}
          </p>
          {typeof stats.season !== "undefined" &&
            typeof stats.week !== "undefined" && (
              <p className="text-xs text-gray-400">
                📆 Temporada {stats.season} - Semana {stats.week}
              </p>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm">
        {renderBar("🎮 Jugados", stats.gamesPlayed * 10, "bg-blue-400")}
        {renderBar("✅ Ganados", stats.gamesWon * 10, "bg-green-400")}
        {renderBar("🏈 Touchdowns", stats.touchdowns * 10, "bg-yellow-300")}
        {renderBar("❌ Intercepciones", stats.interceptions * 10, "bg-red-500")}
        {renderBar("⭐ Fama", stats.fame, "bg-purple-400")}
        {renderBar("💪 Fitness", stats.fitness, "bg-emerald-400")}
        {renderBar("📢 Reputación", stats.reputation, "bg-pink-400")}
      </div>

      {badges.length > 0 && (
        <div className="mt-4">
          <p className="font-bold mb-1">🏆 Insignias desbloqueadas</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-black bg-opacity-40 px-2 py-1 rounded-full text-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      {stats.lastEvent && (
        <div className="mt-4 text-xs text-gray-300 italic">
          📣 Último evento: “{stats.lastEvent}”
        </div>
      )}

      {stats.checkpoint && (
        <div className="mt-2 text-xs text-gray-400">
          💾 Último checkpoint guardado: <strong>{stats.checkpoint}</strong>
        </div>
      )}
    </motion.div>
  );
}
