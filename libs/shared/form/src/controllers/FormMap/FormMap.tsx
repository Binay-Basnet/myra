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
        if (name.includes('.') && name.split('.').length === 3) {
          const temp = name.split('.');

          const tempNameValues = getValues()[temp[0]]
            ? getValues()[temp[0]]
            : {};

          tempNameValues[temp[1]] = {
            ...tempNameValues[temp[1]],
            [temp[2]]: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          };
          reset({ ...getValues(), [temp[0]]: [...tempNameValues] });
        } else {
          reset({
            ...getValues(),
            [name]: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          });
        }

        // reset({
        //   ...getValues(),
        //   [name]: {
        //     latitude: pos.coords.latitude,
        //     longitude: pos.coords.longitude,
        //   },
        // });
      });
    }

    console.log('FormMap rerendered');
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
