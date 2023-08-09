import { DownloadIcon } from '@chakra-ui/icons';

import { Box, Button, Icon } from '@myra-ui';

import { EbankingChip } from '../EbankingChip';

interface TransactionHeaderCardWithChipProps {
  downloadHandler?: () => void;
  chipText: string;
  status: 'success' | 'failure' | 'pending';
}

export const TransactionHeaderCardWithChip = ({
  chipText,
  downloadHandler,
  status,
}: TransactionHeaderCardWithChipProps) => (
  <Box
    display="flex"
    h="3.125rem"
    bg="white"
    px="s16"
    alignItems="center"
    justifyContent="space-between"
  >
    <EbankingChip type={status} text={chipText} />
    <Button variant="link" onClick={downloadHandler}>
      <Icon as={DownloadIcon} />
    </Button>
  </Box>
);
