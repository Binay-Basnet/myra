import React, { SetStateAction, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import Geocoder from 'leaflet-control-geocoder';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export default function LeafletControlGeocoder(props: {
  setPosition: (prop: { latitude: number; longitude: number }) => void;
}) {
  const { setPosition } = props;
  const map = useMap();

  useEffect(() => {
    const geocoder = new Geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
      suggestMinLength: 2,
    });

    geocoder
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
