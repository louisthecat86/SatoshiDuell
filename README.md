<img width="1024" height="1024" alt="logo" src="https://github.com/user-attachments/assets/2a9be3c0-9787-4c57-a6ba-60f1d014de2a" />

⚡ SatoshiDuell

Play. Learn. Earn Sats.

SatoshiDuell is a Bitcoin Lightning-powered trivia game. Challenge friends or random opponents to a quiz duel. The catch? Skin in the game. Both players wager an amount of Satoshis. The winner takes it all (minus network fees).
"Open Source Everything"

🌟 Features ⚡ Lightning Native: Seamless deposits and withdrawals using LNbits integration.
⚔️ PvP Duels:
Public Lobby: Post an open challenge for anyone to accept.
Direct Challenges: Challenge a specific player via their gamertag.

🛡️ Fair Play & Security:
Questions are loaded from the backend (serverless) to prevent client-side cheating.
Refund System: If a challenge isn't accepted within 3 days, the creator can reclaim their sats.

🔑 Nostr Integration: Login via NIP-07 (Alby, nos2x) and share duel results directly to Nostr.

🌍 Multilingual: Fully localized in English, German, and Spanish.

📱 Responsive: Mobile-first design for playing on the go.

🛠️ Tech Stack Frontend: React, Vite, Tailwind CSS

Backend / Serverless: Vercel Serverless Functions (/api folder)
Database: Supabase (PostgreSQL + Realtime)
Payments: LNbits API
Identity: Nostr Tools

🚀 Getting Started Prerequisites

Node.js & npm

A Supabase project

An LNbits instance (or account)

A Vercel account (for hosting & serverless functions)

Clone the Repo
Bash git clone https://github.com/louisthecat86/SatoshiDuell.git cd SatoshiDuell npm install 2. Environment Variables

Create a .env file in the root directory (for local development) and configure these variables in your Vercel Project Settings:

Code-Snippet

Frontend (Vite)

VITE_SUPABASE_URL=your_supabase_url VITE_SUPABASE_KEY=your_supabase_anon_key VITE_LNBITS_URL=https://legend.lnbits.com (or your instance) VITE_INVOICE_KEY=your_lnbits_invoice_key_for_deposits

Backend (Vercel Serverless Functions)

These are NOT prefixed with VITE_ and remain hidden from the browser

LNBITS_ADMIN_KEY=your_lnbits_admin_key_for_withdrawals DONATION_LN_ADDRESS=mw860602@blink.sv 3. Database Setup (Supabase)

Go to your Supabase SQL Editor and run the following queries to set up the tables:

Click to view SQL Schema
Run Locally
Bash npm run dev Note: The API functions (Refund, Donate, Load Questions) run via Vercel Serverless. To test them locally, you need vercel dev instead of npm run dev, or you deploy to Vercel.

🎮 How to Play Login: Choose a Gamertag (PIN secured) or use your Nostr Extension.
Deposit: Select "New Duel", choose an amount (e.g., 500 Sats), and pay the invoice.
Quiz: Answer 5 Bitcoin-related questions as fast as possible.
Wait:
Public: Wait for anyone in the lobby to play against you.
Private: Send the challenge to a friend.
Win: If you have more correct answers (or were faster), a QR code appears to withdraw the total pot!
Refund: If nobody plays against you within 3 days, a "Refund" button appears in your history to reclaim your funds.

🤝 Contributing Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request


⚠️ Disclaimer SatoshiDuell involves real money (Bitcoin/Satoshis). This software is provided "as is", without warranty of any kind. The developer is not responsible for any lost funds due to software bugs, network errors, or user mistakes. Use at your own risk and only play with what you can afford to lose.
❤️ Support the Dev If you enjoy this project and want to support the development:
Lightning Address: mw860602@blink.sv
Or use the Donate button inside the app!

Built with 🧡 and ⚡ by LouisTheCat86
