import {
  Tag as ChakraTags,
  TagLabel,
  TagCloseButton,
  TagProps as ChakraTagProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface TagsProps extends ChakraTagProps {
  type: string;
  label: string;
  isRemovable?: boolean;
  isDisabled?: boolean;
  colorScheme?: string;
  size?: string;
  onClick?: () => void;
}

export function Tags(props: TagsProps) {
  const {
    type,
    size,
    isDisabled,
    colorScheme,
    label,
    isRemovable,
    onClick,
    ...rest
  } = props;

  return (
    <>
      {type === 'chip' && (
        <ChakraTags
          size={size}
          bg="accent.800"
          padding="s4 s8"
          borderRadius="br5"
          {...rest}
        >
          <TagLabel>{label}</TagLabel>
        </ChakraTags>
      )}

      {type === 'tag' && (
        <ChakraTags
          disabled={isDisabled}
          size={size}
          borderRadius="none"
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
      )}
    </>
  );
}

export default Tags;
