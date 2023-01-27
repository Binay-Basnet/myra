import { useEffect, useState } from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';
import { get } from 'lodash';

import { Box, Checkbox, Icon, Text } from '@myra-ui';

import FormInput from '../FormInput/FormInput';

interface IFormCheckboxGroupProps<T extends Record<string, string[]>> {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  list?: { label: string; value: string; isDisabled?: boolean }[];
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

  const errorText = get(errors, name)?.message as string;

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
                  rowGap: 's8',
                })}
          >
            {list?.map((item) => (
              <Checkbox
                id={name}
                key={item.value}
                label={item.label}
                isDisabled={item.isDisabled}
                isInvalid={!!errorText}
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
          {errorText && (
            <Box display="flex" gap="s10">
              <Icon color="danger.500" as={RiErrorWarningLine} />
              <Text variant="formHelper" color="danger.500">
                {errorText || 'Choose at least one option'}
              </Text>
            </Box>
          )}
        </Box>
      )}
    />
  );
};

export default FormCheckboxGroup;
