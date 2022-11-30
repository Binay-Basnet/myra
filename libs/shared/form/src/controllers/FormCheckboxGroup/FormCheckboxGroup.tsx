import { useEffect, useState } from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Box, Checkbox, Icon, TextFields } from '@myra-ui';

import FormInput from '../FormInput/FormInput';

interface IFormCheckboxGroupProps<T extends Record<string, string[]>> {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  list?: { label: string; value: string }[];
  showOther?: boolean;
  orientation?: 'row' | 'column' | 'grid';
}

export const FormCheckboxGroup = <T extends Record<string, string[]>>({
  name,
  list,
  showOther = false,
  orientation = 'row',
}: IFormCheckboxGroupProps<T>) => {
  const [hasOtherField, setHasOtherField] = useState(false);
  const { unregister, resetField } = useFormContext();
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  const error = errors[name];

  useEffect(() => {
    if (!hasOtherField) {
      resetField('otherProfession');
      unregister('otherProfession');
    }
  }, [hasOtherField]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s16">
          <Box
            {...(orientation === 'grid'
              ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: 's16',
                }
              : {
                  display: 'flex',
                  flexDir: orientation,
                  flexWrap: 'wrap',
                  columnGap: 's48',
                  rowGap: 's16',
                })}
          >
            {list?.map((item) => (
              <Checkbox
                id={name}
                key={item.value}
                label={item.label}
                // _checked={{
                //   border: error ? '2px solid' : '1px solid',
                //   borderColor: error ? 'danger.500' : 'primary.500',
                //   bg: error ? 'danger.100' : 'primary.100',
                // }}
                isChecked={value?.includes(item.value)}
                onChange={() => {
                  if (!value) {
                    onChange([item.value]);
                  } else if (value?.includes(item.value)) {
                    onChange(value.filter((data: string) => data !== item.value));
                  } else {
                    onChange([...value, item.value]);
                  }
                }}
              />
            ))}
            {showOther ? (
              <Box display="flex" gap="s8">
                <Checkbox
                  _focus={{
                    border: '2px solid',
                    borderColor: 'danger.500',
                    bg: 'danger.100',
                  }}
                  id={name}
                  isChecked={hasOtherField}
                  onChange={(e) => {
                    setHasOtherField(e.target.checked);
                  }}
                />
                <FormInput
                  name="otherProfession"
                  id={name}
                  __placeholder="Other"
                  isDisabled={!hasOtherField}
                />
              </Box>
            ) : null}
          </Box>
          {error && (
            <Box display="flex" gap="s10">
              <Icon color="danger.500" as={RiErrorWarningLine} />
              <TextFields variant="formHelper" color="danger.500">
                {(error?.message as string) ?? 'Choose at least one option'}
              </TextFields>
            </Box>
          )}
        </Box>
      )}
    />
  );
};

export default FormCheckboxGroup;
