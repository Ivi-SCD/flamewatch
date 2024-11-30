import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateContent(userMessage, context) {
    try {
      const prompt = `

      Dada a seguinte pergunta: ${userMessage}

      Condições atuais em ${context.region}:
      - Temperatura: ${context.temperature}°C
      - Umidade: ${context.humidity}%
      - Índice de Risco de Incêndio: ${context.riskLevel}/100

      Forneça orientações específicas considerando:
      1. Condições meteorológicas atuais
      2. Nível de risco de incêndio
      3. Implicações para atividades agrícolas
      4. Recomendações de segurança

      Instruções:
      - Não repita a pergunta
      - Remova todas os asterísticos e caractéres especiais.
      - Formate o texto apenas com caracteres de escape para manter espaçamento
      - MANTENHA O TEXTO CONCISO SEM CARACTERES ESPECIAIS TIPO ASTERITSTICOS`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro ao gerar resposta do chat:', error);
      return 'Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente em alguns momentos.';
    }
  }

  async analyzeFireRisk(weatherData, regionData) {
    try {
      const prompt = `
        Por favor, realize uma análise detalhada do risco de incêndio com base nos seguintes dados meteorológicos:
        
        Dados Atuais:
        - Temperatura: ${weatherData.temperature}°C
        - Umidade: ${weatherData.humidity}%
        - Precipitação: ${weatherData.precipitation}mm
        - Região: ${regionData.name}
        
        Forneça:
        1. Avaliação completa do risco atual
        2. Análise considerando histórico da região
        3. Fatores sazonais relevantes
        4. Recomendações específicas de prevenção
        
        Mantenha o foco em informações práticas e relevantes para o contexto local.
        - MANTENHA O TEXTO CONCISO SEM CARACTERES ESPECIAIS TIPO ASTERITSTICOS
        `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro na análise do risco de incêndio:', error);
      throw error;
    }
  }

  async generateRecommendations(riskLevel, context) {
    try {
      const prompt = `Com base nas seguintes condições em ${context.region}:

      Dados Atuais:
      - Índice de Risco de Incêndio: ${riskLevel}/100
      - Temperatura: ${context.weatherConditions.temperature}°C
      - Umidade: ${context.weatherConditions.humidity}%
      - Última Precipitação: ${context.weatherConditions.lastRainfall}

      Elabore recomendações específicas para agricultores familiares, abordando:
      1. Medidas preventivas contra incêndios
      2. Práticas agrícolas recomendadas para as condições atuais
      3. Protocolos de segurança necessários
      4. Orientações para monitoramento das condições climáticas

      Forneça informações práticas e direcionadas, considerando o contexto local e as necessidades específicas de agricultores familiares.
      
      - MANTENHA O TEXTO CONCISO SEM CARACTERES ESPECIAIS TIPO ASTERITSTICOS`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro ao gerar recomendações:', error);
      throw error;
    }
  }

  async analyzeTrends(historicalData) {
    try {
      const prompt = `
        Realize uma análise aprofundada das seguintes tendências históricas de incêndio:
        ${JSON.stringify(historicalData)}
        
        Desenvolva insights específicos sobre:
        1. Padrões sazonais identificados
        2. Regiões com recorrência de alto risco
        3. Principais fatores contribuintes
        4. Tendências de longo prazo
        
        Apresente uma análise que auxilie no planejamento preventivo e na tomada de decisões estratégicas.
        
        - MANTENHA O TEXTO CONCISO SEM CARACTERES ESPECIAIS TIPO ASTERITSTICOS`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro na análise de tendências:', error);
      throw error;
    }
  }
}

export default new GeminiService();