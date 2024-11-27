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
        'blog': 'pages/blog.html',
        'faq': 'pages/faq.html',
        'privacidad': 'pages/privacidad.html',
        'terminos': 'pages/terminos.html',
        'llaves': 'pages/llaves.html',
        'carcasas': 'pages/carcasas.html',
        'accesorios': 'pages/accesorios.html',
        'admin': 'pages/admin/kioskeys-admin-x7k9y2.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: true,
    middleware: [
      (req, res, next) => {
        // Remover .html de las URLs
        if (req.url.endsWith('.html')) {
          req.url = req.url.slice(0, -5)
        }
        
        // Redirigir /admin a la página de administración
        if (req.url === '/admin') {
          req.url = '/pages/admin/kioskeys-admin-x7k9y2'
        }
        next()
      }
    ]
  }
})