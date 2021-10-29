import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const ASSET_URL = 'idle-heroes-star-count';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: `${ASSET_URL}/dist/`,
  server: {
    port: 4000,
  },
});
