import Papa from 'papaparse';

export class WeatherService {
  static async getStationSummaries() {
    try {
      // Fetch the CSV file from the public directory
      const response = await fetch('/consolidated_weather_data.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch CSV data');
      }
      
      const csvText = await response.text();
      
      // Parse CSV data
      const { data } = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true // Automatically converts numbers
      });

      // Get the most recent data for each station
      const stationMap = new Map();
      
      data.forEach(record => {
        const station = record.estacao?.replace(';', '').trim();
        if (!station) return;
        
        const existingRecord = stationMap.get(station);
        if (!existingRecord || new Date(record.Data) > new Date(existingRecord.Data)) {
          stationMap.set(station, record);
        }
      });

      // Convert to array format
      return Array.from(stationMap.values());
      
    } catch (error) {
      console.error('Error loading CSV data:', error);
      // Fallback to mock data if CSV loading fails
      return [
        {
          estacao: "GOIANIA",
          temperatura: 32,
          umidade: 45,
          velocidade_vento: 12,
          precipitacao: 0
        }
      ];
    }
  }

  static async getWeatherData() {
    try {
      const response = await fetch('/consolidated_weather_data.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch CSV data');
      }
      
      const csvText = await response.text();
      
      const { data } = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Filter for today's data or get the most recent date's data
      let dateToUse = today;
      if (!data.some(record => record.Data === today)) {
        const dates = [...new Set(data.map(record => record.Data))];
        dateToUse = dates.sort().pop(); // Get the most recent date
      }

      // Filter and format the data
      const filteredData = data
        .filter(record => record.Data === dateToUse)
        .map((record, index) => ({
          estacao: record.estacao?.replace(';', '').trim(),
          hora: Math.floor(index % 24),
          temperatura: record.temperatura || 0,
          umidade: record.umidade || 0,
          velocidade_vento: record.velocidade_vento || 0,
          precipitacao: record.precipitacao || 0,
          radiacao: record.radiacao || 0,
          iri: record.iri || this.calculateIRI(record)
        }));

      return filteredData;
      
    } catch (error) {
      console.error('Error loading time series data:', error);
      // Fallback to mock data
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

  // Helper method to calculate IRI if not present in data
  static calculateIRI(record) {
    const temp = record.temperatura || 0;
    const humidity = record.umidade || 0;
    const wind = record.velocidade_vento || 0;

    // Simplified IRI calculation
    const tempFactor = temp / 40;
    const humidityFactor = 1 - (humidity / 100);
    const windFactor = wind / 20;

    return Math.round((tempFactor * 0.4 + humidityFactor * 0.4 + windFactor * 0.2) * 100);
  }
}