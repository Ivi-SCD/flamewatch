import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardHeader, Slider, Select, MenuItem, 
         FormControl, InputLabel, Alert, AlertTitle, Tabs, Tab, CircularProgress } from '@mui/material';
import { Thermostat, WaterDrop, WindPower, WarningAmber, Agriculture, 
         Landscape, WbSunny } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Header } from '../../components/header/header';
import geminiService from '../../services/gemini/geminiService'
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const agriculturalRegions = [
  {
    id: 1,
    name: 'Cristalina',
    lat: -16.7675,
    lng: -47.6131,
    riskLevel: 85,
    crops: ['Soja', 'Milho'],
    soilCondition: 'Seco',
    lastRainfall: '7 dias atrás',
    temperature: 32,
    humidity: 45
  },
  {
    id: 2,
    name: 'Rio Verde',
    lat: -17.7985,
    lng: -50.9192,
    riskLevel: 65,
    crops: ['Soja', 'Milho', 'Algodão'],
    soilCondition: 'Moderado',
    lastRainfall: '3 dias atrás',
    temperature: 30,
    humidity: 55
  },
  {
    id: 3,
    name: 'Jataí',
    lat: -17.8783,
    lng: -51.7173,
    riskLevel: 75,
    crops: ['Soja', 'Cana'],
    soilCondition: 'Moderado',
    lastRainfall: '5 dias atrás',
    temperature: 31,
    humidity: 50
  }
];

const mockTimeSeriesData = [
  { time: '00:00', iri: 45, temp: 28, humidity: 60, windSpeed: 10 },
  { time: '04:00', iri: 52, temp: 26, humidity: 55, windSpeed: 12 },
  { time: '08:00', iri: 65, temp: 30, humidity: 45, windSpeed: 15 },
  { time: '12:00', iri: 78, temp: 34, humidity: 35, windSpeed: 18 },
  { time: '16:00', iri: 72, temp: 32, humidity: 40, windSpeed: 14 },
  { time: '20:00', iri: 58, temp: 29, humidity: 50, windSpeed: 11 }
];

const MapComponent = ({ onRegionSelect }) => {
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
      {agriculturalRegions.map((region) => (
        <Circle
          key={region.id}
          center={[region.lat, region.lng]}
          pathOptions={{
            color: region.riskLevel > 75 ? '#ff4757' : 
                   region.riskLevel > 50 ? '#ffa502' : '#2ed573',
            fillColor: region.riskLevel > 75 ? '#ff4757' : 
                      region.riskLevel > 50 ? '#ffa502' : '#2ed573',
            fillOpacity: 0.6
          }}
          radius={20000}
          eventHandlers={{
            click: () => onRegionSelect(region)
          }}
        >
          <Popup>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {region.name}
              </Typography>
              <Typography variant="body2">
                Risco: {region.riskLevel}/100
              </Typography>
              <Typography variant="body2">
                Culturas: {region.crops.join(', ')}
              </Typography>
              <Typography variant="body2">
                Última Chuva: {region.lastRainfall}
              </Typography>
            </Box>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export const Dashboard = () => {
  const [activeRegion, setActiveRegion] = useState(agriculturalRegions[0]);
  const [alertValue, setAlertValue] = useState(75);
  const [activeTab, setActiveTab] = useState(0);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateRecommendations = async () => {
      if (activeRegion) {
        setLoading(true);
        try {
          const result = await geminiService.generateRecommendations(
            activeRegion.riskLevel,
            {
              type: 'agricultor',
              crops: activeRegion.crops,
              region: activeRegion.name,
              weatherConditions: {
                temperature: activeRegion.temperature,
                humidity: activeRegion.humidity,
                lastRainfall: activeRegion.lastRainfall,
                soilCondition: activeRegion.soilCondition
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

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 6 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', spaceY: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              FlameWatch Dashboard
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Região Ativa: {activeRegion.name}
            </Typography>
          </Box>

          {activeRegion.riskLevel > 75 && (
            <Alert severity="error" sx={{ mb: 4 }}>
              <AlertTitle>Alerta de Alto Risco</AlertTitle>
              Índice de Risco de Incêndio (IRI) excede {alertValue} em {activeRegion.name}.
              Recomenda-se atenção imediata e suspensão de atividades de queimada.
            </Alert>
          )}

          <Grid container spacing={6} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardHeader title="Métricas Atuais" />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WbSunny sx={{ color: '#ffa502', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Temperatura
                        </Typography>
                        <Typography variant="h6">{activeRegion.temperature}°C</Typography>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WaterDrop sx={{ color: '#2ed573', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Umidade
                        </Typography>
                        <Typography variant="h6">{activeRegion.humidity}%</Typography>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Landscape sx={{ color: '#ff4757', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          IRI
                        </Typography>
                        <Typography variant="h6">{activeRegion.riskLevel}/100</Typography>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Agriculture sx={{ color: '#8854d0', mr: 2 }} />
                      <div>
                        <Typography variant="body2" color="textSecondary">
                          Culturas
                        </Typography>
                        <Typography variant="h6">{activeRegion.crops.length} Tipos</Typography>
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={9}>
              <StyledCard>
                <CardHeader title="Evolução Temporal do IRI" />
                <CardContent sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTimeSeriesData}>
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
              {activeTab === 0 && (
                <StyledCard>
                  <CardContent>
                    <MapComponent onRegionSelect={handleRegionSelect} />
                  </CardContent>
                </StyledCard>
              )}

              {activeTab === 1 && (
                <StyledCard>
                  <CardContent>
                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : recommendations ? (
                      <Box>
                        <Alert severity="info" sx={{ mb: 3 }}>
                          <AlertTitle>Análise Personalizada para {activeRegion.name}</AlertTitle>
                          {recommendations}
                        </Alert>
                        <Typography variant="body2" color="textSecondary">
                          Última atualização: {new Date().toLocaleString()}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography>
                        Selecione uma região no mapa para receber recomendações personalizadas.
                      </Typography>
                    )}
                  </CardContent>
                </StyledCard>
              )}

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