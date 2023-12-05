import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import { asyncToast, Box, Button, DetailCardContent, Grid, Modal } from '@myra-ui';

import {
  IbtStatus,
  ServiceCenterActivityDetails,
  useCancelServiceCentreCashTransferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { ConfirmationDialog } from '@coop/shared/components';
import { amountConverter } from '@coop/shared/utils';

interface IIBTCompleteModalProps {
  transfer: ServiceCenterActivityDetails;
  approveModal: ReturnType<typeof useDisclosure>;
}

export const IBTCompleteModal = ({ transfer, approveModal }: IIBTCompleteModalProps) => {
  const { isOpen, onClose } = approveModal;

  const router = useRouter();

  const objState = router?.query['objState'] || 'SENT';
  const selectedRequest = router?.query['id'];

  const queryClient = useQueryClient();

  const rejectConfirmCancelRef = useRef<HTMLButtonElement | null>(null);

  const {
    isOpen: isRejectConfirmOpen,
    onClose: onRejectConfirmClose,
    onToggle: onRejectConfirmToggle,
  } = useDisclosure();

  const handleApprove = () => {
    router.push({
      pathname: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
      query: {
        redirectFrom: 'IBT',
        requestId: transfer?.id,
        senderBranch: transfer?.sender,
        entries: JSON.stringify([
          {
            accountId: transfer?.ibtAccount,
            accountName: transfer?.ibtAccountName,
            drAmount: transfer?.ibtDr,
            crAmount: transfer?.ibtCr,
          },
        ]),
      },
    });
  };

  const { mutateAsync: cancelRequest } = useCancelServiceCentreCashTransferMutation();

  const handleReject = () => {
    asyncToast({
      id: 'cancel-cash-transfer-request',
      promise: cancelRequest({
        requestId: selectedRequest as string,
        // requestId: '2024041900000003',
      }),
      msgs: {
        loading: 'Cancelling transfer request',
        success: 'Trasnfer request cancelled',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getServiceCenterTransferList']);
        handleClose();
      },
    });
  };

  const getFooter = () => {
    if (transfer?.status === IbtStatus.Pending && objState === 'RECEIVED') {
      return (
        <Box px="s16" display="flex" justifyContent="flex-end" h={50}>
          <Button onClick={handleApprove}>Complete</Button>
        </Box>
      );
    }

    if (transfer?.status === IbtStatus.Pending && objState === 'SENT') {
      return (
        <Box px="s16" display="flex" justifyContent="flex-end" h={50}>
          <Button onClick={onRejectConfirmToggle} shade="danger">
            Cancel
          </Button>
        </Box>
      );
    }

    return null;
  };

  const handleClose = () => {
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
  };

  return (
    <>
      <Modal
        width="2xl"
        footer={getFooter()}
        onClose={handleClose}
        title="Service Center Transfer Request"
        open={isOpen}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap="s20">
          <DetailCardContent title="Sender Service Center" subtitle={transfer?.sender} />
          <DetailCardContent title="Receiver Service Center" subtitle={transfer?.receiver} />
          <DetailCardContent
            title="Amount"
            subtitle={amountConverter(transfer?.amount as string)}
          />
        </Grid>
      </Modal>

      <ConfirmationDialog
        isOpen={isRejectConfirmOpen}
        onClose={onRejectConfirmClose}
        cancelRef={rejectConfirmCancelRef}
        handleConfirm={handleReject}
        title="Cancel Service Center Transfer Request"
        description="This action will cancel the transfer request. Are you sure you want to continue?"
      />
    </>
  );
};
