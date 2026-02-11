import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-nojekyll-and-404',
      closeBundle() {
        const docsDir = path.resolve(__dirname, 'docs')
        
        // Copy .nojekyll file
        const nojekyllPath = path.join(docsDir, '.nojekyll')
        if (!fs.existsSync(nojekyllPath)) {
          fs.writeFileSync(nojekyllPath, '')
        }
        
        // Copy 404.html file
        const source404 = path.resolve(__dirname, 'demo', '404.html')
        const dest404 = path.join(docsDir, '404.html')
        if (fs.existsSync(source404)) {
          fs.copyFileSync(source404, dest404)
        }
      }
    }
  ],
  root: path.resolve(__dirname, 'demo'),
  base: '/componentLibary/',
  build: {
    outDir: path.resolve(__dirname, 'docs'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, ''),
    },
  },
})
