/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

const LOCAL_KEY = "nfl_player_data";

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  touchdowns: number;
  interceptions: number;
  fame: number;
  fitness: number;
  reputation: number;
  season?: number;
  week?: number;
  checkpoint?: string;
  lastEvent?: string;
}

export interface PlayerData {
  name: string;
  position: string;
  avatar: string;
  stats: PlayerStats;
}

export function usePlayerData() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setPlayerData(JSON.parse(stored));
    }
  }, []);

  const updatePlayerData = (updates: Partial<PlayerData>) => {
    setPlayerData((prev: any) => {
      const newData = { ...prev, ...updates };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newData));
      return newData;
    });
  };

  const resetPlayerData = () => {
    localStorage.removeItem(LOCAL_KEY);
    setPlayerData(null);
  };

  return {
    playerData,
    updatePlayerData,
    resetPlayerData,
  };
}
