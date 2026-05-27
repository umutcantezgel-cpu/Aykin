import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['src/**/__tests__/*.test.{ts,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70
      },
      include: [
        'src/store/useStore.ts',
        'src/store/useAchievements.ts',
        'src/hooks/useMenu.ts',
        'src/lib/date-utils.ts',
        'src/components/atoms/icons/category-icons.ts',
        'src/components/atoms/Logo.tsx',
        'src/components/atoms/ScallopBadge.tsx',
        'src/components/atoms/buttons/PrimaryCTA.tsx',
      ],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.next/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types/**',
        'vitest.setup.ts'
      ]
    }
  }
});
