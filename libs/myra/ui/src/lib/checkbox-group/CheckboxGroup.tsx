import {
  Checkbox,
  CheckboxProps as ChakraCheckboxProps,
  CheckboxGroup as ChakraCheckboxGroup,
  Stack,
  Flex,
  Box,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CheckboxGroupProps extends ChakraCheckboxProps {
  colorScheme?: string;
  checkList?: string[];
  spacing: number;
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  variant: 'simple' | 'fullWidth';
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { checkList, spacing, variant, direction, ...rest } = props;
  return (
    <ChakraCheckboxGroup>
      {variant === 'simple' && (
        <Stack spacing={spacing} direction={direction}>
          {checkList.map((item) => (
            <Checkbox id={item} value={item} {...rest}>
              {item}
            </Checkbox>
          ))}
        </Stack>
      )}

      {variant === 'fullWidth' && (
        <Box>
          {checkList.map((item) => (
            <Flex justifyContent="space-between">
              <Box>{item}</Box>
              <Box>
                <Checkbox id={item} value={item} {...rest} />
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </ChakraCheckboxGroup>
  );
}

export default CheckboxGroup;
