/**
 * @deprecated
 * You can derive the Colors type from the DefaultChakraTheme:
 *
 * type Colors = DefaultChakraTheme["colors"]
 */
export type Colors = typeof colors;

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#343C46',
  white: '#FFFFFF',

  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },

  gray: {
    100: '#EEF1F7',
    200: '#DFE5EC',
    300: '#CBD0D6',
    400: '#AFB4BB',
    500: '#91979F',
    600: '#636972',
    700: '#474F5C',
    800: '#343C46',
    900: '#1D2530',
  },

  // ! TODO figure this out
  primary: {
    50: '#AFB4BB',
    500: '#381366',
    600: '#1A092F',
    dark: '#00382F',
    light: '#1F4D36',
  },

  secondary: {
    500: '#1C2298',
  },

  tertiary: {
    500: '01AFEF',
  },

  border: {
    layout: '#E0E5EB',
    element: '#CBD0D6',
  },

  background: {
    500: '#EEF2F7',
  },

  red: {
    0: '#FFECEB',
    100: '#FFC5C1',
    200: '#FFA9A3',
    300: '#FF827A',
    400: '#FF6A60',
    500: '#FF4538',
    600: '#E83F33',
    700: '#B53128',
    800: '#8C261F',
    900: '#6B1D18',
  },

  orange: {
    50: '#FFFAF0',
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19',
  },

  yellow: {
    50: '#FFFFF0',
    100: '#FEFCBF',
    200: '#FAF089',
    300: '#F6E05E',
    400: '#ECC94B',
    500: '#D69E2E',
    600: '#B7791F',
    700: '#975A16',
    800: '#744210',
    900: '#5F370E',
  },

  green: {
    0: '#F5F9F7',
    100: '#E6F0EB',
    200: '#C2DBCA',
    300: '#80B496',
    400: '#3D8F5F',
    500: '#006837',
    600: '#005337',
    700: '#003E2F',
    800: '#043430',
    900: '#042B2F',
  },
  accent: {
    0: '#f9ca24',
    100: '#f0932b',
    200: '#d83790',
    300: '#c038cc',
    400: '#9c88f',
    500: '#5f27cd',
    600: '#0984e3',
    700: '#1b959a',
    800: '#85d044',
    900: '#44b556',
  },
};

export default colors;
