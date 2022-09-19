import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
  },

  th: {
    fontFamily: 'inherit',
    fontWeight: 'semibold',
    textTransform: 'capitalize',
    letterSpacing: 'normal',
    textAlign: 'start',
    background: 'white',
  },
  td: {
    textAlign: 'start',
    transition: 'height 0.2s ease',
  },
  caption: {
    mt: 4,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: 'medium',
  },
};

const numericStyles: SystemStyleObject = {
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
};

const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      color: mode('gray.800', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`border.layout`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      color: mode('gray.800', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`border.layout`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tfoot: {
      th: {
        px: 's12',
      },
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
          td: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const variantReport: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      bg: 'gray.100',
      color: mode('gray.800', 'gray.400')(props),
      border: '1px',
      borderColor: mode(`border.element`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      color: mode('gray.800', 'gray.400')(props),
      border: '1px',
      borderColor: mode(`border.element`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
  };
};

const variants = {
  simple: variantSimple,
  report: variantReport,
  unstyled: {},
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  small: {
    th: {
      px: '6',
      py: '17px',
      lineHeight: '4',
      fontSize: 'r1',
      height: '40px',
    },
    td: {
      px: '6',
      py: '2',
      lineHeight: '5',
      fontSize: 'r1',
      height: '35px',
    },
    tfoot: {
      th: {
        px: '3',
        pt: '0',
        pb: '0',
        height: '40px',
      },
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'xs',
    },
  },
  compact: {
    th: {
      px: '6',
      py: '17px',
      lineHeight: '4',
      fontSize: 's3',
      height: '50px',
    },
    td: {
      px: '6',
      py: '2',
      lineHeight: '5',
      fontSize: 's3',
      height: '50px',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'xs',
    },
  },
  default: {
    th: {
      px: '6',
      py: '17px',
      lineHeight: '4',
      fontSize: 's3',
      height: '50px',
    },
    td: {
      px: '6',
      py: '16px',
      lineHeight: '5',
      fontSize: 's3',
      height: '60px',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  report: {
    th: {
      px: 's12',
      lineHeight: '4',
      fontSize: 'r1',
      color: 'gray.800',
      fontWeight: '600',
      height: '44px',
    },
    td: {
      px: 's12',
      lineHeight: '5',
      fontSize: 'r1',
      height: '40px',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'xs',
    },
  },
};

const defaultProps = {
  variant: 'simple',
  size: 'default',
  colorScheme: 'gray',
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
