export const TRANSLATIONS = {
  de: {
    // General
    btn_understood: "Verstanden",
    btn_cancel: "Abbrechen",
    btn_lobby: "Zur Lobby",
    btn_wallet: "Wallet öffnen",
    btn_withdraw: "Gewinn abholen",
    btn_copy_withdraw: "Code kopieren",
    btn_copy_invoice: "Invoice kopieren",
    btn_check: "Habe bezahlt",
    btn_refund: "Rückzahlen",
    btn_start: "Invoice erzeugen",
    btn_ready: "Bereit!",
    btn_share: "Herausfordern!", 
    
    // TILES (Kacheln)
    tile_lobby: "Lobby",
    tile_challenges: "Challenges",
    tile_active_games: "Laufende",
    active_games_title: "Deine offenen Spiele",
    tile_leaderboard: "Bestenliste",
    tile_history: "Historie",
    tile_settings: "Einstellungen",
    tile_badges: "Erfolge",
    tile_tournaments: "Turniere",

    // Login
    welcome_disclaimer: "Wichtiger Hinweis",
    welcome_text: "SatoshiDuell ist ein Custodial-Lightning-Service im Alpha-Stadium. Wir übernehmen keine Haftung für Softwarefehler, Serverausfälle oder verlorene Sats. Bitte zahle nur Beträge ein, deren Verlust du verschmerzen kannst. Have fun & don't be reckless!",
    login_placeholder: "Nutzername / NPUB",
    pin_placeholder: "4-stellige PIN",
    login_btn: "Login / Registrieren",
    login_error_pin: "PIN muss 4 Stellen haben",
    login_error_wrong_pin: "Falsche PIN",
    login_error_name: "Name zu kurz (min 3)",
    login_error_nostr: "Nostr-Login bitte über Button",
    login_error_taken: "Name vergeben",
    btn_nostr_ext: "Login mit Extension",
    nostr_setup_title: "Nostr Setup",
    nostr_setup_text: "Wähle einen Spielernamen für deinen Public Key.",

    // Dashboard
    sats_won: "Sats gewonnen",
    dashboard_new_duel: "Neues Duell",
    dashboard_new_tournament: "Neues Turnier",
    dashboard_donate: "Spenden",
    dash_unclaimed_title: "Gewinn verfügbar!",
    dash_unclaimed_text: "Du hast offene Gewinne",

    // Lobby & History
    lobby_fight: "Kämpfen",
    lobby_wait: "Warte auf Gegner...",
    lobby_paid: "Ausgezahlt",
    lobby_details: "Details",
    no_challenges: "Keine offenen Herausforderungen",
    challenge_sent: "Herausforderung an",
    refund_wait: "Wartezeit läuft...",
    share_nostr: "Auf Nostr teilen",
    
    // Share Game Text
    share_content: "⚔️ SATOSHI DUELL ⚔️\n\nIch habe {amount} Sats auf mein Wissen gesetzt!\nNimmst du die Wette an?\n\nKlick den Link um zu kämpfen:\n{url}",
    share_success: "Link kopiert! Schicke ihn an deinen Gegner.",

    // HALL OF FAME & BADGES (NEU)
    hof_title: "Hall of Fame",
    hof_progress: "Freigeschaltet",
    share_title: "Meine Hall of Fame",
    share_text_prefix: "🏆 Ich habe bereits",
    share_text_suffix: "Erfolge im Bitcoin Duell freigeschaltet! Kannst du mich schlagen?",
    share_clipboard: "Text in die Zwischenablage kopiert!",

    // Kategorie: Treue
    badge_p1_name: "Neuling", badge_p1_desc: "5 Spiele gespielt",
    badge_p2_name: "Stammgast", badge_p2_desc: "25 Spiele gespielt",
    badge_p3_name: "Veteran", badge_p3_desc: "100 Spiele gespielt",
    badge_p4_name: "Süchtig", badge_p4_desc: "500 Spiele gespielt",
    badge_p5_name: "Inventar", badge_p5_desc: "1.000 Spiele gespielt",

    // Kategorie: Dominanz
    badge_w1_name: "Gewinner", badge_w1_desc: "5 Siege errungen",
    badge_w2_name: "Champion", badge_w2_desc: "25 Siege errungen",
    badge_w3_name: "Legende", badge_w3_desc: "100 Siege errungen",
    badge_w4_name: "Imperator", badge_w4_desc: "500 Siege errungen",

    // Kategorie: Serie
    badge_st1_name: "Heiß gelaufen", badge_st1_desc: "3 Siege in Folge",
    badge_st2_name: "On Fire", badge_st2_desc: "5 Siege in Folge",
    badge_st3_name: "Unbesiegbar", badge_st3_desc: "10 Siege in Folge",

    // Kategorie: Reichtum
    badge_s1_name: "Sparer", badge_s1_desc: "100 Sats gewonnen",
    badge_s2_name: "Stacker", badge_s2_desc: "1.000 Sats gewonnen",
    badge_s3_name: "Whale", badge_s3_desc: "10.000 Sats gewonnen",
    badge_s4_name: "Baron", badge_s4_desc: "50.000 Sats gewonnen",
    badge_s5_name: "Satoshi", badge_s5_desc: "100.000 Sats gewonnen",

    // Kategorie: Skill & Special
    badge_sk1_name: "Scharfschütze", badge_sk1_desc: "5x Perfekte Runde",
    badge_sk2_name: "Aimbot", badge_sk2_desc: "25x Perfekte Runde",
    badge_sk3_name: "Das Orakel", badge_sk3_desc: "100x Perfekte Runde",

    badge_sp1_name: "Der Blitz", badge_sp1_desc: "Sieg unter 12s",
    badge_sp2_name: "Lichtgeschw.", badge_sp2_desc: "Sieg unter 8s",
    badge_sp3_name: "High Roller", badge_sp3_desc: "Spiel um 500+ Sats",
    badge_sp4_name: "Fotofinish", badge_sp4_desc: "Knapper Zeitsieg",

    // Game Setup
    setup_title: "Duell erstellen",
    setup_target: "Herausforderung an",
    setup_wager_label: "Einsatz (Sats)",
    setup_refund_info: "Nicht angenommene Duelle können nach 3 Tagen erstattet werden.",

    // Game
    pre_game_title: "Zahlung erhalten!",
    pre_game_text: "Gleich geht es los. Mach dich bereit.",
    game_q: "Frage",
    pay_title: 'EINSATZ ZAHLEN',
    
    // Results
    result_wait: "Warte auf Gegner...",
    result_win: "Gewonnen!",
    result_loss: "Verloren",
    result_draw: "Unentschieden",
    refund_info: "Hier ist dein Refund-Code. Scanne ihn mit einer Lightning Wallet.",

    // Settings & Admin
    settings_notifications: "Benachrichtigungen",
    settings_notifications_desc: "Bei neuen Herausforderungen",
    perm_request: "Bitte im Browser erlauben",
    settings_security: "Sicherheit",
    settings_change_pin: "PIN ändern",
    settings_saved: "Gespeichert!",
    settings_back: "Zurück",
    donate_title: "Unterstütze uns",
    donate_text: "SatoshiDuell ist Free & Open Source.",
    donate_btn: "Invoice erzeugen",
    donate_thanks: "Vielen Dank!",
    admin_title: "Admin Bereich",
    admin_stats_total: "Spiele Gesamt",
    admin_stats_open: "Offen",
    admin_stats_volume: "Volumen",
    admin_search_placeholder: "Suche Spieler/ID...",
    admin_filter_all: "Alle",
    admin_filter_open: "Offen",
    admin_filter_finished: "Beendet",
    msg_challenged: "Du wurdest herausgefordert!",
    msg_won: "Du hast ein Duell gewonnen!",
    nostr_copied: "Text kopiert!",
    nostr_share_text: "Ich habe gerade {amount} sats in einem Quiz gewonnen! Score: {score}/5 #SatoshiDuell"
  },

  en: {
    btn_understood: "Understood",
    btn_cancel: "Cancel",
    btn_lobby: "To Lobby",
    btn_wallet: "Open Wallet",
    btn_withdraw: "Claim Prize",
    btn_copy_withdraw: "Copy Code",
    btn_copy_invoice: "Copy Invoice",
    btn_check: "I paid",
    btn_refund: "Refund",
    btn_start: "Create Invoice",
    btn_ready: "Ready!",
    btn_share: "Challenge!",
    
    tile_lobby: "Lobby",
    tile_challenges: "Challenges",
    tile_active_games: "Active",
    active_games_title: "Your Open Games",
    tile_leaderboard: "Leaderboard",
    tile_history: "History",
    tile_settings: "Settings",
    tile_badges: "Badges",
    tile_tournaments: "Tournaments",

    welcome_disclaimer: "Important Notice",
    welcome_text: "SatoshiDuell is an alpha-stage custodial Lightning service. We accept no liability for software errors, server outages, or lost sats. Please only deposit amounts you are willing to lose. Have fun & don't be reckless!",
    login_placeholder: "Username / NPUB",
    pin_placeholder: "4-digit PIN",
    login_btn: "Login / Register",
    login_error_pin: "PIN must be 4 digits",
    login_error_wrong_pin: "Wrong PIN",
    login_error_name: "Name too short (min 3)",
    login_error_nostr: "Please use Nostr button",
    login_error_taken: "Name taken",
    btn_nostr_ext: "Login with Extension",
    nostr_setup_title: "Nostr Setup",
    nostr_setup_text: "Choose a username for your public key.",

    sats_won: "Sats won",
    dashboard_new_duel: "New Duel",
    dashboard_new_tournament: "New Tournament",
    dashboard_donate: "Donate",
    dash_unclaimed_title: "Prize available!",
    dash_unclaimed_text: "You have unclaimed wins",

    lobby_fight: "Fight",
    lobby_wait: "Waiting for opp...",
    lobby_paid: "Paid out",
    lobby_details: "Details",
    no_challenges: "No open challenges",
    challenge_sent: "Challenge to",
    refund_wait: "Wait period...",
    share_nostr: "Share on Nostr",

    share_content: "⚔️ SATOSHI DUELL ⚔️\n\nI bet {amount} Sats on my knowledge!\nDo you accept the bet?\n\nClick link to fight:\n{url}",
    share_success: "Link copied! Send it to your opponent.",

    // HALL OF FAME & BADGES (NEW)
    hof_title: "Hall of Fame",
    hof_progress: "Unlocked",
    share_title: "My Hall of Fame",
    share_text_prefix: "🏆 I have unlocked",
    share_text_suffix: "achievements in SatoshiDuell! Can you beat me?",
    share_clipboard: "Copied to clipboard!",

    // Category: Loyalty
    badge_p1_name: "Newbie", badge_p1_desc: "Played 5 games",
    badge_p2_name: "Regular", badge_p2_desc: "Played 25 games",
    badge_p3_name: "Veteran", badge_p3_desc: "Played 100 games",
    badge_p4_name: "Addict", badge_p4_desc: "Played 500 games",
    badge_p5_name: "Inventory", badge_p5_desc: "Played 1,000 games",

    // Category: Dominance
    badge_w1_name: "Winner", badge_w1_desc: "Won 5 duels",
    badge_w2_name: "Champion", badge_w2_desc: "Won 25 duels",
    badge_w3_name: "Legend", badge_w3_desc: "Won 100 duels",
    badge_w4_name: "Emperor", badge_w4_desc: "Won 500 duels",

    // Category: Streak
    badge_st1_name: "Heating Up", badge_st1_desc: "Won 3 in a row",
    badge_st2_name: "On Fire", badge_st2_desc: "Won 5 in a row",
    badge_st3_name: "Invincible", badge_st3_desc: "Won 10 in a row",

    // Category: Wealth
    badge_s1_name: "Saver", badge_s1_desc: "Won 100 sats",
    badge_s2_name: "Stacker", badge_s2_desc: "Won 1,000 sats",
    badge_s3_name: "Whale", badge_s3_desc: "Won 10,000 sats",
    badge_s4_name: "Baron", badge_s4_desc: "Won 50,000 sats",
    badge_s5_name: "Satoshi", badge_s5_desc: "Won 100,000 sats",

    // Category: Skill & Special
    badge_sk1_name: "Sharpshooter", badge_sk1_desc: "5x Perfect Round",
    badge_sk2_name: "Aimbot", badge_sk2_desc: "25x Perfect Round",
    badge_sk3_name: "The Oracle", badge_sk3_desc: "100x Perfect Round",

    badge_sp1_name: "The Flash", badge_sp1_desc: "Win under 12s",
    badge_sp2_name: "Lightspeed", badge_sp2_desc: "Win under 8s",
    badge_sp3_name: "High Roller", badge_sp3_desc: "Bet 500+ Sats",
    badge_sp4_name: "Photo Finish", badge_sp4_desc: "Close time win",

    setup_title: "Create Duel",
    setup_target: "Challenge to",
    setup_wager_label: "Wager (Sats)",
    setup_refund_info: "Unaccepted duels can be refunded after 3 days.",

    pre_game_title: "Payment received!",
    pre_game_text: "Get ready. Starting soon.",
    game_q: "Question",
    pay_title: 'PAY ENTRY FEE',

    result_wait: "Waiting for opponent...",
    result_win: "You Won!",
    result_loss: "You Lost",
    result_draw: "Draw",
    refund_info: "Here is your refund code. Scan with Lightning Wallet.",

    settings_notifications: "Notifications",
    settings_notifications_desc: "On new challenges",
    perm_request: "Please allow in browser",
    settings_security: "Security",
    settings_change_pin: "Change PIN",
    settings_saved: "Saved!",
    settings_back: "Back",
    donate_title: "Support us",
    donate_text: "SatoshiDuell is Free & Open Source.",
    donate_btn: "Create Invoice",
    donate_thanks: "Thank you!",
    admin_title: "Admin Area",
    admin_stats_total: "Total Games",
    admin_stats_open: "Open",
    admin_stats_volume: "Volume",
    admin_search_placeholder: "Search player/ID...",
    admin_filter_all: "All",
    admin_filter_open: "Open",
    admin_filter_finished: "Finished",
    msg_challenged: "You have been challenged!",
    msg_won: "You won a duel!",
    nostr_copied: "Text copied!",
    nostr_share_text: "I just won {amount} sats in a quiz! Score: {score}/5 #SatoshiDuell"
  },

  es: {
    btn_understood: "Entendido",
    btn_cancel: "Cancelar",
    btn_lobby: "Al Lobby",
    btn_wallet: "Abrir Wallet",
    btn_withdraw: "Reclamar Premio",
    btn_copy_withdraw: "Copiar Código",
    btn_copy_invoice: "Copiar Factura",
    btn_check: "He pagado",
    btn_refund: "Reembolso",
    btn_start: "Crear Factura",
    btn_ready: "Listo!",
    btn_share: "¡Desafiar!",
    
    tile_lobby: "Lobby",
    tile_challenges: "Desafíos",
    tile_active_games: "Activos",
    active_games_title: "Tus Juegos Abiertos",
    tile_leaderboard: "Ranking",
    tile_history: "Historial",
    tile_settings: "Ajustes",
    tile_badges: "Logros",
    tile_tournaments: "Torneos",

    welcome_disclaimer: "Aviso Importante",
    welcome_text: "SatoshiDuell es un servicio Lightning de custodia en fase alfa. No asumimos responsabilidad por errores de software, cortes del servidor o sats perdidos. Por favor, deposita solo lo que estés dispuesto a perder. ¡Diviértete!",
    login_placeholder: "Usuario / NPUB",
    pin_placeholder: "PIN de 4 dígitos",
    login_btn: "Entrar / Registro",
    login_error_pin: "PIN debe tener 4 dígitos",
    login_error_wrong_pin: "PIN incorrecto",
    login_error_name: "Nombre muy corto (min 3)",
    login_error_nostr: "Usa el botón Nostr",
    login_error_taken: "Nombre ocupado",
    btn_nostr_ext: "Entrar con Extensión",
    nostr_setup_title: "Configuración Nostr",
    nostr_setup_text: "Elige un nombre para tu clave pública.",

    sats_won: "Sats ganados",
    dashboard_new_duel: "Nuevo Duelo",
    dashboard_new_tournament: "Nuevo Torneo",
    dashboard_donate: "Donar",
    dash_unclaimed_title: "¡Premio disponible!",
    dash_unclaimed_text: "Tienes ganancias pendientes",

    lobby_fight: "Luchar",
    lobby_wait: "Esperando...",
    lobby_paid: "Pagado",
    lobby_details: "Detalles",
    no_challenges: "Sin desafíos",
    challenge_sent: "Desafío a",
    refund_wait: "Espera...",
    share_nostr: "Compartir en Nostr",

    share_content: "⚔️ SATOSHI DUELL ⚔️\n\n¡Aposto {amount} Sats en mi conocimiento!\n¿Aceptas la apuesta?\n\nClic aquí para luchar:\n{url}",
    share_success: "¡Enlace copiado! Envíalo a tu oponente.",

    // HALL OF FAME & BADGES (NUEVO)
    hof_title: "Salón de la Fama",
    hof_progress: "Desbloqueados",
    share_title: "Mi Salón de la Fama",
    share_text_prefix: "🏆 ¡He desbloqueado",
    share_text_suffix: "logros en SatoshiDuell! ¿Puedes superarme?",
    share_clipboard: "¡Copiado al portapapeles!",

    // Categoría: Lealtad
    badge_p1_name: "Novato", badge_p1_desc: "Jugaste 5 juegos",
    badge_p2_name: "Habitual", badge_p2_desc: "Jugaste 25 juegos",
    badge_p3_name: "Veterano", badge_p3_desc: "Jugaste 100 juegos",
    badge_p4_name: "Adicto", badge_p4_desc: "Jugaste 500 juegos",
    badge_p5_name: "Inventario", badge_p5_desc: "Jugaste 1.000 juegos",

    // Categoría: Dominio
    badge_w1_name: "Ganador", badge_w1_desc: "Ganaste 5 duelos",
    badge_w2_name: "Campeón", badge_w2_desc: "Ganaste 25 duelos",
    badge_w3_name: "Leyenda", badge_w3_desc: "Ganaste 100 duelos",
    badge_w4_name: "Emperador", badge_w4_desc: "Ganaste 500 duelos",

    // Categoría: Racha
    badge_st1_name: "Calentando", badge_st1_desc: "3 seguidos ganados",
    badge_st2_name: "En Racha", badge_st2_desc: "5 seguidos ganados",
    badge_st3_name: "Invencible", badge_st3_desc: "10 seguidos ganados",

    // Categoría: Riqueza
    badge_s1_name: "Ahorrador", badge_s1_desc: "100 sats ganados",
    badge_s2_name: "Stacker", badge_s2_desc: "1.000 sats ganados",
    badge_s3_name: "Ballena", badge_s3_desc: "10.000 sats ganados",
    badge_s4_name: "Barón", badge_s4_desc: "50.000 sats ganados",
    badge_s5_name: "Satoshi", badge_s5_desc: "100.000 sats ganados",

    // Categoría: Habilidad & Especial
    badge_sk1_name: "Francotirador", badge_sk1_desc: "5x Ronda Perfecta",
    badge_sk2_name: "Aimbot", badge_sk2_desc: "25x Ronda Perfecta",
    badge_sk3_name: "El Oráculo", badge_sk3_desc: "100x Ronda Perfecta",

    badge_sp1_name: "El Rayo", badge_sp1_desc: "Ganar en < 12s",
    badge_sp2_name: "Vel. Luz", badge_sp2_desc: "Ganar en < 8s",
    badge_sp3_name: "High Roller", badge_sp3_desc: "Apuesta 500+ Sats",
    badge_sp4_name: "Foto Finish", badge_sp4_desc: "Victoria ajustada",

    setup_title: "Crear Duelo",
    setup_target: "Desafiar a",
    setup_wager_label: "Apuesta (Sats)",
    setup_refund_info: "Duelos no aceptados se reembolsan tras 3 días.",

    pre_game_title: "¡Pago recibido!",
    pre_game_text: "Prepárate. Empieza pronto.",
    game_q: "Pregunta",
    pay_title: 'PAGAR ENTRADA',

    result_wait: "Esperando oponente...",
    result_win: "¡Ganaste!",
    result_loss: "Perdiste",
    result_draw: "Empate",
    refund_info: "Aquí tienes tu código de reembolso.",

    settings_notifications: "Notificaciones",
    settings_notifications_desc: "Nuevos desafíos",
    perm_request: "Permitir en navegador",
    settings_security: "Seguridad",
    settings_change_pin: "Cambiar PIN",
    settings_saved: "¡Guardado!",
    settings_back: "Atrás",
    donate_title: "Apóyanos",
    donate_text: "SatoshiDuell es Gratis y Open Source.",
    donate_btn: "Crear Factura",
    donate_thanks: "¡Gracias!",
    admin_title: "Admin",
    admin_stats_total: "Total Juegos",
    admin_stats_open: "Abiertos",
    admin_stats_volume: "Volumen",
    admin_search_placeholder: "Buscar...",
    admin_filter_all: "Todos",
    admin_filter_open: "Abiertos",
    admin_filter_finished: "Terminados",
    msg_challenged: "¡Te han desafiado!",
    msg_won: "¡Ganaste un duelo!",
    nostr_copied: "¡Texto copiado!",
    nostr_share_text: "¡Acabo de ganar {amount} sats en un quiz! Puntos: {score}/5 #SatoshiDuell"
  }
};