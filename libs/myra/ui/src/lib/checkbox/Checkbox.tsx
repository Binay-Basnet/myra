import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CheckboxProps extends ChakraCheckboxProps {
  children: React.ReactNode;
  isInvalid?: boolean;
  colorScheme: string;
}

export function Checkbox(props: CheckboxProps) {
  const { children, isInvalid, colorScheme, ...rest } = props;
  return (
    <ChakraCheckbox
      // colorScheme={!isInvalid ? colorScheme : 'red'}
      {...rest}
    >
      {children}
    </ChakraCheckbox>
  );
}

export default Checkbox;
