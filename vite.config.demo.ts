import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        const docsDir = path.resolve(__dirname, 'docs')
        const nojekyllPath = path.join(docsDir, '.nojekyll')
        if (!fs.existsSync(nojekyllPath)) {
          fs.writeFileSync(nojekyllPath, '')
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
