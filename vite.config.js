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
    extensions: ['.js', '.jsx'],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    // 소스맵 생성 활성화
    sourcemap: true,
    // 빌드 시 상세 로그 출력
    minify: 'esbuild',
    // 청크 크기 경고 임계값 설정
    chunkSizeWarningLimit: 1000,
  },
  // 개발 서버 설정
  server: {
    fs: {
      // 프로젝트 root 외부의 파일 접근 허용
      strict: false,
      allow: ['..'],
    },
  },
});
