# FlameWatch

Sistema de monitoramento e análise de risco de incêndio baseado em dados meteorológicos em tempo real.

## Arquitetura Técnica

**Pipeline de Ingestão (Python)**
- Processamento automatizado de dados de 24 estações meteorológicas
- Cálculo de índices de risco baseado em múltiplas variáveis
- Integração com API do INMET
- Normalização e validação de dados meteorológicos

**Frontend (React + Vite)**
- Interface responsiva construída com Material UI
- Visualização geoespacial via Leaflet
- Gráficos de séries temporais com Recharts
- Sistema de chat integrado com Google Gemini

**Integração com IA**
- Análise contextual via Google Gemini API
- Processamento de linguagem natural para recomendações
- Sistema de chat interativo para consultas específicas

## Instalação

1. Clone o repositório
```bash
git clone [repositório]
cd flamewatch
```

2. Rode os comandos de instalação das bibliotecas
```bash
npm install
```

3. Configure as variáveis de ambietne
```
Aqui você deve criar um arquivo .env e configura-lo com a seguinte configuração:

VITE_GEMINI_API_KEY=sua_chave_da_api
```