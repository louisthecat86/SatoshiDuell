import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Sorgt dafür, dass Updates sofort geladen werden
      includeAssets: ['logo.png'], // Diese Dateien werden gecached
      manifest: {
        name: 'Satoshi Duell',
        short_name: 'SatoshiDuell',
        description: 'Das Bitcoin Lightning Quiz',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone', // WICHTIG: Entfernt die Adressleiste
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'logo.png', // Pfad zu deinem Logo im public Ordner
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'logo.png', // Idealerweise hast du auch eine 512x512 Version
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // Dev-Optionen, damit du PWA auch lokal testen kannst (optional)
      devOptions: {
        enabled: true
      }
    })
  ]
})