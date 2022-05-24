import {
  Tag as ChakraChips,
  TagLabel,
  TagProps as ChakraChipProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChipsProps extends ChakraChipProps {
  label: string;
  colorScheme: string;
  size: string;
}

export function Chips(props: ChipsProps) {
  const { size, colorScheme, label, ...rest } = props;
  return (
    <ChakraChips size={size} colorScheme={colorScheme} {...rest}>
      <TagLabel>{label}</TagLabel>
    </ChakraChips>
  );
}

export default Chips;
