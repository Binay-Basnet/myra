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
    if (!position) {
      map.setView({
        lat: 27.707477,
        lng: 85.3147112,
      });
    } else {
      map.setView({
        lat: position?.latitude ?? 0,
        lng: position?.longitude ?? 0,
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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && (
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={[position?.latitude, position?.longitude]}
          ref={markerRef}
        >
          <Popup minWidth={90}>Drag the marker</Popup>
        </Marker>
      )}
    </>
  );
};
export default Map;
