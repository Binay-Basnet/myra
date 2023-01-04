import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Icon, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { ChequeTable } from '../components';

export const WithdrawSlip = () => {
  const router = useRouter();
  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text fontSize="r3" fontWeight="600">
          Withdraw Slip
        </Text>
        <Button
          leftIcon={<Icon as={IoAdd} />}
          onClick={() => router.push(ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD)}
        >
          New Withdraw Slip
        </Button>
      </Box>
      <ChequeTable />
    </>
  );
};
