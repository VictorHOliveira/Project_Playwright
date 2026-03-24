// save-storage-state.js - Versão com CommonJS
const { chromium } = require('playwright');

// Feito com IA para fazer o accept de cookies ao abrir o 'https://google.com' de forma automatica para o chromium.
// Executar o comando "node save-storage-state.js" para salvar os cookies.
// Pode ser trabalhado neste script para aceitar de outras páginas também.
(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('🌐 Abrindo Google...');
  await page.goto('https://google.com');
  
  // O browser é aberto neste ponto para que você possa fazer o aceite de forma manual, 
  // mas só será necessário quando o próximo passo, que é o aceite automatico não funcionar.
  console.log('⚠️ Aceite os cookies manualmente quando aparecer o popup...');
  console.log('⚠️ Aguardando 10 segundos para você aceitar...');
  
  // Aguarda tempo para aceitar manualmente
  await page.waitForTimeout(15000);
  
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