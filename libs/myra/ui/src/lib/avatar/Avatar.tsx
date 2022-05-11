import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';
export interface AvatarProps extends ChakraAvatarProps {
  size?: 'sm' | 'md' | 'xs';
}

export function Avatar(props: AvatarProps) {
  return <ChakraAvatar size={props.size} {...props} />;
}

export default Avatar;
