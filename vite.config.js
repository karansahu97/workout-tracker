import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/supabase-api': {
                target: 'https://dactaumlwvhctogkejul.supabase.co',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/supabase-api/, '')
            }
        }
    }
})
