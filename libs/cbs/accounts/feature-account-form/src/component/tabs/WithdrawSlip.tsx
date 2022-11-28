import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';

import { Button } from '@myra-ui';

import {
  AvailableWithdrawSlipList,
  CreateWithdrawSlipModal,
  PastWithdrawSlipList,
  TabHeader,
} from '../details';

export const WithdrawSlip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    //   const router = useRouter();

    <>
      <TabHeader
        heading="Withdraw Slip"
        headerButton={
          <Button size="md" justifyContent="start" leftIcon={<AddIcon />} onClick={onOpen}>
            Issue New Withdraw Slip
          </Button>
        }
      />
      <AvailableWithdrawSlipList />
      <PastWithdrawSlipList />
      <CreateWithdrawSlipModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
