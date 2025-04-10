import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

// // Explicitly use CommonJS syntax for Vite config
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import tailwindcssVite from '@tailwindcss/vite';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcssVite() // Tailwind plugin
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     }
//   }
// });


