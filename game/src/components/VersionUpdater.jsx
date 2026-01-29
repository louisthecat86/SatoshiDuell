import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function VersionUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // 1. Die Version speichern, mit der die App gestartet wurde
    let initialVersion = null;

    const checkVersion = async () => {
      try {
        // Wir hängen ?t=... an, um Browser-Caching der JSON-Datei zu umgehen
        const res = await fetch(`/version.json?t=${Date.now()}`);
        const data = await res.json();
        const serverVersion = data.version;

        if (!initialVersion) {
          initialVersion = serverVersion;
        } else if (serverVersion !== initialVersion) {
          // Version auf Server ist anders als beim Start -> Update verfügbar!
          setUpdateAvailable(true);
        }
      } catch (err) {
        console.error("Versions-Check fehlgeschlagen:", err);
      }
    };

    // Sofort einmal checken (um initialVersion zu setzen)
    checkVersion();

    // Dann alle 2 Minuten prüfen (120000 ms)
    const interval = setInterval(checkVersion, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReload = () => {
    // Erzwingt Neuladen ohne Cache
    window.location.reload(true);
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-orange-500 text-black p-4 rounded-xl shadow-2xl border-2 border-black z-50 animate-in slide-in-from-bottom-5 flex items-center gap-4 max-w-sm">
      <div className="flex-1">
        <p className="font-bold text-sm uppercase">Update verfügbar!</p>
        <p className="text-xs opacity-80">Neue Fragen & Features sind da.</p>
      </div>
      <button 
        onClick={handleReload}
        className="bg-black text-white px-3 py-2 rounded-lg font-bold text-xs uppercase flex items-center gap-2 hover:bg-neutral-800 transition-colors"
      >
        <RefreshCw size={14} />
        Neu laden
      </button>
    </div>
  );
}