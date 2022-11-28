import { DownloadIcon } from '@chakra-ui/icons';

import { Box, Button, Icon } from '@myra-ui';

import { EbankingChip } from '../EbankingChip';

interface TransactionHeaderCardWithChipProps {
  isSuccess: boolean;
  downloadHandler?: () => void;
  chipText: string;
}

export const TransactionHeaderCardWithChip = ({
  chipText,
  isSuccess,
  downloadHandler,
}: TransactionHeaderCardWithChipProps) => (
  <Box
    display="flex"
    h="50px"
    bg="white"
    px="s16"
    alignItems="center"
    justifyContent="space-between"
  >
    <EbankingChip type={isSuccess ? 'success' : 'failure'} text={chipText} />
    <Button variant="link" onClick={downloadHandler}>
      <Icon as={DownloadIcon} />
    </Button>
  </Box>
);
