import styled from 'styled-components';
import logo from "../../assets/logo.webp";

const StyledFooter = styled.footer`
  background-color: #ffe4cc;
  padding: 50px 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 0 50px;

  h6 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
    text-align: center;
    padding: 0 10px;
    align-items: center;

  }
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  img {
    width: 150px;
    height: auto;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    img {
      width: 120px;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  p {
    font-size: 14px;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding-top: 15px;

    p {
      font-size: 12px;
    }
  }
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterBox>
        <FooterSection>
          <LogoContainer>
            <img src={logo} alt="logo" />
          </LogoContainer>
          <SocialIconsWrapper>
           
          </SocialIconsWrapper>
        </FooterSection>
        <FooterSection>
          <h6>Sobre</h6>
          <p>Nossa missão </p>
          <p>Parceiros </p>
        </FooterSection>
        <FooterSection>
          <h6>Recurso</h6>
          <p>Dashboard</p>
          <p>Documentação</p>
        </FooterSection>
        <FooterSection>
          <h6>Suporte</h6>
          <p>FAQ</p>
          <p>Contato</p>
        </FooterSection>
      </FooterBox>
      <FooterBottom>
        <p>
          Copyright © 2024 - Feito com muito ❤️ e carinho!!
        </p>
      </FooterBottom>
    </StyledFooter>
  );
};
