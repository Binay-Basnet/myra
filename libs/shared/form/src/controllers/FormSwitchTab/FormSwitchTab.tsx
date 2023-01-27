import { Controller, useFormContext } from 'react-hook-form';

import { SwitchTabs, SwitchTabsProps } from '@myra-ui';

interface IFormSwitchTabsProps extends Omit<SwitchTabsProps, 'onChange' | 'value' | 'id'> {
  name: string;
  id?: string;
}

export const FormSwitchTab = ({ name, ...rest }: IFormSwitchTabsProps) => {
  const methods = useFormContext();

  const { control } = methods;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <SwitchTabs
          value={value}
          onChange={(nextValue) => {
            if (nextValue === 'true' || nextValue === 'false') {
              onChange(nextValue === 'true');
            } else {
              onChange(nextValue);
            }
          }}
          id={name}
          name={name}
          {...rest}
        />
      )}
    />
  );
};

export default FormSwitchTab;
