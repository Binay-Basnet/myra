import { Text, TextProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface TextFieldsProps extends TextProps {
  variant?:
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
    | string;
  children?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export function TextFields(props: TextFieldsProps) {
  const { children, variant, onClick, ...rest } = props;

  switch (variant) {
    case 'bodyLarge':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'bodySmall':
      return (
        <Text fontSize="s2" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'bodyRegular':
      return (
        <Text fontSize="r1" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formLabel':
      return (
        <Text fontSize="s3" fontWeight="medium" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formInput':
      return (
        <Text fontSize="r1" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formHelper':
      return (
        <Text fontSize="s3" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'tableHeader':
      return (
        <Text fontSize="r1" fontWeight="600" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'pageHeader':
      return (
        <Text fontSize="r2" fontWeight="600" {...rest} lineHeight="1.3">
          {children}
        </Text>
      );
    case 'tabs':
      return (
        <Text fontSize="r1" fontWeight="600" {...rest} lineHeight="1.3">
          {children}
        </Text>
      );
    case 'switch':
      return (
        <Text
          fontSize="r1"
          color="neutralColorLight.Gray-80"
          fontWeight="500"
          {...rest}
          lineHeight="1.3"
        >
          {children}
        </Text>
      );

    case 'stickyCardHeader':
      return (
        <Text fontSize="r3" fontWeight="500" lineHeight="1.3">
          {children}
        </Text>
      );
    case 'navItems':
      return (
        <Text fontSize="r1" fontWeight="500" lineHeight="1.3">
          {children}
        </Text>
      );

    case 'link':
      return (
        <Text
          fontSize="r1"
          color="primary.500"
          fontWeight="500"
          lineHeight="17px"
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
          onClick={onClick}
        >
          {children}
        </Text>
      );

    default:
      return (
        <Text fontSize="r1" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
  }
}

export default TextFields;
