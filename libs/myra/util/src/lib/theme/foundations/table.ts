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
    fontFamily: 'heading',
    fontWeight: 'semibold',
    textTransform: 'capitalize',
    letterSpacing: 'normal',
    textAlign: 'start',
    background: 'white',
  },
  td: {
    textAlign: 'start',
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
      borderBottom: '2px',
      borderColor: mode(`background.500`, `${c}.700`)(props),
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
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const variants = {
  simple: variantSimple,
  unstyled: {},
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  compact: {
    th: {
      px: '6',
      py: '17px',
      lineHeight: '4',
      fontSize: 's3',
    },
    td: {
      px: '6',
      py: '2',
      lineHeight: '5',
      fontSize: 's3',
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
    },
    td: {
      px: '6',
      py: '16px',
      lineHeight: '5',
      fontSize: 's3',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
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
