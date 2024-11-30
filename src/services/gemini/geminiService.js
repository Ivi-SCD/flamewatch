import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI('AIzaSyCxOrg3hx55vSotjNKdcsEncM5TpvIvyoY');
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

  async generateRecommendations(riskLevel, context) {
    // Simulação de recomendações baseadas no nível de risco
    const recommendations = [
      `Com base no IRI atual de ${riskLevel} para ${context.region}, recomendamos:`,
      riskLevel >= 75 ? '- Suspensão imediata de qualquer atividade de queimada' : '',
      riskLevel >= 50 ? '- Monitoramento constante das condições climáticas' : '',
      '- Manutenção de aceiros e áreas de proteção',
      `- Temperatura atual de ${context.weatherConditions.temperature}°C indica necessidade de atenção extra`,
      `- Última chuva registrada: ${context.weatherConditions.lastRainfall}`
    ].filter(Boolean).join('\n');

    return recommendations;
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