import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { getColor, mode } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
  },
};

const size: Record<string, SystemStyleObject> = {
  default: {
    borderRadius: 'br2',
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
    px: 's12',
    h: '44px',
  },
  sm: {
    borderRadius: 'br2',
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
    px: 's12',
    h: '36px',
  },
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  default: {
    field: size['default'],
    addon: size['default'],
  },
  sm: {
    field: size['sm'],
    addon: size['sm'],
  },
};

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props;
  // const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: '1px solid',
      borderColor: 'gray.300',
      bg: 'gray.0',
      _hover: {
        borderColor: mode('gray.500', 'whiteAlpha.400')(props),
      },
      _active: {
        borderColor: mode('primary.500', 'primary.400')(props),
      },

      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _disabled: {
        opacity: 1,
        borderColor: mode('gray.500', 'whiteAlpha.400')(props),
        bg: 'gray.100',
        cursor: 'not-allowed',
      },
      _invalid: {
        borderColor: 'danger.500',
        boxShadow: 'none',
        _focus: {
          boxShadow: `0 0 0 2px ${getColor(theme, 'danger.300')}`,
        },
      },
      _focus: {
        zIndex: 1,
        borderColor: mode('primary.500', 'primary.400')(props),
        boxShadow: `0 0 0 2px ${getColor(theme, 'primary.300')}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: mode('primary.500', 'primary.400')(props),
        boxShadow: `0 0 0 2px ${getColor(theme, 'primary.300')}`,
      },
    },
    addon: {
      border: '1px solid',
      borderColor: mode('inherit', 'whiteAlpha.50')(props),
      bg: mode('gray.100', 'whiteAlpha.300')(props),
    },
  };
};

const variantUnstyled: PartsStyleObject<typeof parts> = {
  field: {
    bg: 'transparent',
    px: 0,
    height: 'auto',
  },
  addon: {
    bg: 'transparent',
    px: 0,
    height: 'auto',
  },
};

const variants = {
  outline: variantOutline,
  unstyled: variantUnstyled,
};

const defaultProps = {
  size: 'default',
  variant: 'outline',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps,
};
