/* eslint-disable-next-line */
import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  RadioProps as ChakraRadioProps,
  Stack,
} from '@chakra-ui/react';

export interface RadioGroupProps extends ChakraRadioProps {
  colorScheme?: string;
  radioList: string[];
  spacing?: number;
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
}

export function RadioGroup(props: RadioGroupProps) {
  const { radioList, spacing, direction, ...rest } = props;
  return (
    <ChakraRadioGroup>
      <Stack spacing={spacing} direction={direction}>
        {radioList.map((item, index) => {
          return (
            <Radio {...rest} id={index} value={item}>
              {item}
            </Radio>
          );
        })}
      </Stack>
    </ChakraRadioGroup>
  );
}

export default RadioGroup;
