"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GamePanel({
  onFinish,
}: {
  onFinish: (result: "win" | "lose") => void;
}) {
  const quarter = 1;
  const time = "10:35";

  const [score, setScore] = useState({ you: 7, opponent: 3 });
  const [drive, setDrive] = useState("3rd & 5 desde la 45");
  const [log, setLog] = useState("Comienza la jugada...");
  const [disabled, setDisabled] = useState(false);

  const playAction = (type: "pass" | "run" | "trick") => {
    setDisabled(true);
    setLog("Procesando jugada...");

    setTimeout(() => {
      const result = Math.random();

      if (type === "pass" && result > 0.4) {
        setLog("¡Pase completo de 20 yardas!");
        setScore((s) => ({ ...s, you: s.you + 7 }));
        setDrive("1st & 10 desde la 25");
      } else if (type === "run" && result > 0.5) {
        setLog("Avance sólido por tierra.");
        setDrive("2nd & 3 desde la 37");
      } else {
        setLog("La jugada no funcionó...");
        setDrive("4th down, toca despejar.");
        setScore((s) => ({ ...s, opponent: s.opponent + 3 }));
      }

      // Simular final del partido con 20% de probabilidad
      if (Math.random() < 0.2) {
        setTimeout(
          () => onFinish(score.you > score.opponent ? "win" : "lose"),
          2000
        );
      }

      setDisabled(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-xl space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Q{quarter}</span>
        <span>{time}</span>
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
