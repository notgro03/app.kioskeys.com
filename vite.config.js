import { defineConfig } from 'vite'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'como-funciona': resolve(__dirname, 'pages/como-funciona.html'),
        'red-servicios': resolve(__dirname, 'pages/red-servicios.html'),
        'planes': resolve(__dirname, 'pages/planes.html'),
        'productos': resolve(__dirname, 'pages/productos.html'),
        'contacto': resolve(__dirname, 'pages/contacto.html'),
        'tutoriales': resolve(__dirname, 'pages/tutoriales.html'),
        'telemandos': resolve(__dirname, 'pages/telemandos.html'),
        'blog': resolve(__dirname, 'pages/blog.html'),
        'faq': resolve(__dirname, 'pages/faq.html'),
        'privacidad': resolve(__dirname, 'pages/privacidad.html'),
        'terminos': resolve(__dirname, 'pages/terminos.html'),
        'llaves': resolve(__dirname, 'pages/llaves.html'),
        'carcasas': resolve(__dirname, 'pages/carcasas.html'),
        'accesorios': resolve(__dirname, 'pages/accesorios.html'),
        'admin': resolve(__dirname, 'pages/admin/index.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@admin': resolve(__dirname, './src/admin')
    }
  }
})