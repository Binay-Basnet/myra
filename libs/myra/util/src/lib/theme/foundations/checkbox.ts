import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const baseStyleControl: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  return {
    w: '100%',
    transitionProperty: 'box-shadow',
    transitionDuration: 'normal',
    border: '2px solid',
    borderRadius: '4px',
    borderColor: 'gray.500',
    color: 'primary.0',

    _checked: {
      bg: mode(`primary.500`, `primary.500`)(props),
      borderColor: mode(`primary.300`, `primary.300`)(props),
      borderRadius: '4px',

      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props),
      },

      _disabled: {
        borderColor: mode('disabled.disabled', 'transparent')(props),
        bg: mode('disabled.disabled', 'whiteAlpha.300')(props),
        color: mode('neutralColorLightGray.0', 'whiteAlpha.500')(props),
      },
    },

    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode('white', 'gray.900')(props),
    },

    _disabled: {
      bg: mode('gray.100', 'whiteAlpha.100')(props),
      borderColor: mode('disabled.disabled', 'solid')(props),
    },

    _focus: {
      boxShadow: '2px 2px 2px 2px primary.300',
      borderColor: mode('primary.300', 'primary.300')(props),
    },

    _invalid: {
      bg: 'danger.0',
      borderColor: mode('red.500', 'red.300')(props),

      _checked: {
        bg: mode(`danger.500`, `danger.200`)(props),
        borderColor: mode(`danger.500`, `danger.200`)(props),
        color: mode('white', 'gray.900')(props),
      },
    },
  };
};

const baseStyleContainer: SystemStyleObject = {
  _disabled: { cursor: 'not-allowed' },
};

const baseStyleLabel: SystemStyleObject = {
  userSelect: 'none',
  _disabled: { opacity: 0.4 },
};

const baseStyleIcon: SystemStyleObject = {
  transitionProperty: 'transform',
  transitionDuration: 'normal',
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: baseStyleControl(props),
  label: baseStyleLabel,
});

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    control: { h: 3, w: 3 },
    label: { fontSize: 'sm' },
    icon: { fontSize: '0.45rem' },
  },
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: 'md' },
    icon: { fontSize: '0.625rem' },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: 'lg' },
    icon: { fontSize: '0.625rem' },
  },
};

const defaultProps = {
  size: 'md',
  colorScheme: 'primary.500',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
