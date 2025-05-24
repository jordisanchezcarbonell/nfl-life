"use client";

import { useEffect, useState } from "react";

interface PlayerStatsData {
  gamesPlayed: number;
  gamesWon: number;
  touchdowns: number;
  interceptions: number;
  totalFame: number;
  totalFitness: number;
  totalReputation: number;
}

export default function PlayerStatsPanel() {
  const [stats, setStats] = useState<PlayerStatsData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nfl_extended_stats");
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-700 text-white p-4 rounded-xl shadow-xl mt-4 text-sm">
      <h2 className="text-lg font-bold mb-2">Estadísticas del jugador</h2>
      <ul className="space-y-1">
        <li>🎮 Partidos jugados: {stats.gamesPlayed}</li>
        <li>✅ Partidos ganados: {stats.gamesWon}</li>
        <li>🏈 Touchdowns: {stats.touchdowns}</li>
        <li>❌ Intercepciones: {stats.interceptions}</li>
        <li>⭐ Fama total acumulada: {stats.totalFame}</li>
        <li>💪 Forma física acumulada: {stats.totalFitness}</li>
        <li>📢 Reputación acumulada: {stats.totalReputation}</li>
      </ul>
    </div>
  );
}
