import type {
  SystemStyleInterpolation,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { getColor, mode } from '@chakra-ui/theme-tools';

import Input from './input';

const baseStyle: SystemStyleObject = {
  ...Input.baseStyle.field,
  paddingX: '12px',
  paddingY: '8px',
  minHeight: '64px',
  lineHeight: 'short',
  verticalAlign: 'top',
  borderRadius: 'br2',
};

const variants: Record<string, SystemStyleInterpolation> = {
  outline: (props) => {
    const { theme } = props;
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

      addon: {
        border: '1px solid',
        borderColor: mode('inherit', 'whiteAlpha.50')(props),
        bg: mode('gray.100', 'whiteAlpha.300')(props),
      },
    };
  },
  //   flushed: (props) => Input.variants.flushed(props).field ?? {},
  //   filled: (props) => Input.variants.filled(props).field ?? {},
  unstyled: Input.variants.unstyled.field ?? {},
};

const sizes: Record<string, SystemStyleObject> = {
  ...Input.sizes,
};

const defaultProps = {
  size: 'default',
  variant: 'outline',
};

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};
