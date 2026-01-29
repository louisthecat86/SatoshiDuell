// generate-version.js
import fs from 'fs';

const versionInfo = {
  version: Date.now() // Wir nutzen einfach den Zeitstempel als Version
};

// Schreibt die Datei in den public Ordner, damit sie erreichbar ist
fs.writeFileSync('./public/version.json', JSON.stringify(versionInfo));

console.log('✅ version.json wurde erstellt:', versionInfo.version);