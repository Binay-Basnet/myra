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
    0: '#FFFFFF',
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
    dark: '#00382F',
    default: '#006837',
  },

  secondary: {
    0: '#D9FBFB',
    100: '#9EF0F0',
    200: '#3DDBD9',
    300: '#08BDBA',
    400: '#009D9A',
    500: '#007D79',
    600: '#005D5D',
    700: '#004144',
    800: '#043430',
    900: '#022B30',
    default: '#006837',
  },

  danger: {
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
    default: '#FF4538',
  },

  success: {
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
    default: '#006837',
  },

  border: {
    layout: '#E0E5EB',
    element: '#91979F',
  },

  background: {
    500: '#EEF2F7',
  },

  highlight: {
    500: '#EEF1F7',
  },

  disabled: {
    disabled: '#CBD0D6',
    textDisabled: '#91979F',
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
    400: '#9c88ff',
    500: '#5f27cd',
    600: '#0984e3',
    700: '#1b959a',
    800: '#85d044',
    900: '#44b556',
  },

  neutralColorLight: {
    'Gray-0': '#FFFFFF',
    'Gray-10': '#EEF1F7',
    'Gray-20': '#DFE5EC',
    'Gray-30': '#CBD0D6',
    'Gray-40': '#AFB4BB',
    'Gray-50': '#91979F',
    'Gray-60': '#636972',
    'Gray-70': '#474F5C',
    'Gray-80': '#343C46',
    'Gray-90': '#1D2530',
  },
  // accent: {
  //   Gray-0: '#f9ca24',
  //   Gray-10: '#f0932b',
  //   Gray-20: '#d83790',
  //   Gray-30: '#c038cc',
  //   Gray-40: '#9c88ff',
  //   Gray-50: '#5f27cd',
  //   Gray-60: '#0984e3',
  //   Gray-70: '#1b959a',
  //   Gray-80: '#85d044',
  //   Gray-90: '#44b556',
  // },
};

export default colors;
