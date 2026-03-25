# 🎭 Playwright Automação de Testes

Projeto de automação de testes end-to-end utilizando **Playwright** com JavaScript. Estruturado para facilitar manutenção, execução e análise de resultados.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/project-playwright.git
cd project-playwright
```

2. Instale as Dependências:
```bash
npm install
```

3. Instale os Navegadores do Playwright
```bash
npx playwright install
```

4. Configure o estado de autenticação
OPCIONAL: Evita popups de cookies no chromium/chrome
```bash
npm run save-auth
```

## 📁 Estrutura do Projeto
PROJECT_PLAYWRIGHT/
├── config/                              # Configurações do projeto
│   ├── playwright.config.cjs            # Configuração principal do Playwright
│   └── storage-state.json               # Estado de autenticação/cookies (gitignored)
├── scripts/                             # Scripts utilitários
│   └── save-storage-state.js            # Script para salvar estado de autenticação
├── tests/                               # Testes automatizados
│   └── example.spec.js                  # Teste exemplo
├── test-results/                        # Resultados dos testes (gitignored)
│   ├── 2026-03-24_19-52-15/             # Execução 1
│   └── 2026-03-24_21-12-52/             # Execução 2
├── .gitignore                           # Arquivos ignorados pelo Git
├── package.json                         # Dependências e scripts
├── package-lock.json                    # Lockfile de dependências
└── README.md                            # Documentação do projeto

## 📁 Detalhamento das Pastas

Pasta/Arquivo	                Descrição
config/	                        Arquivos de configuração do Playwright
config/playwright.config.cjs	Configuração principal (browsers, timeouts, reporters)
config/storage-state.json	    Estado salvo de cookies/autenticação
scripts/	                    Scripts utilitários para automação
scripts/save-storage-state.js	Script para salvar estado de autenticação
tests/	                        Local onde ficam todos os arquivos de teste
test-results/	                Resultados organizados por data/hora de execução

## 🛠️ Comandos Disponíveis

Comando	                Descrição
npm test	            Executa todos os testes em modo headless (sem interface gráfica)
npm run test:headed	    Executa testes com interface gráfica do navegador
npm run test:debug	    Executa testes em modo debug com inspector
npm run report	        Abre o relatório HTML da última execução
npm run save-auth	    Salva o estado de autenticação (cookies) para reutilização
npm run clean	        Remove todos os resultados de testes antigos

## 🧪 Executando Testes

1. Executar todos os testes:
```bash
npm test
```

2. Executar um teste específico:
```bash
npx playwright test tests/example.spec.js --config=config/playwright.config.cjs
```

3. Executar com interface gráfica:
```bash
npm run test:headed
```

4. Executar em modo debug:
```bash
npm run test:debug
```

5. Listar todos os testes disponíveis:
```bash
npx playwright test --config=config/playwright.config.cjs --list
```

## 📊 Relatórios e Resultados

Arquivo	            Descrição
index.html	        Relatório HTML interativo com todos os resultados
results.json	    Resultados em formato JSON (para integração com outras ferramentas)
junit.xml	        Resultados em formato JUnit (compatível com CI/CD)
trace.zip	        Arquivos de trace para depuração detalhada
screenshot-*.png	Capturas de tela de testes que falharam
video.webm	        Gravações dos testes (quando configurado)

1. Abrir relatório:
```bash
npm run report
```

2. Visualizar trace específico:
```bash
npx playwright show-trace test-results/2026-03-24_21-12-51/trace.zip
```

## 🎯 Escrevendo Testes

1. Exemplo básico:
```bash
    const { test, expect } = require('@playwright/test');

    test('Título da página deve estar correto', async ({ page }) => {
    // Navegar para a página
    await page.goto('https://example.com');
    
    // Verificar o título
    await expect(page).toHaveTitle('Example Domain');
    
    // Verificar se o texto está visível
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
    });

    test('Deve preencher formulário e enviar', async ({ page }) => {
    await page.goto('https://example.com/form');
    
    // Preencher campos
    await page.fill('#nome', 'Usuário Teste');
    await page.fill('#email', 'teste@email.com');
    await page.selectOption('#pais', 'Brasil');
    await page.check('#aceito-termos');
    
    // Submeter formulário
    await page.click('button[type="submit"]');
    
    // Validar mensagem de sucesso
    const mensagemSucesso = page.locator('.success-message');
    await expect(mensagemSucesso).toBeVisible();
    await expect(mensagemSucesso).toContainText('Formulário enviado com sucesso!');
    });
```

2. Exemplo com Page Object:
```bash
    // tests/pages/LoginPage.js
    class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByLabel('E-mail');
        this.passwordInput = page.getByLabel('Senha');
        this.submitButton = page.getByRole('button', { name: 'Entrar' });
    }

    async goto() {
        await this.page.goto('https://exemplo.com/login');
    }

    async login(email, senha) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(senha);
        await this.submitButton.click();
    }
    }

    module.exports = { LoginPage };
```

## 🔧 Configuração Detalhada

O arquivo config/playwright.config.cjs contém:
```bash
    module.exports = defineConfig({
    testDir: './tests',                    // Diretório dos testes
    outputDir: './test-results/[timestamp]', // Resultados com timestamp
    fullyParallel: true,                   // Execução paralela
    retries: 0,                            // Retentativas em caso de falha
    reporter: [                            // Múltiplos formatos de relatório
        ['html'],                            // Relatório HTML
        ['json'],                            // Relatório JSON
        ['junit']                            // Relatório JUnit
    ],
    use: {
        trace: 'on-first-retry',             // Trace na primeira retentativa
        screenshot: 'on',                    // Screenshot sempre
        storageState: './config/storage-state.json', // Estado persistido
        ignoreHTTPSErrors: true,             // Ignora erros SSL
    },
    projects: [                            // Múltiplos navegadores
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } }
    ]
    });
```

## 🐛 Debugging

1. Modo Debug com Inspector:
```bash
npm run test:debug
```

2. Visualizar logs detalhados:
```bash
DEBUG=pw:api npx playwright test --config=config/playwright.config.cjs
```

3. Gerar código automaticamente (codegen):
```bash
npx playwright codegen https://exemplo.com
```

## 🔄 Fluxo de Trabalho Recomendado

1. Salvar estado de autenticação (uma vez):
```bash
npm run save-auth
```
2. Escrever novo teste na pasta tests/
3. Executar testes:
```bash
npm test
```
4. Visualizar resultados:
```bash
npm run report
```
5. Limpar resultados antigos (quando necessário):
```bash
npm run clean
```

## 📦 Dependências Principais
Pacote	            Versão	    Descrição
@playwright/test	^1.40.0	    Framework de automação de testes
playwright	        ^1.40.0	    Navegadores automatizados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (git checkout -b feature/nova-feature)
3. Commit suas alterações (git commit -m 'feat: adiciona nova feature')
4. Push para a branch (git push origin feature/nova-feature)
5. Abra um Pull Request

OBS: Podemos usar aplicações como, GitHub Desktop e extesões do VSCode para fazer o versionamento de código.

## 🎯 Padrões de Commit:

feat: Nova funcionalidade
fix: Correção de bug
test: Adição ou correção de testes
docs: Documentação
chore: Manutenção/configuração
refactor: Refatoração de código

## 🔗 Links Úteis

1. Documentação Oficial do Playwright       https://playwright.dev/
2. API Reference                            https://playwright.dev/docs/api/class-playwright
3. Seletores no Playwright                  https://playwright.dev/docs/locators
4. Boas Práticas                            https://playwright.dev/docs/best-practices