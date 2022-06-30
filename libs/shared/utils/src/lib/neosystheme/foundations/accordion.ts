import { accordionAnatomy as parts } from '@chakra-ui/anatomy';
import type {
  PartsStyleObject,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const baseStyleContainer: SystemStyleObject = {
  bg: 'gray.0',
  borderRadius: 'br2',
  border: '1px solid #E0E5EB',
  _last: {
    borderBottomWidth: '1px',
  },
};

const baseStyleButton: SystemStyleObject = {
  transitionProperty: 'common',
  transitionDuration: 'normal',
  boxShadow: 'none',
  fontSize: '1rem',
  _focusVisible: {
    boxShadow: 'none',
  },
  _focus: {
    boxShadow: 'none',
  },
  _expanded: {
    boxShadow: 'none',
    bg: 'background.500',
  },
  _close: {
    bg: 'red',
  },
  _hover: {
    boxShadow: 'none',
    bg: 'background.500',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  px: 4,
  py: 2,
};

const baseStylePanel: SystemStyleObject = {
  py: 's16',
  px: 's16',
};

const baseStyleIcon: SystemStyleObject = {
  fontSize: '1.25em',
};

const baseStyle: PartsStyleObject<typeof parts> = {
  root: {},
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon,
};

export default {
  parts: parts.keys,
  baseStyle,
};
