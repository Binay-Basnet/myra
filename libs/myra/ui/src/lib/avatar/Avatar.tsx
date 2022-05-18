import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';
export interface AvatarProps extends ChakraAvatarProps {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  bg?: string;
}

export function Avatar(props: AvatarProps) {
  return <ChakraAvatar size={props.size} {...props} />;
}

export default Avatar;
