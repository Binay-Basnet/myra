import {
  ComponentWithAs,
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';
// /* eslint-disable-next-line */
export interface IconProps extends ChakraIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Icon: ComponentWithAs<'svg', IconProps> = (props: IconProps) => {
  const { size, ...rest } = props;

  switch (size) {
    case 'xs':
      return <ChakraIcon h="16px" w="16px" {...rest} />;
    case 'sm':
      return <ChakraIcon h="20px" w="20px" {...rest} />;
    case 'md':
      return <ChakraIcon h="24px" w="24px" {...rest} />;
    case 'lg':
      return <ChakraIcon h="32px" w="32px" {...rest} />;
    default:
      return <ChakraIcon h="16px" w="16px" {...rest} />;
  }
};

export default Icon;
