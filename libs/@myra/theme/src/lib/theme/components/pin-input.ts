import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { defineStyle } from '@chakra-ui/styled-system';
import type { PartsStyleObject, SystemStyleObject } from '@chakra-ui/theme-tools';
import { getColor, mode } from '@chakra-ui/theme-tools';

import inputTheme from './input';

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  textAlign: 'center',
});

const size: Record<string, SystemStyleObject> = {
  md: {
    borderRadius: 'br2',
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
    // px: 's12',
    h: 's40',
  },
  sm: {
    borderRadius: 'br2',
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
    // px: 's12',
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

const variantOutline = (props: Record<string, any>) => {
  const { theme } = props;
  // const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
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
  };
};

const variantUnstyled = {
  bg: 'transparent',
  px: 0,
  height: 'auto',
};

const variants = {
  outline: variantOutline,
  unstyled: variantUnstyled,
};

const defaultProps = {
  size: 'md',
  variant: 'outline',
};

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};
