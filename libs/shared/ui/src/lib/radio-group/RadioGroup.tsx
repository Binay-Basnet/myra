/* eslint-disable-next-line */
import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  RadioProps as ChakraRadioProps,
  Stack,
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
}

export function RadioGroup(props: RadioGroupProps) {
  const { radioList, spacing, direction, labelFontSize, options, ...rest } =
    props;
  return (
    <ChakraRadioGroup>
      <Stack spacing={spacing} direction={direction} gap="s16">
        {radioList
          ? radioList?.map((item, index) => {
              return (
                // TODO string index
                <Radio
                  {...rest}
                  key={index}
                  id={`${item}${index}`}
                  value={item}
                  spacing="s8"
                >
                  <Text fontSize={labelFontSize}>{item}</Text>
                </Radio>
              );
            })
          : options?.map((option) => (
              <Radio
                {...rest}
                key={option.value}
                id={`${option.value}`}
                value={option.value}
                spacing="s8"
              >
                <TextFields variant="formInput" fontSize="s3" color="gray.800">
                  {option.label}
                </TextFields>
              </Radio>
            ))}
      </Stack>
    </ChakraRadioGroup>
  );
}

export default RadioGroup;
