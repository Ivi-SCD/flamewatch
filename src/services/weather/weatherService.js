// services/weather/weatherService.js
export class WeatherService {
  static async getStationSummaries() {
    // Dados mockados para teste
    return [
      {
        estacao: "GOIANIA",
        temperatura: 32,
        umidade: 45,
        velocidade_vento: 12,
        precipitacao: 0
      },
      {
        estacao: "ANAPOLIS",
        temperatura: 30,
        umidade: 50,
        velocidade_vento: 8,
        precipitacao: 0
      }
    ];
  }

  static async getWeatherData() {
    // Dados mockados para série temporal
    return Array.from({ length: 24 }, (_, i) => ({
      estacao: "GOIANIA",
      hora: i,
      temperatura: 25 + Math.random() * 10,
      umidade: 40 + Math.random() * 20,
      velocidade_vento: 5 + Math.random() * 10,
      iri: 50 + Math.random() * 30
    }));
  }
}