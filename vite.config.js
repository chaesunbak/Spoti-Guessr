import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 파일 확장자 해결을 위해 추가
  },
  build: {
    rollupOptions: {
      // 빌드 시 파일 경로 해결을 위한 설정
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
