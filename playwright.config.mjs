import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'competition.spec.mjs', timeout: 180000, workers: 1,
  use: { channel: 'msedge', headless: true, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, trace: 'retain-on-failure' },
  reporter: 'list',
});
