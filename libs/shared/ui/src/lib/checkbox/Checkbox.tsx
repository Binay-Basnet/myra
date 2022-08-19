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

export function Checkbox(props: CheckboxProps) {
  const { children, label, ...rest } = props;

  return (
    <Box display="flex" gap="s8">
      <ChakraCheckbox {...rest} />
      {label ? <TextFields variant="formInput">{label}</TextFields> : children}
    </Box>
  );
}

export default Checkbox;
