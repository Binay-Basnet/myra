import type {
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { mode, transparentize } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  textTransform: 'initial',
  lineHeight: '0',
  borderRadius: '4px',
  px: '12px',
  py: '8px',
  fontWeight: 'medium',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _focus: {
    boxShadow: 'none',
    // color: 'yellow.500',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  _hover: {
    _disabled: {
      bg: 'initial',
    },
  },
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  if (c === 'gray') {
    return {
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: 'transparent',
    // bg: 'gray.200',
    _hover: {
      bg: mode(`${c}.100`, `${c}.200`)(props),
    },
    _active: {
      bg: mode(`${c}.100`, `${c}.200`)(props),
    },
  };
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.800`, `whiteAlpha.300`)(props);

  return {
    // bg: 'none',

    border: '1px solid',
    borderColor: c === 'gray' ? borderColor : `${c}.500`,
    color: c === 'gray' ? 'gray.500' : `${c}.500`,

    _hover: {
      bg: 'none',
      borderColor: c === 'gray' ? borderColor : `${c}.700`,
      color: c === 'gray' ? 'gray.500' : `${c}.700`,
    },
    _active: {
      bg: 'none',
    },
  };
};

type AccessibleColor = {
  bg?: string;
  color?: string;
  hoverBg?: string;
  activeBg?: string;
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'gray.0',
  },
  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    const bg = mode(`gray.600`, `whiteAlpha.200`)(props);

    return {
      bg,
      color: 'white',
      _hover: {
        bg: mode(`gray.700`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.800`, `whiteAlpha.400`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  const background = mode(bg, `${c}.200`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
};

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 'auto',
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: 'underline',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
};

const variantUnstyled: SystemStyleObject = {
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: 'r1',
    px: 3,
    py: 3,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'sm',
    px: 3,
    py: 2,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'xs',
    px: 3,
    py: 1,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 3,
    py: 1,
  },
};

const defaultProps = {
  variant: 'solid',
  size: 'md',
  colorScheme: 'primary',
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
