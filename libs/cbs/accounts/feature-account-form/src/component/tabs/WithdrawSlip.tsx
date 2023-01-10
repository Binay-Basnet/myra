import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';

import { Alert, Box, Button } from '@myra-ui';

import { ObjState, useAccountDetails } from '@coop/cbs/data-access';

import {
  AvailableWithdrawSlipList,
  CreateWithdrawSlipModal,
  PastWithdrawSlipList,
  TabHeader,
} from '../details';

export const WithdrawSlip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { accountDetails } = useAccountDetails();
  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  return (
    //   const router = useRouter();

    <>
      <TabHeader
        heading="Withdraw Slip"
        headerButton={
          isClosed ? null : (
            <Button size="md" justifyContent="start" leftIcon={<AddIcon />} onClick={onOpen}>
              Issue New Withdraw Slip
            </Button>
          )
        }
      />
      {isClosed && (
        <Alert
          status="warning"
          title="Account Closed"
          subtitle="Withdraw Slip service cannot continue as the account has been closed."
          hideCloseIcon
        />
      )}

      {!isClosed && (
        <Box display="flex" flexDir="column" gap="s16">
          <AvailableWithdrawSlipList />
          <PastWithdrawSlipList />
          <CreateWithdrawSlipModal isOpen={isOpen} onClose={onClose} />
        </Box>
      )}
    </>
  );
};
