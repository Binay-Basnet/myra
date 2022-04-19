/* eslint-disable-next-line */
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
type buttonsizes='xl'|'sm'|'md'|'lg'
export interface IProps extends ButtonProps {
  colorScheme:string;
  size:buttonsizes;
  variant?:string;
  isLoading?:boolean;
  label:string;
}

 function Button(props: IProps) {
   const { colorScheme,
    size,
    variant,
    isLoading,
    label,
    ...rest
  } = props;

  return (
    <ChakraButton colorScheme={colorScheme} isLoading={isLoading} variant={variant} size={size} {...rest}>{label}</ChakraButton>
  );
}

export default Button;
