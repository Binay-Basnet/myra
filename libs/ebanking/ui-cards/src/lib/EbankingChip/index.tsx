import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { Box, Icon, TextFields } from '@myra-ui';

interface EbankingChipProps {
  type: 'success' | 'failure' | 'pending';
  text: string;
}

const bgDict = {
  success: 'success.400',
  failure: 'danger.600',
  pending: 'accent.0',
};

const iconDict = {
  success: IoMdCheckmark,
  failure: IoMdClose,
  pending: AiOutlineClockCircle,
};

export const EbankingChip = ({ text, type }: EbankingChipProps) => (
  <Box
    pr="s8"
    pl="s4"
    py="s4"
    borderRadius="20px"
    display="flex"
    alignItems="center"
    gap="s4"
    bg={bgDict[type]}
  >
    <Box bg="white" display="flex" p="2px" borderRadius="100%" color={bgDict[type]}>
      <Icon as={iconDict[type]} size="sm" />
    </Box>
    <TextFields variant="formLabel" color={type === 'pending' ? 'primary.900' : 'primary.0'}>
      {text}
    </TextFields>
  </Box>
);
