import { useEffect } from 'react';

export default function VersionUpdater() {
  useEffect(() => {
    let initialVersion = null;

    const checkVersion = async () => {
      try {
        // Wir hängen ?t=... an, um Browser-Caching der JSON-Datei zu umgehen
        const res = await fetch(`/version.json?t=${Date.now()}`);
        if (!res.ok) return;
        
        const data = await res.json();
        const serverVersion = data.version;

        if (!initialVersion) {
          // Beim ersten Laden: Version speichern
          initialVersion = serverVersion;
        } else if (serverVersion !== initialVersion) {
          console.log(`🚀 Update gefunden! Lade neu... (${initialVersion} -> ${serverVersion})`);
          
          // ZWINGT den Browser zum Neuladen vom Server (Hard Reload)
          window.location.reload(true);
        }
      } catch (err) {
        console.error("Auto-Update Check fehlgeschlagen:", err);
      }
    };

    // 1. Sofort prüfen beim Start
    checkVersion();

    // 2. Alle 30 Sekunden prüfen (kürzerer Intervall für schnelleres Update)
    const interval = setInterval(checkVersion, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  // WICHTIG: Wir geben 'null' zurück, damit NICHTS auf dem Bildschirm angezeigt wird.
  return null;
}