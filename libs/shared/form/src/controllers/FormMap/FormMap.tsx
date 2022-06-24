import React from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(
  () => import('../../../../map/src/lib/MapComponent'),
  { ssr: false }
);

/* eslint-disable-next-line */
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

  return typeof window === undefined ? null : (
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
