import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export default function LeafletControlGeocoder(props) {
  const { setPosition } = props;
  const map = useMap();

  useEffect(() => {
    let geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== 'undefined' && location.search) {
      // parse /?geocoder=nominatim from URL
      const params = new URLSearchParams(location.search);
      const geocoderString = params.get('geocoder');
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn('Unsupported geocoder', geocoderString);
      }
    }

    L.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on('markgeocode', function (e) {
        setPosition({
          latitude: e?.geocode?.center?.lat,
          longitude: e?.geocode?.center?.lng,
        });
        map.setView({
          lat: e?.geocode?.center?.lat,
          lng: e?.geocode?.center?.lng,
        });
      })
      .addTo(map);
  }, []);

  return null;
}
