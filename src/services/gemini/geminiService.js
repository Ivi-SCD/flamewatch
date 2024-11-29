import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeFireRisk(weatherData, regionData) {
    try {
      const prompt = `
        Analise os seguintes dados meteorológicos e forneça uma avaliação detalhada do risco de incêndio:
        Temperatura: ${weatherData.temperature}°C
        Umidade: ${weatherData.humidity}%
        Precipitação: ${weatherData.precipitation}mm
        Região: ${regionData.name}
        
        Considere fatores históricos e sazonais para esta região.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro na análise do Gemini:', error);
      throw error;
    }
  }

  async generateRecommendations(riskLevel, userProfile) {
    try {
      const prompt = `
        Com base no nível de risco de incêndio de ${riskLevel}/100 e 
        considerando que o usuário é um ${userProfile.type}, 
        forneça recomendações específicas para prevenção de incêndios.
      `;

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
        Analise as seguintes tendências históricas de incêndio e identifique padrões:
        ${JSON.stringify(historicalData)}
        
        Forneça insights sobre:
        1. Padrões sazonais
        2. Áreas de alto risco recorrente
        3. Fatores contribuintes principais
      `;

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