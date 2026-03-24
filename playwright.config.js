// @ts-check
import { defineConfig, devices } from '@playwright/test';

// Função para criar nome de pasta com data e hora
function getTimestamp() {
  const now = new Date();
  return now.toISOString()
    .replace(/:/g, '-')
    .replace(/T/g, '_')
    .replace(/\..+/, '');
}

const timestamp = getTimestamp();
const executionDir = `./test-results/${timestamp}`;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Diretório de saída dos testes */
  
  outputDir: executionDir,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter com pasta separada (fora do test-results) */
  reporter: [
    ['html', { outputFolder: executionDir }],
    ['json', { outputFile: `${executionDir}/results.json` }],
    ['junit', { outputFile: `${executionDir}/junit.xml` }]
  ],
  
  use: {
    trace: 'on-first-retry',
    screenshot: 'on',
    storageState: 'storage-state.json',
    
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

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: true,
        viewport: { width: 1280, height: 720 },
        storageState: 'storage-state.json',
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'storage-state.json',
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'storage-state.json',
      },
    },
  ],
});