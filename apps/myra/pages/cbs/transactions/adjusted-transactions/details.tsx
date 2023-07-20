import { ReactElement, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
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
  useGetAllTransactionsDetailQuery,
  useGetEndOfDayDateDataQuery,
  useRevertTransactionMutation,
  useSwitchTransactionYearEndFlagMutation,
} from '@coop/cbs/data-access';
import { AllTransactionDetailPage } from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { ROUTES } from '@coop/cbs/utils';
import { checkDateInFiscalYear } from '@coop/shared/utils';

const DepositDetailsPage = () => {
  const router = useRouter();
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const isCurrentFiscalYear = checkDateInFiscalYear({
    date: new Date(endOfDayData?.transaction?.endOfDayDate?.value?.en),
  });

  const { id } = router.query;

  const queryClient = useQueryClient();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/all-transactions/') ||
          router?.asPath?.includes('/adjusted-transactions/') ||
          router?.asPath?.includes('/ledger-balance-transfer/')),
    }
  );
  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;

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
        options={
          isCurrentFiscalYear
            ? [
                {
                  label: allTransactionsData?.isYearEndAdjustment
                    ? 'Remove Year End Adjustment'
                    : 'Year End Adjustment',
                  handler: () => onToggle(),
                },
                {
                  label: 'Revert Transaction',
                  handler: () => setIsRevertTransactionModalOpen(true),
                },

                { label: 'Print', handler: handlePrintVoucher },
              ]
            : [
                {
                  label: 'Revert Transaction',
                  handler: () => setIsRevertTransactionModalOpen(true),
                },

                { label: 'Print', handler: handlePrintVoucher },
              ]
        }
      />
      <AllTransactionDetailPage printRef={printRef} />
      <YearEndAdjustmentConfirmationDialog
        isAdjusted={!!allTransactionsData?.isYearEndAdjustment}
        isOpen={isOpen}
        handleConfirm={async () => {
          await asyncToast({
            id: 'switch-transaction',
            msgs: {
              loading: 'Flagging Year End Adjustment',
              success: 'Year End Adjustment Flagged',
            },
            onSuccess: () => queryClient.invalidateQueries(['getAllTransactionsDetail']),
            promise: switchTransactionYearEnd({ journalId: String(router.query['id']) }),
          });
        }}
        onClose={onClose}
        onToggle={onToggle}
      />
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

type YearEndAdjustmentConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;

  handleConfirm: () => void;
  isAdjusted: boolean;
};

const YearEndAdjustmentConfirmationDialog = ({
  isOpen,
  onClose,
  onToggle,
  isAdjusted,
  handleConfirm,
}: YearEndAdjustmentConfirmationDialogProps) => {
  const confirmCancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={confirmCancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="border.layout"
          >
            <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
              Year End Adjustment Confirmation
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
            <Text fontSize="s3" fontWeight={400} color="gray.800">
              {!isAdjusted
                ? 'This will make the transaction as previous fiscal year end adjustment'
                : 'This will remove the adjustment from previous fiscal year and make it as current fiscal year'}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={confirmCancelRef} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              onClick={() => {
                onToggle();
                handleConfirm();
              }}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
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
