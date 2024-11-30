import styled from "styled-components";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Typography, Button, Container, Card, CardContent, Grid,  Box,  Zoom, Fade} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  transition: transform 0.3s ease-in-out;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const AnimatedGrid = styled(Grid)`
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const GradientHeroSection = styled('div')`
  padding: 6rem 0;
  text-align: center;
  background: linear-gradient(135deg, #fff6e5 0%, #ffe4cc 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
  }
`;

const StatsSection = styled('div')`
  padding: 4rem 0;
  background-color: #ffffff;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b35 0%, #ff8f6b 100%);
  }
`;

const FeaturesSection = styled('div')`
  padding: 5rem 0;
  background-color: #f9fafb;
  position: relative;
`;

const CtaSection = styled('div')`
  padding: 5rem 0;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f6b 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8f6b 100%);
  margin-bottom: 1rem;
  color: white;
`;

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      
      <GradientHeroSection>
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Box>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  marginBottom: 3,
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #454545 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Prevenção Inteligente de Incêndios
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
              >
                Sistema integrado de monitoramento e previsão de riscos de incêndio para o Estado de Goiás,
                combinando dados meteorológicos em tempo real com análise preditiva avançada.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: '#ff6b35',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#ff8f6b'
                    }
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  Ver Demo
                </Button>
               
              </Box>
            </Box>
          </Fade>
        </Container>
      </GradientHeroSection>

      <StatsSection>
        <Container>
          <AnimatedGrid container spacing={4}>
            {[
              { icon: <LocationOnIcon />, value: '246', label: 'Municípios Monitorados' },
              { icon: <NotificationsIcon />, value: '98%', label: 'Precisão nos Alertas' },
              { icon: <PeopleIcon />, value: '5mil+', label: 'Usuários Ativos' }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in timeout={500 + index * 200}>
                  <StyledCard>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <IconWrapper>
                        {stat.icon}
                      </IconWrapper>
                      <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Zoom>
              </Grid>
            ))}
          </AnimatedGrid>
        </Container>
      </StatsSection>

      <FeaturesSection>
        <Container>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            textAlign="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Recursos Principais
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <DeviceThermostatIcon />,
                title: 'Monitoramento em Tempo Real',
                description: 'Acompanhe dados meteorológicos e índices de risco atualizados constantemente para todas as regiões do estado.'
              },
              {
                icon: <AirIcon />,
                title: 'Análise Preditiva',
                description: 'Previsões baseadas em modelos avançados de machine learning, considerando múltiplas variáveis climáticas.'
              },
              {
                icon: <NotificationsIcon />,
                title: 'Alertas Personalizados',
                description: 'Receba notificações relevantes baseadas no seu perfil e área de interesse, via email ou SMS.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <IconWrapper sx={{ mb: 3 }}>
                      {feature.icon}
                    </IconWrapper>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {feature.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        color: '#ff6b35',
                        '&:hover': { color: '#ff8f6b' }
                      }}
                    >
                      Saiba mais
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesSection>

      <CtaSection>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
            Proteja sua região contra incêndios
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Junte-se aos milhares de gestores e agricultores que já utilizam o FlameWatch
            para proteger suas comunidades e propriedades.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#ff6b35',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)'
              }
            }}
          >
            Cadastre-se Gratuitamente
          </Button>
        </Container>
      </CtaSection>

      <Footer />
    </div>
  );
};
