import { Box, Text } from '@myra/dump';

/* eslint-disable-next-line */
export interface ShortcutTabProps {
  shortcut: string;
}

export const ShortcutTab = ({ shortcut }: ShortcutTabProps) => (
    <Box
      px="s10"
      py="s8"
      border="1px"
      borderRadius="br2"
      borderColor="border.layout"
      bg="background.500"
    >
      <Text fontSize="s3" color="black">
        {shortcut}
      </Text>
    </Box>
  )

export default ShortcutTab;
