import React from 'react';
import {
  Box,
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

import TextFields from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface CheckboxProps extends ChakraCheckboxProps {
  children?: React.ReactNode;
  label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { children, label, name, ...rest } = props;

  return (
    <Box display="flex" alignItems="center" gap="s8">
      <ChakraCheckbox data-testid={name} {...rest}>
        {label ? (
          <TextFields variant="formLabel" color="gray.800">
            {label}
          </TextFields>
        ) : (
          children
        )}
      </ChakraCheckbox>
    </Box>
  );
};

export default Checkbox;
