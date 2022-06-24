import React from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { Marker as MarkerType } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
//
// const MapLeaflet = dynamic(
//   () => import('react-leaflet/lib/SVGOverlay').then((module) => module.Name),
//   {
//     ssr: false,
//   }
// );

interface MapProps {
  position: {
    longitude: number;
    latitude: number;
  };
  setPosition: (prop: { latitude: number; longitude: number }) => void;
}

export const Map = (props: MapProps) => {
  const { position, setPosition } = props;

  return (
    <MapContainer
      center={[0, 0]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: 450, width: '100%' }}
    >
      <MapContent position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

const MapContent = (props: MapProps) => {
  const { position, setPosition } = props;
  const map = useMap();

  React.useEffect(() => {
    if (position.latitude === 0 && position.longitude === 0) {
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
    } else {
      map.setView({
        lat: position?.latitude,
        lng: position?.longitude,
      });
    }
  }, [map]);

  useMapEvent('click', (e) => {
    setPosition({
      latitude: e?.latlng?.lat,
      longitude: e?.latlng?.lng,
    });
  });

  const markerRef = React.useRef<MarkerType>(null);

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition({
            latitude: marker.getLatLng().lat,
            longitude: marker.getLatLng().lng,
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
