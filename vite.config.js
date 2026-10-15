import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // The SSR bundle is only used to prerender HTML; its assets are discarded.
    !isSsrBuild && ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
  ssr: {
    // CommonJS package whose named exports Node's ESM loader can't detect.
    noExternal: ['react-helmet-async'],
  },
  build: {
    // Lets scripts/prerender.mjs link each page's CSS chunk in its HTML.
    manifest: !isSsrBuild,
  },
}))
