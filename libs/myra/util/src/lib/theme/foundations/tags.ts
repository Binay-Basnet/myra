import { tagAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleInterpolation,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

import Badge from './badge';

const baseStyleContainer: SystemStyleObject = {
  fontWeight: 'medium',
  lineHeight: 1.2,
  outline: 0,
  padding: 's4',
  bg: 'success',
  _focus: {
    boxShadow: 'outline',
  },
  _disabled: {
    bg: 'disabled.disabled',
    textColor: 'disabled.textDisabled',
  },
};

const baseStyleLabel: SystemStyleObject = {
  lineHeight: 1.2,
  overflow: 'visible',
};

const baseStyleCloseButton: SystemStyleObject = {
  fontSize: 's16',
  w: 's12',
  h: 's12',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  borderColor: 'red',
  marginStart: '0.375rem',
  marginEnd: '-0.5',
  marginLeft: 's12',
  _disabled: {
    opacity: 0.4,
    color: 'disabled.textDisabled',
  },
  _focus: {
    boxShadow: 'tagShadow',
    borderRadius: 'none',
    borderColor: 'primary.300',
    color: 'red',
    bg: 'background.500',
  },
  _hover: {
    color: 'danger',
    _disabled: {
      color: 'disabled.textDisabled',
    },
  },
  _active: { opacity: 1, color: 'gray', padding: 's4' },
};

const baseStyle: PartsStyleObject<typeof parts> = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      minH: '1.25rem',
      minW: '1.25rem',
      fontSize: 'xs',
      px: 2,
    },
    closeButton: {
      marginEnd: '-2px',
      marginStart: '0.35rem',
    },
  },
  md: {
    container: {
      minH: '1.5rem',
      minW: '1.5rem',
      fontSize: 'sm',
      px: 2,
    },
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: 'md',
      px: 3,
    },
  },
};

const variants: Record<string, PartsStyleInterpolation<typeof parts>> = {
  subtle: (props) => ({
    container: Badge.variants.subtle(props),
  }),
  solid: (props) => ({
    container: Badge.variants.solid(props),
  }),
  outline: (props) => ({
    container: Badge.variants.outline(props),
  }),
};

const defaultProps = {
  size: 'md',
  variant: 'subtle',
  colorScheme: 'success',
};

export default {
  parts: parts.keys,
  variants,
  baseStyle,
  sizes,
  defaultProps,
};
