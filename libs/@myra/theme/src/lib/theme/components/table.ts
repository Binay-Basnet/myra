import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
    // overflow: 'hidden',
  },
  th: {
    minWidth: '10px',
    fontFamily: 'heading',
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 'normal',
    textAlign: 'start',
  },
  td: {
    minWidth: '10px',
    textOverflow: 'hidden',
    textAlign: 'start',
    transition: 'height 0.2s ease',
  },
});

const numericStyles = defineStyle({
  '&[data-is-numeric=true]': {
    textAlign: 'end',
  },
});

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      bg: 'white',
      color: mode('gray.800', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode(`border.layout`, `${c}.700`)(props),
      // maxWidth: '300px',
      ...numericStyles,
    },

    td: {
      color: mode('gray.800', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode('border.layout', `${c}.700`)(props),
      // maxWidth: '300px',
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
    tfoot: {
      th: {
        fontSize: 's3',
      },
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
          td: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantReport = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    table: {
      borderCollapse: 'separate',
      borderSpacing: '0',
      borderRadius: 'br2',
    },
    tfoot: {
      th: {
        bg: 'white',
        border: '1px',
        borderRightWidth: '1px',
        borderTopWidth: '1px',
        borderBottomWidth: '0px',
        borderLeftWidth: '0px',
        color: mode('gray.800', 'gray.400')(props),
        borderColor: mode(`border.layout`, `${c}.700`)(props),
        ...numericStyles,
      },
    },
    thead: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: '1px' },
          td: { borderBottomWidth: 0 },
        },
      },
      th: {
        bg: 'highlight.500',
        border: '1px',
        borderRightWidth: '1px',
        borderTopWidth: '0px',
        borderBottomWidth: '1px',
        borderLeftWidth: '0px',
        borderColor: mode(`border.layout`, `${c}.700`)(props),
        color: mode('gray.800', 'gray.400')(props),
        '&:last-child': {
          borderRight: '0',
        },
        ...numericStyles,
      },
    },
    th: {
      bg: 'highlight.500',
      border: '1px',
      borderRightWidth: '1px',
      borderTopWidth: '0px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px',
      borderColor: mode(`border.layout`, `${c}.700`)(props),
      color: mode('gray.800', 'gray.400')(props),
      '&:last-child': {
        borderRight: '0',
      },
      ...numericStyles,
    },
    tbody: {
      tr: {
        '&:first-of-type': {
          td: {
            borderTopWidth: '0px',
          },
        },
      },
    },
    td: {
      // // TODO! Experiment
      // maxWidth: '250px',

      border: '1px',
      borderColor: mode(`border.layout`, `${c}.700`)(props),
      borderRightWidth: '1px',
      borderTopWidth: '1px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px',

      '&:last-child': {
        borderRight: '0',
      },
      color: mode('gray.800', 'gray.400')(props),
      ...numericStyles,
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props),
    },
  };
});

const variants = {
  simple: variantSimple,
  report: variantReport,
  unstyled: defineStyle({}),
};

const sizes = {
  // Report Tables
  reportCompact: definePartsStyle({
    th: {
      px: 's8',
      lineHeight: '125%',
      fontSize: 's2',
      height: '24px',
    },
    td: {
      px: 's8',
      py: 's4',
      lineHeight: '125%',
      fontSize: 's2',
      height: '26px',
    },
  }),
  report: definePartsStyle({
    th: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '35px',
    },
    td: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '35px',
      minH: '35px',
    },
    tfoot: {
      th: {
        minH: '35px',
      },
    },
  }),

  // Normal Tables
  compact: definePartsStyle({
    th: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '3.125rem',
    },
    td: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '3.125rem',
    },
  }),
  default: definePartsStyle({
    th: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '3.125rem',
    },
    td: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '60px',
    },
  }),
};

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'simple',
    size: 'default',
  },
});
