import styled from "styled-components";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Map } from "../../components/map/map";


const HomeMain = styled.main`
  display: flex;
  background-color: #F4F8FF;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-family);
  padding: 20px 150px;

  & hr {
    margin: 15px 0 0 0;
    border-top: #cad9f3;
  }

  & input {
    padding: 10px;
    margin-top: -10px;
  }

  @media (max-aspect-ratio: 1), (max-width: 1366px) {
    padding: 20px;
  }
`;




export const Home = () => {
  
  

//   const fetchHotels = useCallback(async () => {
// //     try {
// //     //   const response = await fetch(
// //     //     `https://back-end-216p.onrender.com/hotels?page=${page}&limit=${NUMBER_OF_HOTELS}&category=${category}&search=${search}`
// //     //   );
// //     //   const data = await response.json();

// //       setHotels((prev) => [...prev, ...data]);
// //       if (data.length < NUMBER_OF_HOTELS) setHasMore(false);

// //       if (carrouselImages.length === 0) {
// //         const images = data
// //           .slice(0, 4)
// //           .filter((hotel) => hotel.thumb)
// //           .map((hotel) => hotel.thumb);
// //         setCarrouselImages(images);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching hotels:", error);
// //     }
// //   }, [page, category, search]);

 


  return (
    < >
    <Header/>
     <HomeMain>
      <Map/>
      </HomeMain>
      <Footer/>
     </>
  
);
};