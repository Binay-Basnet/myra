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
    borderRadius: 'br2',
    borderColor: 'border.element',
    color: 'primary.0',

    _checked: {
      bg: mode(`primary.500`, `primary.500`)(props),
      borderColor: mode(`primary.500`, `primary.500`)(props),
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
      bg: 'none',
      borderColor: mode('disabled.disabled', 'solid')(props),
    },

    _focus: {
      outline: `2px solid`,
      outlineColor: 'primary.300',
      outlineOffset: '1px',
      boxShadow: 'none',
    },

    _invalid: {
      bg: 'danger.0',
      borderColor: mode('danger.500', 'danger.300')(props),

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
  default: {
    control: { w: '18px', h: '18px' },
    label: { fontSize: 'md' },
    icon: { fontSize: '0.625rem' },
  },
};

const defaultProps = {
  size: 'default',
  colorScheme: 'primary.500',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
