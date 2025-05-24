import { useEffect, useState } from "react";

interface ChoiceLog {
  node: string;
  label: string;
  effects: Record<string, number>;
  timestamp: string;
}

export default function ChoiceHistoryPanel() {
  const [log, setLog] = useState<ChoiceLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("nfl_log");
    if (saved) setLog(JSON.parse(saved));
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🗂 Historial de decisiones</h2>
      {log.length === 0 ? (
        <p className="text-gray-400">Aún no has tomado decisiones.</p>
      ) : (
        <ul className="space-y-4 max-h-[60vh] overflow-auto pr-2">
          {log.map((entry, index) => (
            <li
              key={index}
              className="border border-gray-700 rounded-md p-3 bg-gray-800"
            >
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Nodo:</span> {entry.node}
              </div>
              <div className="text-base">
                <span className="font-medium">➡️ {entry.label}</span>
              </div>
              {Object.keys(entry.effects).length > 0 && (
                <div className="text-xs text-gray-300 mt-1">
                  {Object.entries(entry.effects).map(([key, val]) => (
                    <span key={key} className="inline-block mr-2">
                      +{val} {key}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
