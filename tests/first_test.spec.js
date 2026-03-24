const {test, expect} = require('@playwright/test')

test('Buscar no Google', async ({ page }) =>{
    await page.goto('https://google.com');
    await page.fill('textarea[name=q]', 'Playwright Automação');
    await page.keyboard.press('Enter');
    await page.locator('xpath=//div[2]/div/div/div/div[1]/div/div/span/a/div/div/div/div[1]/span');
    console.log('Teste Concluido com Sucesso!')
})