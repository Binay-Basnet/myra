import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';
import TextFields from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface CheckboxProps extends ChakraCheckboxProps {
  children: React.ReactNode;
}

export function Checkbox(props: CheckboxProps) {
  const { children, ...rest } = props;
  return (
    <ChakraCheckbox {...rest}>
      <TextFields variant="formInput">{children}</TextFields>
    </ChakraCheckbox>
  );
}

export default Checkbox;
