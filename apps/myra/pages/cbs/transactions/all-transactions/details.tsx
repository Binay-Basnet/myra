import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, DetailPageHeader, MainLayout, Modal, Text, toast } from '@myra-ui';

import { useRevertTransactionMutation } from '@coop/cbs/data-access';
import { AllTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { ROUTES } from '@coop/cbs/utils';

const DepositDetailsPage = () => {
  const router = useRouter();
  const [isRevertTransactionModalOpen, setIsRevertTransactionModalOpen] = useState(false);
  const handleRevertTransactionModalClose = () => {
    setIsRevertTransactionModalOpen(false);
  };
  const { mutateAsync } = useRevertTransactionMutation();

  return (
    <>
      <DetailPageHeader
        title="Transaction List"
        options={[
          { label: 'Revert Transaction', handler: () => setIsRevertTransactionModalOpen(true) },
        ]}
      />
      <AllTransactionDetailPage />
      <Modal
        open={isRevertTransactionModalOpen}
        onClose={handleRevertTransactionModalClose}
        isCentered
        title="Revert Transaction"
        width="3xl"
      >
        <Box display="flex" flexDir="column">
          <Text fontSize="r1">Are you sure you want to reverse this transaction?</Text>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => handleRevertTransactionModalClose()}>Cancel</Button>
            <Button
              onClick={() =>
                mutateAsync({ journalId: router?.query?.['id'] as string })
                  .then(() => {
                    router.push(ROUTES?.CBS_TRANS_ALL_TRANSACTION_LIST);
                    handleRevertTransactionModalClose();
                    toast({
                      id: 'revert-transaction',
                      type: 'success',
                      message: 'Transaction reverted successfully!!!',
                    });
                  })
                  .catch(() =>
                    toast({
                      id: 'revert-transaction',
                      type: 'error',
                      message: 'Something went wrong!!!',
                    })
                  )
              }
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

DepositDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default DepositDetailsPage;
