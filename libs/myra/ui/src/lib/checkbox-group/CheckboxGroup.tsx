import {
  Checkbox,
  CheckboxProps as ChakraCheckboxProps,
  CheckboxGroup as ChakraCheckboxGroup,
  Stack,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CheckboxGroupProps extends ChakraCheckboxProps {
  colorScheme?: string;
  checkList?: string[];
  spacing: number;
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse';
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { checkList, spacing, direction, ...rest } = props;
  return (
    <ChakraCheckboxGroup>
      <Stack spacing={spacing} direction={direction}>
        {checkList.map((item) => (
          <Checkbox id={item} value={item} {...rest}>
            {item}
          </Checkbox>
        ))}
      </Stack>
    </ChakraCheckboxGroup>
  );
}

export default CheckboxGroup;
