import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';  // path 모듈 import

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // @는 src 폴더를 참조하도록 설정
    },
  },
});
