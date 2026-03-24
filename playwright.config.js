// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'on',
    
    /* ===== CONFIGURAÇÕES DE COOKIES ===== */
    // Salva o estado de autenticação/cookies entre testes
    storageState: 'storage-state.json',
    
    // Configurações adicionais para o navegador
    launchOptions: {
      args: [
        // Desabilita features que podem causar popups
        '--disable-features=DialMediaRouteProvider',
        '--disable-blink-features=AutomationControlled',
        // Aceita cookies por padrão (alguns sites)
        '--accept-lang=pt-BR,pt;q=0.9,en;q=0.8',
        // Desabilita notificações
        '--disable-notifications',
        // Desabilita popups de extensões
        '--disable-extensions',
        // Desabilita prompts de geolocalização
        '--disable-geolocation'
      ]
    },
    
    // Ignorar HTTPS errors (útil para alguns sites)
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: true,
        
        // Configurações específicas para Chromium
        viewport: { width: 1280, height: 720 },
        
        // Permite persistir dados do navegador
        storageState: 'storage-state.json',
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        
        // Firefox também pode salvar estado
        storageState: 'storage-state.json',
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        
        // WebKit também pode salvar estado
        storageState: 'storage-state.json',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});