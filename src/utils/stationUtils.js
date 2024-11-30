// utils/stationUtils.js
export const STATION_COORDINATES = {
    'GOIANIA': { lat: -16.64277777, lng: -49.22027777 },
    'PORANGATU': { lat: -13.30944444, lng: -49.11749999 },
    'SAO SIMAO': { lat: -18.96916666, lng: -50.63333333 },
    'LUZIANIA': { lat: -16.26055555, lng: -47.96694443 },
    'ARAGARCAS': { lat: -15.90277777, lng: -52.24527777 },
    'GOIAS': { lat: -15.93972221, lng: -50.14138888 },
    'ITAPACI': { lat: -14.97972221, lng: -49.53944444 },
    'JATAI': { lat: -17.9236111, lng: -51.71749999 },
    'POSSE': { lat: -14.08916666, lng: -46.36638888 },
    'GOIANESIA': { lat: -15.22027777, lng: -48.98999999 },
    'CAIAPONIA': { lat: -16.96694443, lng: -51.81749999 },
    'ALTO PARAISO DE GOIAS': { lat: -14.13305554, lng: -47.52333332 },
    'RIO VERDE': { lat: -17.78527777, lng: -50.965 },
    'MINEIROS': { lat: -17.45472222, lng: -52.60111111 },
    'PARAUNA': { lat: -16.9625, lng: -50.42555554 },
    'IPORA': { lat: -16.42305554, lng: -51.14888888 },
    'EDEIA': { lat: -17.33694444, lng: -49.91472222 },
    'SAO MIGUEL DO ARAGUAIA': { lat: -12.82055554, lng: -50.33583333 },
    'MONTE ALEGRE DE GOIAS': { lat: -13.25361111, lng: -46.89027777 },
    'PIRES DO RIO': { lat: -17.30416666, lng: -48.28416666 },
    'CATALAO': { lat: -18.154779, lng: -47.927614 },
    'ITUMBIARA': { lat: -18.40972222, lng: -49.19194444 },
    'CRISTALINA': { lat: -16.78499999, lng: -47.61305555 },
    'SILVANIA': { lat: -16.67972221, lng: -48.61805554 },
};
  
  export const getStationCoordinates = (stationName) => {
    const cleanName = stationName.trim().replace(';', '').toUpperCase();
    return STATION_COORDINATES[cleanName] || { lat: -16.6869, lng: -49.2648 };
  };
  
  export const calculateRiskLevel = (record) => {
    const temperature = record.temperatura || 0;
    const humidity = record.umidade || 0;
    const windSpeed = record.velocidade_vento || 0;
    
    const tempWeight = temperature ? 0.4 : 0;
    const humidityWeight = humidity ? 0.4 : 0;
    const windWeight = windSpeed ? 0.2 : 0;
    
    const totalWeight = tempWeight + humidityWeight + windWeight;
    
    if (totalWeight === 0) return 0;
    
    const normalizedRisk = (
      (tempWeight * (temperature / 40) +
      humidityWeight * (1 - humidity / 100) +
      windWeight * (windSpeed / 20)) / totalWeight
    ) * 100;
    
    return Math.min(Math.max(Math.round(normalizedRisk), 0), 100);
  };
  
  export const getRiskColor = (riskLevel) => {
    if (riskLevel >= 75) return '#ff4757'; // Vermelho
    if (riskLevel >= 50) return '#ffa502'; // Laranja
    if (riskLevel >= 25) return '#ffdd59'; // Amarelo
    return '#2ed573'; // Verde
  };
  
  export const getLastRainfall = (weatherData) => {
    if (!weatherData || !Array.isArray(weatherData) || weatherData.length === 0) {
      return null;
    }
  
    const sortedData = [...weatherData].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  
    const lastRain = sortedData.find(record => 
      record.precipitation && record.precipitation > 0
    );
  
    return lastRain ? {
      timestamp: lastRain.timestamp,
      amount: lastRain.precipitation
    } : null;
  };