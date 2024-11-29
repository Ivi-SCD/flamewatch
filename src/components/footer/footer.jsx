import styled from 'styled-components';


const StyledFooter = styled.footer`
  background-color: #519AFF;
  padding: 20px 0;
  height: 400px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;

   @media (max-width: 768px) {
    flex-wrap: wrap; 
    justify-content: center; 
  }
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px; 
    text-align: center; 
    padding: 0 10px;
  }
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center; 
  }
`;



const Logo = styled.img`
  width: 150px;
  height: auto;

  @media (max-width: 768px) {
    margin-bottom: 20px; 
  }
`;

export  const Footer = () => {
 
  return (
    <StyledFooter>
      <FooterBox>
        <FooterSection>
          <Logo src={"/"} alt="Logo " />
          <SocialIconsWrapper>
            
          </SocialIconsWrapper>
        </FooterSection>
        <FooterSection>
          <h6>Institucional</h6>
          <p>Institucional </p>
          <p>Trabalhe conosco</p>          
        </FooterSection>
        <FooterSection>
          <h6>Escritórios</h6>
          <p>Situado a 250 m pela saída lateral do Terminal Rodoviário Tietê...</p>
        </FooterSection>
        <FooterSection>
          <h6>Suporte</h6>
          <p>Institucional institucional</p>
        </FooterSection>
      </FooterBox>
      <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.3)' }}>
        <p style={{ fontSize: '14px' }}>
          Copyright © 2024  Feito com muito ❤️ e carinho no San Pedro Valley
        </p>
      </div>
    </StyledFooter>
  );
};