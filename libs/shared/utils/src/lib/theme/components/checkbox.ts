import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: any): value is Function => typeof value === 'function';

export function runIfFn<T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const $size = cssVar('myra');

const baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    w: $size.reference,
    h: $size.reference,
    transitionProperty: 'border',
    transitionDuration: 'normal',
    border: '2px solid',
    borderRadius: 'br2',
    borderColor: 'border.element',
    color: 'primary.0',

    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode('white', 'gray.900')(props),

      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props),
      },

      _disabled: {
        borderColor: mode('gray.200', 'transparent')(props),
        bg: mode('gray.200', 'whiteAlpha.300')(props),
        color: mode('gray.500', 'whiteAlpha.500')(props),
      },
      _invalid: {
        borderColor: mode('danger.500', 'danger.300')(props),
        bg: mode('danger.500', 'danger.900')(props),
      },
    },

    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode('white', 'gray.900')(props),
    },

    _disabled: {
      bg: mode('gray.100', 'whiteAlpha.100')(props),
      borderColor: mode('gray.100', 'transparent')(props),
    },

    _focus: {
      outline: `2px solid`,
      outlineColor: 'primary.300',
      outlineOffset: '1px',
      boxShadow: 'none',
    },

    _invalid: {
      borderColor: mode('danger.500', 'danger.300')(props),
      bg: mode('danger.0', 'danger.100')(props),
      _focus: {
        outline: `2px solid`,
        outlineColor: 'danger.300',
        outlineOffset: '1px',
        boxShadow: 'none',
      },
    },
  };
});

const baseStyleContainer = defineStyle({
  _disabled: { cursor: 'not-allowed' },
});

const baseStyleLabel = defineStyle({
  userSelect: 'none',
  _disabled: { opacity: 0.4 },
});

const baseStyleIcon = defineStyle({
  transitionProperty: 'transform',
  transitionDuration: 'normal',
});

const baseStyle = definePartsStyle((props) => ({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: runIfFn(baseStyleControl, props),
  label: baseStyleLabel,
}));

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: 'sizes.3' },
    label: { fontSize: 'sm' },
    icon: { fontSize: '3xs' },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: '18px' },
    label: { fontSize: 's3', fontWeight: 'medium' },
    icon: { fontSize: 's1' },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: 'sizes.5' },
    label: { fontSize: 'lg' },
    icon: { fontSize: '2xs' },
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
    colorScheme: 'primary',
  },
});
