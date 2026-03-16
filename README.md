# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


link do deploy: https://bingo-driven-frontend-cyan.vercel.app/

# Bingo Driven - Front-end

Interface web para o sistema de sorteio e conferência de cartelas do **Bingo Driven**. Desenvolvida com React e Vite, a aplicação é rápida, responsiva e integrada à API do back-end.

## Deploy

| Serviço | URL |
|---------|-----|
| Front-end (Vercel) | https://bingo-driven-frontend-cyan.vercel.app |
| Back-end (Render) | *adicionar link do deploy do back-end* |

## Tecnologias

- **React 18** com Vite
- **React Router DOM** para navegação SPA
- **Axios** para comunicação com a API
- **Nginx** para servir a build em produção
- **Docker** com multi-stage build
- **GitHub Actions** para CI/CD

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20.x (para desenvolvimento local)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para rodar via container)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_BACKEND` | URL base da API do back-end | `http://localhost:5000` |

## Como rodar o projeto

### Desenvolvimento local (sem Docker)

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Com Docker Compose (recomendado)

A forma mais simples de subir o projeto em container. O Compose já cuida do build e da configuração do Nginx.

1. Configure a variável de ambiente no `.env`:

```bash
VITE_BACKEND=http://localhost:5000
```

2. Suba o serviço:

```bash
docker compose up --build
```

3. Acesse `http://localhost:80`.

Para rodar em background:

```bash
docker compose up --build -d
```

Para parar:

```bash
docker compose down
```

### Com Docker (sem Compose)

Se preferir controlar o container manualmente:

1. Construa a imagem passando a URL do back-end como build arg:

```bash
docker build --build-arg VITE_BACKEND=http://localhost:5000 -t bingo-frontend .
```

2. Execute o container:

```bash
docker run -p 80:80 bingo-frontend
```

3. Acesse `http://localhost:80`.

## Scripts disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm run dev` | `vite` | Inicia o servidor de desenvolvimento |
| `npm run build` | `vite build` | Gera a build de produção |
| `npm run preview` | `vite preview` | Pré-visualiza a build localmente |
| `npm run lint` | `eslint .` | Executa o linter |
| `npm run docker:up` | `docker compose up -d` | Sobe o container em background |
| `npm run docker:build` | `docker compose up --build` | Reconstrói e sobe o container |
| `npm run docker:down` | `docker compose down` | Para o container |
| `npm run docker:logs` | `docker compose logs -f` | Acompanha os logs do container |
| `npm run docker:clean` | `docker compose down -v && docker system prune -f` | Remove containers, volumes e cache |

## Docker

A imagem utiliza **multi-stage build** para manter o tamanho reduzido:

1. **Estágio de build** (`node:20-slim`): instala dependências e gera a build de produção com Vite.
2. **Estágio de produção** (`nginx:stable-alpine`): copia apenas os arquivos estáticos para o Nginx, resultando em uma imagem leve (~40 MB).

## CI/CD

O pipeline está configurado em `.github/workflows/pipeline.yml` utilizando **GitHub Actions**.

### Fluxo

```
push/PR para main ou develop
        │
        ▼
  ┌───────────┐
  │  CD: Push  │──► Build da imagem Docker
  │  to main   │──► Push para o Docker Hub
  └───────────┘
        │
        ▼
  Deploy automático via Vercel (integração nativa com o repositório)
```

### Secrets necessários no GitHub

| Secret | Descrição |
|--------|-----------|
| `DOCKERHUB_USERNAME` | Usuário do Docker Hub |
| `DOCKERHUB_TOKEN` | Token de acesso do Docker Hub |
| `VITE_BACKEND` | URL da API em produção |

## Estrutura do projeto

```
bingo-driven-frontend/
├── .github/workflows/   # Pipeline CI/CD
├── nginx/               # Configuração do Nginx
├── src/
│   ├── components/      # Componentes React (Home, Game)
│   ├── styles/          # Estilos CSS
│   ├── App.jsx          # Componente raiz com rotas
│   └── main.jsx         # Ponto de entrada da aplicação
├── .env.example         # Template de variáveis de ambiente
├── docker-compose.yml   # Orquestração dos containers
├── Dockerfile           # Build multi-stage da imagem
├── package.json         # Dependências e scripts
└── vite.config.js       # Configuração do Vite
```

## Repositórios relacionados

| Projeto | Repositório |
|---------|-------------|
| Front-end | *este repositório* |
| Back-end | *adicionar link do repositório do back-end* |
