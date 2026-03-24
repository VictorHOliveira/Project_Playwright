// scripts/save-storage-state.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Caminho para salvar o estado
const configDir = path.join(__dirname, '..', 'config');
const storagePath = path.join(configDir, 'storage-state.json');

// Garantir que a pasta config existe
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('🌐 Abrindo Google...');
  await page.goto('https://google.com');
  
  console.log('⚠️ Aceite os cookies manualmente se aparecer o popup...');
  console.log('⚠️ Aguardando 10 segundos para você aceitar...');
  
  await page.waitForTimeout(10000);
  
  // Tenta aceitar automaticamente
  try {
    const cookieButton = page.locator('#L2AGLb');
    if (await cookieButton.isVisible({ timeout: 3000 })) {
      await cookieButton.click();
      console.log('✅ Cookies aceitos automaticamente!');
    }
  } catch (e) {
    console.log('⚠️ Nenhum botão de cookie encontrado automaticamente');
  }
  
  await page.waitForTimeout(2000);
  
  // Salva o estado
  await context.storageState({ path: storagePath });
  console.log(`✅ Estado salvo em ${storagePath}`);
  
  console.log('🎉 Pronto! Agora os testes não vão mais pedir cookies!');
  
  await browser.close();
})();