import defaultColors from '../../theme/foundations/colors';

/**
 * @deprecated
 * You can derive the Colors type from the DefaultChakraTheme:
 *
 * type Colors = DefaultChakraTheme["colors"]
 */
export type Colors = typeof colors;

const colors = {
  ...defaultColors,

  // ! TODO figure this out
  primary: {
    0: '#EFEAF4',
    100: '#CEC0DE',
    200: '#AD97C8',
    300: '#8C6DB2',
    400: '#6D4D93',
    500: '#5b2e91',
    600: '#492574',
    700: '#371C57',
    800: '#2E1749',
    900: '#12091D',
    dark: '#12091D',
    default: '#5b2e91',
  },
};

export default colors;
