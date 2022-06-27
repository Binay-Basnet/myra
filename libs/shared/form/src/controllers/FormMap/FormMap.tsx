import React, { useEffect } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@coop/shared/map'), {
  ssr: false,
});

export interface FormMapProps<T> {
  name: Path<T>;
  id?: string;
}

export function FormMap<T>({ name, id }: FormMapProps<T>) {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
    reset,
    getValues,
  } = methods;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        reset({
          ...getValues(),
          [name]: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });
      });
    }
  }, []);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        return (
          <MapComponent id={name} currentLoc={value} setCurrentLoc={onChange} />
        );
      }}
    />
  );
}

export default FormMap;
