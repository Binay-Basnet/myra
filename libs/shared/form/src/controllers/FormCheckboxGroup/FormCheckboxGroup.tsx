import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';

import { Box, Checkbox, Input } from '@coop/shared/ui';

interface IFormCheckboxGroupProps<T extends Record<string, string[]>> {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  list: { label: string; value: string }[];
  showOther?: boolean;
  orientation?: 'row' | 'column';
}

export const FormCheckboxGroup = <T extends Record<string, string[]>>({
  name,
  list,
  showOther = false,
  orientation = 'row',
}: IFormCheckboxGroupProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Box
            display="flex"
            flexDirection={orientation}
            flexWrap="wrap"
            columnGap="s48"
            rowGap="s16"
          >
            {list.map((item, index) => (
              <Checkbox
                id={name}
                key={index}
                label={item.label}
                isChecked={value?.includes(item.value)}
                onChange={() => {
                  if (!value) {
                    onChange([item.value]);
                  } else if (value?.includes(item.value)) {
                    onChange(
                      value.filter((data: string) => data !== item.value)
                    );
                  } else {
                    onChange([...value, item.value]);
                  }
                }}
              />
            ))}
            {showOther ? (
              <Box display="flex" gap="s8">
                <Checkbox
                  id={name}
                  onChange={() => {
                    if (!value) {
                      onChange(['Other']);
                    } else if (value?.includes('Other')) {
                      onChange(
                        value.filter((data: string) => data !== 'Other')
                      );
                    } else {
                      onChange([...value, 'Other']);
                    }
                  }}
                />
                {/** TODO(Update this input component) */}
                <Input
                  id={name}
                  placeholder="Other"
                  isDisabled={!value?.includes('Other')}
                />
              </Box>
            ) : null}
          </Box>
        );
      }}
    />
  );
};

export default FormCheckboxGroup;
