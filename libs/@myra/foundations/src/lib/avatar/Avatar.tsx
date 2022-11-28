import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';

const SIZE = {
  '2xs': 's16',
  xs: 's24',
  sm: 's32',
  md: 's48',
  lg: 's64',
};

export interface AvatarProps extends ChakraAvatarProps {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';
}

export const Avatar = ({ size = 'md', shape = 'circle', ...rest }: AvatarProps) => (
  <ChakraAvatar
    borderRadius={shape === 'circle' ? '100%' : 'br2'}
    w={SIZE[size]}
    h={SIZE[size]}
    {...rest}
  />
);

export default Avatar;
