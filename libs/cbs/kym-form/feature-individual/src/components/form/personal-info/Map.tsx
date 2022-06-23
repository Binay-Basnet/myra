import React from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapProps {
  position: {
    longitude: number;
    latitude: number;
  };
  setPosition: (prop: { latitude: number; longitude: number }) => void;
}

const Map = (props: MapProps) => {
  const { position, setPosition } = props;
  const [coordinates, setCoordinates] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  return (
    <MapContainer
      center={[coordinates?.latitude, coordinates?.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 450, width: '100%' }}
    >
      <MapContent position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

const MapContent = (props: MapProps) => {
  const { position, setPosition } = props;
  const map = useMap();
  // const [coordinates, setCoordinates] = React.useState({
  //   latitude: 0,
  //   longitude: 0,
  // });

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        map.setView({
          lat: latitude,
          lng: longitude,
        });
        setPosition({ latitude, longitude });
      });
    }
  }, [map]);

  useMapEvent('click', (e) => {
    setPosition({
      latitude: e?.latlng?.lat,
      longitude: e?.latlng?.lng,
    });
  });
  const markerRef = React.useRef(null);
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition({
            latitude: marker?._latlng?.lat,
            longitude: marker?._latlng?.lng,
          });
        }
      },
    }),
    []
  );

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={[position?.latitude, position?.longitude]}
        ref={markerRef}
      >
        <Popup minWidth={90}>Drag the marker</Popup>
      </Marker>
    </>
  );
};
export default Map;
