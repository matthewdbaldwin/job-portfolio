import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { open: true, host: 'localhost' },
  resolve: { extensions: ['.js', '.jsx', '.json'], dedupe: ['react', 'react-dom'] },
});
