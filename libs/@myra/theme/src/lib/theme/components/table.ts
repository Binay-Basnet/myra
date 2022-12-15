// import { tableAnatomy as parts } from '@chakra-ui/anatomy';
// import type {
//   PartsStyleFunction,
//   PartsStyleObject,
//   SystemStyleObject,
// } from '@chakra-ui/theme-tools';
// import { mode } from '@chakra-ui/theme-tools';
//
// const baseStyle: PartsStyleObject<typeof parts> = {
//   table: {
//     fontVariantNumeric: 'lining-nums tabular-nums',
//     borderCollapse: 'separate',
//     borderSpacing: '0',
//     border: '1px',
//     borderColor: 'border.layout',
//     borderRadius: '10px',
//     width: 'full',
//   },
//
//   th: {
//     fontFamily: 'inherit',
//     fontWeight: 'semibold',
//     textTransform: 'capitalize',
//     letterSpacing: 'normal',
//     textAlign: 'start',
//     background: 'white',
//   },
//   td: {
//     textAlign: 'start',
//     transition: 'height 0.2s ease',
//   },
//   caption: {
//     mt: 4,
//     fontFamily: 'Inter',
//     textAlign: 'center',
//     fontWeight: 'medium',
//   },
// };
//
// const numericStyles: SystemStyleObject = {
//   '&[data-is-numeric=true]': {
//     textAlign: 'end',
//   },
// };
//
// const variantSimple: PartsStyleFunction<typeof parts> = (props) => {
//   const { colorScheme: c } = props;
//
//   return {
//     th: {
//       color: mode('gray.800', 'gray.400')(props),
//       borderBottom: '1px',
//       borderColor: mode(`border.layout`, `${c}.700`)(props),
//       ...numericStyles,
//     },
//     td: {
//       color: mode('gray.800', 'gray.400')(props),
//       borderBottom: '1px',
//       borderColor: mode(`border.layout`, `${c}.700`)(props),
//       ...numericStyles,
//     },
//     caption: {
//       color: mode('gray.600', 'gray.100')(props),
//     },
//     tfoot: {
//       th: {
//         px: 's12',
//       },
//       tr: {
//         '&:last-of-type': {
//           th: { borderBottomWidth: 0 },
//           td: { borderBottomWidth: 0 },
//         },
//       },
//     },
//   };
// };
//
// const variantReport: PartsStyleFunction<typeof parts> = (props) => {
//   const { colorScheme: c } = props;
//
//   return {
//     tfoot: {
//       th: {
//         bg: 'white',
//         color: mode('gray.800', 'gray.400')(props),
//         border: '1px',
//         borderColor: mode(`border.layout`, `${c}.700`)(props),
//         ...numericStyles,
//       },
//     },
//     th: {
//       bg: 'gray.100',
//       color: mode('gray.800', 'gray.400')(props),
//       ...numericStyles,
//     },
//     td: {
//       color: mode('gray.800', 'gray.400')(props),
//       border: '1px',
//       borderColor: mode(`border.layout`, `${c}.700`)(props),
//       ...numericStyles,
//     },
//     caption: {
//       color: mode('gray.600', 'gray.100')(props),
//     },
//   };
// };
//
// const variants = {
//   simple: variantSimple,
//   report: variantReport,
//   unstyled: {},
// };
//
// const sizes: Record<string, PartsStyleObject<typeof parts>> = {
//   small: {
//     th: {
//       px: '6',
//       py: '17px',
//       lineHeight: '4',
//       fontSize: 'r1',
//       height: '40px',
//     },
//     td: {
//       px: '6',
//       py: '2',
//       lineHeight: '5',
//       fontSize: 'r1',
//       height: '35px',
//     },
//     tfoot: {
//       th: {
//         px: '3',
//         pt: '0',
//         pb: '0',
//         height: '40px',
//       },
//     },
//     caption: {
//       px: '4',
//       py: '2',
//       fontSize: 'xs',
//     },
//   },
//   compact: {
//     th: {
//       px: '6',
//       py: '17px',
//       lineHeight: '4',
//       fontSize: 's3',
//       height: '50px',
//     },
//     td: {
//       px: '6',
//       py: '2',
//       lineHeight: '5',
//       fontSize: 's3',
//       height: '50px',
//     },
//     caption: {
//       px: '4',
//       py: '2',
//       fontSize: 'xs',
//     },
//   },
//   default: {
//     th: {
//       px: '6',
//       py: '17px',
//       lineHeight: '4',
//       fontSize: 's3',
//       height: '50px',
//     },
//     td: {
//       px: '6',
//       py: '16px',
//       lineHeight: '5',
//       fontSize: 's3',
//       height: '60px',
//     },
//     caption: {
//       px: '6',
//       py: '2',
//       fontSize: 'sm',
//     },
//   },
//   report: {
//     th: {
//       px: 's12',
//       lineHeight: '4',
//       fontSize: 'r1',
//       color: 'gray.800',
//       fontWeight: '600',
//       height: '44px',
//     },
//     td: {
//       px: 's12',
//       lineHeight: '5',
//       fontSize: 'r1',
//       height: '40px',
//     },
//     caption: {
//       px: '4',
//       py: '2',
//       fontSize: 'xs',
//     },
//   },
// };
//
// const defaultProps = {
//   variant: 'simple',
//   size: 'default',
//   colorScheme: 'gray',
// };
//
// export default {
//   parts: parts.keys,
//   baseStyle,
//   variants,
//   sizes,
//   defaultProps,
// };

import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
    width: 'full',
    overflow: 'hidden',
  },
  th: {
    minWidth: '100px',
    fontFamily: 'heading',
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 'normal',
    textAlign: 'start',
  },
  td: {
    minWidth: '100px',
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
      maxWidth: '300px',
      ...numericStyles,
    },

    td: {
      color: mode('gray.800', 'gray.400')(props),
      borderBottom: '1px',
      borderColor: mode('border.layout', `${c}.700`)(props),
      maxWidth: '300px',
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
      border: '1px',
      borderColor: 'border.layout',
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
    },
  }),

  // Normal Tables
  compact: definePartsStyle({
    th: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '50px',
    },
    td: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '50px',
    },
  }),
  default: definePartsStyle({
    th: {
      px: 's16',
      lineHeight: '125%',
      fontSize: 's3',
      height: '50px',
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
