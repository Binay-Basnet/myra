import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { asyncToast, Box, DetailCardContent, Grid, GridItem, Modal } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  CashValue,
  DenominationValue,
  TellerActivityEntry,
  TellerActivityState,
  TransferRequestAction,
  useSetTellerTransferActionMutation,
} from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';

interface ITellerTransferApproveModalProps {
  transfer: TellerActivityEntry;
  approveModal: ReturnType<typeof useDisclosure>;
}

const cashOptions: Record<CashValue, string> = {
  [CashValue.Cash_1000]: '1000x',
  [CashValue.Cash_500]: '500x',
  [CashValue.Cash_100]: '100x',
  [CashValue.Cash_50]: '50x',
  [CashValue.Cash_25]: '25x',
  [CashValue.Cash_20]: '20x',
  [CashValue.Cash_10]: '10x',
  [CashValue.Cash_5]: '5x',
  [CashValue.Cash_2]: '2x',
  [CashValue.Cash_1]: '1x',
};

export const TellerTransferApproveModal = ({
  approveModal,
  transfer,
}: ITellerTransferApproveModalProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      declineReason: '',
    },
  });

  const { isOpen, onClose, onToggle } = approveModal;

  const { mutateAsync: approveOrDecline } = useSetTellerTransferActionMutation();

  const {
    isOpen: declineIsOpen,
    onClose: declineIsOnClose,
    onToggle: declineIsOnToggle,
  } = useDisclosure();

  const handleApprove = () => {
    asyncToast({
      id: 'approve-teller-transfer-request',
      msgs: {
        loading: 'Approving Request',
        success: 'Request Approved !',
      },
      promise: approveOrDecline({
        requestId: router.query['id'] as string,
        action: TransferRequestAction.Approve,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getTellerTransactionListData']);
        // queryClient.invalidateQueries(['getMe']);

        onToggle();
        methods.reset();
        methods.setValue('declineReason', '');
      },
    });
  };

  const handleDecline = () => {
    asyncToast({
      id: 'decline-teller-transfer-request',
      msgs: {
        loading: 'Declining Request',
        success: 'Request Declined !',
      },
      promise: approveOrDecline({
        requestId: router.query['id'] as string,
        action: TransferRequestAction.Decline,
        ...methods.getValues(),
      }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getTellerTransactionListData']);
        declineIsOnToggle();
        methods.reset();
        methods.setValue('declineReason', '');
      },
    });
  };

  const denominationData = useMemo(
    () =>
      (transfer?.denomination as DenominationValue[])?.filter(({ quantity }) => !!quantity) ?? [],
    [transfer?.denomination]
  );

  const denominationTotal = useMemo(
    // eslint-disable-next-line no-return-assign
    () => denominationData?.reduce((sum, { amount }) => (sum += Number(amount ?? 0)), 0),
    [denominationData]
  );

  const columns: Column<DenominationValue>[] = [
    {
      header: 'Denomination',
      accessorFn: (row) => cashOptions[row?.value],
      footer: () => 'Total',
      meta: {
        Footer: {
          colspan: 2,
        },
      },
    },
    {
      header: 'Quantity',
      accessorFn: (row) => row?.quantity,
      meta: {
        isNumeric: true,
        Footer: {
          display: 'none',
        },
      },
    },
    {
      header: 'Amount',
      accessorFn: (row) => row?.amount,
      footer: () => denominationTotal,
      meta: {
        isNumeric: true,
        Footer: {
          colspan: 2,
        },
      },
    },
  ];

  return (
    <>
      <Modal
        open={declineIsOpen}
        onClose={declineIsOnClose}
        primaryButtonHandler={handleDecline}
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
          methods.reset();
          methods.setValue('declineReason', '');
        }}
        primaryButtonLabel="Done"
        secondaryButtonLabel="Undo"
        title="Do you sure want to Decline ?"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormTextArea
              rules={{ required: { value: true, message: 'This field is required' } }}
              h="100px"
              name="declineReason"
              label="Reason for Declination"
            />
          </Box>
        </FormProvider>
      </Modal>

      <Modal
        width="2xl"
        primaryButtonLabel={
          transfer?.transferState === TellerActivityState.Pending ? 'Approve' : undefined
        }
        primaryButtonHandler={handleApprove}
        secondaryButtonLabel={
          transfer?.transferState === TellerActivityState.Pending ? 'Decline' : undefined
        }
        secondaryButtonVariant="outline"
        secondaryButtonHandler={() => {
          onToggle();
          declineIsOnToggle();
        }}
        isSecondaryDanger
        onClose={() => {
          router.push(
            {
              query: {
                ...omit(router.query, 'id'),
              },
            },
            undefined,
            { shallow: true }
          );
          onClose();
        }}
        title="Teller Transfer"
        open={isOpen}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap="s20">
          <DetailCardContent title="Sender Teller" subtitle={transfer?.srcTeller?.local} />
          <DetailCardContent title="Reciever Teller" subtitle={transfer?.destTeller?.local} />
          <DetailCardContent title="Amount" subtitle={transfer?.amount} />

          <GridItem colSpan={2}>
            <Table
              data={denominationData}
              columns={columns}
              variant="report"
              size="report"
              isStatic
              showFooter
              isLoading={!denominationData?.length}
            />
          </GridItem>
        </Grid>
      </Modal>
    </>
  );
};
