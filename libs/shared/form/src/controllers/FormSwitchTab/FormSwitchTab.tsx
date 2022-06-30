import React from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

import { SwitchTabs, SwitchTabsProps } from '@coop/shared/ui';

interface IFormSwitchTabsProps<T>
  extends Omit<SwitchTabsProps, 'onChange' | 'value' | 'id'> {
  name: Path<T>;
  id?: string;
}

export const FormSwitchTab = <T,>({
  name,
  ...rest
}: IFormSwitchTabsProps<T>) => {
  const methods = useFormContext();

  const { control } = methods;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name } }) => (
        <SwitchTabs
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          {...rest}
        />
      )}
    />
  );
};

export default FormSwitchTab;
