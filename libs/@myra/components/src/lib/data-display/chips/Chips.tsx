import { forwardRef } from 'react';
import { ImClock } from 'react-icons/im';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp, IoCloseOutline } from 'react-icons/io5';
import {
  Avatar,
  Tag as ChakraTags,
  TagLabel,
  TagLeftIcon,
  TagProps as ChakraTagProps,
  TagRightIcon,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChipsProps extends ChakraTagProps {
  variant: 'solid' | 'outline';
  theme: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  size: 'sm' | 'md' | 'lg';
  type: 'label' | 'close' | 'status' | 'avatar';
  avatar?: string;
  label: string;
  onClick?: () => void;
}

const COLORS = {
  bg: {
    neutral: 'gray.100',
    success: 'success.200',
    info: 'info.100',
    warning: 'warning.0',
    danger: 'danger.0',
  },
  borderColor: {
    neutral: 'gray.500',
    success: 'primary.500',
    info: 'info.500',
    warning: 'warning.500',
    danger: 'danger.500',
  },
  text: {
    neutral: 'gray.500',
    success: 'primary.500',
    info: 'info.500',
    warning: 'warning.500',
    danger: 'danger.500',
  },
  icon: {
    neutral: 'gray.500',
    success: 'primary.500',
    info: 'info.500',
    warning: 'warning.500',
    danger: 'danger.500',
  },
};

const CHIPHEIGHT = {
  sm: {
    height: '20px',
  },
  md: {
    height: 's24',
  },
  lg: {
    height: 's28',
  },
};

const SIZE = {
  sm: {
    fontSize: 's2',
    iconSize: 's12',
    iconMargin: '2px',
  },
  md: {
    fontSize: 's3',
    iconSize: '14px',
    iconMargin: 's4',
  },
  lg: {
    fontSize: 'r1',
    iconSize: 's16',
    iconMargin: '6px',
  },
};
const PADDING = {
  sm: 's4',
  md: 's6',
  lg: 's8',
};

const ICON = {
  close: {
    neutral: IoCloseOutline,
    success: IoCloseOutline,
    info: IoCloseOutline,
    warning: IoCloseOutline,
    danger: IoCloseOutline,
  },
  status: {
    neutral: IoCheckmarkCircleSharp,
    success: IoCheckmarkCircleSharp,
    info: IoCheckmarkCircleSharp,
    warning: ImClock,
    danger: IoCloseCircleSharp,
  },
  avatar: {
    neutral: IoCloseOutline,
    success: IoCloseOutline,
    info: IoCloseOutline,
    warning: IoCloseOutline,
    danger: IoCloseOutline,
  },
};

export const Chips = forwardRef<HTMLButtonElement, ChipsProps>((props, ref) => {
  const { variant, theme, size, label, type, avatar, ...rest } = props;

  switch (variant) {
    case 'solid':
      return (
        <ChakraTags
          minHeight="20px"
          h={CHIPHEIGHT[size].height}
          ref={ref}
          width="auto"
          px={PADDING[size]}
          variant="solid"
          bg={COLORS.bg[theme]}
          borderRadius="br6"
          {...rest}
        >
          {type === 'label' && (
            <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
              {label?.replace(/_/g, ' ')}
            </TagLabel>
          )}

          {type === 'close' && (
            <>
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
              <TagRightIcon
                ml="s4"
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
            </>
          )}

          {type === 'status' && (
            <>
              <TagLeftIcon
                mr="s4"
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
            </>
          )}

          {type === 'avatar' && (
            <>
              <Avatar src={avatar} h="s16" w="s16" my={SIZE[size].iconMargin} marginRight="s4" />
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
              <TagRightIcon
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
            </>
          )}
        </ChakraTags>
      );
    case 'outline':
      return (
        <ChakraTags
          minHeight="20px"
          ref={ref}
          height={CHIPHEIGHT[size].height}
          px={PADDING[size]}
          bg={COLORS.bg[theme]}
          borderRadius="br6"
          border="1px solid"
          borderColor={COLORS.borderColor[theme]}
          {...rest}
        >
          {type === 'label' && (
            <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
              {label?.replace(/_/g, ' ')}
            </TagLabel>
          )}

          {type === 'close' && (
            <>
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
              <TagRightIcon
                ml="s4"
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
            </>
          )}

          {type === 'status' && (
            <>
              <TagLeftIcon
                mr="s4"
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
            </>
          )}

          {type === 'avatar' && (
            <>
              <Avatar src={avatar} h="s16" w="s16" my={SIZE[size].iconMargin} marginRight="s4" />
              <TagLabel color={COLORS.text[theme]} fontSize={SIZE[size].fontSize}>
                {label}
              </TagLabel>
              <TagRightIcon
                color={COLORS.text[theme]}
                boxSize={SIZE[size].iconSize}
                as={ICON[type][theme]}
              />
            </>
          )}
        </ChakraTags>
      );

    default:
      return null;
  }
});

export default Chips;

Chips.displayName = 'Chips';
