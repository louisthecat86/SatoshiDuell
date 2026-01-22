export const ALL_QUESTIONS = [
  // --- BITCOIN GRUNDLAGEN ---
  {
    de: { q: "Wer veröffentlichte 2008 das Bitcoin Whitepaper?", options: ["Satoshi Nakamoto", "Vitalik Buterin", "Hal Finney", "Nick Szabo"] },
    en: { q: "Who published the Bitcoin Whitepaper in 2008?", options: ["Satoshi Nakamoto", "Vitalik Buterin", "Hal Finney", "Nick Szabo"] },
    es: { q: "¿Quién publicó el libro blanco de Bitcoin en 2008?", options: ["Satoshi Nakamoto", "Vitalik Buterin", "Hal Finney", "Nick Szabo"] },
    correct: 0
  },
  {
    de: { q: "Wie viele Bitcoins wird es jemals maximal geben?", options: ["21 Milliarden", "210 Millionen", "21 Millionen", "Unbegrenzt"] },
    en: { q: "What is the maximum number of Bitcoins that will ever exist?", options: ["21 Billion", "210 Million", "21 Million", "Unlimited"] },
    es: { q: "¿Cuál será la cantidad máxima de Bitcoins que existirá?", options: ["21 Mil Millones", "210 Millones", "21 Millones", "Ilimitado"] },
    correct: 2
  },
  {
    de: { q: "In welchem Jahr wurde der Genesis-Block (Block 0) gemined?", options: ["2008", "2009", "2010", "2011"] },
    en: { q: "In which year was the Genesis Block (Block 0) mined?", options: ["2008", "2009", "2010", "2011"] },
    es: { q: "¿En qué año fue minado el Bloque Génesis (Bloque 0)?", options: ["2008", "2009", "2010", "2011"] },
    correct: 1
  },
  {
    de: { q: "Wie nennt man die kleinste Einheit eines Bitcoins?", options: ["Bit", "Satoshi", "Litoshi", "MilliBit"] },
    en: { q: "What is the smallest unit of a Bitcoin called?", options: ["Bit", "Satoshi", "Litoshi", "MilliBit"] },
    es: { q: "¿Cómo se llama la unidad más pequeña de un Bitcoin?", options: ["Bit", "Satoshi", "Litoshi", "MilliBit"] },
    correct: 1
  },
  {
    de: { q: "In welchem Zeitabstand werden im Durchschnitt neue Bitcoin-Blöcke gefunden?", options: ["2 Minuten", "10 Minuten", "60 Minuten", "24 Stunden"] },
    en: { q: "What is the average time interval between new Bitcoin blocks?", options: ["2 minutes", "10 minutes", "60 minutes", "24 hours"] },
    es: { q: "¿Cuál es el intervalo promedio entre nuevos bloques de Bitcoin?", options: ["2 minutos", "10 minutos", "60 minutos", "24 horas"] },
    correct: 1
  },
  {
    de: { q: "Was passiert beim Bitcoin 'Halving'?", options: ["Der Preis halbiert sich", "Die Blockzeit wird halbiert", "Die Emission neuer BTC halbiert sich", "Die Anzahl der Nodes halbiert sich"] },
    en: { q: "What happens during the Bitcoin 'Halving'?", options: ["Price halves", "Block time halves", "New BTC emission halves", "Number of nodes halves"] },
    es: { q: "¿Qué sucede durante el 'Halving' de Bitcoin?", options: ["El precio se reduce a la mitad", "El tiempo de bloque se reduce", "La emisión de nuevos BTC se reduce a la mitad", "El número de nodos se reduce"] },
    correct: 2
  },
  {
    de: { q: "Welcher Hash-Algorithmus wird bei Bitcoin Proof-of-Work verwendet?", options: ["Scrypt", "Ethash", "SHA-256", "X11"] },
    en: { q: "Which hash algorithm is used in Bitcoin Proof-of-Work?", options: ["Scrypt", "Ethash", "SHA-256", "X11"] },
    es: { q: "¿Qué algoritmo hash se utiliza en Bitcoin Proof-of-Work?", options: ["Scrypt", "Ethash", "SHA-256", "X11"] },
    correct: 2
  },
  {
    de: { q: "Wie viele Satoshis ergeben einen ganzen Bitcoin?", options: ["1 Million", "10 Millionen", "100 Millionen", "1 Milliarde"] },
    en: { q: "How many Satoshis make one whole Bitcoin?", options: ["1 Million", "10 Million", "100 Million", "1 Billion"] },
    es: { q: "¿Cuántos Satoshis hacen un Bitcoin entero?", options: ["1 Millón", "10 Millones", "100 Millones", "1 Billón"] },
    correct: 2
  },

  // --- GELDSYSTEM & ÖKONOMIE ---
  {
    de: { q: "Was beschreibt der Begriff 'Fiat-Geld'?", options: ["Geld mit Golddeckung", "Geld durch staatliche Verordnung", "Geld aus Metall", "Schnelles Geld"] },
    en: { q: "What does the term 'Fiat money' describe?", options: ["Money backed by gold", "Money by government decree", "Money made of metal", "Fast money"] },
    es: { q: "¿Qué describe el término 'dinero Fiat'?", options: ["Dinero respaldado por oro", "Dinero por decreto gubernamental", "Dinero hecho de metal", "Dinero rápido"] },
    correct: 1
  },
  {
    de: { q: "Was ist Inflation?", options: ["Steigerung der Kaufkraft", "Minderung der Geldmenge", "Anstieg des allgemeinen Preisniveaus", "Wirtschaftswachstum"] },
    en: { q: "What is inflation?", options: ["Increase in purchasing power", "Decrease in money supply", "Rise in the general price level", "Economic growth"] },
    es: { q: "¿Qué es la inflación?", options: ["Aumento del poder adquisitivo", "Disminución de la oferta monetaria", "Aumento del nivel general de precios", "Crecimiento económico"] },
    correct: 2
  },
  {
    de: { q: "Was versteht man unter dem 'Cantillon-Effekt'?", options: ["Geld kommt bei allen gleichzeitig an", "Ungleiche Verteilung von neuem Geld", "Die Wirkung von Zinsen", "Die Erfindung des Papiergeldes"] },
    en: { q: "What is the 'Cantillon Effect'?", options: ["Money reaches everyone at once", "Uneven distribution of new money", "The effect of interest rates", "The invention of paper money"] },
    es: { q: "¿Qué es el 'Efecto Cantillon'?", options: ["El dinero llega a todos a la vez", "Distribución desigual del dinero nuevo", "El efecto de las tasas de interés", "La invención del papel moneda"] },
    correct: 1
  },
  {
    de: { q: "Wer gilt als Hauptvertreter der Österreichischen Schule der Nationalökonomie?", options: ["John Maynard Keynes", "Ludwig von Mises", "Karl Marx", "Milton Friedman"] },
    en: { q: "Who is a main representative of the Austrian School of Economics?", options: ["John Maynard Keynes", "Ludwig von Mises", "Karl Marx", "Milton Friedman"] },
    es: { q: "¿Quién es un representante principal de la Escuela Austriaca de Economía?", options: ["John Maynard Keynes", "Ludwig von Mises", "Karl Marx", "Milton Friedman"] },
    correct: 1
  },
  {
    de: { q: "Was ist das Hauptmerkmal von 'Hard Money' (hartem Geld)?", options: ["Es ist schwer zu transportieren", "Es ist schwer zu fälschen", "Es ist schwer zu produzieren/vermehren", "Es besteht aus Diamanten"] },
    en: { q: "What is the main characteristic of 'Hard Money'?", options: ["Hard to transport", "Hard to counterfeit", "Hard to produce/inflate", "Made of diamonds"] },
    es: { q: "¿Cuál es la característica principal del 'Dinero Duro'?", options: ["Difícil de transportar", "Difícil de falsificar", "Difícil de producir/aumentar", "Hecho de diamantes"] },
    correct: 2
  },
  {
    de: { q: "Welches Ereignis fand am 15. August 1971 statt (Nixon Schock)?", options: ["Bitcoin Erfindung", "Ende der Golddeckung des US-Dollars", "Gründung der FED", "Erster Weltkrieg"] },
    en: { q: "What happened on August 15, 1971 (Nixon Shock)?", options: ["Bitcoin invention", "End of US Dollar gold backing", "Founding of the FED", "WWI"] },
    es: { q: "¿Qué sucedió el 15 de agosto de 1971 (Shock de Nixon)?", options: ["Invención de Bitcoin", "Fin del respaldo en oro del dólar", "Fundación de la FED", "Primera Guerra Mundial"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Fractional Reserve Banking'?", options: ["Banken halten 100% Reserve", "Banken verleihen Geld, das sie nicht haben", "Banken gehören dem Staat", "Banken nutzen nur Gold"] },
    en: { q: "What implies 'Fractional Reserve Banking'?", options: ["Banks hold 100% reserve", "Banks lend money they don't have", "Banks are state-owned", "Banks use only gold"] },
    es: { q: "¿Qué implica la 'Reserva Fraccionaria'?", options: ["Bancos mantienen 100% de reserva", "Bancos prestan dinero que no tienen", "Bancos son propiedad del estado", "Bancos usan solo oro"] },
    correct: 1
  },

  // --- TECHNIK & NETZWERK ---
  {
    de: { q: "Was ist eine 'Full Node'?", options: ["Ein Mining-Rechner", "Ein Gerät, das alle Regeln validiert", "Ein Bitcoin-Geldautomat", "Ein schneller Internetanschluss"] },
    en: { q: "What is a 'Full Node'?", options: ["A mining computer", "A device validating all rules", "A Bitcoin ATM", "Fast internet connection"] },
    es: { q: "¿Qué es un 'Full Node'?", options: ["Una computadora de minería", "Un dispositivo que valida todas las reglas", "Un cajero automático de Bitcoin", "Conexión rápida a internet"] },
    correct: 1
  },
  {
    de: { q: "Was speichert ein 'Private Key'?", options: ["Die Adresse des Nutzers", "Die Berechtigung, BTC zu bewegen", "Den Namen des Besitzers", "Die Transaktionshistorie"] },
    en: { q: "What does a 'Private Key' store?", options: ["User address", "Permission to move BTC", "Owner's name", "Transaction history"] },
    es: { q: "¿Qué almacena una 'Clave Privada'?", options: ["Dirección del usuario", "Permiso para mover BTC", "Nombre del propietario", "Historial de transacciones"] },
    correct: 1
  },
  {
    de: { q: "Was ist das 'Lightning Network'?", options: ["Ein neuer Bitcoin-Nachfolger", "Eine Layer-2 Lösung für schnelle Zahlungen", "Ein Mining-Pool", "Ein Stromnetz"] },
    en: { q: "What is the 'Lightning Network'?", options: ["A Bitcoin successor", "A Layer-2 solution for fast payments", "A mining pool", "A power grid"] },
    es: { q: "¿Qué es 'Lightning Network'?", options: ["Un sucesor de Bitcoin", "Solución de Capa 2 para pagos rápidos", "Un pool de minería", "Una red eléctrica"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'HODL' ursprünglich?", options: ["Hold On for Dear Life", "Ein Tippfehler für 'Hold'", "High Output Digital Ledger", "Home Operated Decentralized Login"] },
    en: { q: "What does 'HODL' originally mean?", options: ["Hold On for Dear Life", "A typo for 'Hold'", "High Output Digital Ledger", "Home Operated Decentralized Login"] },
    es: { q: "¿Qué significaba 'HODL' originalmente?", options: ["Hold On for Dear Life", "Un error tipográfico de 'Hold'", "High Output Digital Ledger", "Home Operated Decentralized Login"] },
    correct: 1
  },
  {
    de: { q: "Was ist die 'Difficulty Adjustment'?", options: ["Anpassung der BTC-Menge", "Anpassung der Mining-Schwierigkeit", "Änderung der Blockgröße", "Steueranpassung"] },
    en: { q: "What is 'Difficulty Adjustment'?", options: ["Adjustment of BTC supply", "Adjustment of mining difficulty", "Change of block size", "Tax adjustment"] },
    es: { q: "¿Qué es el 'Ajuste de Dificultad'?", options: ["Ajuste de suministro de BTC", "Ajuste de dificultad de minado", "Cambio de tamaño de bloque", "Ajuste de impuestos"] },
    correct: 1
  },
  {
    de: { q: "Wie oft findet das Difficulty Adjustment statt?", options: ["Jeden Tag", "Alle 2016 Blöcke (ca. 2 Wochen)", "Alle 4 Jahre", "Jedes Mal beim Mining"] },
    en: { q: "How often does Difficulty Adjustment occur?", options: ["Every day", "Every 2016 blocks (~2 weeks)", "Every 4 years", "Every time mining happens"] },
    es: { q: "¿Con qué frecuencia ocurre el Ajuste de Dificultad?", options: ["Cada día", "Cada 2016 bloques (~2 semanas)", "Cada 4 años", "Cada vez que se mina"] },
    correct: 1
  },
  {
    de: { q: "Was ist eine 'Cold Wallet'?", options: ["Eine Wallet im Kühlschrank", "Eine Wallet ohne Internetverbindung", "Eine langsame Wallet", "Eine Wallet für Altcoins"] },
    en: { q: "What is a 'Cold Wallet'?", options: ["Wallet in the fridge", "Wallet without internet connection", "A slow wallet", "Wallet for Altcoins"] },
    es: { q: "¿Qué es una 'Cold Wallet' (Billetera Fría)?", options: ["Billetera en el refrigerador", "Billetera sin conexión a internet", "Una billetera lenta", "Billetera para Altcoins"] },
    correct: 1
  },

  // --- GESCHICHTE & KULTUR ---
  {
    de: { q: "Wie viel bezahlte Laszlo Hanyecz 2010 für zwei Pizzen?", options: ["1 BTC", "100 BTC", "1.000 BTC", "10.000 BTC"] },
    en: { q: "How much did Laszlo Hanyecz pay for two pizzas in 2010?", options: ["1 BTC", "100 BTC", "1,000 BTC", "10,000 BTC"] },
    es: { q: "¿Cuánto pagó Laszlo Hanyecz por dos pizzas en 2010?", options: ["1 BTC", "100 BTC", "1.000 BTC", "10.000 BTC"] },
    correct: 3
  },
  {
    de: { q: "Welches Land führte Bitcoin als erstes als gesetzliches Zahlungsmittel ein?", options: ["Schweiz", "USA", "El Salvador", "Zentralafrikanische Republik"] },
    en: { q: "Which country first adopted Bitcoin as legal tender?", options: ["Switzerland", "USA", "El Salvador", "Central African Republic"] },
    es: { q: "¿Qué país adoptó primero Bitcoin como moneda de curso legal?", options: ["Suiza", "EE. UU.", "El Salvador", "República Centroafricana"] },
    correct: 2
  },
  {
    de: { q: "Was steht in der Zeitungsüberschrift im Genesis-Block?", options: ["The Times: Chancellor on brink of second bailout", "Bitcoin is born", "The Dollar is dead", "Satoshi was here"] },
    en: { q: "What is the newspaper headline in the Genesis Block?", options: ["The Times: Chancellor on brink of second bailout", "Bitcoin is born", "The Dollar is dead", "Satoshi was here"] },
    es: { q: "¿Qué titular de periódico está en el Bloque Génesis?", options: ["The Times: Chancellor on brink of second bailout", "Bitcoin is born", "The Dollar is dead", "Satoshi was here"] },
    correct: 0
  },
  {
    de: { q: "Wer war die erste Person, die eine Bitcoin-Transaktion von Satoshi erhielt?", options: ["Hal Finney", "Elon Musk", "Dorian Nakamoto", "Craig Wright"] },
    en: { q: "Who was the first person to receive a Bitcoin transaction from Satoshi?", options: ["Hal Finney", "Elon Musk", "Dorian Nakamoto", "Craig Wright"] },
    es: { q: "¿Quién fue la primera persona en recibir una transacción de Satoshi?", options: ["Hal Finney", "Elon Musk", "Dorian Nakamoto", "Craig Wright"] },
    correct: 0
  },
  {
    de: { q: "Was bedeutet der Begriff 'Double Spending'?", options: ["Zweimal am Tag BTC kaufen", "Gleiche digitale Münze zweimal ausgeben", "Bitcoin Kurs verdoppelt sich", "Zwei Wallets besitzen"] },
    en: { q: "What does 'Double Spending' mean?", options: ["Buying BTC twice a day", "Spending the same digital coin twice", "Bitcoin price doubles", "Owning two wallets"] },
    es: { q: "¿Qué significa 'Double Spending' (Doble Gasto)?", options: ["Comprar BTC dos veces al día", "Gastar la misma moneda digital dos veces", "El precio de Bitcoin se duplica", "Tener dos billeteras"] },
    correct: 1
  },
  {
    de: { q: "Was versteht man unter 'Stock-to-Flow'?", options: ["Aktienkurs-Vorhersage", "Verhältnis von Bestand zu Neuproduktion", "Mining-Geschwindigkeit", "Börsen-Volumen"] },
    en: { q: "What is 'Stock-to-Flow'?", options: ["Stock price prediction", "Ratio of existing stock to new production", "Mining speed", "Exchange volume"] },
    es: { q: "¿Qué se entiende por 'Stock-to-Flow'?", options: ["Predicción de precios de acciones", "Relación entre existencias y nueva producción", "Velocidad de minería", "Volumen de intercambio"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Seed Phrase'?", options: ["Eine Liste von 12-24 Wörtern zur Wiederherstellung", "Das Passwort für die Börse", "Ein geheimer Nutzername", "Eine E-Mail Adresse"] },
    en: { q: "What is a 'Seed Phrase'?", options: ["A list of 12-24 words for recovery", "Password for the exchange", "A secret username", "An email address"] },
    es: { q: "¿Qué es una 'Frase Semilla' (Seed Phrase)?", options: ["Una lista de 12-24 palabras para recuperación", "Contraseña del exchange", "Un nombre de usuario secreto", "Una dirección de correo"] },
    correct: 0
  },
  {
    de: { q: "Welche Eigenschaft macht Bitcoin 'Zensurresistent'?", options: ["Es ist sehr teuer", "Niemand kann Transaktionen stoppen", "Es ist nur für Experten", "Es wird staatlich kontrolliert"] },
    en: { q: "What makes Bitcoin 'Censorship Resistant'?", options: ["It is very expensive", "No one can stop transactions", "It is only for experts", "It is state-controlled"] },
    es: { q: "¿Qué hace a Bitcoin 'Resistente a la Censura'?", options: ["Es muy caro", "Nadie puede detener las transacciones", "Es solo para expertos", "Está controlado por el estado"] },
    correct: 1
  },
  {
    de: { q: "Was ist die 'Blockchain' technisch gesehen?", options: ["Eine Datenbank", "Eine Kette von digitalen Signaturen/Blöcken", "Ein Cloud-Speicher", "Ein soziales Netzwerk"] },
    en: { q: "What is the 'Blockchain' technically?", options: ["A database", "A chain of digital signatures/blocks", "Cloud storage", "A social network"] },
    es: { q: "¿Qué es técnicamente la 'Blockchain'?", options: ["Una base de datos", "Una cadena de firmas/bloques digitales", "Almacenamiento en la nube", "Una red social"] },
    correct: 1
  },
  {
    de: { q: "Warum ist Bitcoin 'dezentral'?", options: ["Weil es weltweit genutzt wird", "Weil es keine zentrale Kontrollinstanz gibt", "Weil es schnell ist", "Weil es digital ist"] },
    en: { q: "Why is Bitcoin 'decentralized'?", options: ["Because it's used globally", "No central controlling entity", "Because it's fast", "Because it's digital"] },
    es: { q: "¿Por qué Bitcoin es 'descentralizado'?", options: ["Porque se usa mundialmente", "No hay entidad de control central", "Porque es rápido", "Porque es digital"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der Begriff 'Mining'?", options: ["Suchen nach Gold", "Absicherung des Netzwerks & Emission", "Handeln an Börsen", "Programmieren von Apps"] },
    en: { q: "What does 'Mining' describe?", options: ["Searching for gold", "Securing network & emission", "Trading on exchanges", "Coding apps"] },
    es: { q: "¿Qué describe el término 'Minería'?", options: ["Buscar oro", "Asegurar la red y emisión", "Operar en exchanges", "Programar aplicaciones"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'ASIC'?", options: ["Ein Bitcoin-Logo", "Spezialisierte Hardware für Mining", "Ein neuer Coin", "Ein Krypto-Experte"] },
    en: { q: "What is an 'ASIC'?", options: ["A Bitcoin logo", "Specialized hardware for mining", "A new coin", "A crypto expert"] },
    es: { q: "¿Qué es un 'ASIC'?", options: ["Un logo de Bitcoin", "Hardware especializado para minería", "Una nueva moneda", "Un experto en cripto"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'UTXO'?", options: ["Ein spezieller Mining-Pool", "Ein nicht ausgegebener Transaktionsausgang", "Eine Bitcoin-Börse", "Ein Software-Update"] },
    en: { q: "What is a 'UTXO'?", options: ["A mining pool", "Unspent Transaction Output", "A Bitcoin exchange", "A software update"] },
    es: { q: "¿Qué es un 'UTXO'?", options: ["Un pool de minería", "Salida de Transacción No Gastada", "Un exchange de Bitcoin", "Una actualización de software"] },
    correct: 1
  },
  {
    de: { q: "Was versteht man unter 'Gresham's Law'?", options: ["Gutes Geld verdrängt schlechtes", "Schlechtes Geld verdrängt gutes aus dem Umlauf", "Geld verliert an Wert", "Zinsen steigen immer"] },
    en: { q: "What is 'Gresham's Law'?", options: ["Good money drives out bad", "Bad money drives good out of circulation", "Money loses value", "Interest always rises"] },
    es: { q: "¿Qué es la 'Ley de Gresham'?", options: ["El buen dinero desplaza al malo", "El dinero malo desplaza al bueno de la circulación", "El dinero pierde valor", "Los intereses siempre suben"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Sound Money'?", options: ["Geld, das Geräusche macht", "Geld mit stabiler Kaufkraft/knappem Angebot", "Geld auf dem Handy", "Staatliches Papiergeld"] },
    en: { q: "What is 'Sound Money'?", options: ["Money that makes noise", "Money with stable purchasing power/scarcity", "Mobile money", "Government paper money"] },
    es: { q: "¿Qué es 'Sound Money' (Dinero Sólido)?", options: ["Dinero que hace ruido", "Dinero con poder adquisitivo estable/escasez", "Dinero móvil", "Papel moneda estatal"] },
    correct: 1
  },
  {
    de: { q: "Wie nennt man das Vertrauen in ein System ohne Mittelsmann?", options: ["Trustless", "Zentralisiert", "Bankenwesen", "Social Credit"] },
    en: { q: "What do you call trust in a system without middlemen?", options: ["Trustless", "Centralized", "Banking", "Social Credit"] },
    es: { q: "¿Cómo se llama la confianza en un sistema sin intermediarios?", options: ["Trustless (Sin confianza requerida)", "Centralizado", "Banca", "Crédito Social"] },
    correct: 0
  },
  {
    de: { q: "Was ist 'Time Preference' (Zeitpräferenz)?", options: ["Pünktlichkeit beim Mining", "Bewertung von heutigem vs. zukünftigem Konsum", "Die Dauer einer Transaktion", "Die Uhrzeit in Bitcoin"] },
    en: { q: "What is 'Time Preference'?", options: ["Punctuality in mining", "Valuation of present vs. future consumption", "Transaction duration", "Time in Bitcoin"] },
    es: { q: "¿Qué es la 'Preferencia Temporal'?", options: ["Puntualidad en la minería", "Valoración del consumo presente vs. futuro", "Duración de una transacción", "La hora en Bitcoin"] },
    correct: 1
  },
  {
    de: { q: "Was passierte beim 'Blocksize War'?", options: ["Kampf um den Bitcoin Preis", "Streit um die Skalierung/Blockgröße", "Krieg zwischen Ländern", "Hackerangriff auf Satoshi"] },
    en: { q: "What happened during the 'Blocksize War'?", options: ["Battle for Bitcoin price", "Dispute over scaling/block size", "War between countries", "Hack attack on Satoshi"] },
    es: { q: "¿Qué pasó en la 'Guerra del Tamaño de Bloque'?", options: ["Batalla por el precio de Bitcoin", "Disputa sobre escalabilidad/tamaño de bloque", "Guerra entre países", "Ataque hacker a Satoshi"] },
    correct: 1
  },
  {
    de: { q: "Welches mathematische Problem löste Bitcoin, um Konsens ohne zentrale Instanz zu ermöglichen?", options: ["Byzantinisches Fehlertoleranz-Problem", "P-NP-Problem", "Das Gefangenendilemma", "Die Fermat’sche Vermutung"] },
    en: { q: "Which problem did Bitcoin solve to enable consensus without a central authority?", options: ["Byzantine Generals Problem", "P-NP Problem", "Prisoner's Dilemma", "Fermat's Last Theorem"] },
    es: { q: "¿Qué problema resolvió Bitcoin para permitir consenso sin autoridad central?", options: ["Problema de los Generales Bizantinos", "Problema P-NP", "Dilema del Prisionero", "Último Teorema de Fermat"] },
    correct: 0
  },
  {
    de: { q: "Was beschreibt der 'Lindy-Effekt' im Kontext von Bitcoin?", options: ["Die Korrelation zum Aktienmarkt", "Dass die Lebenserwartung mit dem Alter steigt", "Die Geschwindigkeit der Transaktionen", "Die Anzahl der verlorenen Bitcoins"] },
    en: { q: "What does the 'Lindy Effect' describe regarding Bitcoin?", options: ["Correlation to stock market", "Life expectancy increases with age", "Transaction speed", "Number of lost Bitcoins"] },
    es: { q: "¿Qué describe el 'Efecto Lindy' respecto a Bitcoin?", options: ["Correlación con el mercado de valores", "La esperanza de vida aumenta con la edad", "Velocidad de transacción", "Número de Bitcoins perdidos"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Soft Fork'?", options: ["Ein Update, das die Regeln lockert", "Ein Update, das abwärtskompatibel ist", "Eine komplette Spaltung der Chain", "Ein Hardware-Update für Miner"] },
    en: { q: "What is a 'Soft Fork'?", options: ["Update loosening rules", "Backward compatible update", "Complete chain split", "Hardware update for miners"] },
    es: { q: "¿Qué es un 'Soft Fork'?", options: ["Actualización que relaja reglas", "Actualización compatible hacia atrás", "División completa de la cadena", "Actualización de hardware para mineros"] },
    correct: 1
  },
  {
    de: { q: "Was war das Hauptziel des 'SegWit' (BIP141) Updates?", options: ["Erhöhung des BTC-Preises", "Behebung von 'Transaction Malleability'", "Einführung von Smart Contracts", "Abschaffung des Minings"] },
    en: { q: "What was the main goal of 'SegWit' (BIP141)?", options: ["Increase BTC price", "Fixing 'Transaction Malleability'", "Intro of Smart Contracts", "Abolish mining"] },
    es: { q: "¿Cuál fue el objetivo principal de 'SegWit' (BIP141)?", options: ["Aumentar precio de BTC", "Corregir 'Maleabilidad de Transacciones'", "Introducir Contratos Inteligentes", "Abolir la minería"] },
    correct: 1
  },

  // --- VERTIEFTE TECHNIK ---
  {
    de: { q: "Was bewirkt die Datenstruktur des 'Merkle Tree' in einem Block?", options: ["Sie speichert die Miner-Daten", "Sie komprimiert die Blockzeit", "Sie ermöglicht effiziente Verifizierung von Transaktionen", "Sie berechnet die Difficulty"] },
    en: { q: "What does the 'Merkle Tree' structure do in a block?", options: ["Stores miner data", "Compresses block time", "Enables efficient transaction verification", "Calculates difficulty"] },
    es: { q: "¿Qué hace la estructura 'Merkle Tree' en un bloque?", options: ["Almacena datos del minero", "Comprime el tiempo de bloque", "Permite verificación eficiente de transacciones", "Calcula la dificultad"] },
    correct: 2
  },
  {
    de: { q: "Ist die Bitcoin-Scriptsprache 'Turing-vollständig'?", options: ["Ja, wie Ethereum", "Nein, zur Vermeidung von Endlosschleifen", "Nur im Lightning-Netzwerk", "Nur seit dem Taproot-Update"] },
    en: { q: "Is Bitcoin Script 'Turing-complete'?", options: ["Yes, like Ethereum", "No, to avoid infinite loops", "Only in Lightning", "Only since Taproot"] },
    es: { q: "¿Es Bitcoin Script 'Turing-completo'?", options: ["Sí, como Ethereum", "No, para evitar bucles infinitos", "Solo en Lightning", "Solo desde Taproot"] },
    correct: 1
  },
  {
    de: { q: "In welchem Jahr wird voraussichtlich der letzte Satoshi gemined?", options: ["2040", "2100", "2140", "3000"] },
    en: { q: "In which year will the last Satoshi likely be mined?", options: ["2040", "2100", "2140", "3000"] },
    es: { q: "¿En qué año se minará probablemente el último Satoshi?", options: ["2040", "2100", "2140", "3000"] },
    correct: 2
  },
  {
    de: { q: "Was ist der 'Mempool'?", options: ["Ein Speicher für geminedte Blöcke", "Warteraum für unbestätigte Transaktionen", "Ein Verzeichnis aller Wallets", "Die Datenbank der Full Nodes"] },
    en: { q: "What is the 'Mempool'?", options: ["Storage for mined blocks", "Waiting room for unconfirmed transactions", "Directory of all wallets", "Database of Full Nodes"] },
    es: { q: "¿Qué es la 'Mempool'?", options: ["Almacenamiento de bloques minados", "Sala de espera para transacciones no confirmadas", "Directorio de billeteras", "Base de datos de Full Nodes"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'RBF' (Replace-By-Fee)?", options: ["Transaktion durch höhere Gebühr beschleunigen", "Zahlung stornieren", "Mining-Belohnung ändern", "Bitcoin gegen Fiat tauschen"] },
    en: { q: "What means 'RBF' (Replace-By-Fee)?", options: ["Accelerate transaction via higher fee", "Cancel payment", "Change mining reward", "Swap Bitcoin for Fiat"] },
    es: { q: "¿Qué significa 'RBF' (Replace-By-Fee)?", options: ["Acelerar transacción con tarifa más alta", "Cancelar pago", "Cambiar recompensa minera", "Cambiar Bitcoin por Fiat"] },
    correct: 0
  },
  {
    de: { q: "Welche Adressen beginnen standardmäßig mit 'bc1q'?", options: ["Legacy Adressen", "Pay-to-Script-Hash (P2SH)", "Native SegWit (Bech32)", "Taproot Adressen"] },
    en: { q: "Which addresses start with 'bc1q'?", options: ["Legacy Addresses", "Pay-to-Script-Hash (P2SH)", "Native SegWit (Bech32)", "Taproot Addresses"] },
    es: { q: "¿Qué direcciones comienzan con 'bc1q'?", options: ["Direcciones Legacy", "Pay-to-Script-Hash (P2SH)", "Native SegWit (Bech32)", "Direcciones Taproot"] },
    correct: 2
  },
  {
    de: { q: "Was ermöglicht das 'Taproot' Update technisch?", options: ["Größere Blöcke", "Schnorr-Signaturen & komplexere Smart Contracts", "Mining ohne Strom", "Anonymität wie Monero"] },
    en: { q: "What does 'Taproot' enable technically?", options: ["Larger blocks", "Schnorr signatures & complex smart contracts", "Mining without power", "Monero-like anonymity"] },
    es: { q: "¿Qué permite técnicamente 'Taproot'?", options: ["Bloques más grandes", "Firmas Schnorr y contratos inteligentes complejos", "Minería sin electricidad", "Anonimato tipo Monero"] },
    correct: 1
  },
  {
    de: { q: "Was ist eine 'Reorg' (Chain Reorganization)?", options: ["Ein Software-Update", "Das Ersetzen einer Kette durch eine längere gültige Kette", "Das Löschen der Blockchain", "Ein Wechsel des Hash-Algorithmus"] },
    en: { q: "What is a 'Reorg' (Chain Reorganization)?", options: ["Software update", "Replacing a chain with a longer valid chain", "Deleting blockchain", "Changing hash algorithm"] },
    es: { q: "¿Qué es una 'Reorg' (Reorganización de Cadena)?", options: ["Actualización de software", "Reemplazo de una cadena por una más larga válida", "Borrado de blockchain", "Cambio de algoritmo hash"] },
    correct: 1
  },

  // --- MONETÄRE HISTORIE & ÖKONOMIE ---
  {
    de: { q: "Warum ist die chemische Eigenschaft 'Inertheit' wichtig für Gold als Geld?", options: ["Es rostet/reagiert nicht und bleibt beständig", "Es glänzt schön", "Es lässt sich leicht schmelzen", "Es ist selten"] },
    en: { q: "Why is 'Inertness' important for Gold as money?", options: ["It doesn't rust/react, remains stable", "It shines nicely", "Easy to melt", "It is rare"] },
    es: { q: "¿Por qué es importante la 'Inercia' para el Oro como dinero?", options: ["No se oxida/reacciona, permanece estable", "Brilla bonito", "Fácil de fundir", "Es raro"] },
    correct: 0
  },
  {
    de: { q: "Was geschah auf der Konferenz von 'Bretton Woods' 1944?", options: ["Gründung der EU", "Bitcoin Whitepaper Entwurf", "Fixierung des Dollars an Gold", "Erfindung des Buchgeldes"] },
    en: { q: "What happened at 'Bretton Woods' in 1944?", options: ["Founding of EU", "Bitcoin Whitepaper draft", "Pegging Dollar to Gold", "Invention of ledger money"] },
    es: { q: "¿Qué pasó en 'Bretton Woods' en 1944?", options: ["Fundación de la UE", "Borrador de Bitcoin Whitepaper", "Fijación del Dólar al Oro", "Invención del dinero contable"] },
    correct: 2
  },
  {
    de: { q: "Was bezeichnet der Begriff 'Seigniorage'?", options: ["Die Steuer auf Krypto", "Der Gewinn aus der Geldschöpfung", "Die Zinsen der Zentralbank", "Ein alter französischer Coin"] },
    en: { q: "What does 'Seigniorage' mean?", options: ["Crypto tax", "Profit from money creation", "Central bank interest", "Old French coin"] },
    es: { q: "¿Qué significa 'Seigniorage' (Señoreaje)?", options: ["Impuesto cripto", "Beneficio de la creación de dinero", "Interés del banco central", "Moneda antigua francesa"] },
    correct: 1
  },
  {
    de: { q: "Ab welcher monatlichen Preissteigerungsrate spricht man von Hyperinflation?", options: ["10%", "20%", "50%", "100%"] },
    en: { q: "Which monthly inflation rate defines Hyperinflation?", options: ["10%", "20%", "50%", "100%"] },
    es: { q: "¿Qué tasa mensual define la Hiperinflación?", options: ["10%", "20%", "50%", "100%"] },
    correct: 2
  },
  {
    de: { q: "Was bedeutet 'Niedrige Zeitpräferenz'?", options: ["Sofortiger Konsum wichtig", "Belohnungsaufschub für die Zukunft", "Schnelle Bitcoin-Transaktion", "Kurze Arbeitszeit"] },
    en: { q: "What means 'Low Time Preference'?", options: ["Immediate consumption important", "Delayed gratification for future", "Fast Bitcoin transaction", "Short working hours"] },
    es: { q: "¿Qué significa 'Baja Preferencia Temporal'?", options: ["Consumo inmediato importante", "Postergación de gratificación para el futuro", "Transacción rápida de Bitcoin", "Horas de trabajo cortas"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Schuldgeld'?", options: ["Geld, das man sich leiht", "Geld, das durch Kreditvergabe entsteht", "Geld für Kriminelle", "Goldmünzen"] },
    en: { q: "What is 'Debt Money'?", options: ["Borrowed money", "Money created through lending/credit", "Money for criminals", "Gold coins"] },
    es: { q: "¿Qué es 'Dinero de Deuda'?", options: ["Dinero prestado", "Dinero creado mediante crédito", "Dinero para criminales", "Monedas de oro"] },
    correct: 1
  },
  {
    de: { q: "Welche Geldfunktion erfüllt Bitcoin laut Kritikern derzeit am wenigsten?", options: ["Wertaufbewahrungsmittel", "Recheneinheit", "Tauschmittel", "Knappheit"] },
    en: { q: "Which money function does Bitcoin satisfy least per critics?", options: ["Store of Value", "Unit of Account", "Medium of Exchange", "Scarcity"] },
    es: { q: "¿Qué función del dinero cumple menos Bitcoin según críticos?", options: ["Reserva de Valor", "Unidad de Cuenta", "Medio de Intercambio", "Escasez"] },
    correct: 1
  },
  {
    de: { q: "Wer schrieb das Buch 'The Denationalization of Money'?", options: ["Satoshi Nakamoto", "Friedrich August von Hayek", "Milton Friedman", "Ludwig von Mises"] },
    en: { q: "Who wrote 'The Denationalization of Money'?", options: ["Satoshi Nakamoto", "Friedrich August von Hayek", "Milton Friedman", "Ludwig von Mises"] },
    es: { q: "¿Quién escribió 'La Desnacionalización del Dinero'?", options: ["Satoshi Nakamoto", "Friedrich August von Hayek", "Milton Friedman", "Ludwig von Mises"] },
    correct: 1
  },

  // --- LIGHTNING & LAYER 2 ---
  {
    de: { q: "Was ist ein 'HTLC' im Lightning Netzwerk?", options: ["Ein High-Tech Ledger", "Hashed Time-Locked Contract", "Ein schneller Mining-Chip", "Ein Peer-to-Peer Protokoll"] },
    en: { q: "What is an 'HTLC' in Lightning?", options: ["High-Tech Ledger", "Hashed Time-Locked Contract", "Fast Mining Chip", "Peer-to-Peer Protocol"] },
    es: { q: "¿Qué es un 'HTLC' en Lightning?", options: ["High-Tech Ledger", "Hashed Time-Locked Contract", "Chip de minería rápido", "Protocolo Peer-to-Peer"] },
    correct: 1
  },
  {
    de: { q: "Muss man für jede Lightning-Zahlung eine On-Chain Transaktion machen?", options: ["Ja, immer", "Nein, nur zum Öffnen/Schließen von Kanälen", "Nur bei Beträgen über 1 BTC", "Nur wenn das Internet langsam ist"] },
    en: { q: "Do you need an On-Chain tx for every Lightning payment?", options: ["Yes, always", "No, only for opening/closing channels", "Only for > 1 BTC", "Only if internet is slow"] },
    es: { q: "¿Necesitas una tx On-Chain para cada pago Lightning?", options: ["Sí, siempre", "No, solo para abrir/cerrar canales", "Solo para > 1 BTC", "Solo si internet es lento"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt das 'Trillema' der Skalierbarkeit?", options: ["Preis, Volumen, Speed", "Sicherheit, Dezentralität, Skalierbarkeit", "Mining, Nodes, User", "Fiat, Gold, Krypto"] },
    en: { q: "What is the Scalability 'Trilemma'?", options: ["Price, Volume, Speed", "Security, Decentralization, Scalability", "Mining, Nodes, Users", "Fiat, Gold, Crypto"] },
    es: { q: "¿Qué es el 'Trilema' de escalabilidad?", options: ["Precio, Volumen, Velocidad", "Seguridad, Descentralización, Escalabilidad", "Minería, Nodos, Usuarios", "Fiat, Oro, Cripto"] },
    correct: 1
  },

  // --- SPEZIALWISSEN ---
  {
    de: { q: "Wie hieß die Vorläufer-Technologie von Adam Back (1997)?", options: ["BitGold", "b-money", "Hashcash", "DigiCash"] },
    en: { q: "What was Adam Back's precursor tech (1997)?", options: ["BitGold", "b-money", "Hashcash", "DigiCash"] },
    es: { q: "¿Cuál fue la tecnología precursora de Adam Back (1997)?", options: ["BitGold", "b-money", "Hashcash", "DigiCash"] },
    correct: 2
  },
  {
    de: { q: "Was ist der 'Dust Limit'?", options: ["Maximale Menge an BTC", "Mindestbetrag einer Transaktion", "Die Anzahl der Miner", "Staub im PC"] },
    en: { q: "What is the 'Dust Limit'?", options: ["Max BTC amount", "Minimum transaction amount", "Number of miners", "Dust in PC"] },
    es: { q: "¿Qué es el 'Dust Limit'?", options: ["Cantidad máxima de BTC", "Monto mínimo de transacción", "Número de mineros", "Polvo en la PC"] },
    correct: 1
  },
  {
    de: { q: "Wie viele Kombinationen hat ein 24-Wörter Seed (256-Bit Entropie) etwa?", options: ["1 Milliarde", "So viele wie Atome im Universum", "10 hoch 77", "Sowohl B als auch C sind korrekt"] },
    en: { q: "How many combinations has a 24-word seed?", options: ["1 Billion", "As many as atoms in universe", "10 to the power of 77", "Both B and C are correct"] },
    es: { q: "¿Cuántas combinaciones tiene una semilla de 24 palabras?", options: ["1 Billón", "Tantas como átomos en el universo", "10 elevado a 77", "Ambas B y C son correctas"] },
    correct: 3
  },
  {
    de: { q: "Was passierte am 22. Mai (Bitcoin Pizza Day)?", options: ["Satoshi verschwand", "Erster realer Kauf mit BTC", "Genesis Block wurde gefunden", "Erstes Halving"] },
    en: { q: "What happened on May 22 (Bitcoin Pizza Day)?", options: ["Satoshi disappeared", "First real-world purchase with BTC", "Genesis Block found", "First Halving"] },
    es: { q: "¿Qué pasó el 22 de mayo (Bitcoin Pizza Day)?", options: ["Satoshi desapareció", "Primera compra real con BTC", "Bloque Génesis encontrado", "Primer Halving"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'CoinJoin'?", options: ["Zwei Coins zu einem machen", "Verfahren zur Verbesserung der Privatsphäre", "Mining im Team", "Bitcoin auf zwei Wallets teilen"] },
    en: { q: "What is 'CoinJoin'?", options: ["Merging two coins", "Method for privacy improvement", "Team mining", "Splitting Bitcoin to two wallets"] },
    es: { q: "¿Qué es 'CoinJoin'?", options: ["Fusionar dos monedas", "Método para mejorar privacidad", "Minería en equipo", "Dividir Bitcoin en dos billeteras"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Not your Keys, not your Coins'?", options: ["Man braucht keinen Schlüssel", "Ohne Private Key Kontrolle besitzt man keine BTC", "Hardware Wallets sind unsicher", "Verlust des Passworts ist egal"] },
    en: { q: "What means 'Not your Keys, not your Coins'?", options: ["You need no key", "Without private key control you own no BTC", "Hardware wallets are unsafe", "Password loss doesn't matter"] },
    es: { q: "¿Qué significa 'Not your Keys, not your Coins'?", options: ["No necesitas clave", "Sin control de clave privada no posees BTC", "Billeteras de hardware son inseguras", "Perder contraseña no importa"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Block Subsidy'?", options: ["Die Transaktionsgebühr", "Die neu geschöpften BTC pro Block", "Eine staatliche Förderung", "Die Mining-Hardware"] },
    en: { q: "What is the 'Block Subsidy'?", options: ["Transaction fee", "Newly created BTC per block", "State subsidy", "Mining hardware"] },
    es: { q: "¿Qué es el 'Subsidio de Bloque'?", options: ["Tarifa de transacción", "BTC recién creados por bloque", "Subsidio estatal", "Hardware de minería"] },
    correct: 1
  },
  {
    de: { q: "Welche Rolle spielen 'Full Nodes' bei einem Hard Fork?", options: ["Keine", "Sie bestimmen durch ihre Software, welche Regeln sie akzeptieren", "Sie minen neue Coins", "Sie legen den Preis fest"] },
    en: { q: "What role do 'Full Nodes' play in a Hard Fork?", options: ["None", "They decide accepted rules via software", "They mine new coins", "They set the price"] },
    es: { q: "¿Qué rol juegan los 'Full Nodes' en un Hard Fork?", options: ["Ninguno", "Deciden reglas aceptadas vía software", "Minan nuevas monedas", "Fijan el precio"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'OP_RETURN'?", options: ["Ein Fehler im Code", "Ein Script-Befehl für beliebige Daten in der Blockchain", "Der Neustart einer Node", "Eine Rücküberweisung"] },
    en: { q: "What is 'OP_RETURN'?", options: ["Code error", "Script command for arbitrary data on blockchain", "Node restart", "Refund"] },
    es: { q: "¿Qué es 'OP_RETURN'?", options: ["Error de código", "Comando script para datos arbitrarios en blockchain", "Reinicio de nodo", "Reembolso"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Sighash' Typ?", options: ["Ein Mining-Algorithmus", "Ein Flag, das bestimmt, was signiert wird", "Eine Wallet-Art", "Ein Bitcoin-Verbot"] },
    en: { q: "What is a 'Sighash' type?", options: ["Mining algorithm", "Flag determining what is signed", "Wallet type", "Bitcoin ban"] },
    es: { q: "¿Qué es un tipo 'Sighash'?", options: ["Algoritmo de minería", "Bandera que determina qué se firma", "Tipo de billetera", "Prohibición de Bitcoin"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'ASIC Boost'?", options: ["Übertakten von CPUs", "Optimierung des Mining-Prozesses", "Schnellere Transaktionen", "Ein Lightning-Upgrade"] },
    en: { q: "What describes 'ASIC Boost'?", options: ["Overclocking CPUs", "Optimization of mining process", "Faster transactions", "Lightning upgrade"] },
    es: { q: "¿Qué describe 'ASIC Boost'?", options: ["Overclocking de CPUs", "Optimización del proceso de minería", "Transacciones más rápidas", "Actualización Lightning"] },
    correct: 1
  },
  {
    de: { q: "Was versteht man unter 'Fungibilität'?", options: ["Seltenheit", "Austauschbarkeit einzelner Einheiten", "Teilbarkeit", "Transportfähigkeit"] },
    en: { q: "What is 'Fungibility'?", options: ["Scarcity", "Interchangeability of units", "Divisibility", "Portability"] },
    es: { q: "¿Qué es 'Fungibilidad'?", options: ["Escasez", "Intercambiabilidad de unidades", "Divisibilidad", "Portabilidad"] },
    correct: 1
  },
  {
    de: { q: "Wer ist Nick Szabo?", options: ["Ein Miner", "Erfinder von BitGold & Smart Contracts", "Ehemaliger FED-Chef", "Ein bekannter Bitcoin-Hasser"] },
    en: { q: "Who is Nick Szabo?", options: ["A miner", "Inventor of BitGold & Smart Contracts", "Ex-FED Chief", "Bitcoin hater"] },
    es: { q: "¿Quién es Nick Szabo?", options: ["Un minero", "Inventor de BitGold y Contratos Inteligentes", "Ex-Jefe de FED", "Odiador de Bitcoin"] },
    correct: 1
  },
  {
    de: { q: "Welche physikalische Größe sichert das Bitcoin-Netzwerk?", options: ["Rechenleistung (Energie)", "Speicherplatz", "Internet-Bandbreite", "Anzahl der Nutzer"] },
    en: { q: "Which physical quantity secures the Bitcoin network?", options: ["Computing power (Energy)", "Storage space", "Bandwidth", "User count"] },
    es: { q: "¿Qué magnitud física asegura la red Bitcoin?", options: ["Poder de cómputo (Energía)", "Espacio de almacenamiento", "Ancho de banda", "Cantidad de usuarios"] },
    correct: 0
  },
  {
    de: { q: "Was ist die 'Coinbase' Transaktion?", options: ["Eine Zahlung an die Börse Coinbase", "Die allererste Transaktion in jedem Block", "Der Kauf von BTC mit Kreditkarte", "Ein spezielles Wallet-Backup"] },
    en: { q: "What is the 'Coinbase' transaction?", options: ["Payment to Coinbase exchange", "The very first transaction in every block", "Buying BTC with credit card", "Special wallet backup"] },
    es: { q: "¿Qué es la transacción 'Coinbase'?", options: ["Pago al exchange Coinbase", "La primera transacción de cada bloque", "Compra de BTC con tarjeta", "Respaldo especial de billetera"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Finality'?", options: ["Das Ende von Bitcoin", "Die Unumkehrbarkeit einer Transaktion", "Die letzte Frage im Quiz", "Der Höchstpreis"] },
    en: { q: "What means 'Finality'?", options: ["End of Bitcoin", "Irreversibility of a transaction", "Last quiz question", "Highest price"] },
    es: { q: "¿Qué significa 'Finalidad'?", options: ["Fin de Bitcoin", "Irreversibilidad de una transacción", "Última pregunta del quiz", "Precio máximo"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Cold Storage'?", options: ["Aufbewahrung im Gefrierfach", "Offline-Verwahrung von Private Keys", "Langsames Mining", "Veraltete Software"] },
    en: { q: "What is 'Cold Storage'?", options: ["Storage in freezer", "Offline custody of private keys", "Slow mining", "Outdated software"] },
    es: { q: "¿Qué es 'Cold Storage'?", options: ["Almacenamiento en congelador", "Custodia offline de claves privadas", "Minería lenta", "Software obsoleto"] },
    correct: 1
  },
  {
    de: { q: "Wer schrieb 1993 das 'Cypherpunk Manifesto'?", options: ["Eric Hughes", "Satoshi Nakamoto", "Timothy C. May", "Julian Assange"] },
    en: { q: "Who wrote the 'Cypherpunk Manifesto' (1993)?", options: ["Eric Hughes", "Satoshi Nakamoto", "Timothy C. May", "Julian Assange"] },
    es: { q: "¿Quién escribió el 'Manifiesto Cypherpunk' (1993)?", options: ["Eric Hughes", "Satoshi Nakamoto", "Timothy C. May", "Julian Assange"] },
    correct: 0
  },
  {
    de: { q: "Wie hieß das digitale Bargeld-Projekt von David Chaum aus den 1980ern?", options: ["BitGold", "DigiCash", "B-Money", "Hashcash"] },
    en: { q: "What was David Chaum's digital cash project (1980s)?", options: ["BitGold", "DigiCash", "B-Money", "Hashcash"] },
    es: { q: "¿Cómo se llamaba el proyecto de dinero digital de David Chaum (1980s)?", options: ["BitGold", "DigiCash", "B-Money", "Hashcash"] },
    correct: 1
  },
  {
    de: { q: "Welches kryptographische Verfahren ermöglicht Bitcoins Public-Key-Infrastruktur?", options: ["RSA", "Elliptic Curve Cryptography (ECC)", "AES-256", "Diffie-Hellman"] },
    en: { q: "Which cryptographic method enables Bitcoin's PKI?", options: ["RSA", "Elliptic Curve Cryptography (ECC)", "AES-256", "Diffie-Hellman"] },
    es: { q: "¿Qué método criptográfico habilita la PKI de Bitcoin?", options: ["RSA", "Criptografía de Curva Elíptica (ECC)", "AES-256", "Diffie-Hellman"] },
    correct: 1
  },
  {
    de: { q: "Welche elliptische Kurve verwendet Bitcoin genau?", options: ["Curve25519", "secp256k1", "P-256", "Ed25519"] },
    en: { q: "Which elliptic curve does Bitcoin use?", options: ["Curve25519", "secp256k1", "P-256", "Ed25519"] },
    es: { q: "¿Qué curva elíptica usa Bitcoin?", options: ["Curve25519", "secp256k1", "P-256", "Ed25519"] },
    correct: 1
  },

  // --- FORTGESCHRITTENE TECHNIK ---
  {
    de: { q: "Wie groß ist der Header eines Bitcoin-Blocks?", options: ["40 Bytes", "80 Bytes", "1 Megabyte", "Verschlüsselter Header"] },
    en: { q: "How large is a Bitcoin block header?", options: ["40 Bytes", "80 Bytes", "1 Megabyte", "Encrypted Header"] },
    es: { q: "¿Qué tamaño tiene el encabezado de un bloque Bitcoin?", options: ["40 Bytes", "80 Bytes", "1 Megabyte", "Encabezado cifrado"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Nonce' im Mining-Prozess?", options: ["Eine digitale Signatur", "Eine einmalige Zahl zur Variation des Block-Hashs", "Die Adresse des Miners", "Ein spezieller Mining-Chip"] },
    en: { q: "What is a 'Nonce' in mining?", options: ["Digital signature", "Number used once to vary block hash", "Miner address", "Special mining chip"] },
    es: { q: "¿Qué es un 'Nonce' en la minería?", options: ["Firma digital", "Número usado una vez para variar el hash", "Dirección del minero", "Chip de minería especial"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'MAST' (Merkelized Abstract Syntax Trees)?", options: ["Schnelleres Mining", "Komplexere Smart Contracts durch Teilung von Skripten", "Eine neue Art von Full Node", "Die Vernetzung von Wallets"] },
    en: { q: "What does 'MAST' describe?", options: ["Faster mining", "Complex smart contracts via script splitting", "New Full Node type", "Networking wallets"] },
    es: { q: "¿Qué describe 'MAST'?", options: ["Minería más rápida", "Contratos inteligentes complejos dividiendo scripts", "Nuevo tipo de Full Node", "Red de billeteras"] },
    correct: 1
  },
  {
    de: { q: "Was ist der Unterschied zwischen 'Locktime' und 'Sequence'?", options: ["Es gibt keinen", "Locktime ist absolut (Block/Zeit), Sequence oft relativ", "Locktime ist nur für Miner", "Sequence erhöht den Preis"] },
    en: { q: "Difference between 'Locktime' and 'Sequence'?", options: ["None", "Locktime absolute, Sequence often relative", "Locktime only for miners", "Sequence increases price"] },
    es: { q: "¿Diferencia entre 'Locktime' y 'Sequence'?", options: ["Ninguna", "Locktime absoluto, Sequence a menudo relativo", "Locktime solo para mineros", "Sequence aumenta precio"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Miniscript'?", options: ["Ein kleiner Bitcoin-Client", "Eine Sprache zum einfacheren Schreiben von Bitcoin-Skripten", "Ein Betriebssystem für Miner", "Ein Teil des Whitepapers"] },
    en: { q: "What is 'Miniscript'?", options: ["Small Bitcoin client", "Language for easier Bitcoin scripting", "Miner OS", "Part of Whitepaper"] },
    es: { q: "¿Qué es 'Miniscript'?", options: ["Cliente Bitcoin pequeño", "Lenguaje para scripts de Bitcoin más fáciles", "SO para mineros", "Parte del Libro Blanco"] },
    correct: 1
  },
  {
    de: { q: "Welches Problem lösen 'Schnorr-Signaturen' gegenüber ECDSA?", options: ["Keine", "Linearität erlaubt Signatur-Aggregation (Multisig spart Platz)", "Sie machen Bitcoin quantensicher", "Sie benötigen keinen Strom"] },
    en: { q: "What do 'Schnorr Signatures' solve vs ECDSA?", options: ["None", "Linearity allows signature aggregation", "Make Bitcoin quantum safe", "Need no power"] },
    es: { q: "¿Qué resuelven las 'Firmas Schnorr' vs ECDSA?", options: ["Nada", "Linealidad permite agregación de firmas", "Hacen Bitcoin seguro cuánticamente", "No requieren energía"] },
    correct: 1
  },

  // --- ÖKONOMISCHE THEORIE (ÖSTERREICHISCHE SCHULE) ---
  {
    de: { q: "Was besagt das 'Regressions-Theorem' von Ludwig von Mises?", options: ["Geldwert sinkt immer", "Geldwert muss sich historisch auf einen Tauschwert stützen", "Inflation ist notwendig", "Zinsen sind illegal"] },
    en: { q: "What says Mises' 'Regression Theorem'?", options: ["Money value always drops", "Money value must historically track to barter value", "Inflation is necessary", "Interest is illegal"] },
    es: { q: "¿Qué dice el 'Teorema de Regresión' de Mises?", options: ["Valor dinero siempre cae", "Valor dinero debe basarse históricamente en trueque", "Inflación es necesaria", "Intereses son ilegales"] },
    correct: 1
  },
  {
    de: { q: "Wer definierte Geld als das 'marktgängigste Gut'?", options: ["Adam Smith", "Carl Menger", "John Maynard Keynes", "Friedrich Engels"] },
    en: { q: "Who defined money as 'most marketable good'?", options: ["Adam Smith", "Carl Menger", "John Maynard Keynes", "Friedrich Engels"] },
    es: { q: "¿Quién definió el dinero como 'bien más comercializable'?", options: ["Adam Smith", "Carl Menger", "John Maynard Keynes", "Friedrich Engels"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Stock-to-Flow' Wert von Gold im Vergleich zu Fiat?", options: ["Viel niedriger", "Viel höher (höhere Knappheit)", "Gleich groß", "Gold hat keinen Flow"] },
    en: { q: "Gold's 'S2F' vs Fiat?", options: ["Much lower", "Much higher (higher scarcity)", "Same", "Gold has no flow"] },
    es: { q: "¿'S2F' del Oro vs Fiat?", options: ["Mucho más bajo", "Mucho más alto (mayor escasez)", "Igual", "Oro no tiene flujo"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Dämonetarisierung'?", options: ["Geld wird wertlos", "Ein Gut verliert seine Funktion als Geld", "Einzug von Bargeld", "Verbot von Krypto"] },
    en: { q: "What implies 'Demonetization'?", options: ["Money becomes worthless", "A good loses its money function", "Seizure of cash", "Crypto ban"] },
    es: { q: "¿Qué implica 'Desmonetización'?", options: ["Dinero sin valor", "Un bien pierde función de dinero", "Incautación de efectivo", "Prohibición cripto"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt die 'Tragik der Allmende'?", options: ["Übernutzung gemeinsamer Ressourcen ohne Eigentum", "Das Ende von Gold", "Ein Problem beim Mining", "Die Inflation"] },
    en: { q: "What is 'Tragedy of the Commons'?", options: ["Overuse of shared resources", "End of Gold", "Mining problem", "Inflation"] },
    es: { q: "¿Qué es la 'Tragedia de los Comunes'?", options: ["Sobreuso de recursos compartidos", "Fin del Oro", "Problema de minería", "Inflación"] },
    correct: 0
  },

  // --- LIGHTNING NETZWERK DETAILS ---
  {
    de: { q: "Was ist ein 'Watchtower' im Lightning Netzwerk?", options: ["Ein Sendemast", "Ein Dienst, der Betrugsversuche bei Offline-Nodes verhindert", "Die Zentrale von Lightning", "Ein Explorer für Kanäle"] },
    en: { q: "What is a 'Watchtower' in Lightning?", options: ["Transmission tower", "Service preventing fraud for offline nodes", "Lightning HQ", "Channel explorer"] },
    es: { q: "¿Qué es una 'Torre de Vigilancia' en Lightning?", options: ["Torre de transmisión", "Servicio que previene fraude en nodos offline", "Sede de Lightning", "Explorador de canales"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Inbound Liquidity'?", options: ["Geld auf der Börse", "Die Kapazität eines Kanals, Zahlungen zu empfangen", "Mining-Gewinne", "Schnelle Transaktionen"] },
    en: { q: "What is 'Inbound Liquidity'?", options: ["Money on exchange", "Channel capacity to receive payments", "Mining profits", "Fast transactions"] },
    es: { q: "¿Qué es 'Liquidez Entrante'?", options: ["Dinero en exchange", "Capacidad del canal para recibir pagos", "Ganancias mineras", "Transacciones rápidas"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'Channel Jamming'?", options: ["Ein Lied über Krypto", "Ein Angriff, der Zahlungskanäle durch Fake-Anfragen blockiert", "Das Schließen aller Kanäle", "Ein Update für Nodes"] },
    en: { q: "What is 'Channel Jamming'?", options: ["Crypto song", "Attack blocking channels via fake requests", "Closing all channels", "Node update"] },
    es: { q: "¿Qué es 'Channel Jamming'?", options: ["Canción cripto", "Ataque bloqueando canales con solicitudes falsas", "Cierre de canales", "Actualización de nodo"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Eltoo' (BIP 118)?", options: ["Ein neuer Coin", "Ein Vorschlag für einfachere Kanal-Updates im Lightning Netz", "Eine Hardware-Wallet", "Ein Mining-Pool"] },
    en: { q: "What is 'Eltoo' (BIP 118)?", options: ["New coin", "Proposal for simpler Lightning channel updates", "Hardware wallet", "Mining pool"] },
    es: { q: "¿Qué es 'Eltoo' (BIP 118)?", options: ["Nueva moneda", "Propuesta para actualizaciones simples de canal Lightning", "Billetera de hardware", "Pool de minería"] },
    correct: 1
  },

  // --- NETZWERK-SICHERHEIT ---
  {
    de: { q: "Was ist ein 'Sybil-Angriff'?", options: ["Hacken einer Wallet", "Übernahme des Netzwerks durch viele falsche Identitäten/Nodes", "Ein Virus auf dem PC", "Mining mit gestohlenem Strom"] },
    en: { q: "What is a 'Sybil Attack'?", options: ["Wallet hack", "Network takeover via many fake identities", "PC virus", "Stolen power mining"] },
    es: { q: "¿Qué es un 'Ataque Sybil'?", options: ["Hackeo de billetera", "Toma de red mediante identidades falsas", "Virus de PC", "Minería con energía robada"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt ein 'Eclipse-Angriff'?", options: ["Das Hacken von Satoshi", "Eine Node von allen ehrlichen Peers isolieren", "Stromausfall beim Miner", "Sonnenfinsternis-Mining"] },
    en: { q: "What is an 'Eclipse Attack'?", options: ["Hacking Satoshi", "Isolating a node from honest peers", "Miner power outage", "Eclipse mining"] },
    es: { q: "¿Qué es un 'Ataque Eclipse'?", options: ["Hackear a Satoshi", "Aislar un nodo de pares honestos", "Corte de luz minero", "Minería en eclipse"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'CPFP' (Child Pays For Parent)?", options: ["Kinder bezahlen für Eltern", "Gebührenbeschleunigung durch eine Folgetransaktion", "Ein Sparplan", "Ein Mining-Bonus"] },
    en: { q: "What is 'CPFP'?", options: ["Kids pay for parents", "Fee acceleration via child transaction", "Savings plan", "Mining bonus"] },
    es: { q: "¿Qué es 'CPFP'?", options: ["Hijos pagan por padres", "Aceleración de tarifa vía transacción hija", "Plan de ahorro", "Bono minero"] },
    correct: 1
  },
  {
    de: { q: "Welche Angriffsform beschreibt 'Fee Sniping'?", options: ["Stehlen von Gebühren", "Miner versuchen alte Blöcke zu reminen, um Gebühren zu holen", "Transaktionen ohne Gebühr", "Hacken des Mempools"] },
    en: { q: "What is 'Fee Sniping'?", options: ["Stealing fees", "Miners remining old blocks for fees", "Zero fee txs", "Hacking mempool"] },
    es: { q: "¿Qué es 'Fee Sniping'?", options: ["Robar tarifas", "Mineros reminando bloques viejos por tarifas", "Tx sin tarifa", "Hackear mempool"] },
    correct: 1
  },

  // --- SPEZIALWISSEN & STANDARDS ---
  {
    de: { q: "Was definiert 'BIP 39'?", options: ["Den Mining-Algorithmus", "Den Standard für Mnemonische Sätze (Seed Phrases)", "Die Blockgröße", "Lightning-Rechnungen"] },
    en: { q: "What defines 'BIP 39'?", options: ["Mining algo", "Standard for Mnemonic Phrases (Seeds)", "Block size", "Lightning invoices"] },
    es: { q: "¿Qué define 'BIP 39'?", options: ["Algo de minería", "Estándar para Frases Mnemotécnicas (Semillas)", "Tamaño de bloque", "Facturas Lightning"] },
    correct: 1
  },
  {
    de: { q: "Aus wie vielen Wörtern besteht die BIP-39 Standardliste?", options: ["1024", "2048", "4096", "8192"] },
    en: { q: "How many words in BIP-39 standard list?", options: ["1024", "2048", "4096", "8192"] },
    es: { q: "¿Cuántas palabras en lista estándar BIP-39?", options: ["1024", "2048", "4096", "8192"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'BIP 32'?", options: ["Multisig", "Hierarchisch Deterministic (HD) Wallets", "Taproot", "SegWit"] },
    en: { q: "What describes 'BIP 32'?", options: ["Multisig", "Hierarchical Deterministic (HD) Wallets", "Taproot", "SegWit"] },
    es: { q: "¿Qué describe 'BIP 32'?", options: ["Multisig", "Billeteras Deterministas Jerárquicas (HD)", "Taproot", "SegWit"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'PSBT' (BIP 174)?", options: ["Ein neuer Bitcoin-Typ", "Partially Signed Bitcoin Transactions", "Ein Mining-Protokoll", "Eine Peer-to-Peer Node"] },
    en: { q: "What is 'PSBT' (BIP 174)?", options: ["New Bitcoin type", "Partially Signed Bitcoin Transactions", "Mining protocol", "P2P Node"] },
    es: { q: "¿Qué es 'PSBT' (BIP 174)?", options: ["Nuevo tipo Bitcoin", "Transacciones de Bitcoin Parcialmente Firmadas", "Protocolo de minería", "Nodo P2P"] },
    correct: 1
  },
  {
    de: { q: "Was sind 'Ordinals'?", options: ["Mining-Ränge", "Nummerierung und Inskription einzelner Satoshis", "Neue Full Nodes", "Eine Art von Sidechain"] },
    en: { q: "What are 'Ordinals'?", options: ["Mining ranks", "Numbering/Inscription of Satoshis", "New Full Nodes", "A Sidechain"] },
    es: { q: "¿Qué son los 'Ordinals'?", options: ["Rangos de minería", "Numeración/Inscripción de Satoshis", "Nuevos Full Nodes", "Una Sidechain"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'RGB'?", options: ["Bunte LEDs an Minern", "Layer 2/3 Protokoll für Smart Contracts auf Bitcoin", "Ein Grafik-Standard", "Ein Mining-Pool"] },
    en: { q: "What is 'RGB'?", options: ["Colorful LEDs", "Layer 2/3 protocol for smart contracts", "Graphic standard", "Mining pool"] },
    es: { q: "¿Qué es 'RGB'?", options: ["LEDs coloridos", "Protocolo Capa 2/3 para contratos inteligentes", "Estándar gráfico", "Pool de minería"] },
    correct: 1
  },
  {
    de: { q: "Was ist das 'Liquid Network'?", options: ["Ein Mining-Pool", "Eine Sidechain für schnellere Asset-Transfers", "Das Internet", "Eine neue Exchange"] },
    en: { q: "What is 'Liquid Network'?", options: ["Mining pool", "Sidechain for faster asset transfers", "The Internet", "New Exchange"] },
    es: { q: "¿Qué es 'Liquid Network'?", options: ["Pool de minería", "Sidechain para transferencias rápidas", "El Internet", "Nuevo Exchange"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Stratum V2'?", options: ["Ein Weltraumprojekt", "Ein modernes Protokoll für Mining-Pools", "Eine Wallet-App", "Ein Hardware-Update"] },
    en: { q: "What is 'Stratum V2'?", options: ["Space project", "Modern mining pool protocol", "Wallet App", "Hardware Update"] },
    es: { q: "¿Qué es 'Stratum V2'?", options: ["Proyecto espacial", "Protocolo moderno de pool de minería", "App de billetera", "Actualización de hardware"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der Begriff 'Entropie' bei Wallets?", options: ["Zufälligkeit bei der Erzeugung des Private Keys", "Unordnung in der Blockchain", "Mining-Schwierigkeit", "Transaktionsspeed"] },
    en: { q: "What implies 'Entropy' in wallets?", options: ["Randomness in private key generation", "Blockchain disorder", "Mining difficulty", "Tx speed"] },
    es: { q: "¿Qué implica 'Entropía' en billeteras?", options: ["Aleatoriedad en generación de clave privada", "Desorden blockchain", "Dificultad de minado", "Velocidad de tx"] },
    correct: 0
  },
  {
    de: { q: "Was ist ein 'Brain Wallet'?", options: ["Eine KI-Wallet", "Ein Private Key, der nur aus einem auswendig gelernten Satz besteht", "Ein Hardware-Chip im Kopf", "Eine sehr schlaue Node"] },
    en: { q: "What is a 'Brain Wallet'?", options: ["AI Wallet", "Private Key from memorized phrase", "Hardware chip in brain", "Smart Node"] },
    es: { q: "¿Qué es una 'Brain Wallet'?", options: ["Billetera IA", "Clave Privada de frase memorizada", "Chip en cerebro", "Nodo inteligente"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Change' (Wechselgeld) bei Bitcoin?", options: ["Kleine Münzen", "Der Restbetrag eines UTXO, der an den Sender zurückgeht", "Trinkgeld für Miner", "Eine Preisänderung"] },
    en: { q: "What is 'Change' in Bitcoin?", options: ["Small coins", "Remainder of UTXO returning to sender", "Miner tip", "Price change"] },
    es: { q: "¿Qué es 'Change' (Cambio) en Bitcoin?", options: ["Monedas pequeñas", "Resto del UTXO que vuelve al remitente", "Propina minera", "Cambio de precio"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Dust' (Staub) im Wallet?", options: ["Dreck auf der Festplatte", "Winzige UTXOs, deren Wert unter den Transaktionsgebühren liegt", "Alte Backups", "Verlorene Keys"] },
    en: { q: "What is 'Dust' in wallet?", options: ["Dirt on disk", "Tiny UTXOs below fee cost", "Old backups", "Lost keys"] },
    es: { q: "¿Qué es 'Dust' (Polvo) en billetera?", options: ["Suciedad en disco", "UTXOs diminutos bajo costo de tarifa", "Respaldos viejos", "Claves perdidas"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Bech32'?", options: ["Ein Mining-Chip", "Ein Adressformat speziell für SegWit (bc1...)", "Ein Verschlüsselungstyp", "Eine Node-Software"] },
    en: { q: "What is 'Bech32'?", options: ["Mining chip", "Address format for SegWit (bc1...)", "Encryption type", "Node software"] },
    es: { q: "¿Qué es 'Bech32'?", options: ["Chip de minería", "Formato de dirección para SegWit (bc1...)", "Tipo de cifrado", "Software de nodo"] },
    correct: 1
  },
  {
    de: { q: "Wer ist Hal Finney?", options: ["Ein Politiker", "Empfänger der ersten BTC-Transaktion & Kryptographie-Pionier", "Gründer von Ethereum", "Ein bekannter Bitcoin-Shortseller"] },
    en: { q: "Who is Hal Finney?", options: ["Politician", "Receiver of first BTC tx & crypto pioneer", "Ethereum founder", "Bitcoin short seller"] },
    es: { q: "¿Quién es Hal Finney?", options: ["Político", "Receptor de primera tx BTC y pionero cripto", "Fundador de Ethereum", "Vendedor en corto de Bitcoin"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Statelessness' bei Nodes?", options: ["Node ohne Land", "Konzept, bei dem Nodes nicht die gesamte UTXO-Set speichern müssen", "Node ohne Internet", "Eine kaputte Node"] },
    en: { q: "What is 'Statelessness' in Nodes?", options: ["Node without country", "Nodes don't store full UTXO set", "Node without internet", "Broken node"] },
    es: { q: "¿Qué es 'Statelessness' en Nodos?", options: ["Nodo sin país", "Nodos no almacenan set completo de UTXO", "Nodo sin internet", "Nodo roto"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der 'Cantillon-Effekt' ökonomisch?", options: ["Inflation trifft alle gleich", "Wer nah an der Geldquelle sitzt, profitiert zuerst", "Preise sinken durch Technik", "Gold ist stabil"] },
    en: { q: "Economic 'Cantillon Effect'?", options: ["Inflation hits equally", "Those close to money source profit first", "Tech lowers prices", "Gold is stable"] },
    es: { q: "¿'Efecto Cantillon' económico?", options: ["Inflación golpea igual", "Quien está cerca de fuente de dinero gana primero", "Tecnología baja precios", "Oro es estable"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Satoshi's Vision' (als Meme)?", options: ["Ein Brillenhersteller", "Oft genutzt, um Hard Forks/Änderungen zu rechtfertigen", "Ein Buch", "Eine TV-Show"] },
    en: { q: "What is 'Satoshi's Vision' (meme)?", options: ["Glasses maker", "Used to justify hard forks", "A book", "TV Show"] },
    es: { q: "¿Qué es 'Satoshi's Vision' (meme)?", options: ["Fabricante de gafas", "Usado para justificar hard forks", "Un libro", "Show de TV"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt das 'Selfish Mining' Szenario?", options: ["Miner behalten Gebühren für sich", "Miner halten gefundene Blöcke geheim, um einen Vorsprung aufzubauen", "Miner schalten ihre Geräte bei niedrigem Preis ab", "Ein Miner nutzt Ökostrom"] },
    en: { q: "What is 'Selfish Mining'?", options: ["Keeping fees", "Keeping blocks secret for advantage", "Turning off rigs", "Green energy mining"] },
    es: { q: "¿Qué es 'Selfish Mining'?", options: ["Quedarse tarifas", "Mantener bloques en secreto por ventaja", "Apagar equipos", "Minería verde"] },
    correct: 1
  },
  {
    de: { q: "Was ist das 'Empty Block Mining'?", options: ["Miner finden keine Blöcke", "Miner veröffentlichen Blöcke ohne Transaktionen (außer Coinbase), um Zeit zu sparen", "Die Blockchain ist voll", "Ein technischer Fehler im Protokoll"] },
    en: { q: "What is 'Empty Block Mining'?", options: ["No blocks found", "Publishing blocks without txs to save time", "Full blockchain", "Protocol error"] },
    es: { q: "¿Qué es 'Empty Block Mining'?", options: ["No se encuentran bloques", "Publicar bloques sin txs para ahorrar tiempo", "Blockchain llena", "Error de protocolo"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'ASIC-Resistance' Algorithmus?", options: ["Ein Algorithmus, der Mining verbietet", "Ein Versuch, Mining nur auf CPUs/GPUs zu ermöglichen", "Ein Schutz gegen Hacker", "Ein spezieller Bitcoin-Node-Typ"] },
    en: { q: "What is 'ASIC Resistance'?", options: ["Mining ban", "Attempt to keep mining on CPU/GPU", "Hacker protection", "Special Node type"] },
    es: { q: "¿Qué es 'Resistencia ASIC'?", options: ["Prohibición minera", "Intento de mantener minería en CPU/GPU", "Protección hacker", "Tipo de nodo especial"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der 'Target' Wert beim Mining?", options: ["Der aktuelle Bitcoin-Preis", "Die Zahl, unter der ein Block-Hash liegen muss", "Die Anzahl der Transaktionen", "Die Größe des Mempools"] },
    en: { q: "What is the 'Target' in mining?", options: ["Bitcoin price", "Number block hash must be below", "Tx count", "Mempool size"] },
    es: { q: "¿Qué es el 'Target' en minería?", options: ["Precio Bitcoin", "Número bajo el cual debe estar el hash", "Conteo tx", "Tamaño mempool"] },
    correct: 1
  },
  {
    de: { q: "Welche Maßeinheit wurde mit SegWit eingeführt, um die Blockgröße zu berechnen?", options: ["Kilobyte", "Weight Units (WU)", "Satoshi-Bytes", "Block-Points"] },
    en: { q: "Unit for block size since SegWit?", options: ["Kilobyte", "Weight Units (WU)", "Satoshi-Bytes", "Block-Points"] },
    es: { q: "¿Unidad de tamaño de bloque desde SegWit?", options: ["Kilobyte", "Weight Units (WU)", "Satoshi-Bytes", "Block-Points"] },
    correct: 1
  },

  // --- COVENANTS & SMART CONTRACTS ---
  {
    de: { q: "Was versteht man unter 'Covenants' bei Bitcoin?", options: ["Ein Vertrag mit einer Bank", "Beschränkungen, wo ein UTXO in der Zukunft ausgegeben werden darf", "Ein Mining-Zusammenschluss", "Die Gebührenordnung"] },
    en: { q: "What are 'Covenants' in Bitcoin?", options: ["Bank contract", "Restrictions on where UTXO can be spent", "Mining union", "Fee schedule"] },
    es: { q: "¿Qué son 'Covenants' en Bitcoin?", options: ["Contrato bancario", "Restricciones sobre dónde se puede gastar un UTXO", "Unión minera", "Esquema de tarifas"] },
    correct: 1
  },
  {
    de: { q: "Was würde das Opcode 'OP_CHECKTEMPLATEVERIFY' (BIP-119) ermöglichen?", options: ["Schnelleres Signieren", "Native Realisierung von Covenants und Congestion Control", "Anonymes Mining", "Das Löschen alter Blöcke"] },
    en: { q: "What enables 'OP_CTV' (BIP-119)?", options: ["Faster signing", "Native Covenants and Congestion Control", "Anonymous mining", "Deleting old blocks"] },
    es: { q: "¿Qué permite 'OP_CTV' (BIP-119)?", options: ["Firma más rápida", "Covenants Nativos y Control de Congestión", "Minería anónima", "Borrar bloques viejos"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Simplicity' im Kontext von Bitcoin-Entwicklung?", options: ["Eine einfache Wallet", "Eine neue, formale Programmiersprache für Smart Contracts", "Das Reduzieren der Blockzeit", "Ein Slogan von Satoshi"] },
    en: { q: "What is 'Simplicity' in Bitcoin dev?", options: ["Simple Wallet", "New formal language for Smart Contracts", "Reducing block time", "Satoshi slogan"] },
    es: { q: "¿Qué es 'Simplicity' en dev Bitcoin?", options: ["Billetera simple", "Nuevo lenguaje formal para Contratos Inteligentes", "Reducir tiempo de bloque", "Eslogan de Satoshi"] },
    correct: 1
  },
  {
    de: { q: "Was ermöglicht 'SIGHASH_ANYPREVOUT'?", options: ["Zahlungen an jeden Namen", "Verbesserte Layer-2 Protokolle wie Eltoo", "Mining ohne Internet", "Rückbuchung von Transaktionen"] },
    en: { q: "What enables 'SIGHASH_ANYPREVOUT'?", options: ["Pay any name", "Improved L2 like Eltoo", "Offline mining", "Tx reversal"] },
    es: { q: "¿Qué permite 'SIGHASH_ANYPREVOUT'?", options: ["Pagar cualquier nombre", "L2 mejorado como Eltoo", "Minería offline", "Reversión de tx"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'Thiers' Law'?", options: ["Gutes Geld verdrängt schlechtes", "Gutes Geld verdrängt schlechtes, wenn der Kurs frei floaten kann", "Inflation führt zu Deflation", "Zentralbanken bestimmen den Wert"] },
    en: { q: "What is 'Thiers' Law'?", options: ["Good money drives out bad", "Good drives out bad if floating", "Inflation leads to deflation", "Central banks set value"] },
    es: { q: "¿Qué es la 'Ley de Thiers'?", options: ["Buen dinero desplaza al malo", "Buen dinero desplaza al malo si flota", "Inflación lleva a deflación", "Bancos centrales fijan valor"] },
    correct: 1
  },
  {
    de: { q: "Was ist die 'Austrian Business Cycle Theory' (ABCT)?", options: ["Erklärung von Konjunkturzyklen durch künstliche Zinssenkungen", "Ein Plan für mehr Inflation", "Die Geschichte des Euro", "Eine Theorie über Aktienkurse"] },
    en: { q: "What is 'ABCT'?", options: ["Business cycles via artificial rate cuts", "Plan for inflation", "Euro history", "Stock theory"] },
    es: { q: "¿Qué es 'ABCT'?", options: ["Ciclos económicos por tasas artificiales", "Plan de inflación", "Historia del Euro", "Teoría de acciones"] },
    correct: 0
  },
  {
    de: { q: "Was ist 'High Time Preference' (Hohe Zeitpräferenz)?", options: ["Fokus auf langfristiges Sparen", "Fokus auf sofortigen Konsum und Entwertung der Zukunft", "Schnelle Bitcoin-Abwicklung", "Arbeiten unter Zeitdruck"] },
    en: { q: "What is 'High Time Preference'?", options: ["Focus on saving", "Focus on immediate consumption", "Fast Bitcoin tx", "Working under pressure"] },
    es: { q: "¿Qué es 'Alta Preferencia Temporal'?", options: ["Enfoque en ahorro", "Enfoque en consumo inmediato", "Tx Bitcoin rápida", "Trabajo bajo presión"] },
    correct: 1
  },
  {
    de: { q: "Was versteht man unter 'Deflationärer Spirale' laut Mainstream-Ökonomie?", options: ["Wirtschaftswachstum", "Sinkende Preise führen zu Kaufzurückhaltung und Rezession", "Steigende Löhne", "Vermehrung der Geldmenge"] },
    en: { q: "Mainstream 'Deflationary Spiral'?", options: ["Growth", "Falling prices lead to recession", "Rising wages", "Money supply increase"] },
    es: { q: "¿'Espiral Deflacionaria' mainstream?", options: ["Crecimiento", "Caída de precios lleva a recesión", "Salarios crecientes", "Aumento de oferta monetaria"] },
    correct: 1
  },
  {
    de: { q: "Warum gilt Bitcoin als 'Absolute Knappheit'?", options: ["Weil es teuer ist", "Weil das Angebot völlig unabhängig von der Nachfrage/Preis fixiert ist", "Weil Miner aufhören können", "Weil es digital ist"] },
    en: { q: "Why is Bitcoin 'Absolute Scarcity'?", options: ["Expensive", "Supply fixed independent of demand", "Miners can stop", "Digital"] },
    es: { q: "¿Por qué Bitcoin es 'Escasez Absoluta'?", options: ["Caro", "Suministro fijo independiente de demanda", "Mineros pueden parar", "Digital"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der Begriff 'Financial Repression'?", options: ["Verbot von Banken", "Maßnahmen des Staates, um Schulden durch niedrige Zinsen/Inflation abzubauen", "Hacken von Kreditkarten", "Hohe Gebühren am Geldautomat"] },
    en: { q: "What is 'Financial Repression'?", options: ["Bank ban", "State reducing debt via low rates/inflation", "Credit hack", "High ATM fees"] },
    es: { q: "¿Qué es 'Represión Financiera'?", options: ["Prohibición bancaria", "Estado reduciendo deuda vía tasas bajas/inflación", "Hackeo de crédito", "Altas tarifas ATM"] },
    correct: 1
  },

  // --- PROTOKOLL-HISTORIE & SOFTWARRE ---
  {
    de: { q: "Was war der 'Value Overflow Incident' im Jahr 2010?", options: ["Bitcoin Kurs stieg zu schnell", "Ein Bug erzeugte 184 Milliarden BTC", "Der Mempool war voll", "Mining war nicht mehr profitabel"] },
    en: { q: "What was the 'Value Overflow Incident' (2010)?", options: ["Price rose too fast", "Bug created 184 Billion BTC", "Mempool full", "Mining unprofitable"] },
    es: { q: "¿Qué fue el 'Incidente Value Overflow' (2010)?", options: ["Precio subió rápido", "Bug creó 184 mil millones BTC", "Mempool lleno", "Minería no rentable"] },
    correct: 1
  },
  {
    de: { q: "Was bewirkt der 'User Activated Soft Fork' (UASF)?", options: ["Miner entscheiden über Updates", "Full Nodes erzwingen Regeln unabhängig von der Hashrate", "Satoshi Nakamoto greift ein", "Die Börsen legen die Regeln fest"] },
    en: { q: "What does 'UASF' do?", options: ["Miners decide", "Full Nodes enforce rules regardless of hashrate", "Satoshi intervenes", "Exchanges set rules"] },
    es: { q: "¿Qué hace 'UASF'?", options: ["Mineros deciden", "Full Nodes imponen reglas sin importar hashrate", "Satoshi interviene", "Exchanges fijan reglas"] },
    correct: 1
  },
  {
    de: { q: "Was passierte beim 'Loomis' Bug?", options: ["Double Spending", "Ein Problem mit dem Schwierigkeitsgrad", "Ein Absturz von LND Nodes durch eine komplexe Transaktion", "Das Verschwinden von Coins"] },
    en: { q: "What happened with the 'Loomis' Bug?", options: ["Double Spending", "Difficulty issue", "LND Nodes crash via complex tx", "Coins disappeared"] },
    es: { q: "¿Qué pasó con el 'Bug Loomis'?", options: ["Doble Gasto", "Problema de dificultad", "Caída de nodos LND por tx compleja", "Monedas desaparecieron"] },
    correct: 2
  },
  {
    de: { q: "Wie hieß die Bewegung, die SegWit gegen den Willen der großen Mining-Pools durchsetzte?", options: ["Bitcoin Core", "NO2X / UASF", "Big Blockers", "Krypto-Anarchisten"] },
    en: { q: "Movement enforcing SegWit against pools?", options: ["Bitcoin Core", "NO2X / UASF", "Big Blockers", "Crypto Anarchists"] },
    es: { q: "¿Movimiento que impuso SegWit contra pools?", options: ["Bitcoin Core", "NO2X / UASF", "Big Blockers", "Criptoanarquistas"] },
    correct: 1
  },

  // --- LAYER 2 & PRIVATSPHÄRE ---
  {
    de: { q: "Was ist 'Fedimint'?", options: ["Eine staatliche Bitcoin-Node", "Föderierte Chaumian Mints zur skalierbaren Privatsphäre", "Ein neuer Mining-Pool", "Eine Software für Zentralbanken"] },
    en: { q: "What is 'Fedimint'?", options: ["State Node", "Federated Chaumian Mints for privacy", "Mining pool", "Central Bank software"] },
    es: { q: "¿Qué es 'Fedimint'?", options: ["Nodo estatal", "Mints Chaumian Federados para privacidad", "Pool de minería", "Software de Banco Central"] },
    correct: 1
  },
  {
    de: { q: "Was ist der Vorteil von 'Ark' gegenüber Lightning?", options: ["Es ist kostenlos", "Es benötigt keine Inbound Liquidity für Empfänger", "Es ist nur für Wale", "Es braucht kein Internet"] },
    en: { q: "Advantage of 'Ark' over Lightning?", options: ["Free", "No inbound liquidity needed", "Whales only", "No internet needed"] },
    es: { q: "¿Ventaja de 'Ark' sobre Lightning?", options: ["Gratis", "No requiere liquidez entrante", "Solo ballenas", "No requiere internet"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Silent Payments'?", options: ["Zahlungen ohne Benachrichtigung", "Ein Protokoll für wiederverwendbare Adressen ohne On-Chain Fußabdruck", "Lightning ohne Kanäle", "Mining ohne Lärm"] },
    en: { q: "What are 'Silent Payments'?", options: ["No notification", "Reusable addresses without on-chain footprint", "Lightning without channels", "Mining without noise"] },
    es: { q: "¿Qué son 'Silent Payments'?", options: ["Sin notificación", "Direcciones reutilizables sin huella on-chain", "Lightning sin canales", "Minería sin ruido"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'Statechains'?", options: ["Eine staatliche Blockchain", "Übertragung des Eigentums an UTXOs ohne On-Chain Transaktion", "Ein neues Gesetz", "Eine Liste aller Länder mit BTC"] },
    en: { q: "What are 'Statechains'?", options: ["State Blockchain", "Off-chain UTXO ownership transfer", "New Law", "Country list"] },
    es: { q: "¿Qué son 'Statechains'?", options: ["Blockchain estatal", "Transferencia de propiedad UTXO off-chain", "Nueva ley", "Lista de países"] },
    correct: 1
  },

  // --- REGULIERUNG & RECHT ---
  {
    de: { q: "Was besagt die 'Travel Rule' im Krypto-Kontext?", options: ["Verbot von BTC im Flugzeug", "Pflicht zum Datenaustausch bei Transaktionen über Dienstleister", "Steuerfreiheit bei Auslandsreisen", "Keine Wallets auf Handys"] },
    en: { q: "What is the 'Travel Rule'?", options: ["No BTC on planes", "Data exchange duty for service providers", "Tax free travel", "No mobile wallets"] },
    es: { q: "¿Qué es la 'Travel Rule'?", options: ["No BTC en aviones", "Deber de intercambio de datos para proveedores", "Viaje libre de impuestos", "No billeteras móviles"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'MiCA'?", options: ["Ein neuer Krypto-Standard", "EU-Verordnung für Märkte für Kryptowerte", "Ein US-Gesetz", "Ein Mining-Gerät"] },
    en: { q: "What is 'MiCA'?", options: ["Crypto Standard", "EU Crypto Regulation", "US Law", "Mining Rig"] },
    es: { q: "¿Qué es 'MiCA'?", options: ["Estándar cripto", "Regulación Cripto de la UE", "Ley de EE. UU.", "Equipo de minería"] },
    correct: 1
  },
  {
    de: { q: "Warum ist die Einstufung als 'Commodity' (Rohstoff) für BTC in den USA wichtig?", options: ["Weil es dann wie Gold reguliert wird und nicht als Wertpapier (Security)", "Weil es dann verboten wird", "Weil Miner dann Steuern sparen", "Weil es dann subventioniert wird"] },
    en: { q: "Why 'Commodity' status for BTC in US?", options: ["Regulated like gold, not security", "To ban it", "Tax cuts", "Subsidies"] },
    es: { q: "¿Por qué estatus de 'Commodity' para BTC en EE. UU.?", options: ["Regulado como oro, no valor", "Para prohibirlo", "Recortes de impuestos", "Subsidios"] },
    correct: 0
  },
  {
    de: { q: "Was ist 'Self-Custody'?", options: ["Verwahrung bei einer Bank", "Eigenständige Kontrolle über die Private Keys", "Handel an der Börse", "Verlust des Passworts"] },
    en: { q: "What is 'Self-Custody'?", options: ["Bank custody", "Own control of Private Keys", "Exchange trading", "Password loss"] },
    es: { q: "¿Qué es 'Self-Custody' (Autocustodia)?", options: ["Custodia bancaria", "Control propio de claves privadas", "Trading en exchange", "Pérdida de contraseña"] },
    correct: 1
  },

  // --- SPEZIALWISSEN ---
  {
    de: { q: "Was ist 'BIP 157/158' (Neutrino)?", options: ["Ein neuer Mining-Chip", "Client-side Filtering für Light Clients (Privatsphäre)", "Ein Quantencomputer-Schutz", "Ein Update für die Blockgröße"] },
    en: { q: "What is 'BIP 157/158' (Neutrino)?", options: ["Mining Chip", "Client-side filtering for privacy", "Quantum protection", "Block size update"] },
    es: { q: "¿Qué es 'BIP 157/158' (Neutrino)?", options: ["Chip minero", "Filtrado del lado del cliente para privacidad", "Protección cuántica", "Actualización de tamaño de bloque"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'MuSig2'?", options: ["Ein Musik-Player für Nodes", "Ein effizientes Protokoll für Schnorr-Multisig-Signaturen", "Eine Art von Sidechain", "Mining mit zwei Geräten"] },
    en: { q: "What is 'MuSig2'?", options: ["Music player", "Efficient Schnorr Multisig protocol", "Sidechain", "Dual mining"] },
    es: { q: "¿Qué es 'MuSig2'?", options: ["Reproductor de música", "Protocolo eficiente Schnorr Multisig", "Sidechain", "Minería dual"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'FROST'?", options: ["Ein eingefrorenes Wallet", "Flexible Round-Optimized Schnorr Threshold Signatures", "Ein Mining-Kühlsystem", "Der Name von Nakamotos Katze"] },
    en: { q: "What is 'FROST'?", options: ["Frozen wallet", "Flexible Round-Optimized Schnorr Threshold Signatures", "Cooling system", "Satoshi's cat"] },
    es: { q: "¿Qué es 'FROST'?", options: ["Billetera congelada", "Flexible Round-Optimized Schnorr Threshold Signatures", "Sistema de enfriamiento", "Gato de Satoshi"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'UTXO Set'?", options: ["Die Liste aller jemals gemachten Transaktionen", "Die Datenbank aller aktuell verfügbaren, nicht ausgegebenen Beträge", "Ein Mining-Zusammenschluss", "Die Wallet-Software"] },
    en: { q: "What is the 'UTXO Set'?", options: ["All transactions ever", "Database of all current unspent amounts", "Mining union", "Wallet software"] },
    es: { q: "¿Qué es el 'UTXO Set'?", options: ["Todas las transacciones", "Base de datos de montos no gastados actuales", "Unión minera", "Software de billetera"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Probabilistic Finality'?", options: ["Bitcoin ist Glücksspiel", "Mit jedem Block sinkt die Chance auf eine Umkehrung der Transaktion", "Man weiß nie, ob die Zahlung ankommt", "Die letzte Frage ist zufällig"] },
    en: { q: "What is 'Probabilistic Finality'?", options: ["Gambling", "Chance of reversal drops with every block", "Payment uncertain", "Random question"] },
    es: { q: "¿Qué es 'Finalidad Probabilística'?", options: ["Juego de azar", "Probabilidad de reversión cae con cada bloque", "Pago incierto", "Pregunta aleatoria"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Genesis Block' (Block 0)?", options: ["Der letzte Block", "Der allererste Block der Bitcoin-Blockchain", "Ein Block voller Fehler", "Ein Block von Ethereum"] },
    en: { q: "What is the 'Genesis Block'?", options: ["Last block", "Very first block of Bitcoin", "Buggy block", "Ethereum block"] },
    es: { q: "¿Qué es el 'Bloque Génesis'?", options: ["Último bloque", "El primer bloque de Bitcoin", "Bloque con errores", "Bloque de Ethereum"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Block Height'?", options: ["Die Dateigröße des Blocks", "Die Anzahl der Blöcke vor einem bestimmten Block", "Die Zeitdauer des Minings", "Die Belohnung"] },
    en: { q: "What is 'Block Height'?", options: ["File size", "Number of blocks preceding a block", "Mining duration", "Reward"] },
    es: { q: "¿Qué es 'Altura de Bloque'?", options: ["Tamaño de archivo", "Número de bloques que preceden a un bloque", "Duración de minería", "Recompensa"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Proof of Reserve'?", options: ["Gold im Tresor", "Nachweis einer Börse, dass Kundengelder wirklich vorhanden sind", "Eine neue Mining-Art", "Das Backup des Seeds"] },
    en: { q: "What is 'Proof of Reserve'?", options: ["Gold in vault", "Exchange proof that funds exist", "New mining type", "Seed backup"] },
    es: { q: "¿Qué es 'Proof of Reserve'?", options: ["Oro en bóveda", "Prueba de exchange de que fondos existen", "Nuevo tipo minero", "Respaldo de semilla"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Hardware Security Module' (HSM)?", options: ["Ein USB-Stick", "Spezialisierte Hardware zur sicheren Schlüsselverwaltung", "Ein Teil des Mainboards", "Ein Mining-Gehäuse"] },
    en: { q: "What is an 'HSM'?", options: ["USB Stick", "Hardware for secure key management", "Mainboard part", "Mining case"] },
    es: { q: "¿Qué es un 'HSM'?", options: ["Memoria USB", "Hardware para gestión segura de claves", "Parte de placa base", "Caja de minería"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Chainalysis'?", options: ["Eine Bitcoin-Wallet", "Ein Unternehmen zur Überwachung von Blockchain-Transaktionen", "Das Mining-Handbuch", "Ein Node-Explorer"] },
    en: { q: "What is 'Chainalysis'?", options: ["A Wallet", "Company monitoring blockchain txs", "Mining manual", "Node explorer"] },
    es: { q: "¿Qué es 'Chainalysis'?", options: ["Una billetera", "Empresa que monitorea txs de blockchain", "Manual de minería", "Explorador de nodos"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'Dusting Attack'?", options: ["Staub im Lüfter", "Versenden winziger BTC-Beträge, um Wallets zu deanonymisieren", "Ein Angriff auf Full Nodes", "Mining-Diebstahl"] },
    en: { q: "What is a 'Dusting Attack'?", options: ["Fan dust", "Sending tiny amounts to deanonymize", "Attack on Full Nodes", "Mining theft"] },
    es: { q: "¿Qué es un 'Dusting Attack'?", options: ["Polvo en ventilador", "Enviar montos diminutos para desanonimizar", "Ataque a Full Nodes", "Robo de minería"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Coinbase Reward'?", options: ["Ein Bonus von der Börse Coinbase", "Die Summe aus Block-Subsidy und Transaktionsgebühren", "Der Kaufpreis von BTC", "Ein Werbegeschenk"] },
    en: { q: "What is the 'Coinbase Reward'?", options: ["Bonus from Coinbase", "Sum of Block Subsidy and Fees", "BTC Price", "Giveaway"] },
    es: { q: "¿Qué es la 'Recompensa Coinbase'?", options: ["Bono de Coinbase", "Suma de Subsidio de Bloque y Tarifas", "Precio BTC", "Regalo"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Replay Protection'?", options: ["Schutz vor Video-Hacks", "Verhinderung, dass Transaktionen auf zwei verschiedenen Forks gültig sind", "Ein Firewall-Update", "Das Speichern von Backups"] },
    en: { q: "What is 'Replay Protection'?", options: ["Video hack protection", "Preventing tx validity on two forks", "Firewall update", "Backups"] },
    es: { q: "¿Qué es 'Replay Protection'?", options: ["Protección hack video", "Prevenir validez de tx en dos forks", "Actualización firewall", "Respaldos"] },
    correct: 1
  },
  {
    de: { q: "Was ermöglicht das Konzept 'BitVM'?", options: ["Einen schnelleren Mining-Chip", "Berechnungen ähnlich wie Smart Contracts auf Bitcoin, ohne das Protokoll zu ändern", "Eine neue Hardware-Wallet", "Das Versenden von BTC via Funk"] },
    en: { q: "What enables 'BitVM'?", options: ["Faster chip", "Smart Contract-like computation without protocol change", "New HW Wallet", "Radio BTC"] },
    es: { q: "¿Qué permite 'BitVM'?", options: ["Chip más rápido", "Cómputo tipo Contrato Inteligente sin cambio de protocolo", "Nueva Wallet HW", "Radio BTC"] },
    correct: 1
  },
  {
    de: { q: "Was ist das Hauptmerkmal von 'Ark' (Layer 2)?", options: ["Es ist eine Sidechain wie Liquid", "Trustless Off-Chain Zahlungen ohne Channel-Management für den Nutzer", "Es ersetzt das Mining", "Es ist nur für staatliche Institutionen"] },
    en: { q: "Main feature of 'Ark'?", options: ["Sidechain", "Trustless off-chain payments without user channel mgmt", "Replaces mining", "State institutions only"] },
    es: { q: "¿Característica principal de 'Ark'?", options: ["Sidechain", "Pagos off-chain trustless sin gestión de canal de usuario", "Reemplaza minería", "Solo instituciones estatales"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt das 'BIP 300' (Drivechains)?", options: ["Ein Update für SegWit", "Ermöglicht das Erstellen von Sidechains, die durch Miner gesichert werden", "Ein neues Adressformat", "Verbesserung des Lightning-Netzwerks"] },
    en: { q: "What describes 'BIP 300'?", options: ["SegWit update", "Enables miner-secured Sidechains", "New address format", "Lightning improvement"] },
    es: { q: "¿Qué describe 'BIP 300'?", options: ["Actualización SegWit", "Permite Sidechains aseguradas por mineros", "Nuevo formato dirección", "Mejora Lightning"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'PTLC' (Point Time Locked Contract)?", options: ["Ein neuer Mining-Pool", "Nachfolger von HTLCs (Lightning), der Schnorr-Signaturen für bessere Privatsphäre nutzt", "Eine physische Bitcoin-Münze", "Ein Zeitstempel in der Blockchain"] },
    en: { q: "What is a 'PTLC'?", options: ["Mining Pool", "HTLC successor using Schnorr for privacy", "Physical Coin", "Timestamp"] },
    es: { q: "¿Qué es un 'PTLC'?", options: ["Pool de minería", "Sucesor de HTLC usando Schnorr para privacidad", "Moneda física", "Marca de tiempo"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'OP_VAULT'?", options: ["Ein Tresor bei einer Bank", "Ein vorgeschlagenes Covenant-Opcode für spezialisierte Verwahrungslösungen", "Ein Mining-Verbot", "Ein Backup-Standard"] },
    en: { q: "What is 'OP_VAULT'?", options: ["Bank vault", "Proposed Covenant Opcode for custody", "Mining ban", "Backup standard"] },
    es: { q: "¿Qué es 'OP_VAULT'?", options: ["Bóveda bancaria", "Opcode Covenant propuesto para custodia", "Prohibición minera", "Estándar de respaldo"] },
    correct: 1
  },

  // --- TIEFE ÖKONOMIE & SPIELTHEORIE ---
  {
    de: { q: "Was beschreibt der 'Giffen-Effekt' (Giffen-Gut) ökonomisch?", options: ["Nachfrage sinkt bei steigendem Preis", "Nachfrage steigt trotz (oder wegen) steigendem Preis", "Geld verliert an Wert", "Zinsen beeinflussen den Konsum"] },
    en: { q: "What is the 'Giffen Effect'?", options: ["Demand drops with price", "Demand rises despite price rise", "Money loses value", "Interest affects consumption"] },
    es: { q: "¿Qué es el 'Efecto Giffen'?", options: ["Demanda cae con precio", "Demanda sube a pesar de subida de precio", "Dinero pierde valor", "Interés afecta consumo"] },
    correct: 1
  },
  {
    de: { q: "Was ist die 'Paradoxie des Sparens' (Keynes) vs. Österreichische Schule?", options: ["Sparen schadet der Wirtschaft vs. Sparen ist die Basis für Investitionen", "Sparen erhöht die Zinsen", "Sparen ist nur für Reiche", "Es gibt keine Paradoxie"] },
    en: { q: "'Paradox of Thrift' (Keynes) vs Austrian?", options: ["Saving hurts economy vs Saving bases investment", "Saving raises rates", "Saving is for rich", "No paradox"] },
    es: { q: "¿'Paradoja del Ahorro' (Keynes) vs Austriaca?", options: ["Ahorrar daña economía vs Ahorrar basa inversión", "Ahorrar sube tasas", "Ahorrar es de ricos", "No hay paradoja"] },
    correct: 0
  },
  {
    de: { q: "Was ist 'Moral Hazard' im Kontext des aktuellen Geldsystems?", options: ["Ehrliches Handeln wird belohnt", "Anreiz zu riskantem Verhalten, da Verluste sozialisiert werden (Bailouts)", "Kryptographie ist gefährlich", "Bitcoin Mining verbraucht Strom"] },
    en: { q: "What is 'Moral Hazard'?", options: ["Honesty rewarded", "Incentive for risk due to socialized losses", "Crypto is dangerous", "Mining uses power"] },
    es: { q: "¿Qué es 'Riesgo Moral'?", options: ["Honestidad recompensada", "Incentivo al riesgo por pérdidas socializadas", "Cripto es peligroso", "Minería usa energía"] },
    correct: 1
  },
  {
    de: { q: "Welche ökonomische Theorie besagt, dass 'Geld neutral' sei?", options: ["Österreichische Schule", "Monetarismus / Klassische Ökonomik", "Keynesianismus", "Marxismus"] },
    en: { q: "Which theory says 'Money is neutral'?", options: ["Austrian School", "Monetarism / Classical", "Keynesianism", "Marxism"] },
    es: { q: "¿Qué teoría dice 'El dinero es neutral'?", options: ["Escuela Austriaca", "Monetarismo / Clásica", "Keynesianismo", "Marxismo"] },
    correct: 1
  },

  // --- TECHNIK-DETAILS (NERD-LEVEL) ---
  {
    de: { q: "Wie lautet der 'Witness Scale Factor' bei der Berechnung der Blockgewichtung?", options: ["2", "4", "8", "10"] },
    en: { q: "What is the 'Witness Scale Factor'?", options: ["2", "4", "8", "10"] },
    es: { q: "¿Cuál es el 'Factor de Escala Witness'?", options: ["2", "4", "8", "10"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Locktime'-Wert 500.000.000 technisch gesehen?", options: ["Ein Block-Index", "Die Grenze zwischen Blockhöhe und Unix-Zeitstempel", "Ein Fehlercode", "Die maximale Anzahl an Usern"] },
    en: { q: "What is 'Locktime' 500,000,000?", options: ["Block Index", "Boundary between block height and timestamp", "Error code", "Max users"] },
    es: { q: "¿Qué es 'Locktime' 500.000.000?", options: ["Índice de bloque", "Límite entre altura de bloque y marca de tiempo", "Código de error", "Usuarios máximos"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Compact Block Filtering' (BIP 158)?", options: ["Mining-Optimierung", "Methode für Light-Clients, um Transaktionen ohne Preisgabe der Privatsphäre zu finden", "Das Löschen alter Blöcke", "Ein Kompressions-Tool"] },
    en: { q: "What is 'Compact Block Filtering'?", options: ["Mining optimization", "Privacy method for light clients", "Deleting old blocks", "Compression tool"] },
    es: { q: "¿Qué es 'Compact Block Filtering'?", options: ["Optimización minera", "Método de privacidad para clientes ligeros", "Borrar bloques viejos", "Herramienta de compresión"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'SIGHASH_SINGLE'?", options: ["Ein einsamer Miner", "Ein Flag, das nur den korrespondierenden Output signiert", "Eine einfache Signatur", "Ein Sicherheitsfehler"] },
    en: { q: "What is 'SIGHASH_SINGLE'?", options: ["Lonely miner", "Flag signing only corresponding output", "Simple signature", "Security flaw"] },
    es: { q: "¿Qué es 'SIGHASH_SINGLE'?", options: ["Minero solitario", "Bandera firmando solo output correspondiente", "Firma simple", "Fallo de seguridad"] },
    correct: 1
  },
  {
    de: { q: "Was ist das 'UTXO-Set Size' Problem?", options: ["Zu wenig Bitcoins", "Das Anwachsen der Datenbank, die jede Node im RAM halten muss", "Zu viele Transaktionen pro Sekunde", "Die Größe der Festplatten"] },
    en: { q: "What is 'UTXO-Set Size' problem?", options: ["Too few BTC", "Growth of DB nodes keep in RAM", "Too many tx/s", "Disk size"] },
    es: { q: "¿Problema 'UTXO-Set Size'?", options: ["Muy pocos BTC", "Crecimiento de BD en RAM de nodos", "Demasiadas tx/s", "Tamaño de disco"] },
    correct: 1
  },

  // --- GESCHICHTE & INSIDER ---
  {
    de: { q: "Welches Pseudonym nutzte die Person, die 2010 den 'Value Overflow' Bug meldete?", options: ["Satoshi", "Chefnet", "Loomis", "Hal Finney"] },
    en: { q: "Pseudonym reporting 'Value Overflow' (2010)?", options: ["Satoshi", "Chefnet", "Loomis", "Hal Finney"] },
    es: { q: "¿Seudónimo reportando 'Value Overflow' (2010)?", options: ["Satoshi", "Chefnet", "Loomis", "Hal Finney"] },
    correct: 1
  },
  {
    de: { q: "Welchen PGP-Schlüssel nutzte Satoshi Nakamoto zur Verifizierung des Whitepapers?", options: ["Er nutzte keinen", "Einen 2048-bit DSA Key", "Einen SHA-256 Hash", "Eine Bitcoin-Signatur"] },
    en: { q: "Which PGP key did Satoshi use for the Whitepaper?", options: ["None", "2048-bit DSA Key", "SHA-256 Hash", "Bitcoin Signature"] },
    es: { q: "¿Qué clave PGP usó Satoshi para el Libro Blanco?", options: ["Ninguna", "Clave DSA 2048-bit", "Hash SHA-256", "Firma Bitcoin"] },
    correct: 1
  },
  {
    de: { q: "Wie hieß das erste Forum, in dem Bitcoin diskutiert wurde?", options: ["Reddit", "BitcoinTalk (ursprünglich auf einer anderen Domain)", "Cryptography Mailing List", "Slashdot"] },
    en: { q: "First forum discussing Bitcoin?", options: ["Reddit", "BitcoinTalk", "Cryptography Mailing List", "Slashdot"] },
    es: { q: "¿Primer foro discutiendo Bitcoin?", options: ["Reddit", "BitcoinTalk", "Cryptography Mailing List", "Slashdot"] },
    correct: 2
  },
  {
    de: { q: "Was war 'Operation Bernhard' im Kontext von Geldgeschichte?", options: ["Bitcoin-Mining in Deutschland", "Massive Fälschung von Pfund-Noten durch die Nazis", "Gründung der Bundesbank", "Erfindung des Papiergeldes"] },
    en: { q: "What was 'Operation Bernhard'?", options: ["Bitcoin mining", "Nazi counterfeiting of Pound notes", "Founding Bundesbank", "Paper money invention"] },
    es: { q: "¿Qué fue la 'Operación Bernhard'?", options: ["Minería Bitcoin", "Falsificación nazi de libras", "Fundación Bundesbank", "Invención papel moneda"] },
    correct: 1
  },

  // --- BITCOIN & ENERGIE ---
  {
    de: { q: "Was versteht man unter 'Stranded Energy' beim Mining?", options: ["Verschwendeter Strom", "Energiequellen, die abgelegen sind und nicht ins Netz eingespeist werden können", "Batterien für Miner", "Solarstrom für zu Hause"] },
    en: { q: "What is 'Stranded Energy'?", options: ["Wasted power", "Remote energy sources not grid-connected", "Miner batteries", "Home solar"] },
    es: { q: "¿Qué es 'Energía Varada'?", options: ["Energía desperdiciada", "Fuentes remotas no conectadas a red", "Baterías mineras", "Solar doméstica"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Flare Gas Mining'?", options: ["Mining mit Licht", "Nutzung von Abfallgas aus der Ölförderung zur Stromerzeugung für Miner", "Mining in der Wüste", "Ein schneller Mining-Algorithmus"] },
    en: { q: "What is 'Flare Gas Mining'?", options: ["Light mining", "Using oil waste gas for mining power", "Desert mining", "Fast algo"] },
    es: { q: "¿Qué es 'Flare Gas Mining'?", options: ["Minería de luz", "Usar gas residual de petróleo para energía", "Minería en desierto", "Algo rápido"] },
    correct: 1
  },
  {
    de: { q: "Kann Bitcoin-Mining das Stromnetz stabilisieren?", options: ["Nein, es belastet nur", "Ja, durch 'Demand Response' (Abschalten bei Lastspitzen)", "Nur wenn es regnet", "Nur mit Windkraft"] },
    en: { q: "Can Mining stabilize the grid?", options: ["No, only burden", "Yes, via Demand Response", "Only when raining", "Only wind"] },
    es: { q: "¿Puede la minería estabilizar la red?", options: ["No, solo carga", "Sí, vía Respuesta a la Demanda", "Solo cuando llueve", "Solo viento"] },
    correct: 1
  },

  // --- SPEZIALWISSEN (COVENANTS & SCRIPTS) ---
  {
    de: { q: "Was ist 'OP_CAT'?", options: ["Ein Katzen-Meme", "Ein deaktivierter Befehl zum Zusammenfügen von Daten, dessen Rückkehr diskutiert wird", "Ein Mining-Programm", "Ein Wallet-Backup"] },
    en: { q: "What is 'OP_CAT'?", options: ["Cat meme", "Disabled command to concatenate data", "Mining program", "Wallet backup"] },
    es: { q: "¿Qué es 'OP_CAT'?", options: ["Meme de gato", "Comando deshabilitado para concatenar datos", "Programa minero", "Respaldo billetera"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'Miniscript'?", options: ["Eine kleine Schriftart", "Eine strukturierte Art, Bitcoin-Skripte sicher und analysierbar zu schreiben", "Ein Betriebssystem", "Eine App"] },
    en: { q: "What is 'Miniscript'?", options: ["Small font", "Structured way to write safe scripts", "OS", "App"] },
    es: { q: "¿Qué es 'Miniscript'?", options: ["Fuente pequeña", "Forma estructurada de escribir scripts seguros", "SO", "App"] },
    correct: 1
  },
  {
    de: { q: "Was ist ein 'ScriptPubKey'?", options: ["Das Passwort des Nutzers", "Das 'Schloss' an einem UTXO, das die Bedingungen zum Ausgeben definiert", "Der Name der Node", "Die Transaktionsgebühr"] },
    en: { q: "What is a 'ScriptPubKey'?", options: ["User password", "The 'lock' on a UTXO defining spending conditions", "Node name", "Tx fee"] },
    es: { q: "¿Qué es un 'ScriptPubKey'?", options: ["Contraseña usuario", "El 'candado' en un UTXO definiendo condiciones", "Nombre nodo", "Tarifa tx"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'RBF' (Opt-In Replace By Fee)?", options: ["Bitcoin-Tausch", "Möglichkeit, eine unbestätigte Transaktion durch eine Version mit höherer Gebühr zu ersetzen", "Zahlung stornieren", "Mining-Belohnung"] },
    en: { q: "What is 'RBF'?", options: ["BTC Swap", "Replace unconfirmed tx with higher fee version", "Cancel payment", "Mining reward"] },
    es: { q: "¿Qué es 'RBF'?", options: ["Intercambio BTC", "Reemplazar tx no confirmada con versión de mayor tarifa", "Cancelar pago", "Recompensa minera"] },
    correct: 1
  },

  // --- MAKRO & GELDPOLITIK ---
  {
    de: { q: "Was ist die 'Schuldenobergrenze' (Debt Ceiling)?", options: ["Maximale BTC Menge", "Gesetzliches Limit für die Verschuldung eines Staates (z.B. USA)", "Zinssatz der Bank", "Kreditlimit einer Wallet"] },
    en: { q: "What is the 'Debt Ceiling'?", options: ["Max BTC", "Legal limit for state debt (e.g. USA)", "Interest rate", "Wallet limit"] },
    es: { q: "¿Qué es el 'Techo de Deuda'?", options: ["Máx BTC", "Límite legal para deuda estatal (ej. EE. UU.)", "Tasa interés", "Límite billetera"] },
    correct: 1
  },
  {
    de: { q: "Was bedeutet 'Quantitative Easing' (QE)?", options: ["Bitcoin Halving", "Ausweitung der Geldmenge durch Zentralbanken via Anleihekauf", "Sparen beim Staat", "Erhöhung der Steuern"] },
    en: { q: "What is 'Quantitative Easing' (QE)?", options: ["Halving", "Money supply expansion via asset buying", "State saving", "Tax hike"] },
    es: { q: "¿Qué es 'Flexibilización Cuantitativa' (QE)?", options: ["Halving", "Expansión monetaria vía compra de activos", "Ahorro estatal", "Alza impuestos"] },
    correct: 1
  },
  {
    de: { q: "Was ist eine 'CBDC'?", options: ["Ein Bitcoin-Upgrade", "Zentralbank-Digitalwährung (programmierbares Fiat-Geld)", "Eine Krypto-Börse", "Ein Mining-Pool"] },
    en: { q: "What is a 'CBDC'?", options: ["BTC Upgrade", "Central Bank Digital Currency", "Crypto Exchange", "Mining Pool"] },
    es: { q: "¿Qué es una 'CBDC'?", options: ["Mejora BTC", "Moneda Digital de Banco Central", "Exchange Cripto", "Pool Minero"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Sound Money' laut Nick Szabo?", options: ["Geld mit gutem Klang", "Geld mit 'Unforgeable Costliness' (nicht fälschbare Kostbarkeit)", "Digitales Gold", "Staatliches Geld"] },
    en: { q: "Szabo's 'Sound Money' definition?", options: ["Good sound", "Unforgeable Costliness", "Digital Gold", "State Money"] },
    es: { q: "¿Definición de 'Sound Money' de Szabo?", options: ["Buen sonido", "Costosidad Infalsificable (Unforgeable Costliness)", "Oro Digital", "Dinero Estatal"] },
    correct: 1
  },

  // --- FINALE FRAGEN ---
  {
    de: { q: "Was ist ein 'LSP' (Liquidity Service Provider)?", options: ["Ein Bitcoin-Verkäufer", "Dienstleister, der Lightning-Nodes mit Inbound Liquidity versorgt", "Eine Bank", "Ein Mining-Hardware-Händler"] },
    en: { q: "What is an 'LSP'?", options: ["BTC Seller", "Provider supplying inbound liquidity to Lightning nodes", "Bank", "Hardware dealer"] },
    es: { q: "¿Qué es un 'LSP'?", options: ["Vendedor BTC", "Proveedor de liquidez entrante a nodos Lightning", "Banco", "Vendedor hardware"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Wumbo' im Lightning Netzwerk?", options: ["Ein großer Elefant", "Option für Kanäle ohne das standardmäßige Kapazitätslimit", "Ein Fehler im Protokoll", "Ein spezieller Node-Typ"] },
    en: { q: "What is 'Wumbo' in Lightning?", options: ["Elephant", "Option for channels without capacity limit", "Protocol error", "Node type"] },
    es: { q: "¿Qué es 'Wumbo' en Lightning?", options: ["Elefante", "Opción para canales sin límite de capacidad", "Error de protocolo", "Tipo de nodo"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt 'V3 Transactions'?", options: ["Dritte Version von Bitcoin", "Ein neuer Standard für Layer-2 Transaktionen zur Vermeidung von Pinning-Attacken", "Ein Adressformat", "Ein Mining-Update"] },
    en: { q: "What are 'V3 Transactions'?", options: ["Bitcoin V3", "Standard to avoid pinning attacks in L2", "Address format", "Mining update"] },
    es: { q: "¿Qué son 'V3 Transactions'?", options: ["Bitcoin V3", "Estándar para evitar ataques de pinning en L2", "Formato dirección", "Actualización minera"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'MuSig2'?", options: ["Ein Musik-Streaming-Dienst", "Ein verbessertes Protokoll für Multi-Signatur-Aggregation", "Ein Mining-Pool", "Eine Wallet-App"] },
    en: { q: "What is 'MuSig2'?", options: ["Streaming service", "Improved Multisig Aggregation Protocol", "Mining Pool", "Wallet App"] },
    es: { q: "¿Qué es 'MuSig2'?", options: ["Servicio streaming", "Protocolo mejorado de Agregación Multisig", "Pool Minero", "App Billetera"] },
    correct: 1
  },
  {
    de: { q: "Was ist der 'Blockstream Satellite'?", options: ["Ein Internet-Satellit", "Dienst zum Empfang der Bitcoin-Blockchain ohne Internet via Satellit", "Ein Krypto-Projekt von Elon Musk", "Ein GPS für Miner"] },
    en: { q: "What is 'Blockstream Satellite'?", options: ["Internet Sat", "Receiving Blockchain via Satellite without Internet", "Musk Project", "Miner GPS"] },
    es: { q: "¿Qué es 'Blockstream Satellite'?", options: ["Satélite Internet", "Recibir Blockchain vía Satélite sin Internet", "Proyecto Musk", "GPS Minero"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'BIP 85'?", options: ["Ein Mining-Standard", "Ableitung von weiteren Seeds/Entropie aus einem Haupt-Seed", "Ein Lightning-Update", "Ein Adressformat"] },
    en: { q: "What is 'BIP 85'?", options: ["Mining Standard", "Deriving more seeds from main seed", "Lightning Update", "Address format"] },
    es: { q: "¿Qué es 'BIP 85'?", options: ["Estándar Minero", "Derivar más semillas de semilla principal", "Actualización Lightning", "Formato dirección"] },
    correct: 1
  },
  {
    de: { q: "Was ist 'Nostr' im Kontext der Bitcoin-Community?", options: ["Ein Mining-Algorithmus", "Ein dezentrales Protokoll für soziale Netzwerke, oft mit BTC/Lightning verknüpft", "Eine Hardware-Wallet", "Ein Layer 2"] },
    en: { q: "What is 'Nostr'?", options: ["Mining Algo", "Decentralized social protocol, often linked to BTC", "Hardware Wallet", "Layer 2"] },
    es: { q: "¿Qué es 'Nostr'?", options: ["Algo Minero", "Protocolo social descentralizado, vinculado a BTC", "Wallet Hardware", "Capa 2"] },
    correct: 1
  },
  {
    de: { q: "Was ist die 'Mempool.space' Instanz?", options: ["Eine Wallet", "Ein populärer Open-Source Block-Explorer und Gebühren-Visualisierer", "Ein Mining-Pool", "Die offizielle Bitcoin-Seite"] },
    en: { q: "What is 'Mempool.space'?", options: ["Wallet", "Popular Block Explorer & Fee Visualizer", "Mining Pool", "Official Site"] },
    es: { q: "¿Qué es 'Mempool.space'?", options: ["Billetera", "Explorador de Bloques y Visualizador de Tarifas popular", "Pool Minero", "Sitio Oficial"] },
    correct: 1
  },
  {
    de: { q: "Was beschreibt der Begriff 'Orange Pill'?", options: ["Ein Medikament", "Jemanden von den Vorzügen von Bitcoin überzeugen", "Ein Bitcoin-Logo", "Eine Mining-Farm"] },
    en: { q: "What is the 'Orange Pill'?", options: ["Medicine", "Convincing someone of Bitcoin's benefits", "Logo", "Mining Farm"] },
    es: { q: "¿Qué es la 'Orange Pill'?", options: ["Medicina", "Convencer a alguien de los beneficios de Bitcoin", "Logo", "Granja Minera"] },
    correct: 1
  },
  {
    de: { q: "Welches Jahr markiert das Ende der Golddeckung (Nixon-Schock)?", options: ["1913", "1944", "1971", "2008"] },
    en: { q: "Year of Gold Standard end (Nixon Shock)?", options: ["1913", "1944", "1971", "2008"] },
    es: { q: "¿Año del fin del Patrón Oro (Shock Nixon)?", options: ["1913", "1944", "1971", "2008"] },
    correct: 2
  },
  {
    de: { q: "Wer hat Bitcoin erschaffen?", options: ["Die Regierung", "Satoshi Nakamoto", "Ein Bankenkonsortium", "Steve Jobs"] },
    en: { q: "Who created Bitcoin?", options: ["Government", "Satoshi Nakamoto", "Bank Consortium", "Steve Jobs"] },
    es: { q: "¿Quién creó Bitcoin?", options: ["Gobierno", "Satoshi Nakamoto", "Consorcio Bancario", "Steve Jobs"] },
    correct: 1
  },
  {
    de: { q: "Wird es jemals mehr als 21 Millionen Bitcoin geben?", options: ["Ja, durch Updates", "Nein, das ist mathematisch fixiert", "Vielleicht", "Nur wenn alle Miner zustimmen"] },
    en: { q: "Will there be more than 21M BTC?", options: ["Yes, updates", "No, mathematically fixed", "Maybe", "Only if miners agree"] },
    es: { q: "¿Habrá más de 21M BTC?", options: ["Sí, actualizaciones", "No, matemáticamente fijo", "Quizás", "Solo si mineros acuerdan"] },
    correct: 1
  }
];