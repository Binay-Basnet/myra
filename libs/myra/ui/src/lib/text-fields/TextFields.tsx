import { Text, TextProps } from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface TextFieldsProps extends TextProps {
  variant?: string;
  children?: React.ReactNode;
  color?: string;
}

export function TextFields(props: TextFieldsProps) {
  const { children, variant, ...rest } = props;

  switch (variant) {
    case 'bodyLarge':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
    case 'bodyRegular':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
    case 'formLabel':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
    case 'formInput':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
    case 'formHelper':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
    default:
      return (
        <Text fontSize="r3" fontWeight="400" {...rest}>
          {children}
        </Text>
      );
  }
}

export default TextFields;
