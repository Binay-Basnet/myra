import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Grid, Modal } from '@myra-ui';

import { useBalanceCertificateMutation, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { FormDatePicker } from '@coop/shared/form';

interface IBalanceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
}

export const BalanceCertificateModal = ({
  isOpen,
  onClose,
  memberId,
}: IBalanceCertificateModalProps) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const methods = useForm();

  const { mutateAsync: issueBalanceCertificate } = useBalanceCertificateMutation();

  const handleSave = async () => {
    await asyncToast({
      id: 'issue-member-balance-certificate',
      promise: issueBalanceCertificate({ id: memberId, date: methods.getValues()?.['date'] }),
      msgs: {
        loading: 'Issuing Balance Certificate',
        success: 'Balance Certificate Issued',
      },
      onSuccess: (res) => {
        window.open(res?.members?.balanceCertificate, '_blank');
        handleClose();
      },
    });
  };

  const handleClose = () => {
    methods.reset({ date: '' });
    onClose();
  };

  return isOpen ? (
    <Modal
      title="Issue Balance Certificate"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Issue"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <FormDatePicker
            name="date"
            id="date"
            label="Balance Upto"
            maxDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />
        </Grid>
      </FormProvider>
    </Modal>
  ) : null;
};
