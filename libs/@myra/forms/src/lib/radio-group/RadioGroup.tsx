/* eslint-disable-next-line */
import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  RadioProps as ChakraRadioProps,
  Stack,
  Box,
} from '@chakra-ui/react';
import { RiErrorWarningLine } from 'react-icons/ri';

import { Text, Icon } from '@myra-ui/foundations';

export interface RadioGroupProps extends ChakraRadioProps {
  colorScheme?: string;
  radioList?: string[];
  spacing?: number;
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  labelFontSize?: string;

  options?: {
    label: string;
    value: string;
  }[];
  name?: string;
  errorMessage?: string;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { radioList, spacing, direction, labelFontSize, options, value, errorMessage, ...rest } =
    props;

  return (
    <ChakraRadioGroup value={value}>
      <Box display="flex" flexDir="column" gap="s16">
        <Stack spacing={spacing} direction={direction} gap="s8">
          {radioList
            ? radioList?.map((item, index) => (
                // TODO string index
                <Box>
                  <Radio
                    {...rest}
                    isInvalid={!!errorMessage}
                    key={item}
                    id={`${item}${index}`}
                    value={item}
                    spacing="s8"
                  >
                    <Text fontSize={labelFontSize}>{item}</Text>
                  </Radio>
                </Box>
              ))
            : options?.map((option) => (
                <Box display="flex" gap="s8">
                  <Radio
                    {...rest}
                    isInvalid={!!errorMessage}
                    key={option.value}
                    value={option.value}
                    spacing="s8"
                  >
                    <Text variant="formInput" fontSize="s3" color="gray.800">
                      {option.label}
                    </Text>
                  </Radio>
                </Box>
              ))}
        </Stack>
        {errorMessage ? (
          <Box display="flex" alignItems="center" gap="s10">
            <Icon color="danger.500" as={RiErrorWarningLine} />
            <Text variant="formHelper" color="danger.500">
              {errorMessage || 'Please choose one option'}
            </Text>
          </Box>
        ) : null}
      </Box>
    </ChakraRadioGroup>
  );
};

export default RadioGroup;
