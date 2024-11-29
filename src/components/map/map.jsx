import { useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';


const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -16.64277777,
  lng: -49.22027777,
};

const libraries = ['visualization'];  

export const Map = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  const onLoad = useCallback((map) => {
    console.log('Map loaded:', map);

    
    const heatmapData = [
        { location: new google.maps.LatLng(-16.64277777, -49.22027777), weight: 1 },
        { location: new google.maps.LatLng(-13.30944444, -49.11749999), weight: 2 },
        { location: new google.maps.LatLng(-18.96916666, -50.63333333), weight: 1 },
        { location: new google.maps.LatLng(-16.26055555, -47.96694443), weight: 3 },
        { location: new google.maps.LatLng(-15.90277777, -52.24527777), weight: 2 },
        { location: new google.maps.LatLng(-15.93972221, -50.14138888), weight: 1 },
        { location: new google.maps.LatLng(-14.97972221, -49.53944444), weight: 2 },
        { location: new google.maps.LatLng(-17.9236111, -51.71749999), weight: 3 },
        { location: new google.maps.LatLng(-14.08916666, -46.36638888), weight: 1 },
        { location: new google.maps.LatLng(-15.22027777, -48.98999999), weight: 2 },
        { location: new google.maps.LatLng(-16.96694443, -51.81749999), weight: 1 },
        { location: new google.maps.LatLng(-14.13305554, -47.52333332), weight: 2 },
        { location: new google.maps.LatLng(-17.78527777, -50.965), weight: 3 },
        { location: new google.maps.LatLng(-17.45472222, -52.60111111), weight: 2 },
        { location: new google.maps.LatLng(-16.9625, -50.42555554), weight: 1 },
        { location: new google.maps.LatLng(-16.42305554, -51.14888888), weight: 2 },
        { location: new google.maps.LatLng(-17.33694444, -49.91472222), weight: 3 },
        { location: new google.maps.LatLng(-12.82055554, -50.33583333), weight: 1 },
        { location: new google.maps.LatLng(-13.25361111, -46.89027777), weight: 2 },
        { location: new google.maps.LatLng(-17.30416666, -48.28416666), weight: 1 },
        { location: new google.maps.LatLng(-18.154779, -47.927614), weight: 3 },
        { location: new google.maps.LatLng(-18.40972222, -49.19194444), weight: 2 },
        { location: new google.maps.LatLng(-16.78499999, -47.61305555), weight: 4 },
        { location: new google.maps.LatLng(-16.67972221, -48.61805554), weight: 1 },
      ];

    
    const heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map,  
      radius: 20, 
      opacity: 0.6, 
    });

    
    console.log('Heatmap Layer added:', heatmap);
  }, []);

  const onUnmount = useCallback((map) => {
    console.log('Map unmounted:', map);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </MapContainer>
  );
};
