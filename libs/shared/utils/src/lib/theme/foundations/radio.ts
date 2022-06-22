import { radioAnatomy as parts } from '@chakra-ui/anatomy';
import {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
} from '@chakra-ui/theme-tools';

import Checkbox from './checkbox';

const baseStyleControl: SystemStyleFunction = (props) => {
  const { control = {} } = Checkbox.baseStyle(props);

  return {
    ...control,
    borderRadius: 'full',
    border: '1px solid',
    borderColor: 'neutralColorLight.Gray-50',
    boxShadow: '0px 0px 0px 2px primary.500',
    _checked: {
      ...(control as any)['_checked'],
      borderRadius: 'full',
      border: '2px solid primary.500',
      bg: 'gray.0',
      padding: '1px',
      _before: {
        content: `""`,
        display: 'inline-block',
        pos: 'relative',
        w: '75%',
        h: '75%',
        borderRadius: '100%',
        bg: 'primary.500',
      },
      _disabled: {
        bg: 'white',
        border: '5px solid',
        borderColor: 'disabled.disabled',
      },
      _hover: {
        bg: 'gray.0',
      },
      _focus: {
        outline: 'none',
      },
    },
    _disabled: {
      bg: 'white',
      border: '2px solid',
      borderColor: 'disabled.disabled',
    },
  };
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  label: Checkbox.baseStyle(props).label,
  container: Checkbox.baseStyle(props).container,
  control: baseStyleControl(props),
});

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  md: {
    control: { w: 5, h: 5 },
    label: { fontSize: 'r1' },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: 'lg' },
  },
  sm: {
    control: { width: 3, height: 3 },
    label: { fontSize: 'r1' },
  },
};

const defaultProps = {
  size: 'md',
  colorScheme: 'primary.500',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
