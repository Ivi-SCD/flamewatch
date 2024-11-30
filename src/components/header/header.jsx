import styled from "styled-components"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.webp";

const CabecalhoContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

const Cabecalho = styled.header`
  max-width: 1200px;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 10px 15px;
  }
`;

const Moldura = styled.div`
  width: 160px;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;

const Div = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
`;

const ButtonWhite = styled.button`
  color: #ff6b35;
  width: 100px;
  font-family: var(--font-family);
  font-size: 16px;
  padding: 5px;
  border: none;
  font-weight: 600;
  background-color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 80px;
    font-size: 14px;
  }
`;

const ButtonOrange = styled.button`
  cursor: pointer;
  color: white;
  width: 140px;
  font-family: var(--font-family);
  font-size: 16px;
  padding: 10px;
  border: none;
  font-weight: 600;
  background-color: #ff6b35;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #ff8f6b;
  }

  @media (max-width: 768px) {
    width: 100px;
    font-size: 14px;
  }
`;
export const Header = () => {
    return(
        <CabecalhoContainer>
            
            <Cabecalho>
                <Link to={"/"}>
                <Moldura>
                    <LogoContainer>
                       <img src={logo} alt="logo" style={{ width: "100%", height: "100%" }} />
                    </LogoContainer>
                </Moldura>
                </Link>
            
                {
                     
                        <Div>

                            <Link to={"/"}>
                                <ButtonWhite>Home</ButtonWhite>
                            </Link>
                            <Link to={"/dashboard"}>
                                <ButtonOrange>Acessar Dashboard</ButtonOrange>
                            </Link>
                        
                        </Div> 
                }
            </Cabecalho>
        </CabecalhoContainer>
    )
}