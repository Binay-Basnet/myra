import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Icon, Text } from '@myra-ui';

import { ChequeTable } from '../components';

export const WithdrawSlip = () => {
  const router = useRouter();
  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text fontSize="r3" fontWeight="600">
          Cheques
        </Text>
        <Button leftIcon={<Icon as={IoAdd} onClick={() => router.push('/withdraw/cheque-book')} />}>
          New Withdraw Slip
        </Button>
      </Box>
      <ChequeTable />
    </>
  );
};
