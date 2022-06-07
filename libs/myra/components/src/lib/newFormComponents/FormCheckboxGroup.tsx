import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box, Checkbox, Input, Text } from '@coop/myra/ui';

interface IFormCheckboxGroupProps {
  control: Control;
  name: string;
  label?: string;
  list: string[];
  showOther?: boolean;
}

export const FormCheckboxGroup = ({
  control,
  name,
  list,
  showOther = false,
}: IFormCheckboxGroupProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Box display="flex" flexWrap="wrap" columnGap="s48" rowGap="s16">
            {list.map((item, index) => (
              <Checkbox
                key={index}
                onChange={() => {
                  if (!value) {
                    onChange([item]);
                  } else if (value?.includes(item)) {
                    onChange(value.filter((data: string) => data !== item));
                  } else {
                    onChange([...value, item]);
                  }
                }}
              >
                <Text fontSize="s3">{item}</Text>
              </Checkbox>
            ))}
            {showOther ? (
              <Box display="flex" gap="s4">
                <Checkbox
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
                >
                  {' '}
                </Checkbox>
                <Input
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
