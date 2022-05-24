import {
  Tag as ChakraTags,
  TagLabel,
  TagCloseButton,
  TagProps as ChakraTagProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface TagsProps extends ChakraTagProps {
  label: string;
  isRemovable: boolean;
  isDisabled: boolean;
  colorScheme: string;
  size: string;
  onClick: () => void;
}

export function Tags(props: TagsProps) {
  const {
    size,
    isDisabled,
    colorScheme,
    label,
    isRemovable,
    onClick,
    ...rest
  } = props;

  return (
    <ChakraTags
      disabled={isDisabled}
      size={size}
      // colorScheme={colorScheme}
      // borderRadius="radii.br5"
      {...rest}
    >
      <TagLabel>{label}</TagLabel>
      {isRemovable && (
        <TagCloseButton
          isDisabled={isDisabled}
          color="gray.500"
          onClick={onClick}
        />
      )}
    </ChakraTags>
  );
}

export default Tags;
