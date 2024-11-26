import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        'como-funciona': 'pages/como-funciona.html',
        'red-servicios': 'pages/red-servicios.html',
        'planes': 'pages/planes.html',
        'productos': 'pages/productos.html',
        'contacto': 'pages/contacto.html',
        'tutoriales': 'pages/tutoriales.html',
        'telemandos': 'pages/telemandos.html',
        'llaves': 'pages/llaves.html',
        'carcasas': 'pages/carcasas.html',
        'accesorios': 'pages/accesorios.html',
        'blog': 'pages/blog.html',
        'faq': 'pages/faq.html',
        'privacidad': 'pages/privacidad.html',
        'terminos': 'pages/terminos.html'
      }
    }
  },
  base: '',
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [{
    name: 'rewrite-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.endsWith('.html')) {
          req.url = req.url.slice(0, -5)
        }
        next()
      })
    }
  }]
})