// save-storage-state.js - Versão com CommonJS
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('🌐 Abrindo Google...');
  await page.goto('https://google.com');
  
  console.log('⚠️ Aceite os cookies manualmente quando aparecer o popup...');
  console.log('⚠️ Aguardando 10 segundos para você aceitar...');
  
  // Aguarda tempo para aceitar manualmente
  await page.waitForTimeout(10000);
  
  // Tenta aceitar automaticamente também
  try {
    const cookieButton = page.locator('#L2AGLb');
    if (await cookieButton.isVisible({ timeout: 3000 })) {
      await cookieButton.click();
      console.log('✅ Cookies aceitos automaticamente!');
    }
  } catch (e) {
    console.log('⚠️ Nenhum botão de cookie encontrado automaticamente');
  }
  
  // Aguarda mais um pouco para garantir
  await page.waitForTimeout(2000);
  
  // Salva o estado
  await context.storageState({ path: 'storage-state.json' });
  console.log('✅ Estado salvo em storage-state.json');
  
  console.log('🎉 Pronto! Agora os testes não vão mais pedir cookies!');
  
  await browser.close();
})();