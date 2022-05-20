import { Text, TextProps } from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface TextFieldsProps extends TextProps {
  variant?:
    | 'bodyLarge'
    | 'bodyRegular'
    | 'formLabel'
    | 'formInput'
    | 'formHelper';
  children?: React.ReactNode;
  color?: string;
}

export function TextFields(props: TextFieldsProps) {
  const { children, variant, ...rest } = props;

  switch (variant) {
    case 'bodyLarge':
      return (
        <Text fontSize="r3" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'bodyRegular':
      return (
        <Text fontSize="r2" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formLabel':
      return (
        <Text fontSize="r1" fontWeight="500" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formInput':
      return (
        <Text fontSize="r2" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    case 'formHelper':
      return (
        <Text fontSize="s3" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
    default:
      return (
        <Text fontSize="r3" fontWeight="400" {...rest} lineHeight="1.5">
          {children}
        </Text>
      );
  }
}

export default TextFields;
