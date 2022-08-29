import { IoCloseOutline } from 'react-icons/io5';

import Box from '../box/Box';
import Icon from '../icon/Icon';
import IconButton from '../icon-button/IconButton';
import Text from '../text/Text';

/* eslint-disable-next-line */
export interface QuickLinksProps {
  text: string;
}

export function QuickLinks({ text }: QuickLinksProps) {
  return (
    <Box
      bg="gray.0"
      display="flex"
      p="s20"
      gap="s16"
      justifyContent="flex-start"
      alignItems="center"
      borderRadius="br2"
    >
      <IconButton
        variant={'ghost'}
        aria-label="close"
        icon={<Icon as={IoCloseOutline} size="sm" />}
      />
      <Text fontWeight="Regular" fontSize="s3" color="gray.800">
        {text}
      </Text>
    </Box>
  );
}

export default QuickLinks;
