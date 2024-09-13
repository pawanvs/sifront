import path from 'path';
import fs from 'fs';  // Add this import for HTTPS certificate files
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Set proxy URL based on environment variable
  const proxy_url =
    process.env.VITE_DEV_REMOTE === 'remote'
      ? process.env.VITE_BACKEND_SERVER
      : 'https://si.nividhi.com:5000/';

  // Vite configuration
  const config = {
    plugins: [react()],
    resolve: {
      base: '/',
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      https: {
        key: fs.readFileSync('niv/privkey1.pem'),   // Private key
        cert: fs.readFileSync('niv/fullchain1.pem'), // Full chain certificate
        ca: fs.readFileSync('niv/chain1.pem'),      // Certificate authority chain (optional)
      },
      host: '0.0.0.0',  // Listen on all interfaces
      port: 4000,       // Port number
      proxy: {
        '/api': {
          target: proxy_url,      // Proxy backend API
          changeOrigin: true,
          secure: false,          // Set to true if backend uses HTTPS
        },
      },
    },
  };

  // Return the final config
  return defineConfig(config);
};