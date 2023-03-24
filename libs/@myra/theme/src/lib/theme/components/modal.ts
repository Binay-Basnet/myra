import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const baseStyleOverlay: SystemStyleObject = {
  bg: 'blackAlpha.600',
  zIndex: 'modal',
};

const baseStyleDialogContainer: SystemStyleFunction = (props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    display: 'flex',
    zIndex: 'modal',
    justifyContent: 'center',
    alignItems: isCentered ? 'center' : 'flex-start',
    overflow: scrollBehavior === 'inside' ? 'hidden' : 'auto',
  };
};

const baseStyleDialog: SystemStyleFunction = (props) => ({
  borderRadius: 'md',
  bg: mode('white', 'gray.700')(props),
  color: 'inherit',
  my: '60px',
  zIndex: 'modal',
  maxHeight: '80vh',
  height: 'auto',
  boxShadow: 'lg',
});

const baseStyleHeader: SystemStyleObject = {
  px: 's16',
  py: 0,
  fontSize: 'xl',
  fontWeight: 'semibold',
  flex: 'none',
  height: '3.125rem',

  display: 'flex',
  alignItems: 'center',
};

const baseStyleCloseButton: SystemStyleObject = {
  position: 'absolute',
  top: 2,
  insetEnd: 3,
};

const baseStyleBody: SystemStyleFunction = (props) => {
  const { scrollBehavior } = props;
  return {
    px: 's16',
    py: 2,
    flex: 1,
    overflowY: 'auto',
    overflow: scrollBehavior === 'inside' ? 'auto' : undefined,
  };
};

const baseStyleFooter: SystemStyleObject = {
  px: 6,
  py: 4,
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: baseStyleDialogContainer(props),
  dialog: baseStyleDialog(props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: baseStyleBody(props),
  footer: baseStyleFooter,
});

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string): PartsStyleObject<typeof parts> {
  if (value === 'full') {
    return {
      dialog: {
        maxW: '100vw',
        minH: '100vh',
        '@supports(min-height: -webkit-fill-available)': {
          minH: '-webkit-fill-available',
        },
        my: 0,
      },
    };
  }
  return {
    dialog: { maxW: value },
  };
}

const sizes = {
  xs: getSize('xs'),
  sm: getSize('sm'),
  md: getSize('md'),
  lg: getSize('lg'),
  xl: getSize('xl'),
  '2xl': getSize('2xl'),
  '3xl': getSize('3xl'),
  '4xl': getSize('4xl'),
  '5xl': getSize('5xl'),
  '6xl': getSize('6xl'),
  full: getSize('full'),
};

const defaultProps = {
  size: '2xl',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
