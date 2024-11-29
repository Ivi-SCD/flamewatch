import  { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardHeader, Slider, Select, MenuItem, FormControl, InputLabel, Alert, AlertTitle, Tabs, Tab } from '@mui/material';
import { Thermostat, WaterDrop, WindPower, WarningAmber } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Map } from '../../components/map/map';
import { Header } from '../../components/header/header';

const mockTimeSeriesData = [
  { time: '00:00', iri: 45, temp: 28, humidity: 60 },
  { time: '04:00', iri: 52, temp: 26, humidity: 55 },
  { time: '08:00', iri: 65, temp: 30, humidity: 45 },
  { time: '12:00', iri: 78, temp: 34, humidity: 35 },
  { time: '16:00', iri: 72, temp: 32, humidity: 40 },
  { time: '20:00', iri: 58, temp: 29, humidity: 50 },
];

export const Dashboard = () => {
  const [activeRegion, setActiveRegion] = useState('Central Goiás');
  const [alertValue, setAlertValue] = useState(75);

  return (
    <>
    <Header />
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 6 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', spaceY: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            FlameWatch Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Região Ativa: {activeRegion}
          </Typography>
        </Box>

        {/* Alert Section */}
        <Alert severity="error" sx={{ bgcolor: 'error.light' }}>
          <WarningAmber sx={{ fontSize: 20, mr: 1 }} />
          <AlertTitle>Alerta de Alto Risco</AlertTitle>
          Índice de Risco de Incêndio (IRI) excede 75 na região Sul de Goiás.
          Recomenda-se atenção imediata dos gestores municipais.
        </Alert>

        {/* Main Content */}
        <Grid container spacing={6}>
          {/* Key Metrics */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardHeader title="Métricas Atuais" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Thermostat sx={{ color: 'orange', mr: 2 }} />
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        Temperatura
                      </Typography>
                      <Typography variant="h6">32°C</Typography>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WaterDrop sx={{ color: 'blue', mr: 2 }} />
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        Umidade
                      </Typography>
                      <Typography variant="h6">45%</Typography>
                    </div>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WindPower sx={{ color: 'green', mr: 2 }} />
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        IRI
                      </Typography>
                      <Typography variant="h6">78/100</Typography>
                    </div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Chart */}
          <Grid item xs={12} md={9}>
            <Card>
              <CardHeader title="Evolução Temporal do IRI" />
              <CardContent sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTimeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="iri" stroke="#ff4757" />
                    <Line type="monotone" dataKey="temp" stroke="#ffa502" />
                    <Line type="monotone" dataKey="humidity" stroke="#2ed573" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Tabs value="map" indicatorColor="primary" textColor="primary" sx={{ width: '100%' }}>
          <Tab label="Mapa de Calor" />
          <Tab label="Recomendações" />
          <Tab label="Configurar Alertas" />
        </Tabs>

        {/* Mapa de Calor */}
        <Box sx={{ p: 2, mt: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, bgcolor: 'grey.200', borderRadius: 2 }}>
                <Map />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Recomendações */}
        <Box sx={{ p: 2, mt: 4 }}>
          <Card>
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                <AlertTitle>Recomendação para Gestores</AlertTitle>
                Considerar mobilização preventiva de brigadas de incêndio nas áreas de maior risco.
              </Alert>
              <Alert severity="warning">
                <AlertTitle>Recomendação para Agricultores</AlertTitle>
                Evitar queimadas controladas nos próximos 3 dias devido às condições climáticas desfavoráveis.
              </Alert>
            </CardContent>
          </Card>
        </Box>

        {/* Configuração de Alertas */}
        <Box sx={{ p: 2, mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Configurações de Alerta</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Limite de IRI para Alertas</Typography>
                  <Slider value={alertValue} onChange={(e, newValue) => setAlertValue(newValue)} min={0} max={100} valueLabelDisplay="auto" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Método de Notificação</Typography>
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
          </Card>
        </Box>
      </Box>
    </Box>
    </>
  );
};

