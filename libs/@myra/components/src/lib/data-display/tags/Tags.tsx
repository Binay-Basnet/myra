import {
  Tag as ChakraTags,
  TagCloseButton,
  TagLabel,
  TagProps as ChakraTagProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface TagsProps extends ChakraTagProps {
  type: 'tag' | 'chip';
  label: string;
  tagColor?: string;
  isRemovable?: boolean;
  isDisabled?: boolean;
  colorScheme?: string;
  labelColor?: string;
  size?: string;
  onClick?: () => void;
}

export const Tags = (props: TagsProps) => {
  const { type, size, isDisabled, label, labelColor, isRemovable, tagColor, onClick, ...rest } =
    props;

  return (
    <>
      {type === 'chip' && (
        <ChakraTags size={size} padding="s4 s8" borderRadius="br5" bg={tagColor} {...rest}>
          <TagLabel color={labelColor}>{label}</TagLabel>
        </ChakraTags>
      )}

      {type === 'tag' && (
        <ChakraTags
          disabled={isDisabled}
          size={size}
          color={labelColor}
          borderRadius="none"
          {...rest}
        >
          <TagLabel fontSize="s3">{label}</TagLabel>
          {isRemovable && (
            <TagCloseButton isDisabled={isDisabled} color="gray.500" onClick={onClick} />
          )}
        </ChakraTags>
      )}
    </>
  );
};

export default Tags;
