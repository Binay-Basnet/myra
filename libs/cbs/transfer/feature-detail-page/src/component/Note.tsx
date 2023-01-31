import { Box, Text } from '@myra-ui';

type NoteProps = {
  note: string | undefined | null;
};
export const Note = ({ note }: NoteProps) => (
  <Box
    borderRadius="br2"
    bg="white"
    p="s16"
    h="auto"
    display="flex"
    flexDirection="column"
    gap="s28"
  >
    <Text fontSize="r1" fontWeight="SemiBold">
      Note
    </Text>
    <Text fontWeight="Medium" fontSize="s3" color="gray.700" lineHeight="125%">
      {note}
    </Text>
  </Box>
);
