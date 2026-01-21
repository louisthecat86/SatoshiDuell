export const ALL_QUESTIONS = [
  // --- BITCOIN GRUNDLAGEN ---
  {
    q: "Wer veröffentlichte 2008 das Bitcoin Whitepaper?",
    options: ["Satoshi Nakamoto", "Vitalik Buterin", "Hal Finney", "Nick Szabo"],
    correct: 0
  },
  {
    q: "Wie viele Bitcoins wird es jemals maximal geben?",
    options: ["21 Milliarden", "210 Millionen", "21 Millionen", "Unbegrenzt"],
    correct: 2
  },
  {
    q: "In welchem Jahr wurde der Genesis-Block (Block 0) gemined?",
    options: ["2008", "2009", "2010", "2011"],
    correct: 1
  },
  {
    q: "Wie nennt man die kleinste Einheit eines Bitcoins?",
    options: ["Bit", "Satoshi", "Litoshi", "MilliBit"],
    correct: 1
  },
  {
    q: "In welchem Zeitabstand werden im Durchschnitt neue Bitcoin-Blöcke gefunden?",
    options: ["2 Minuten", "10 Minuten", "60 Minuten", "24 Stunden"],
    correct: 1
  },
  {
    q: "Was passiert beim Bitcoin 'Halving'?",
    options: ["Der Preis halbiert sich", "Die Blockzeit wird halbiert", "Die Emission neuer BTC halbiert sich", "Die Anzahl der Nodes halbiert sich"],
    correct: 2
  },
  {
    q: "Welcher Hash-Algorithmus wird bei Bitcoin Proof-of-Work verwendet?",
    options: ["Scrypt", "Ethash", "SHA-256", "X11"],
    correct: 2
  },
  {
    q: "Wie viele Satoshis ergeben einen ganzen Bitcoin?",
    options: ["1 Million", "10 Millionen", "100 Millionen", "1 Milliarde"],
    correct: 2
  },

  // --- GELDSYSTEM & ÖKONOMIE ---
  {
    q: "Was beschreibt der Begriff 'Fiat-Geld'?",
    options: ["Geld mit Golddeckung", "Geld durch staatliche Verordnung", "Geld aus Metall", "Schnelles Geld"],
    correct: 1
  },
  {
    q: "Was ist Inflation?",
    options: ["Steigerung der Kaufkraft", "Minderung der Geldmenge", "Anstieg des allgemeinen Preisniveaus", "Wirtschaftswachstum"],
    correct: 2
  },
  {
    q: "Was versteht man unter dem 'Cantillon-Effekt'?",
    options: ["Geld kommt bei allen gleichzeitig an", "Ungleiche Verteilung von neuem Geld", "Die Wirkung von Zinsen", "Die Erfindung des Papiergeldes"],
    correct: 1
  },
  {
    q: "Wer gilt als Hauptvertreter der Österreichischen Schule der Nationalökonomie?",
    options: ["John Maynard Keynes", "Ludwig von Mises", "Karl Marx", "Milton Friedman"],
    correct: 1
  },
  {
    q: "Was ist das Hauptmerkmal von 'Hard Money' (hartem Geld)?",
    options: ["Es ist schwer zu transportieren", "Es ist schwer zu fälschen", "Es ist schwer zu produzieren/vermehren", "Es besteht aus Diamanten"],
    correct: 2
  },
  {
    q: "Welches Ereignis fand am 15. August 1971 statt (Nixon Schock)?",
    options: ["Bitcoin Erfindung", "Ende der Golddeckung des US-Dollars", "Gründung der FED", "Erster Weltkrieg"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Fractional Reserve Banking'?",
    options: ["Banken halten 100% Reserve", "Banken verleihen Geld, das sie nicht haben", "Banken gehören dem Staat", "Banken nutzen nur Gold"],
    correct: 1
  },

  // --- TECHNIK & NETZWERK ---
  {
    q: "Was ist eine 'Full Node'?",
    options: ["Ein Mining-Rechner", "Ein Gerät, das alle Regeln validiert", "Ein Bitcoin-Geldautomat", "Ein schneller Internetanschluss"],
    correct: 1
  },
  {
    q: "Was speichert ein 'Private Key'?",
    options: ["Die Adresse des Nutzers", "Die Berechtigung, BTC zu bewegen", "Den Namen des Besitzers", "Die Transaktionshistorie"],
    correct: 1
  },
  {
    q: "Was ist das 'Lightning Network'?",
    options: ["Ein neuer Bitcoin-Nachfolger", "Eine Layer-2 Lösung für schnelle Zahlungen", "Ein Mining-Pool", "Ein Stromnetz"],
    correct: 1
  },
  {
    q: "Was bedeutet 'HODL' ursprünglich?",
    options: ["Hold On for Dear Life", "Ein Tippfehler für 'Hold'", "High Output Digital Ledger", "Home Operated Decentralized Login"],
    correct: 1
  },
  {
    q: "Was ist die 'Difficulty Adjustment'?",
    options: ["Anpassung der BTC-Menge", "Anpassung der Mining-Schwierigkeit", "Änderung der Blockgröße", "Steueranpassung"],
    correct: 1
  },
  {
    q: "Wie oft findet das Difficulty Adjustment statt?",
    options: ["Jeden Tag", "Alle 2016 Blöcke (ca. 2 Wochen)", "Alle 4 Jahre", "Jedes Mal beim Mining"],
    correct: 1
  },
  {
    q: "Was ist eine 'Cold Wallet'?",
    options: ["Eine Wallet im Kühlschrank", "Eine Wallet ohne Internetverbindung", "Eine langsame Wallet", "Eine Wallet für Altcoins"],
    correct: 1
  },

  // --- GESCHICHTE & KULTUR ---
  {
    q: "Wie viel bezahlte Laszlo Hanyecz 2010 für zwei Pizzen?",
    options: ["1 BTC", "100 BTC", "1.000 BTC", "10.000 BTC"],
    correct: 3
  },
  {
    q: "Welches Land führte Bitcoin als erstes als gesetzliches Zahlungsmittel ein?",
    options: ["Schweiz", "USA", "El Salvador", "Zentralafrikanische Republik"],
    correct: 2
  },
  {
    q: "Was steht in der Zeitungsüberschrift im Genesis-Block?",
    options: ["The Times: Chancellor on brink of second bailout", "Bitcoin is born", "The Dollar is dead", "Satoshi was here"],
    correct: 0
  },
  {
    q: "Wer war die erste Person, die eine Bitcoin-Transaktion von Satoshi erhielt?",
    options: ["Hal Finney", "Elon Musk", "Dorian Nakamoto", "Craig Wright"],
    correct: 0
  },
  {
    q: "Was bedeutet der Begriff 'Double Spending'?",
    options: ["Zweimal am Tag BTC kaufen", "Gleiche digitale Münze zweimal ausgeben", "Bitcoin Kurs verdoppelt sich", "Zwei Wallets besitzen"],
    correct: 1
  },
  {
    q: "Was versteht man unter 'Stock-to-Flow'?",
    options: ["Aktienkurs-Vorhersage", "Verhältnis von Bestand zu Neuproduktion", "Mining-Geschwindigkeit", "Börsen-Volumen"],
    correct: 1
  },
  {
    q: "Was ist ein 'Seed Phrase'?",
    options: ["Eine Liste von 12-24 Wörtern zur Wiederherstellung", "Das Passwort für die Börse", "Ein geheimer Nutzername", "Eine E-Mail Adresse"],
    correct: 0
  },
  {
    q: "Welche Eigenschaft macht Bitcoin 'Zensurresistent'?",
    options: ["Es ist sehr teuer", "Niemand kann Transaktionen stoppen", "Es ist nur für Experten", "Es wird staatlich kontrolliert"],
    correct: 1
  },
  {
    q: "Was ist die 'Blockchain' technisch gesehen?",
    options: ["Eine Datenbank", "Eine Kette von digitalen Signaturen/Blöcken", "Ein Cloud-Speicher", "Ein soziales Netzwerk"],
    correct: 1
  },
  {
    q: "Warum ist Bitcoin 'dezentral'?",
    options: ["Weil es weltweit genutzt wird", "Weil es keine zentrale Kontrollinstanz gibt", "Weil es schnell ist", "Weil es digital ist"],
    correct: 1
  },
  {
    q: "Was beschreibt der Begriff 'Mining'?",
    options: ["Suchen nach Gold", "Absicherung des Netzwerks & Emission", "Handeln an Börsen", "Programmieren von Apps"],
    correct: 1
  },
  {
    q: "Was ist ein 'Asic'?",
    options: ["Ein Bitcoin-Logo", "Spezialisierte Hardware für Mining", "Ein neuer Coin", "Ein Krypto-Experte"],
    correct: 1
  },
  {
    q: "Was ist ein 'UTXO'?",
    options: ["Ein spezieller Mining-Pool", "Ein nicht ausgegebener Transaktionsausgang", "Eine Bitcoin-Börse", "Ein Software-Update"],
    correct: 1
  },
  {
    q: "Was versteht man unter 'Gresham's Law'?",
    options: ["Gutes Geld verdrängt schlechtes", "Schlechtes Geld verdrängt gutes aus dem Umlauf", "Geld verliert an Wert", "Zinsen steigen immer"],
    correct: 1
  },
  {
    q: "Was ist 'Sound Money'?",
    options: ["Geld, das Geräusche macht", "Geld mit stabiler Kaufkraft/knappem Angebot", "Geld auf dem Handy", "Staatliches Papiergeld"],
    correct: 1
  },
  {
    q: "Wie nennt man das Vertrauen in ein System ohne Mittelsmann?",
    options: ["Trustless", "Zentralisiert", "Bankenwesen", "Social Credit"],
    correct: 0
  },
  {
    q: "Was ist 'Time Preference' (Zeitpräferenz)?",
    options: ["Pünktlichkeit beim Mining", "Bewertung von heutigem vs. zukünftigem Konsum", "Die Dauer einer Transaktion", "Die Uhrzeit in Bitcoin"],
    correct: 1
  },
  {
    q: "Was passierte beim 'Blocksize War'?",
    options: ["Kampf um den Bitcoin Preis", "Streit um die Skalierung/Blockgröße", "Krieg zwischen Ländern", "Hackerangriff auf Satoshi"],
    correct: 1
  },
  {
    q: "Welches mathematische Problem löste Bitcoin, um Konsens ohne zentrale Instanz zu ermöglichen?",
    options: ["Byzantinisches Fehlertoleranz-Problem", "P-NP-Problem", "Das Gefangenendilemma", "Die Fermat’sche Vermutung"],
    correct: 0
  },
  {
    q: "Was beschreibt der 'Lindy-Effekt' im Kontext von Bitcoin?",
    options: ["Die Korrelation zum Aktienmarkt", "Dass die Lebenserwartung mit dem Alter steigt", "Die Geschwindigkeit der Transaktionen", "Die Anzahl der verlorenen Bitcoins"],
    correct: 1
  },
  {
    q: "Was ist ein 'Soft Fork'?",
    options: ["Ein Update, das die Regeln lockert", "Ein Update, das abwärtskompatibel ist", "Eine komplette Spaltung der Chain", "Ein Hardware-Update für Miner"],
    correct: 1
  },
  {
    q: "Was war das Hauptziel des 'SegWit' (BIP141) Updates?",
    options: ["Erhöhung des BTC-Preises", "Behebung von 'Transaction Malleability'", "Einführung von Smart Contracts", "Abschaffung des Minings"],
    correct: 1
  },

  // --- VERTIEFTE TECHNIK ---
  {
    q: "Was bewirkt die Datenstruktur des 'Merkle Tree' in einem Block?",
    options: ["Sie speichert die Miner-Daten", "Sie komprimiert die Blockzeit", "Sie ermöglicht effiziente Verifizierung von Transaktionen", "Sie berechnet die Difficulty"],
    correct: 2
  },
  {
    q: "Ist die Bitcoin-Scriptsprache 'Turing-vollständig'?",
    options: ["Ja, wie Ethereum", "Nein, zur Vermeidung von Endlosschleifen", "Nur im Lightning-Netzwerk", "Nur seit dem Taproot-Update"],
    correct: 1
  },
  {
    q: "In welchem Jahr wird voraussichtlich der letzte Satoshi gemined?",
    options: ["2040", "2100", "2140", "3000"],
    correct: 2
  },
  {
    q: "Was ist der 'Mempool'?",
    options: ["Ein Speicher für geminedte Blöcke", "Warteraum für unbestätigte Transaktionen", "Ein Verzeichnis aller Wallets", "Die Datenbank der Full Nodes"],
    correct: 1
  },
  {
    q: "Was bedeutet 'RBF' (Replace-By-Fee)?",
    options: ["Transaktion durch höhere Gebühr beschleunigen", "Zahlung stornieren", "Mining-Belohnung ändern", "Bitcoin gegen Fiat tauschen"],
    correct: 0
  },
  {
    q: "Welche Adressen beginnen standardmäßig mit 'bc1q'?",
    options: ["Legacy Adressen", "Pay-to-Script-Hash (P2SH)", "Native SegWit (Bech32)", "Taproot Adressen"],
    correct: 2
  },
  {
    q: "Was ermöglicht das 'Taproot' Update technisch?",
    options: ["Größere Blöcke", "Schnorr-Signaturen & komplexere Smart Contracts", "Mining ohne Strom", "Anonymität wie Monero"],
    correct: 1
  },
  {
    q: "Was ist eine 'Reorg' (Chain Reorganization)?",
    options: ["Ein Software-Update", "Das Ersetzen einer Kette durch eine längere gültige Kette", "Das Löschen der Blockchain", "Ein Wechsel des Hash-Algorithmus"],
    correct: 1
  },

  // --- MONETÄRE HISTORIE & ÖKONOMIE ---
  {
    q: "Warum ist die chemische Eigenschaft 'Inertheit' wichtig für Gold als Geld?",
    options: ["Es rostet/reagiert nicht und bleibt beständig", "Es glänzt schön", "Es lässt sich leicht schmelzen", "Es ist selten"],
    correct: 0
  },
  {
    q: "Was geschah auf der Konferenz von 'Bretton Woods' 1944?",
    options: ["Gründung der EU", "Bitcoin Whitepaper Entwurf", "Fixierung des Dollars an Gold", "Erfindung des Buchgeldes"],
    correct: 2
  },
  {
    q: "Was bezeichnet der Begriff 'Seigniorage'?",
    options: ["Die Steuer auf Krypto", "Der Gewinn aus der Geldschöpfung", "Die Zinsen der Zentralbank", "Ein alter französischer Coin"],
    correct: 1
  },
  {
    q: "Ab welcher monatlichen Preissteigerungsrate spricht man von Hyperinflation?",
    options: ["10%", "20%", "50%", "100%"],
    correct: 2
  },
  {
    q: "Was bedeutet 'Niedrige Zeitpräferenz'?",
    options: ["Sofortiger Konsum wichtig", "Belohnungsaufschub für die Zukunft", "Schnelle Bitcoin-Transaktion", "Kurze Arbeitszeit"],
    correct: 1
  },
  {
    q: "Was ist 'Schuldgeld'?",
    options: ["Geld, das man sich leiht", "Geld, das durch Kreditvergabe entsteht", "Geld für Kriminelle", "Goldmünzen"],
    correct: 1
  },
  {
    q: "Welche Geldfunktion erfüllt Bitcoin laut Kritikern derzeit am wenigsten?",
    options: ["Wertaufbewahrungsmittel", "Recheneinheit", "Tauschmittel", "Knappheit"],
    correct: 1
  },
  {
    q: "Wer schrieb das Buch 'The Denationalization of Money'?",
    options: ["Satoshi Nakamoto", "Friedrich August von Hayek", "Milton Friedman", "Ludwig von Mises"],
    correct: 1
  },

  // --- LIGHTNING & LAYER 2 ---
  {
    q: "Was ist ein 'HTLC' im Lightning Netzwerk?",
    options: ["Ein High-Tech Ledger", "Hashed Time-Locked Contract", "Ein schneller Mining-Chip", "Ein Peer-to-Peer Protokoll"],
    correct: 1
  },
  {
    q: "Muss man für jede Lightning-Zahlung eine On-Chain Transaktion machen?",
    options: ["Ja, immer", "Nein, nur zum Öffnen/Schließen von Kanälen", "Nur bei Beträgen über 1 BTC", "Nur wenn das Internet langsam ist"],
    correct: 1
  },
  {
    q: "Was beschreibt das 'Trillema' der Skalierbarkeit?",
    options: ["Preis, Volumen, Speed", "Sicherheit, Dezentralität, Skalierbarkeit", "Mining, Nodes, User", "Fiat, Gold, Krypto"],
    correct: 1
  },

  // --- SPEZIALWISSEN ---
  {
    q: "Wie hieß die Vorläufer-Technologie von Adam Back (1997)?",
    options: ["BitGold", "b-money", "Hashcash", "DigiCash"],
    correct: 2
  },
  {
    q: "Was ist der 'Dust Limit'?",
    options: ["Maximale Menge an BTC", "Mindestbetrag einer Transaktion", "Die Anzahl der Miner", "Staub im PC"],
    correct: 1
  },
  {
    q: "Wie viele Kombinationen hat ein 24-Wörter Seed (256-Bit Entropie) etwa?",
    options: ["1 Milliarde", "So viele wie Atome im Universum", "10 hoch 77", "Sowohl B als auch C sind korrekt"],
    correct: 3
  },
  {
    q: "Was passierte am 22. Mai (Bitcoin Pizza Day)?",
    options: ["Satoshi verschwand", "Erster realer Kauf mit BTC", "Genesis Block wurde gefunden", "Erstes Halving"],
    correct: 1
  },
  {
    q: "Was ist 'CoinJoin'?",
    options: ["Zwei Coins zu einem machen", "Verfahren zur Verbesserung der Privatsphäre", "Mining im Team", "Bitcoin auf zwei Wallets teilen"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Not your Keys, not your Coins'?",
    options: ["Man braucht keinen Schlüssel", "Ohne Private Key Kontrolle besitzt man keine BTC", "Hardware Wallets sind unsicher", "Verlust des Passworts ist egal"],
    correct: 1
  },
  {
    q: "Was ist der 'Block Subsidy'?",
    options: ["Die Transaktionsgebühr", "Die neu geschöpften BTC pro Block", "Eine staatliche Förderung", "Die Mining-Hardware"],
    correct: 1
  },
  {
    q: "Welche Rolle spielen 'Full Nodes' bei einem Hard Fork?",
    options: ["Keine", "Sie bestimmen durch ihre Software, welche Regeln sie akzeptieren", "Sie minen neue Coins", "Sie legen den Preis fest"],
    correct: 1
  },
  {
    q: "Was ist 'OP_RETURN'?",
    options: ["Ein Fehler im Code", "Ein Script-Befehl für beliebige Daten in der Blockchain", "Der Neustart einer Node", "Eine Rücküberweisung"],
    correct: 1
  },
  {
    q: "Was ist ein 'Sighash' Typ?",
    options: ["Ein Mining-Algorithmus", "Ein Flag, das bestimmt, was signiert wird", "Eine Wallet-Art", "Ein Bitcoin-Verbot"],
    correct: 1
  },
  {
    q: "Was beschreibt 'ASIC Boost'?",
    options: ["Übertakten von CPUs", "Optimierung des Mining-Prozesses", "Schnellere Transaktionen", "Ein Lightning-Upgrade"],
    correct: 1
  },
  {
    q: "Was versteht man unter 'Fungibilität'?",
    options: ["Seltenheit", "Austauschbarkeit einzelner Einheiten", "Teilbarkeit", "Transportfähigkeit"],
    correct: 1
  },
  {
    q: "Wer ist Nick Szabo?",
    options: ["Ein Miner", "Erfinder von BitGold & Smart Contracts", "Ehemaliger FED-Chef", "Ein bekannter Bitcoin-Hasser"],
    correct: 1
  },
  {
    q: "Welche physikalische Größe sichert das Bitcoin-Netzwerk?",
    options: ["Rechenleistung (Energie)", "Speicherplatz", "Internet-Bandbreite", "Anzahl der Nutzer"],
    correct: 0
  },
  {
    q: "Was ist die 'Coinbase' Transaktion?",
    options: ["Eine Zahlung an die Börse Coinbase", "Die allererste Transaktion in jedem Block", "Der Kauf von BTC mit Kreditkarte", "Ein spezielles Wallet-Backup"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Finality'?",
    options: ["Das Ende von Bitcoin", "Die Unumkehrbarkeit einer Transaktion", "Die letzte Frage im Quiz", "Der Höchstpreis"],
    correct: 1
  },
  {
    q: "Was ist 'Cold Storage'?",
    options: ["Aufbewahrung im Gefrierfach", "Offline-Verwahrung von Private Keys", "Langsames Mining", "Veraltete Software"],
    correct: 1
  },
  {
    q: "Wer schrieb 1993 das 'Cypherpunk Manifesto'?",
    options: ["Eric Hughes", "Satoshi Nakamoto", "Timothy C. May", "Julian Assange"],
    correct: 0
  },
  {
    q: "Wie hieß das digitale Bargeld-Projekt von David Chaum aus den 1980ern?",
    options: ["BitGold", "DigiCash", "B-Money", "Hashcash"],
    correct: 1
  },
  {
    q: "Welches kryptographische Verfahren ermöglicht Bitcoins Public-Key-Infrastruktur?",
    options: ["RSA", "Elliptic Curve Cryptography (ECC)", "AES-256", "Diffie-Hellman"],
    correct: 1
  },
  {
    q: "Welche elliptische Kurve verwendet Bitcoin genau?",
    options: ["Curve25519", "secp256k1", "P-256", "Ed25519"],
    correct: 1
  },

  // --- FORTGESCHRITTENE TECHNIK ---
  {
    q: "Wie groß ist der Header eines Bitcoin-Blocks?",
    options: ["40 Bytes", "80 Bytes", "1 Megabyte", "Verschlüsselter Header"],
    correct: 1
  },
  {
    q: "Was ist ein 'Nonce' im Mining-Prozess?",
    options: ["Eine digitale Signatur", "Eine einmalige Zahl zur Variation des Block-Hashs", "Die Adresse des Miners", "Ein spezieller Mining-Chip"],
    correct: 1
  },
  {
    q: "Was beschreibt 'MAST' (Merkelized Abstract Syntax Trees)?",
    options: ["Schnelleres Mining", "Komplexere Smart Contracts durch Teilung von Skripten", "Eine neue Art von Full Node", "Die Vernetzung von Wallets"],
    correct: 1
  },
  {
    q: "Was ist der Unterschied zwischen 'Locktime' und 'Sequence'?",
    options: ["Es gibt keinen", "Locktime ist absolut (Block/Zeit), Sequence oft relativ", "Locktime ist nur für Miner", "Sequence erhöht den Preis"],
    correct: 1
  },
  {
    q: "Was ist 'Miniscript'?",
    options: ["Ein kleiner Bitcoin-Client", "Eine Sprache zum einfacheren Schreiben von Bitcoin-Skripten", "Ein Betriebssystem für Miner", "Ein Teil des Whitepapers"],
    correct: 1
  },
  {
    q: "Welches Problem lösen 'Schnorr-Signaturen' gegenüber ECDSA?",
    options: ["Keine", "Linearität erlaubt Signatur-Aggregation (Multisig spart Platz)", "Sie machen Bitcoin quantensicher", "Sie benötigen keinen Strom"],
    correct: 1
  },

  // --- ÖKONOMISCHE THEORIE (ÖSTERREICHISCHE SCHULE) ---
  {
    q: "Was besagt das 'Regressions-Theorem' von Ludwig von Mises?",
    options: ["Geldwert sinkt immer", "Geldwert muss sich historisch auf einen Tauschwert stützen", "Inflation ist notwendig", "Zinsen sind illegal"],
    correct: 1
  },
  {
    q: "Wer definierte Geld als das 'marktgängigste Gut'?",
    options: ["Adam Smith", "Carl Menger", "John Maynard Keynes", "Friedrich Engels"],
    correct: 1
  },
  {
    q: "Was ist der 'Stock-to-Flow' Wert von Gold im Vergleich zu Fiat?",
    options: ["Viel niedriger", "Viel höher (höhere Knappheit)", "Gleich groß", "Gold hat keinen Flow"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Dämonetarisierung'?",
    options: ["Geld wird wertlos", "Ein Gut verliert seine Funktion als Geld", "Einzug von Bargeld", "Verbot von Krypto"],
    correct: 1
  },
  {
    q: "Was beschreibt die 'Tragik der Allmende'?",
    options: ["Übernutzung gemeinsamer Ressourcen ohne Eigentum", "Das Ende von Gold", "Ein Problem beim Mining", "Die Inflation"],
    correct: 0
  },

  // --- LIGHTNING NETZWERK DETAILS ---
  {
    q: "Was ist ein 'Watchtower' im Lightning Netzwerk?",
    options: ["Ein Sendemast", "Ein Dienst, der Betrugsversuche bei Offline-Nodes verhindert", "Die Zentrale von Lightning", "Ein Explorer für Kanäle"],
    correct: 1
  },
  {
    q: "Was ist 'Inbound Liquidity'?",
    options: ["Geld auf der Börse", "Die Kapazität eines Kanals, Zahlungen zu empfangen", "Mining-Gewinne", "Schnelle Transaktionen"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Channel Jamming'?",
    options: ["Ein Lied über Krypto", "Ein Angriff, der Zahlungskanäle durch Fake-Anfragen blockiert", "Das Schließen aller Kanäle", "Ein Update für Nodes"],
    correct: 1
  },
  {
    q: "Was ist 'Eltoo' (BIP 118)?",
    options: ["Ein neuer Coin", "Ein Vorschlag für einfachere Kanal-Updates im Lightning Netz", "Eine Hardware-Wallet", "Ein Mining-Pool"],
    correct: 1
  },

  // --- NETZWERK-SICHERHEIT ---
  {
    q: "Was ist ein 'Sybil-Angriff'?",
    options: ["Hacken einer Wallet", "Übernahme des Netzwerks durch viele falsche Identitäten/Nodes", "Ein Virus auf dem PC", "Mining mit gestohlenem Strom"],
    correct: 1
  },
  {
    q: "Was beschreibt ein 'Eclipse-Angriff'?",
    options: ["Das Hacken von Satoshi", "Eine Node von allen ehrlichen Peers isolieren", "Stromausfall beim Miner", "Sonnenfinsternis-Mining"],
    correct: 1
  },
  {
    q: "Was ist 'CPFP' (Child Pays For Parent)?",
    options: ["Kinder bezahlen für Eltern", "Gebührenbeschleunigung durch eine Folgetransaktion", "Ein Sparplan", "Ein Mining-Bonus"],
    correct: 1
  },
  {
    q: "Welche Angriffsform beschreibt 'Fee Sniping'?",
    options: ["Stehlen von Gebühren", "Miner versuchen alte Blöcke zu reminen, um Gebühren zu holen", "Transaktionen ohne Gebühr", "Hacken des Mempools"],
    correct: 1
  },

  // --- SPEZIALWISSEN & STANDARDS ---
  {
    q: "Was definiert 'BIP 39'?",
    options: ["Den Mining-Algorithmus", "Den Standard für Mnemonische Sätze (Seed Phrases)", "Die Blockgröße", "Lightning-Rechnungen"],
    correct: 1
  },
  {
    q: "Aus wie vielen Wörtern besteht die BIP-39 Standardliste?",
    options: ["1024", "2048", "4096", "8192"],
    correct: 1
  },
  {
    q: "Was beschreibt 'BIP 32'?",
    options: ["Multisig", "Hierarchisch Deterministic (HD) Wallets", "Taproot", "SegWit"],
    correct: 1
  },
  {
    q: "Was ist 'PSBT' (BIP 174)?",
    options: ["Ein neuer Bitcoin-Typ", "Partially Signed Bitcoin Transactions", "Ein Mining-Protokoll", "Eine Peer-to-Peer Node"],
    correct: 1
  },
  {
    q: "Was sind 'Ordinals'?",
    options: ["Mining-Ränge", "Nummerierung und Inskription einzelner Satoshis", "Neue Full Nodes", "Eine Art von Sidechain"],
    correct: 1
  },
  {
    q: "Was ist 'RGB'?",
    options: ["Bunte LEDs an Minern", "Layer 2/3 Protokoll für Smart Contracts auf Bitcoin", "Ein Grafik-Standard", "Ein Mining-Pool"],
    correct: 1
  },
  {
    q: "Was ist das 'Liquid Network'?",
    options: ["Ein Mining-Pool", "Eine Sidechain für schnellere Asset-Transfers", "Das Internet", "Eine neue Exchange"],
    correct: 1
  },
  {
    q: "Was ist 'Stratum V2'?",
    options: ["Ein Weltraumprojekt", "Ein modernes Protokoll für Mining-Pools", "Eine Wallet-App", "Ein Hardware-Update"],
    correct: 1
  },
  {
    q: "Was beschreibt der Begriff 'Entropie' bei Wallets?",
    options: ["Zufälligkeit bei der Erzeugung des Private Keys", "Unordnung in der Blockchain", "Mining-Schwierigkeit", "Transaktionsspeed"],
    correct: 0
  },
  {
    q: "Was ist ein 'Brain Wallet'?",
    options: ["Eine KI-Wallet", "Ein Private Key, der nur aus einem auswendig gelernten Satz besteht", "Ein Hardware-Chip im Kopf", "Eine sehr schlaue Node"],
    correct: 1
  },
  {
    q: "Was ist 'Change' (Wechselgeld) bei Bitcoin?",
    options: ["Kleine Münzen", "Der Restbetrag eines UTXO, der an den Sender zurückgeht", "Trinkgeld für Miner", "Eine Preisänderung"],
    correct: 1
  },
  {
    q: "Was ist 'Dust' (Staub) im Wallet?",
    options: ["Dreck auf der Festplatte", "Winzige UTXOs, deren Wert unter den Transaktionsgebühren liegt", "Alte Backups", "Verlorene Keys"],
    correct: 1
  },
  {
    q: "Was ist 'Bech32'?",
    options: ["Ein Mining-Chip", "Ein Adressformat speziell für SegWit (bc1...)", "Ein Verschlüsselungstyp", "Eine Node-Software"],
    correct: 1
  },
  {
    q: "Wer ist Hal Finney?",
    options: ["Ein Politiker", "Empfänger der ersten BTC-Transaktion & Kryptographie-Pionier", "Gründer von Ethereum", "Ein bekannter Bitcoin-Shortseller"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Statelessness' bei Nodes?",
    options: ["Node ohne Land", "Konzept, bei dem Nodes nicht die gesamte UTXO-Set speichern müssen", "Node ohne Internet", "Eine kaputte Node"],
    correct: 1
  },
  {
    q: "Was beschreibt der 'Cantillon-Effekt' ökonomisch?",
    options: ["Inflation trifft alle gleich", "Wer nah an der Geldquelle sitzt, profitiert zuerst", "Preise sinken durch Technik", "Gold ist stabil"],
    correct: 1
  },
  {
    q: "Was ist 'Satoshi's Vision' (als Meme)?",
    options: ["Ein Brillenhersteller", "Oft genutzt, um Hard Forks/Änderungen zu rechtfertigen", "Ein Buch", "Eine TV-Show"],
    correct: 1
  },
  {
    q: "Was beschreibt das 'Selfish Mining' Szenario?",
    options: ["Miner behalten Gebühren für sich", "Miner halten gefundene Blöcke geheim, um einen Vorsprung aufzubauen", "Miner schalten ihre Geräte bei niedrigem Preis ab", "Ein Miner nutzt Ökostrom"],
    correct: 1
  },
  {
    q: "Was ist das 'Empty Block Mining'?",
    options: ["Miner finden keine Blöcke", "Miner veröffentlichen Blöcke ohne Transaktionen (außer Coinbase), um Zeit zu sparen", "Die Blockchain ist voll", "Ein technischer Fehler im Protokoll"],
    correct: 1
  },
  {
    q: "Was ist ein 'ASIC-Resistance' Algorithmus?",
    options: ["Ein Algorithmus, der Mining verbietet", "Ein Versuch, Mining nur auf CPUs/GPUs zu ermöglichen", "Ein Schutz gegen Hacker", "Ein spezieller Bitcoin-Node-Typ"],
    correct: 1
  },
  {
    q: "Was beschreibt der 'Target' Wert beim Mining?",
    options: ["Der aktuelle Bitcoin-Preis", "Die Zahl, unter der ein Block-Hash liegen muss", "Die Anzahl der Transaktionen", "Die Größe des Mempools"],
    correct: 1
  },
  {
    q: "Welche Maßeinheit wurde mit SegWit eingeführt, um die Blockgröße zu berechnen?",
    options: ["Kilobyte", "Weight Units (WU)", "Satoshi-Bytes", "Block-Points"],
    correct: 1
  },

  // --- COVENANTS & SMART CONTRACTS ---
  {
    q: "Was versteht man unter 'Covenants' bei Bitcoin?",
    options: ["Ein Vertrag mit einer Bank", "Beschränkungen, wo ein UTXO in der Zukunft ausgegeben werden darf", "Ein Mining-Zusammenschluss", "Die Gebührenordnung"],
    correct: 1
  },
  {
    q: "Was würde das Opcode 'OP_CHECKTEMPLATEVERIFY' (BIP-119) ermöglichen?",
    options: ["Schnelleres Signieren", "Native Realisierung von Covenants und Congestion Control", "Anonymes Mining", "Das Löschen alter Blöcke"],
    correct: 1
  },
  {
    q: "Was ist 'Simplicity' im Kontext von Bitcoin-Entwicklung?",
    options: ["Eine einfache Wallet", "Eine neue, formale Programmiersprache für Smart Contracts", "Das Reduzieren der Blockzeit", "Ein Slogan von Satoshi"],
    correct: 1
  },
  {
    q: "Was ermöglicht 'SIGHASH_ANYPREVOUT'?",
    options: ["Zahlungen an jeden Namen", "Verbesserte Layer-2 Protokolle wie Eltoo", "Mining ohne Internet", "Rückbuchung von Transaktionen"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Thiers' Law'?",
    options: ["Gutes Geld verdrängt schlechtes", "Gutes Geld verdrängt schlechtes, wenn der Kurs frei floaten kann", "Inflation führt zu Deflation", "Zentralbanken bestimmen den Wert"],
    correct: 1
  },
  {
    q: "Was ist die 'Austrian Business Cycle Theory' (ABCT)?",
    options: ["Erklärung von Konjunkturzyklen durch künstliche Zinssenkungen", "Ein Plan für mehr Inflation", "Die Geschichte des Euro", "Eine Theorie über Aktienkurse"],
    correct: 0
  },
  {
    q: "Was ist 'High Time Preference' (Hohe Zeitpräferenz)?",
    options: ["Fokus auf langfristiges Sparen", "Fokus auf sofortigen Konsum und Entwertung der Zukunft", "Schnelle Bitcoin-Abwicklung", "Arbeiten unter Zeitdruck"],
    correct: 1
  },
  {
    q: "Was versteht man unter 'Deflationärer Spirale' laut Mainstream-Ökonomie?",
    options: ["Wirtschaftswachstum", "Sinkende Preise führen zu Kaufzurückhaltung und Rezession", "Steigende Löhne", "Vermehrung der Geldmenge"],
    correct: 1
  },
  {
    q: "Warum gilt Bitcoin als 'Absolute Knappheit'?",
    options: ["Weil es teuer ist", "Weil das Angebot völlig unabhängig von der Nachfrage/Preis fixiert ist", "Weil Miner aufhören können", "Weil es digital ist"],
    correct: 1
  },
  {
    q: "Was beschreibt der Begriff 'Financial Repression'?",
    options: ["Verbot von Banken", "Maßnahmen des Staates, um Schulden durch niedrige Zinsen/Inflation abzubauen", "Hacken von Kreditkarten", "Hohe Gebühren am Geldautomat"],
    correct: 1
  },

  // --- PROTOKOLL-HISTORIE & SOFTWARRE ---
  {
    q: "Was war der 'Value Overflow Incident' im Jahr 2010?",
    options: ["Bitcoin Kurs stieg zu schnell", "Ein Bug erzeugte 184 Milliarden BTC", "Der Mempool war voll", "Mining war nicht mehr profitabel"],
    correct: 1
  },
  {
    q: "Was bewirkt der 'User Activated Soft Fork' (UASF)?",
    options: ["Miner entscheiden über Updates", "Full Nodes erzwingen Regeln unabhängig von der Hashrate", "Satoshi Nakamoto greift ein", "Die Börsen legen die Regeln fest"],
    correct: 1
  },
  {
    q: "Was passierte beim 'Loomis' Bug?",
    options: ["Double Spending", "Ein Problem mit dem Schwierigkeitsgrad", "Ein Absturz von LND Nodes durch eine komplexe Transaktion", "Das Verschwinden von Coins"],
    correct: 2
  },
  {
    q: "Wie hieß die Bewegung, die SegWit gegen den Willen der großen Mining-Pools durchsetzte?",
    options: ["Bitcoin Core", "NO2X / UASF", "Big Blockers", "Krypto-Anarchisten"],
    correct: 1
  },

  // --- LAYER 2 & PRIVATSPHÄRE ---
  {
    q: "Was ist 'Fedimint'?",
    options: ["Eine staatliche Bitcoin-Node", "Föderierte Chaumian Mints zur skalierbaren Privatsphäre", "Ein neuer Mining-Pool", "Eine Software für Zentralbanken"],
    correct: 1
  },
  {
    q: "Was ist der Vorteil von 'Ark' gegenüber Lightning?",
    options: ["Es ist kostenlos", "Es benötigt keine Inbound Liquidity für Empfänger", "Es ist nur für Wale", "Es braucht kein Internet"],
    correct: 1
  },
  {
    q: "Was ist 'Silent Payments'?",
    options: ["Zahlungen ohne Benachrichtigung", "Ein Protokoll für wiederverwendbare Adressen ohne On-Chain Fußabdruck", "Lightning ohne Kanäle", "Mining ohne Lärm"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Statechains'?",
    options: ["Eine staatliche Blockchain", "Übertragung des Eigentums an UTXOs ohne On-Chain Transaktion", "Ein neues Gesetz", "Eine Liste aller Länder mit BTC"],
    correct: 1
  },

  // --- REGULIERUNG & RECHT ---
  {
    q: "Was besagt die 'Travel Rule' im Krypto-Kontext?",
    options: ["Verbot von BTC im Flugzeug", "Pflicht zum Datenaustausch bei Transaktionen über Dienstleister", "Steuerfreiheit bei Auslandsreisen", "Keine Wallets auf Handys"],
    correct: 1
  },
  {
    q: "Was ist 'MiCA'?",
    options: ["Ein neuer Krypto-Standard", "EU-Verordnung für Märkte für Kryptowerte", "Ein US-Gesetz", "Ein Mining-Gerät"],
    correct: 1
  },
  {
    q: "Warum ist die Einstufung als 'Commodity' (Rohstoff) für BTC in den USA wichtig?",
    options: ["Weil es dann wie Gold reguliert wird und nicht als Wertpapier (Security)", "Weil es dann verboten wird", "Weil Miner dann Steuern sparen", "Weil es dann subventioniert wird"],
    correct: 0
  },
  {
    q: "Was ist 'Self-Custody'?",
    options: ["Verwahrung bei einer Bank", "Eigenständige Kontrolle über die Private Keys", "Handel an der Börse", "Verlust des Passworts"],
    correct: 1
  },

  // --- SPEZIALWISSEN ---
  {
    q: "Was ist 'BIP 157/158' (Neutrino)?",
    options: ["Ein neuer Mining-Chip", "Client-side Filtering für Light Clients (Privatsphäre)", "Ein Quantencomputer-Schutz", "Ein Update für die Blockgröße"],
    correct: 1
  },
  {
    q: "Was beschreibt 'MuSig2'?",
    options: ["Ein Musik-Player für Nodes", "Ein effizientes Protokoll für Schnorr-Multisig-Signaturen", "Eine Art von Sidechain", "Mining mit zwei Geräten"],
    correct: 1
  },
  {
    q: "Was ist 'FROST'?",
    options: ["Ein eingefrorenes Wallet", "Flexible Round-Optimized Schnorr Threshold Signatures", "Ein Mining-Kühlsystem", "Der Name von Nakamotos Katze"],
    correct: 1
  },
  {
    q: "Was ist der 'UTXO Set'?",
    options: ["Die Liste aller jemals gemachten Transaktionen", "Die Datenbank aller aktuell verfügbaren, nicht ausgegebenen Beträge", "Ein Mining-Zusammenschluss", "Die Wallet-Software"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Probabilistic Finality'?",
    options: ["Bitcoin ist Glücksspiel", "Mit jedem Block sinkt die Chance auf eine Umkehrung der Transaktion", "Man weiß nie, ob die Zahlung ankommt", "Die letzte Frage ist zufällig"],
    correct: 1
  },
  {
    q: "Was ist der 'Genesis Block' (Block 0)?",
    options: ["Der letzte Block", "Der allererste Block der Bitcoin-Blockchain", "Ein Block voller Fehler", "Ein Block von Ethereum"],
    correct: 1
  },
  {
    q: "Was ist 'Block Height'?",
    options: ["Die Dateigröße des Blocks", "Die Anzahl der Blöcke vor einem bestimmten Block", "Die Zeitdauer des Minings", "Die Belohnung"],
    correct: 1
  },
  {
    q: "Was ist 'Proof of Reserve'?",
    options: ["Gold im Tresor", "Nachweis einer Börse, dass Kundengelder wirklich vorhanden sind", "Eine neue Mining-Art", "Das Backup des Seeds"],
    correct: 1
  },
  {
    q: "Was ist ein 'Hardware Security Module' (HSM)?",
    options: ["Ein USB-Stick", "Spezialisierte Hardware zur sicheren Schlüsselverwaltung", "Ein Teil des Mainboards", "Ein Mining-Gehäuse"],
    correct: 1
  },
  {
    q: "Was ist 'Chainalysis'?",
    options: ["Eine Bitcoin-Wallet", "Ein Unternehmen zur Überwachung von Blockchain-Transaktionen", "Das Mining-Handbuch", "Ein Node-Explorer"],
    correct: 1
  },
  {
    q: "Was ist ein 'Dusting Attack'?",
    options: ["Staub im Lüfter", "Versenden winziger BTC-Beträge, um Wallets zu deanonymisieren", "Ein Angriff auf Full Nodes", "Mining-Diebstahl"],
    correct: 1
  },
  {
    q: "Was ist der 'Coinbase Reward'?",
    options: ["Ein Bonus von der Börse Coinbase", "Die Summe aus Block-Subsidy und Transaktionsgebühren", "Der Kaufpreis von BTC", "Ein Werbegeschenk"],
    correct: 1
  },
  {
    q: "Was ist 'Replay Protection'?",
    options: ["Schutz vor Video-Hacks", "Verhinderung, dass Transaktionen auf zwei verschiedenen Forks gültig sind", "Ein Firewall-Update", "Das Speichern von Backups"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Thiers' Law'?",
    options: ["Gutes Geld verdrängt schlechtes", "Gutes Geld verdrängt schlechtes, wenn der Kurs frei floaten kann", "Inflation führt zu Deflation", "Zentralbanken bestimmen den Wert"],
    correct: 1
  },
  {
    q: "Was ist die 'Austrian Business Cycle Theory' (ABCT)?",
    options: ["Erklärung von Konjunkturzyklen durch künstliche Zinssenkungen", "Ein Plan für mehr Inflation", "Die Geschichte des Euro", "Eine Theorie über Aktienkurse"],
    correct: 0
  },
  {
    q: "Was ist 'High Time Preference' (Hohe Zeitpräferenz)?",
    options: ["Fokus auf langfristiges Sparen", "Fokus auf sofortigen Konsum und Entwertung der Zukunft", "Schnelle Bitcoin-Abwicklung", "Arbeiten unter Zeitdruck"],
    correct: 1
  },
  {
    q: "Was versteht man unter 'Deflationärer Spirale' laut Mainstream-Ökonomie?",
    options: ["Wirtschaftswachstum", "Sinkende Preise führen zu Kaufzurückhaltung und Rezession", "Steigende Löhne", "Vermehrung der Geldmenge"],
    correct: 1
  },
  {
    q: "Warum gilt Bitcoin als 'Absolute Knappheit'?",
    options: ["Weil es teuer ist", "Weil das Angebot völlig unabhängig von der Nachfrage/Preis fixiert ist", "Weil Miner aufhören können", "Weil es digital ist"],
    correct: 1
  },
  {
    q: "Was beschreibt der Begriff 'Financial Repression'?",
    options: ["Verbot von Banken", "Maßnahmen des Staates, um Schulden durch niedrige Zinsen/Inflation abzubauen", "Hacken von Kreditkarten", "Hohe Gebühren am Geldautomat"],
    correct: 1
  },

  // --- PROTOKOLL-HISTORIE & SOFTWARRE ---
  {
    q: "Was war der 'Value Overflow Incident' im Jahr 2010?",
    options: ["Bitcoin Kurs stieg zu schnell", "Ein Bug erzeugte 184 Milliarden BTC", "Der Mempool war voll", "Mining war nicht mehr profitabel"],
    correct: 1
  },
  {
    q: "Was bewirkt der 'User Activated Soft Fork' (UASF)?",
    options: ["Miner entscheiden über Updates", "Full Nodes erzwingen Regeln unabhängig von der Hashrate", "Satoshi Nakamoto greift ein", "Die Börsen legen die Regeln fest"],
    correct: 1
  },
  {
    q: "Was passierte beim 'Loomis' Bug?",
    options: ["Double Spending", "Ein Problem mit dem Schwierigkeitsgrad", "Ein Absturz von LND Nodes durch eine komplexe Transaktion", "Das Verschwinden von Coins"],
    correct: 2
  },
  {
    q: "Wie hieß die Bewegung, die SegWit gegen den Willen der großen Mining-Pools durchsetzte?",
    options: ["Bitcoin Core", "NO2X / UASF", "Big Blockers", "Krypto-Anarchisten"],
    correct: 1
  },

  // --- LAYER 2 & PRIVATSPHÄRE ---
  {
    q: "Was ist 'Fedimint'?",
    options: ["Eine staatliche Bitcoin-Node", "Föderierte Chaumian Mints zur skalierbaren Privatsphäre", "Ein neuer Mining-Pool", "Eine Software für Zentralbanken"],
    correct: 1
  },
  {
    q: "Was ist der Vorteil von 'Ark' gegenüber Lightning?",
    options: ["Es ist kostenlos", "Es benötigt keine Inbound Liquidity für Empfänger", "Es ist nur für Wale", "Es braucht kein Internet"],
    correct: 1
  },
  {
    q: "Was ist 'Silent Payments'?",
    options: ["Zahlungen ohne Benachrichtigung", "Ein Protokoll für wiederverwendbare Adressen ohne On-Chain Fußabdruck", "Lightning ohne Kanäle", "Mining ohne Lärm"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Statechains'?",
    options: ["Eine staatliche Blockchain", "Übertragung des Eigentums an UTXOs ohne On-Chain Transaktion", "Ein neues Gesetz", "Eine Liste aller Länder mit BTC"],
    correct: 1
  },

  // --- REGULIERUNG & RECHT ---
  {
    q: "Was besagt die 'Travel Rule' im Krypto-Kontext?",
    options: ["Verbot von BTC im Flugzeug", "Pflicht zum Datenaustausch bei Transaktionen über Dienstleister", "Steuerfreiheit bei Auslandsreisen", "Keine Wallets auf Handys"],
    correct: 1
  },
  {
    q: "Was ist 'MiCA'?",
    options: ["Ein neuer Krypto-Standard", "EU-Verordnung für Märkte für Kryptowerte", "Ein US-Gesetz", "Ein Mining-Gerät"],
    correct: 1
  },
  {
    q: "Warum ist die Einstufung als 'Commodity' (Rohstoff) für BTC in den USA wichtig?",
    options: ["Weil es dann wie Gold reguliert wird und nicht als Wertpapier (Security)", "Weil es dann verboten wird", "Weil Miner dann Steuern sparen", "Weil es dann subventioniert wird"],
    correct: 0
  },
  {
    q: "Was ist 'Self-Custody'?",
    options: ["Verwahrung bei einer Bank", "Eigenständige Kontrolle über die Private Keys", "Handel an der Börse", "Verlust des Passworts"],
    correct: 1
  },

  // --- SPEZIALWISSEN ---
  {
    q: "Was ist 'BIP 157/158' (Neutrino)?",
    options: ["Ein neuer Mining-Chip", "Client-side Filtering für Light Clients (Privatsphäre)", "Ein Quantencomputer-Schutz", "Ein Update für die Blockgröße"],
    correct: 1
  },
  {
    q: "Was beschreibt 'MuSig2'?",
    options: ["Ein Musik-Player für Nodes", "Ein effizientes Protokoll für Schnorr-Multisig-Signaturen", "Eine Art von Sidechain", "Mining mit zwei Geräten"],
    correct: 1
  },
  {
    q: "Was ist 'FROST'?",
    options: ["Ein eingefrorenes Wallet", "Flexible Round-Optimized Schnorr Threshold Signatures", "Ein Mining-Kühlsystem", "Der Name von Nakamotos Katze"],
    correct: 1
  },
  {
    q: "Was ist der 'UTXO Set'?",
    options: ["Die Liste aller jemals gemachten Transaktionen", "Die Datenbank aller aktuell verfügbaren, nicht ausgegebenen Beträge", "Ein Mining-Zusammenschluss", "Die Wallet-Software"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Probabilistic Finality'?",
    options: ["Bitcoin ist Glücksspiel", "Mit jedem Block sinkt die Chance auf eine Umkehrung der Transaktion", "Man weiß nie, ob die Zahlung ankommt", "Die letzte Frage ist zufällig"],
    correct: 1
  },
  {
    q: "Was ist der 'Genesis Block' (Block 0)?",
    options: ["Der letzte Block", "Der allererste Block der Bitcoin-Blockchain", "Ein Block voller Fehler", "Ein Block von Ethereum"],
    correct: 1
  },
  {
    q: "Was ist 'Block Height'?",
    options: ["Die Dateigröße des Blocks", "Die Anzahl der Blöcke vor einem bestimmten Block", "Die Zeitdauer des Minings", "Die Belohnung"],
    correct: 1
  },
  {
    q: "Was ist 'Proof of Reserve'?",
    options: ["Gold im Tresor", "Nachweis einer Börse, dass Kundengelder wirklich vorhanden sind", "Eine neue Mining-Art", "Das Backup des Seeds"],
    correct: 1
  },
  {
    q: "Was ist ein 'Hardware Security Module' (HSM)?",
    options: ["Ein USB-Stick", "Spezialisierte Hardware zur sicheren Schlüsselverwaltung", "Ein Teil des Mainboards", "Ein Mining-Gehäuse"],
    correct: 1
  },
  {
    q: "Was ist 'Chainalysis'?",
    options: ["Eine Bitcoin-Wallet", "Ein Unternehmen zur Überwachung von Blockchain-Transaktionen", "Das Mining-Handbuch", "Ein Node-Explorer"],
    correct: 1
  },
  {
    q: "Was ist ein 'Dusting Attack'?",
    options: ["Staub im Lüfter", "Versenden winziger BTC-Beträge, um Wallets zu deanonymisieren", "Ein Angriff auf Full Nodes", "Mining-Diebstahl"],
    correct: 1
  },
  {
    q: "Was ist der 'Coinbase Reward'?",
    options: ["Ein Bonus von der Börse Coinbase", "Die Summe aus Block-Subsidy und Transaktionsgebühren", "Der Kaufpreis von BTC", "Ein Werbegeschenk"],
    correct: 1
  },
  {
    q: "Was ist 'Replay Protection'?",
    options: ["Schutz vor Video-Hacks", "Verhinderung, dass Transaktionen auf zwei verschiedenen Forks gültig sind", "Ein Firewall-Update", "Das Speichern von Backups"],
    correct: 1
  },
  {
    q: "Was ermöglicht das Konzept 'BitVM'?",
    options: ["Einen schnelleren Mining-Chip", "Berechnungen ähnlich wie Smart Contracts auf Bitcoin, ohne das Protokoll zu ändern", "Eine neue Hardware-Wallet", "Das Versenden von BTC via Funk"],
    correct: 1
  },
  {
    q: "Was ist das Hauptmerkmal von 'Ark' (Layer 2)?",
    options: ["Es ist eine Sidechain wie Liquid", "Trustless Off-Chain Zahlungen ohne Channel-Management für den Nutzer", "Es ersetzt das Mining", "Es ist nur für staatliche Institutionen"],
    correct: 1
  },
  {
    q: "Was beschreibt das 'BIP 300' (Drivechains)?",
    options: ["Ein Update für SegWit", "Ermöglicht das Erstellen von Sidechains, die durch Miner gesichert werden", "Ein neues Adressformat", "Verbesserung des Lightning-Netzwerks"],
    correct: 1
  },
  {
    q: "Was ist ein 'PTLC' (Point Time Locked Contract)?",
    options: ["Ein neuer Mining-Pool", "Nachfolger von HTLCs (Lightning), der Schnorr-Signaturen für bessere Privatsphäre nutzt", "Eine physische Bitcoin-Münze", "Ein Zeitstempel in der Blockchain"],
    correct: 1
  },
  {
    q: "Was ist 'OP_VAULT'?",
    options: ["Ein Tresor bei einer Bank", "Ein vorgeschlagenes Covenant-Opcode für spezialisierte Verwahrungslösungen", "Ein Mining-Verbot", "Ein Backup-Standard"],
    correct: 1
  },

  // --- TIEFE ÖKONOMIE & SPIELTHEORIE ---
  {
    q: "Was beschreibt der 'Giffen-Effekt' (Giffen-Gut) ökonomisch?",
    options: ["Nachfrage sinkt bei steigendem Preis", "Nachfrage steigt trotz (oder wegen) steigendem Preis", "Geld verliert an Wert", "Zinsen beeinflussen den Konsum"],
    correct: 1
  },
  {
    q: "Was ist die 'Paradoxie des Sparens' (Keynes) vs. Österreichische Schule?",
    options: ["Sparen schadet der Wirtschaft vs. Sparen ist die Basis für Investitionen", "Sparen erhöht die Zinsen", "Sparen ist nur für Reiche", "Es gibt keine Paradoxie"],
    correct: 0
  },
  {
    q: "Was ist 'Moral Hazard' im Kontext des aktuellen Geldsystems?",
    options: ["Ehrliches Handeln wird belohnt", "Anreiz zu riskantem Verhalten, da Verluste sozialisiert werden (Bailouts)", "Kryptographie ist gefährlich", "Bitcoin Mining verbraucht Strom"],
    correct: 1
  },
  {
    q: "Welche ökonomische Theorie besagt, dass 'Geld neutral' sei?",
    options: ["Österreichische Schule", "Monetarismus / Klassische Ökonomik", "Keynesianismus", "Marxismus"],
    correct: 1
  },

  // --- TECHNIK-DETAILS (NERD-LEVEL) ---
  {
    q: "Wie lautet der 'Witness Scale Factor' bei der Berechnung der Blockgewichtung?",
    options: ["2", "4", "8", "10"],
    correct: 1
  },
  {
    q: "Was ist der 'Locktime'-Wert 500.000.000 technisch gesehen?",
    options: ["Ein Block-Index", "Die Grenze zwischen Blockhöhe und Unix-Zeitstempel", "Ein Fehlercode", "Die maximale Anzahl an Usern"],
    correct: 1
  },
  {
    q: "Was ist 'Compact Block Filtering' (BIP 158)?",
    options: ["Mining-Optimierung", "Methode für Light-Clients, um Transaktionen ohne Preisgabe der Privatsphäre zu finden", "Das Löschen alter Blöcke", "Ein Kompressions-Tool"],
    correct: 1
  },
  {
    q: "Was ist 'SIGHASH_SINGLE'?",
    options: ["Ein einsamer Miner", "Ein Flag, das nur den korrespondierenden Output signiert", "Eine einfache Signatur", "Ein Sicherheitsfehler"],
    correct: 1
  },
  {
    q: "Was ist das 'UTXO-Set Size' Problem?",
    options: ["Zu wenig Bitcoins", "Das Anwachsen der Datenbank, die jede Node im RAM halten muss", "Zu viele Transaktionen pro Sekunde", "Die Größe der Festplatten"],
    correct: 1
  },

  // --- GESCHICHTE & INSIDER ---
  {
    q: "Welches Pseudonym nutzte die Person, die 2010 den 'Value Overflow' Bug meldete?",
    options: ["Satoshi", "Chefnet", "Loomis", "Hal Finney"],
    correct: 1
  },
  {
    q: "Welchen PGP-Schlüssel nutzte Satoshi Nakamoto zur Verifizierung des Whitepapers?",
    options: ["Er nutzte keinen", "Einen 2048-bit DSA Key", "Einen SHA-256 Hash", "Eine Bitcoin-Signatur"],
    correct: 1
  },
  {
    q: "Wie hieß das erste Forum, in dem Bitcoin diskutiert wurde?",
    options: ["Reddit", "BitcoinTalk (ursprünglich auf einer anderen Domain)", "Cryptography Mailing List", "Slashdot"],
    correct: 2
  },
  {
    q: "Was war 'Operation Bernhard' im Kontext von Geldgeschichte?",
    options: ["Bitcoin-Mining in Deutschland", "Massive Fälschung von Pfund-Noten durch die Nazis", "Gründung der Bundesbank", "Erfindung des Papiergeldes"],
    correct: 1
  },

  // --- BITCOIN & ENERGIE ---
  {
    q: "Was versteht man unter 'Stranded Energy' beim Mining?",
    options: ["Verschwendeter Strom", "Energiequellen, die abgelegen sind und nicht ins Netz eingespeist werden können", "Batterien für Miner", "Solarstrom für zu Hause"],
    correct: 1
  },
  {
    q: "Was ist 'Flare Gas Mining'?",
    options: ["Mining mit Licht", "Nutzung von Abfallgas aus der Ölförderung zur Stromerzeugung für Miner", "Mining in der Wüste", "Ein schneller Mining-Algorithmus"],
    correct: 1
  },
  {
    q: "Kann Bitcoin-Mining das Stromnetz stabilisieren?",
    options: ["Nein, es belastet nur", "Ja, durch 'Demand Response' (Abschalten bei Lastspitzen)", "Nur wenn es regnet", "Nur mit Windkraft"],
    correct: 1
  },

  // --- SPEZIALWISSEN (COVENANTS & SCRIPTS) ---
  {
    q: "Was ist 'OP_CAT'?",
    options: ["Ein Katzen-Meme", "Ein deaktivierter Befehl zum Zusammenfügen von Daten, dessen Rückkehr diskutiert wird", "Ein Mining-Programm", "Ein Wallet-Backup"],
    correct: 1
  },
  {
    q: "Was beschreibt 'Miniscript'?",
    options: ["Eine kleine Schriftart", "Eine strukturierte Art, Bitcoin-Skripte sicher und analysierbar zu schreiben", "Ein Betriebssystem", "Eine App"],
    correct: 1
  },
  {
    q: "Was ist ein 'ScriptPubKey'?",
    options: ["Das Passwort des Nutzers", "Das 'Schloss' an einem UTXO, das die Bedingungen zum Ausgeben definiert", "Der Name der Node", "Die Transaktionsgebühr"],
    correct: 1
  },
  {
    q: "Was ist 'RBF' (Opt-In Replace By Fee)?",
    options: ["Bitcoin-Tausch", "Möglichkeit, eine unbestätigte Transaktion durch eine Version mit höherer Gebühr zu ersetzen", "Zahlung stornieren", "Mining-Belohnung"],
    correct: 1
  },

  // --- MAKRO & GELDPOLITIK ---
  {
    q: "Was ist die 'Schuldenobergrenze' (Debt Ceiling)?",
    options: ["Maximale BTC Menge", "Gesetzliches Limit für die Verschuldung eines Staates (z.B. USA)", "Zinssatz der Bank", "Kreditlimit einer Wallet"],
    correct: 1
  },
  {
    q: "Was bedeutet 'Quantitative Easing' (QE)?",
    options: ["Bitcoin Halving", "Ausweitung der Geldmenge durch Zentralbanken via Anleihekauf", "Sparen beim Staat", "Erhöhung der Steuern"],
    correct: 1
  },
  {
    q: "Was ist eine 'CBDC'?",
    options: ["Ein Bitcoin-Upgrade", "Zentralbank-Digitalwährung (programmierbares Fiat-Geld)", "Eine Krypto-Börse", "Ein Mining-Pool"],
    correct: 1
  },
  {
    q: "Was ist 'Sound Money' laut Nick Szabo?",
    options: ["Geld mit gutem Klang", "Geld mit 'Unforgeable Costliness' (nicht fälschbare Kostbarkeit)", "Digitales Gold", "Staatliches Geld"],
    correct: 1
  },

  // --- FINALE FRAGEN ---
  {
    q: "Was ist ein 'LSP' (Liquidity Service Provider)?",
    options: ["Ein Bitcoin-Verkäufer", "Dienstleister, der Lightning-Nodes mit Inbound Liquidity versorgt", "Eine Bank", "Ein Mining-Hardware-Händler"],
    correct: 1
  },
  {
    q: "Was ist 'Wumbo' im Lightning Netzwerk?",
    options: ["Ein großer Elefant", "Option für Kanäle ohne das standardmäßige Kapazitätslimit", "Ein Fehler im Protokoll", "Ein spezieller Node-Typ"],
    correct: 1
  },
  {
    q: "Was beschreibt 'V3 Transactions'?",
    options: ["Dritte Version von Bitcoin", "Ein neuer Standard für Layer-2 Transaktionen zur Vermeidung von Pinning-Attacken", "Ein Adressformat", "Ein Mining-Update"],
    correct: 1
  },
  {
    q: "Was ist 'MuSig2'?",
    options: ["Ein Musik-Streaming-Dienst", "Ein verbessertes Protokoll für Multi-Signatur-Aggregation", "Ein Mining-Pool", "Eine Wallet-App"],
    correct: 1
  },
  {
    q: "Was ist der 'Blockstream Satellite'?",
    options: ["Ein Internet-Satellit", "Dienst zum Empfang der Bitcoin-Blockchain ohne Internet via Satellit", "Ein Krypto-Projekt von Elon Musk", "Ein GPS für Miner"],
    correct: 1
  },
  {
    q: "Was ist 'BIP 85'?",
    options: ["Ein Mining-Standard", "Ableitung von weiteren Seeds/Entropie aus einem Haupt-Seed", "Ein Lightning-Update", "Ein Adressformat"],
    correct: 1
  },
  {
    q: "Was ist 'Nostr' im Kontext der Bitcoin-Community?",
    options: ["Ein Mining-Algorithmus", "Ein dezentrales Protokoll für soziale Netzwerke, oft mit BTC/Lightning verknüpft", "Eine Hardware-Wallet", "Ein Layer 2"],
    correct: 1
  },
  {
    q: "Was ist die 'Mempool.space' Instanz?",
    options: ["Eine Wallet", "Ein populärer Open-Source Block-Explorer und Gebühren-Visualisierer", "Ein Mining-Pool", "Die offizielle Bitcoin-Seite"],
    correct: 1
  },
  {
    q: "Was beschreibt der Begriff 'Orange Pill'?",
    options: ["Ein Medikament", "Jemanden von den Vorzügen von Bitcoin überzeugen", "Ein Bitcoin-Logo", "Eine Mining-Farm"],
    correct: 1
  },
  {
    q: "Welches Jahr markiert das Ende der Golddeckung (Nixon-Schock)?",
    options: ["1913", "1944", "1971", "2008"],
    correct: 2
  },
  {
    q: "Wer hat Bitcoin erschaffen?",
    options: ["Die Regierung", "Satoshi Nakamoto", "Ein Bankenkonsortium", "Steve Jobs"],
    correct: 1
  },
  {
    q: "Wird es jemals mehr als 21 Millionen Bitcoin geben?",
    options: ["Ja, durch Updates", "Nein, das ist mathematisch fixiert", "Vielleicht", "Nur wenn alle Miner zustimmen"],
    correct: 1
  }
];
