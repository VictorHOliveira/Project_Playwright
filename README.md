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
│   ├── playwright.config.cjs           # Configuração principal do Playwright
│   └── storage-state.json              # Estado de autenticação/cookies (gitignored)
├── scripts/                             # Scripts utilitários
│   └── save-storage-state.js           # Script para salvar estado de autenticação
├── tests/                               # Testes automatizados
│   └── example.spec.js                 # Teste exemplo
├── test-results/                        # Resultados dos testes (gitignored)
│   ├── 2026-03-24_19-52-15/            # Execução 1
│   └── 2026-03-24_21-12-52/            # Execução 2
├── .gitignore                           # Arquivos ignorados pelo Git
├── package.json                         # Dependências e scripts
├── package-lock.json                    # Lockfile de dependências
└── README.md                            # Documentação do projeto

## 📁 Detalhamento das Pastas

Pasta/Arquivo	Descrição
config/	Arquivos de configuração do Playwright
config/playwright.config.cjs	Configuração principal (browsers, timeouts, reporters)
config/storage-state.json	Estado salvo de cookies/autenticação
scripts/	Scripts utilitários para automação
scripts/save-storage-state.js	Script para salvar estado de autenticação
tests/	Local onde ficam todos os arquivos de teste
test-results/	Resultados organizados por data/hora de execução

## 🛠️ Comandos Disponíveis

Comando	Descrição
npm test	Executa todos os testes em modo headless (sem interface gráfica)
npm run test:headed	Executa testes com interface gráfica do navegador
npm run test:debug	Executa testes em modo debug com inspector
npm run report	Abre o relatório HTML da última execução
npm run save-auth	Salva o estado de autenticação (cookies) para reutilização
npm run clean	Remove todos os resultados de testes antigos

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

Arquivo	Descrição
index.html	Relatório HTML interativo com todos os resultados
results.json	Resultados em formato JSON (para integração com outras ferramentas)
junit.xml	Resultados em formato JUnit (compatível com CI/CD)
trace.zip	Arquivos de trace para depuração detalhada
screenshot-*.png	Capturas de tela de testes que falharam
video.webm	Gravações dos testes (quando configurado)

1. Abrir relatório:
```bash
npm run report
```

2. Visualizar trace específico:
```bash
npx playwright show-trace test-results/2026-03-24_21-12-51/trace.zip
```

## 🎯 Escrevendo Testes

