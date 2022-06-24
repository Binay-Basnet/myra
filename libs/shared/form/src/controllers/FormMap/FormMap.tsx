import React from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@coop/shared/map'), {
  ssr: false,
});

// const MapComponent = dynamic(
//   () => import('../../../../map/src/lib/MapComponent'),
//   { ssr: false }
// );
//
// const MapComponent1 = dynamic<any>(
//   () => import('@coop/shared/map').then((module) => module.MapComponent),
//   { ssr: false }
// );

// const MapComponent = dynamic(() => import(''))

export interface FormMapProps<T> {
  name: Path<T>;
  id?: string;
}

export function FormMap<T>({ name, id }: FormMapProps<T>) {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        return (
          <MapComponent id={id} currentLoc={value} setCurrentLoc={onChange} />
        );
      }}
    />
  );
}

export default FormMap;
