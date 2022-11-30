import { radioAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

import { checkboxTheme, runIfFn } from './checkbox';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleControl = defineStyle((props) => {
  const controlStyle = runIfFn(checkboxTheme.baseStyle, props)?.control;

  return {
    ...controlStyle,
    borderRadius: 'full',
    _invalid: {
      _checked: {
        borderRadius: 'full',
        border: '2px solid danger.500',
        bg: 'gray.0',
        padding: '1px',
        _before: {
          content: `""`,
          display: 'inline-block',
          pos: 'relative',
          w: '80%',
          h: '80%',
          borderRadius: '50%',
          bg: 'danger.500',
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
          outline: `2px solid`,
          outlineColor: 'danger.300',
          outlineOffset: '1px',
          boxShadow: 'none',
        },
      },
    },

    _checked: {
      ...controlStyle?.['_checked'],
      borderRadius: 'full',
      border: '2px solid primary.500',
      bg: 'gray.0',
      padding: '1px',
      _before: {
        content: `""`,
        display: 'inline-block',
        pos: 'relative',
        w: '80%',
        h: '80%',
        borderRadius: '50%',
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
        outline: `2px solid`,
        outlineColor: 'primary.300',
        outlineOffset: '1px',
        boxShadow: 'none',
      },
    },
  };
});

const baseStyle = definePartsStyle((props) => ({
  label: checkboxTheme.baseStyle?.(props).label,
  container: checkboxTheme.baseStyle?.(props).container,
  control: baseStyleControl(props),
}));

const sizes = {
  md: definePartsStyle({
    control: { w: '4', h: '4' },
    label: { fontSize: 'md' },
  }),
  lg: definePartsStyle({
    control: { w: '5', h: '5' },
    label: { fontSize: 'lg' },
  }),
  sm: definePartsStyle({
    control: { width: '3', height: '3' },
    label: { fontSize: 'sm' },
  }),
};

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: 'md',
    colorScheme: 'primary',
  },
});
