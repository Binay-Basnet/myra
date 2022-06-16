/* eslint-disable-next-line */
import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  RadioProps as ChakraRadioProps,
  Stack,
  Text,
} from '@chakra-ui/react';

export interface RadioGroupProps extends ChakraRadioProps {
  colorScheme?: string;
  radioList: string[];
  spacing?: number;
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  labelFontSize?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  const { radioList, spacing, direction, labelFontSize, ...rest } = props;
  return (
    <ChakraRadioGroup fontSize={13}>
      <Stack spacing={spacing} direction={direction}>
        {radioList.map((item, index) => {
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
        })}
      </Stack>
    </ChakraRadioGroup>
  );
}

export default RadioGroup;
