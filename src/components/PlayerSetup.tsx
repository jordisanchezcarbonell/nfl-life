"use client";

import { useState } from "react";

export default function PlayerSetup({ onStart }: { onStart: () => void }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const avatarOptions = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleStart = () => {
    if (!name || !position) return alert("Completa todos los campos");
    localStorage.setItem(
      "nfl_player",
      JSON.stringify({
        name,
        position,
        avatar: avatarOptions[selectedAvatar],
      })
    );
    onStart();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-xl shadow-xl space-y-6">
        <h1 className="text-2xl font-bold">Crea tu jugador</h1>
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        >
          <option value="">Elige una posición</option>
          <option value="QB">Quarterback (QB)</option>
          <option value="WR">Wide Receiver (WR)</option>
          <option value="RB">Running Back (RB)</option>
          <option value="LB">Linebacker (LB)</option>
          <option value="CB">Cornerback (CB)</option>
        </select>
        <h2 className="text-lg font-bold mt-4">Elige tu avatar</h2>
        <div className="flex gap-4 justify-center mt-2">
          {avatarOptions.map((avatar, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAvatar(idx)}
              className={`rounded border-4 ${
                selectedAvatar === idx
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={avatar}
                alt={`Avatar ${idx + 1}`}
                className="w-24 h-24 rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded"
        >
          Empezar carrera
        </button>
        <button
          onClick={() => {
            setSelectedAvatar(Math.floor(Math.random() * avatarOptions.length));
            setPosition(
              ["QB", "WR", "RB", "LB", "CB"][Math.floor(Math.random() * 5)]
            );
            setName(`Player${Math.floor(Math.random() * 1000)}`);
          }}
          className="w-full bg-gray-600 hover:bg-gray-700 transition px-4 py-2 rounded text-sm"
        >
          Crear jugador aleatorio
        </button>
      </div>
    </div>
  );
}
