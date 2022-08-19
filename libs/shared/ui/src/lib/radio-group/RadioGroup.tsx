/* eslint-disable-next-line */
import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  RadioProps as ChakraRadioProps,
  Stack,
  Box,
  Text,
} from '@chakra-ui/react';
import TextFields from '../text-fields/TextFields';

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
}

export function RadioGroup(props: RadioGroupProps) {
  const { radioList, spacing, direction, labelFontSize, options, ...rest } =
    props;

  return (
    <ChakraRadioGroup value={props.value}>
      <Stack spacing={spacing} direction={direction} gap="s8">
        {radioList
          ? radioList?.map((item, index) => {
              return (
                // TODO string index
                <Box>
                  <Radio
                    {...rest}
                    key={index}
                    id={`${item}${index}`}
                    value={item}
                    spacing="s8"
                  />
                  <Text fontSize={labelFontSize}>{item}</Text>
                </Box>
              );
            })
          : options?.map((option) => (
              <Box display="flex" gap="s8">
                <Radio
                  {...rest}
                  isChecked={true}
                  key={option.value}
                  value={option.value}
                  spacing="s8"
                />
                <TextFields variant="formInput" fontSize="s3" color="gray.800">
                  {option.label}
                </TextFields>
              </Box>
            ))}
      </Stack>
    </ChakraRadioGroup>
  );
}

export default RadioGroup;
