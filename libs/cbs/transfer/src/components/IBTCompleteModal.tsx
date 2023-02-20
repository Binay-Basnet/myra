import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { omit } from 'lodash';

import { DetailCardContent, Grid, Modal } from '@myra-ui';

import { IbtStatus, ServiceCenterActivityDetails } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IIBTCompleteModalProps {
  transfer: ServiceCenterActivityDetails;
  approveModal: ReturnType<typeof useDisclosure>;
}

export const IBTCompleteModal = ({ transfer, approveModal }: IIBTCompleteModalProps) => {
  const { isOpen, onClose } = approveModal;

  const router = useRouter();

  const objState = router?.query['objState'];

  const handleApprove = () => {
    router.push({
      pathname: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
      query: {
        redirectFrom: 'IBT',
        requestId: transfer?.id,
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

  return (
    <Modal
      width="2xl"
      primaryButtonLabel={
        transfer?.status === IbtStatus.Pending && objState === 'RECEIVED' ? 'Complete' : undefined
      }
      primaryButtonHandler={handleApprove}
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
      title="Service Center Transfer Request"
      open={isOpen}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="s20">
        <DetailCardContent title="Sender Service Center" subtitle={transfer?.sender} />
        <DetailCardContent title="Receiver Service Center" subtitle={transfer?.receiver} />
        <DetailCardContent title="Amount" subtitle={amountConverter(transfer?.amount as string)} />
      </Grid>
    </Modal>
  );
};
