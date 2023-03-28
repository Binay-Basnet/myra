import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { Input } from '@myra-ui/forms';

import { COASelectModal } from '@coop/shared/components';

interface IFormCOASelect<T extends FieldValues> {
  name: Path<T>;
}

export const FormCOASelectModal = <T extends FieldValues>({ name }: IFormCOASelect<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <COASelectModal
          trigger={(props) => <Input value={props?.name ? props?.name : '-- SELECT --'} />}
          defaultValue={value}
          onChange={onChange}
        />
      )}
      name={name}
    />
  );
};
