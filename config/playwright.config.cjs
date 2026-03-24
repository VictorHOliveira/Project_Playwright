// config/playwright.config.js
// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Função para criar timestamp
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

const timestamp = getTimestamp();
const reportsDir = path.join(__dirname, '..', 'test-results', timestamp);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: path.join(__dirname, '..', 'tests'),
  outputDir: reportsDir,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: reportsDir }],
    ['json', { outputFile: path.join(reportsDir, 'results.json') }],
    ['junit', { outputFile: path.join(reportsDir, 'junit.xml') }]
  ],
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    screenshot: 'on',
    
    /* ===== CONFIGURAÇÕES DE COOKIES ===== */
    storageState: path.join(__dirname, '..', 'config', 'storage-state.json'),
    
    launchOptions: {
      args: [
        '--disable-features=DialMediaRouteProvider',
        '--disable-blink-features=AutomationControlled',
        '--accept-lang=pt-BR,pt;q=0.9,en;q=0.8',
        '--disable-notifications',
        '--disable-extensions',
        '--disable-geolocation'
      ]
    },
    
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: true,
        viewport: { width: 1280, height: 720 },
        storageState: path.join(__dirname, '..', 'config', 'storage-state.json'),
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: path.join(__dirname, '..', 'config', 'storage-state.json'),
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: path.join(__dirname, '..', 'config', 'storage-state.json'),
      },
    },
  ],
});