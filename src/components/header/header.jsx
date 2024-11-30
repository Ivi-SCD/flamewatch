import styled from "styled-components"
import { Link } from "react-router-dom";


const CabecalhoContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Cabecalho = styled.header`
    max-width: 1200px;
    width: 100%;
    height: 70px;
    /* border: red solid; */
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`

const Moldura = styled.div`
    width: 140px;
`

const Logo = styled.img`
    width: 100%;
    height: 100%;
`

const Div = styled.nav`
    display: flex;
    gap: 8px;
    /* border: red solid 1px; */
    align-items: center;
`

const ButtonWhite = styled.button`
    color: #0597FA;
    /* border: red solid 1px; */
    width: 100px;
    font-family: var(--font-family);
    font-size: 16px;
    padding: 5px;
    border: none;
    font-weight: 600;
    background-color: white;
    cursor: pointer;
`

const ButtonBlue = styled.button`
    cursor: pointer;
    color: white;
    /* border: red solid 1px; */
    width: 140px;
    font-family: var(--font-family);
    font-size: 16px;
    padding: 10px;
    border: none;
    font-weight: 600;
    background-color: #0597FA;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: all .4s ease-in-out;

    &:hover {
        background-color: #33a2ed;
    }
`

export const Header = () => {
    return(
        <CabecalhoContainer>
            
            <Cabecalho>
                <Link to={"/"}>
                    <Moldura>
                        <Logo  alt=""/>
                    </Moldura>
                </Link>
            
                {
                     
                        <Div>
                             <Link to={"/"}>
                                <ButtonBlue>Home</ButtonBlue>
                            </Link>
                            
                            <Link to={"/dashboard"}>
                                <ButtonWhite>Dashboard</ButtonWhite>
                            </Link>
                        
                        </Div> 
                }
            </Cabecalho>
        </CabecalhoContainer>
    )
}