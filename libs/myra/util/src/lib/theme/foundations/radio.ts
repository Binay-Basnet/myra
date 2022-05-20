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
    bg: 'white',
    borderRadius: 'full',
    border: '2px solid #8C9196',
    _checked: {
      ...(control as any)['_checked'],
      borderRadius: 'full',
      border: '2px solid #8C9196',
      bg: '#006837',
      _before: {
        content: `""`,
        display: 'inline-block',
        pos: 'relative',
        w: '50%',
        h: '50%',
        borderRadius: '100%',
        bg: 'Gray-30',
      },
      _disabled: {
        bg: 'white',
        border: '5px solid #CBD0D6',
      },
    },
    _disabled: {
      bg: 'white',
      border: '2px solid #CBD0D6',
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
    control: { w: 4, h: 4 },
    label: { fontSize: 'md' },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: 'lg' },
  },
  sm: {
    control: { width: 3, height: 3 },
    label: { fontSize: 'sm' },
  },
};

const defaultProps = {
  size: 'sm',
  colorScheme: '#006837',
};

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
