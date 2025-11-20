import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: { 
      reporter: ['lcov','text'], 
      reportsDirectory: 'coverage',
      exclude: [
        'src/setupTests.ts',
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.config.{ts,js}',
        '**/node_modules/**'
      ]
    }
  }
})
