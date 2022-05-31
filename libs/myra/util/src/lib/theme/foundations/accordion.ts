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
  fontSize: '1rem',
  _focus: {
    boxShadow: 'outline',
  },
  _hover: {
    bg: 'blackAlpha.50',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  px: 4,
  py: 2,
};

const baseStylePanel: SystemStyleObject = {
  pt: 2,
  px: 4,
  pb: 5,
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
