import { Text as ChakraText, TextProps as ChakraProps } from '@chakra-ui/react';

type Variant =
  | 'bodySmall'
  | 'bodyLarge'
  | 'bodyRegular'
  | 'formLabel'
  | 'formInput'
  | 'formHelper'
  | 'tableHeader'
  | 'pageHeader'
  | 'tabs'
  | 'switch'
  | 'stickyCardHeader'
  | 'link'
  | 'navItems'
  | 'default';

export interface TextProps extends ChakraProps {
  variant?: Variant;
}

const defaultConfig = {
  bodyLarge: {
    fontSize: 'r2',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  bodySmall: {
    fontSize: 's2',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  bodyRegular: {
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  formInput: {
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  formLabel: {
    fontSize: 's3',
    fontWeight: '500',
    lineHeight: '1.5',
  },
  formHelper: {
    fontSize: 's3',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  tableHeader: {
    fontSize: 'r1',
    fontWeight: '600',
    lineHeight: '1.5',
  },

  pageHeader: {
    fontSize: 'r1',
    fontWeight: '600',
    lineHeight: '1.3',
  },
  tabs: {
    fontSize: 'r1',
    fontWeight: '600',
    lineHeight: '1.3',
  },

  switch: {
    fontSize: 'r1',
    fontWeight: '500',
    lineHeight: '1.3',
  },

  stickyCardHeader: {
    fontSize: 'r4',
    fontWeight: '500',
    lineHeight: '1.3',
  },
  navItems: {
    fontSize: 'r1',
    fontWeight: '500',
    lineHeight: '1.3',
  },

  default: {},
};

export const Text = (props: TextProps) => {
  const { children, variant, ...rest } = props;

  if (variant === 'link') {
    return (
      <Text
        fontSize="r1"
        color="primary.500"
        fontWeight="500"
        lineHeight="17px"
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
        {...rest}
      >
        {children}
      </Text>
    );
  }

  return (
    <ChakraText {...rest} {...defaultConfig[variant || 'default']}>
      {children}
    </ChakraText>
  );
};

export default Text;
