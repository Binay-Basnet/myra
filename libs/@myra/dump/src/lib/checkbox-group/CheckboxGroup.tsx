import {
  Box,
  Checkbox,
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxProps as ChakraCheckboxProps,
  Flex,
  Stack,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CheckboxGroupProps extends ChakraCheckboxProps {
  colorScheme?: string;
  checkList?: string[];
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  variant: 'simple' | 'fullWidth';
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { checkList, variant, direction, ...rest } = props;
  return (
    <ChakraCheckboxGroup>
      {variant === 'simple' && (
        <Stack spacing="s8" direction={direction}>
          {checkList?.map((item) => (
            <Checkbox id={item} value={item} {...rest}>
              {item}
            </Checkbox>
          ))}
        </Stack>
      )}

      {variant === 'fullWidth' && (
        <Box>
          {checkList?.map((item) => (
            <Flex gap="s8" justifyContent="space-between">
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
};

export default CheckboxGroup;
