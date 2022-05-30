import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface BaseSelectProps extends ChakraSelectProps {
  options: { value: string; label: string }[];
  variant?: 'outline' | 'unstyled' | 'flushed' | 'filled';
}

export function BaseSelect(props: BaseSelectProps) {
  const { options, ...rest } = props;
  return (
    <ChakraSelect {...rest}>
      {options?.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </ChakraSelect>
  );
}

export default BaseSelect;
