"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GamePanel2({
  onFinish,
}: {
  onFinish: (result: "win" | "lose") => void;
}) {
  const [climate, setClimate] = useState<"lluvia" | "despejado">("despejado");
  const [score, setScore] = useState({ you: 10, opponent: 10 });
  const [drive, setDrive] = useState("2nd & 8 desde la 30");
  const [log, setLog] = useState("Clima complicado, el estadio ruge...");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setClimate(Math.random() < 0.5 ? "lluvia" : "despejado");
  }, []);

  const playAction = (type: "pass" | "run" | "trick") => {
    setDisabled(true);
    setLog("Procesando jugada...");

    setTimeout(() => {
      const baseProb = type === "pass" ? 0.5 : type === "run" ? 0.6 : 0.4;
      const penalty = climate === "lluvia" ? 0.2 : 0;
      const result = Math.random();

      if (result < baseProb - penalty) {
        setLog("¡La jugada falla en medio de la tensión!");
        setScore((s) => ({ ...s, opponent: s.opponent + 3 }));
      } else {
        setLog("¡Gran jugada pese a la presión!");
        setScore((s) => ({ ...s, you: s.you + 7 }));
      }

      setDrive("3rd & 4 desde la 45");

      if (Math.random() < 0.3) {
        setTimeout(() => {
          onFinish(score.you > score.opponent ? "win" : "lose");
        }, 2000);
      }

      setDisabled(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-xl space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Clima: {climate === "lluvia" ? "🌧 Lluvia" : "☀️ Despejado"}</span>
        <span>Marcador</span>
      </div>

      <div className="text-center text-lg font-bold">
        Tú {score.you} - {score.opponent} Rival
      </div>

      <div className="text-center text-sm text-gray-300">{drive}</div>

      <motion.div
        key={log}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-yellow-400"
      >
        {log}
      </motion.div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <button
          onClick={() => playAction("pass")}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 rounded px-2 py-1 disabled:opacity-50"
        >
          Pase
        </button>
        <button
          onClick={() => playAction("run")}
          disabled={disabled}
          className="bg-green-600 hover:bg-green-700 rounded px-2 py-1 disabled:opacity-50"
        >
          Carrera
        </button>
        <button
          onClick={() => playAction("trick")}
          disabled={disabled}
          className="bg-purple-600 hover:bg-purple-700 rounded px-2 py-1 disabled:opacity-50"
        >
          Truco
        </button>
      </div>
    </div>
  );
}
