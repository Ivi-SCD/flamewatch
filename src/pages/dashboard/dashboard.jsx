import { useState, useEffect } from 'react';
import { WeatherService } from '../../services/weather/weatherService';
import { getStationCoordinates, calculateRiskLevel, getRiskColor, getLastRainfall } from '../../utils/stationUtils';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Slider, Select, MenuItem,
  FormControl, InputLabel, Alert, AlertTitle, Tabs, Tab, CircularProgress
} from '@mui/material';
import {
  Thermostat, WaterDrop, WindPower, WarningAmber, Agriculture,
  Landscape, WbSunny
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Header } from '../../components/header/header';
import geminiService from '../../services/gemini/geminiService';
import styled from '@emotion/styled';
import InteractiveChat from '../../components/interactivechat/interactivechat';

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MapComponent = ({ stations, onRegionSelect }) => {
  return (
    <MapContainer
      center={[-16.6869, -49.2648]}
      zoom={7}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {stations.map((station) => (
        <Circle
          key={station.id}
          center={[station.lat, station.lng]}
          pathOptions={{
            color: getRiskColor(station.riskLevel),
            fillColor: getRiskColor(station.riskLevel),
            fillOpacity: 0.6
          }}
          radius={20000}
          eventHandlers={{
            click: () => onRegionSelect(station)
          }}
        >
          <Popup>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {station.name}
              </Typography>
              <Typography variant="body2">
                IRI: {station.riskLevel}/100
              </Typography>
              <Typography variant="body2">
                Temperatura: {station.temperature}°C
              </Typography>
              <Typography variant="body2">
                Umidade: {station.humidity}%
              </Typography>
            </Box>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export const Dashboard = () => {
  const [stations, setStations] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [activeRegion, setActiveRegion] = useState(null);
  const [alertValue, setAlertValue] = useState(75);
  const [activeTab, setActiveTab] = useState(0);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const stationSummaries = await WeatherService.getStationSummaries();

        if (!stationSummaries || stationSummaries.length === 0) {
          console.log('Nenhum dado recebido');
          return;
        }

        const stationData = stationSummaries.map(record => {
          const coordinates = getStationCoordinates(record.estacao);

          return {
            id: record.estacao,
            name: record.estacao?.replace(';', '').trim(),
            lat: coordinates.lat,
            lng: coordinates.lng,
            riskLevel: calculateRiskLevel(record),
            temperature: record.temperatura || '-',
            humidity: record.umidade || '-',
            windSpeed: record.velocidade_vento || '-',
            lastRainfall: record.precipitacao ? 'Hoje' : 'Sem registro'
          };
        });

        setStations(stationData);

        // Só define a região ativa se não houver uma
        if (stationData.length > 0 && !activeRegion) {
          setActiveRegion(stationData[0]);
        }
      } catch (error) {
        console.error('Error loading station data:', error);
      }
    };

    loadWeatherData();
  }, []); // Sem dependências

  // Segundo useEffect - Atualização dos dados temporais
  useEffect(() => {
    const updateTimeSeriesData = async () => {
      if (!activeRegion?.name) return;

      try {
        const data = await WeatherService.getWeatherData();
        const stationData = data
          .filter(row => row.estacao?.replace(';', '').trim() === activeRegion.name)
          .map(row => ({
            time: `${String(row.hora).padStart(2, '0')}:00`,
            iri: calculateRiskLevel(row), // Usa a função de cálculo de IRI
            temp: row.temperatura,
            humidity: row.umidade
          }))
          .sort((a, b) => parseInt(a.time) - parseInt(b.time));

        console.log('Dados processados:', stationData); // Debug
        setTimeSeriesData(stationData);
      } catch (error) {
        console.error('Error:', error);
        setTimeSeriesData([]);
      }
    };

    updateTimeSeriesData();
  }, [activeRegion?.name]);

  useEffect(() => {
    const updateTimeSeriesData = async () => {
      if (activeRegion) {
        const data = await WeatherService.getWeatherData();
        const stationData = data
          .filter(row => row.estacao?.replace(';', '').trim() === activeRegion.name)
          .map((row, index) => ({
            time: `${String(index).padStart(2, '0')}:00`,
            iri: calculateRiskLevel(row),
            temp: row.temperatura,
            humidity: row.umidade
          }));
      }
    };

    updateTimeSeriesData();
  }, [activeRegion]);

  useEffect(() => {
    const generateRecommendations = async () => {
      if (activeRegion) {
        setLoading(true);
        try {
          const result = await geminiService.generateRecommendations(
            activeRegion.riskLevel,
            {
              type: 'agricultor',
              region: activeRegion.name,
              weatherConditions: {
                temperature: activeRegion.temperature,
                humidity: activeRegion.humidity,
                lastRainfall: activeRegion.lastRainfall
              }
            }
          );
          setRecommendations(result);
        } catch (error) {
          console.error('Erro ao gerar recomendações:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    generateRecommendations();
  }, [activeRegion]);

  const handleRegionSelect = (region) => {
    setActiveRegion(region);
  };

  if (!activeRegion) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 6 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', spaceY: 6 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              FlameWatch Dashboard
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Região Ativa: {activeRegion.name}
            </Typography>
          </Box>

          {/* Alert Section */}
          {activeRegion.riskLevel > alertValue && (
            <Alert severity="error" sx={{ mb: 4 }}>
              <AlertTitle>Alerta de Alto Risco</AlertTitle>
              Índice de Risco de Incêndio (IRI) excede {alertValue} em {activeRegion.name}.
              Recomenda-se atenção imediata e suspensão de atividades de queimada.
            </Alert>
          )}

          {/* Metrics and Chart Grid */}
          <Grid container spacing={6} sx={{ mb: 4 }}>
            {/* Metrics Card */}
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardHeader title="Métricas Atuais" />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Temperature */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WbSunny sx={{ color: '#ffa502', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Temperatura
                        </Typography>
                        <Typography variant="h6">{activeRegion.temperature}°C</Typography>
                      </div>
                    </Box>
                    {/* Humidity */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WaterDrop sx={{ color: '#2ed573', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Umidade
                        </Typography>
                        <Typography variant="h6">{activeRegion.humidity}%</Typography>
                      </div>
                    </Box>
                    {/* IRI */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Landscape sx={{ color: '#ff4757', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          IRI
                        </Typography>
                        <Typography variant="h6">{activeRegion.riskLevel}/100</Typography>
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Chart Card */}
            <Grid item xs={12} md={9}>
              <StyledCard>
                <CardHeader title="Evolução Temporal do IRI" />
                <CardContent sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="iri"
                        stroke="#ff4757"
                        strokeWidth={2}
                        name="IRI"
                      />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#ffa502"
                        strokeWidth={2}
                        name="Temperatura"
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#2ed573"
                        strokeWidth={2}
                        name="Umidade"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Mapa de Risco" />
              <Tab label="Recomendações" />
              <Tab label="Configurar Alertas" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {/* Map Tab */}
              {activeTab === 0 && (
                <StyledCard>
                  <CardContent>
                    <MapComponent
                      stations={stations}
                      onRegionSelect={handleRegionSelect}
                    />
                  </CardContent>
                </StyledCard>
              )}

              {/* Recommendations Tab */}
              {activeTab === 1 && (
                <StyledCard>
                  <CardContent>
                    <InteractiveChat
                      activeRegion={activeRegion}
                      weatherData={timeSeriesData}
                    />
                  </CardContent>
                </StyledCard>
              )}

              {/* Alert Settings Tab */}
              {activeTab === 2 && (
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Configurações de Alerta
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          Limite de IRI para Alertas
                        </Typography>
                        <Slider
                          value={alertValue}
                          onChange={(e, newValue) => setAlertValue(newValue)}
                          min={0}
                          max={100}
                          valueLabelDisplay="auto"
                          sx={{
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#ff4757',
                            },
                            '& .MuiSlider-track': {
                              backgroundColor: '#ff4757',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          Método de Notificação
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel>Selecione o Método</InputLabel>
                          <Select defaultValue="Email">
                            <MenuItem value="Email">Email</MenuItem>
                            <MenuItem value="SMS">SMS</MenuItem>
                            <MenuItem value="Ambos">Ambos</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;