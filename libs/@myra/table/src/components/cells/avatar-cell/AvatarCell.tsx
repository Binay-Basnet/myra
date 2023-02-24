import { Avatar, Box, Text } from '@myra-ui';

interface IAvatarCellProps {
  name?: string | null;
  src?: string | null;
}

export const AvatarCell = ({ name, src }: IAvatarCellProps) => (
  <Box display="flex" alignItems="center" gap="s12">
    {name && <Avatar name={name} size="sm" src={src as string} />}
    <Text fontSize="s3" textTransform="capitalize" textOverflow="ellipsis" overflow="hidden">
      {name as string}
    </Text>
  </Box>
);
