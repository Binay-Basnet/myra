import { ReactElement, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  DetailPageHeader,
  MainLayout,
  Modal,
  Text,
  toast,
} from '@myra-ui';

import {
  useRevertTransactionMutation,
  useSwitchTransactionYearEndFlagMutation,
} from '@coop/cbs/data-access';
import { AllTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { ROUTES } from '@coop/cbs/utils';

const DepositDetailsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: switchTransactionYearEnd } = useSwitchTransactionYearEndFlagMutation();

  const [isRevertTransactionModalOpen, setIsRevertTransactionModalOpen] = useState(false);
  const handleRevertTransactionModalClose = () => {
    setIsRevertTransactionModalOpen(false);
  };
  const { mutateAsync } = useRevertTransactionMutation();

  const printRef = useRef<HTMLInputElement | null>(null);

  const handlePrintVoucher = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <DetailPageHeader
        title="Transaction List"
        options={[
          {
            label: 'Flag Year End Adjustment',
            handler: async () => {
              await asyncToast({
                id: 'switch-transaction',
                msgs: {
                  loading: 'Flagging Year End Adjustment',
                  success: 'Year End Adjustment Flagged',
                },
                onSuccess: () => queryClient.invalidateQueries(['getAllTransactionsDetail']),
                promise: switchTransactionYearEnd({ journalId: String(router.query['id']) }),
              });
            },
          },
          { label: 'Revert Transaction', handler: () => setIsRevertTransactionModalOpen(true) },

          { label: 'Print', handler: handlePrintVoucher },
        ]}
      />
      <AllTransactionDetailPage printRef={printRef} />
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
