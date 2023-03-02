import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  StyleFunctionProps,
} from '@chakra-ui/theme-tools';
import { getColor, mode, transparentize } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    p: 's16',
    borderRadius: 'br2',
  },
  title: {
    fontWeight: '600',
    fontSize: 'r1',
    lineHeight: '1.2',
  },
  description: {
    fontWeight: '400',
    color: 'gray.800',
    fontSize: 'r1',
    lineHeight: '1.2',
  },
  icon: {
    flexShrink: 0,
    w: 's16',
    h: 's16',
  },
  spinner: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 5,
  },
};

function getBg(props: StyleFunctionProps): string {
  const { theme, colorScheme: c } = props;
  const lightBg = getColor(theme, `${c}.100`, c);
  const darkBg = transparentize(`${c}.200`, 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

const variantDanger: PartsStyleFunction<typeof parts> = () => ({
  container: {
    bg: 'danger.0',
    border: '1px',
    borderColor: 'danger.500',
  },
  title: {
    color: 'danger.500',
  },
  icon: {
    color: 'danger.500',
  },
});

const variantWarning: PartsStyleFunction<typeof parts> = () => ({
  container: {
    bg: 'warning.0',
    border: '1px',
    borderColor: 'warning.900',
  },
  title: {
    color: 'warning.900',
  },
  icon: {
    color: 'warning.900',
  },
});

const variantInfo: PartsStyleFunction<typeof parts> = () => ({
  container: {
    bg: 'info.0',
    border: '1px',
    borderColor: 'info.900',
  },
  title: {
    color: 'info.900',
  },
  icon: {
    color: 'info.900',
  },
});

const variantSuccess: PartsStyleFunction<typeof parts> = () => ({
  container: {
    bg: 'success.0',
    border: '1px',
    borderColor: 'success.500',
  },
  title: {
    color: 'success.500',
  },
  icon: {
    color: 'success.500',
  },
});

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;
  return {
    container: { bg: getBg(props) },
    icon: { color: mode(`${c}.500`, `${c}.200`)(props) },
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  };
};

const variantLeftAccent: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: '4px',
      borderStartColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  };
};

const variantTopAccent: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      pt: 2,
      borderTopWidth: '4px',
      borderTopColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props),
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
    spinner: {
      color: mode(`${c}.500`, `${c}.200`)(props),
    },
  };
};

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode(`white`, `gray.900`)(props),
    },
  };
};

const variants = {
  subtle: variantSubtle,
  'left-accent': variantLeftAccent,
  'top-accent': variantTopAccent,
  solid: variantSolid,
  //
  error: variantDanger,
  warning: variantWarning,
  success: variantSuccess,
  info: variantInfo,
};

const status = {
  danger: variantDanger,
};

const defaultProps = {
  variant: 'subtle',
  colorScheme: 'blue',
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
  status,
  defaultProps,
};
