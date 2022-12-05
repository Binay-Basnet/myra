import { Controller, Path, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@myra-ui/map'), {
  ssr: false,
});

export interface FormMapProps<T> {
  name: Path<T>;
  id?: string;
}

export function FormMap<T>({ name }: FormMapProps<T>) {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
    // reset,
    // getValues,
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MapComponent id={name} currentLoc={value} setCurrentLoc={onChange} />
      )}
    />
  );
}

export default FormMap;
