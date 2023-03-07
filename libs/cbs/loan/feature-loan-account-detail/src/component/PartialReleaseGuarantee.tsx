import { FormProvider, useForm } from 'react-hook-form';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Grid, Modal } from '@myra-ui';

import {
  LoanAccountGurantee,
  PartialReleaseGuaranteeInput,
  useLoanAccountGuaranteeActionsMutation,
} from '@coop/cbs/data-access';
import { FormAmountInput, FormFileInput, FormTextArea } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

interface IPartialReleaseGuaranteeProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  guarantee: LoanAccountGurantee | null | undefined;
}

export const PartialReleaseGuarantee = ({
  isModalOpen,
  onModalClose,
  guarantee,
}: IPartialReleaseGuaranteeProps) => {
  const { overviewData } = useLoanAccountDetailHooks();

  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync: switchGuarantee } = useLoanAccountGuaranteeActionsMutation();

  const handleReleaseGuarantee = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'loan-account-detail-partial-release-guarantee',
      promise: switchGuarantee({
        actionType: 'PARTIAL_RELEASE',
        data: {
          loanAccID: overviewData?.generalInformation?.accountId,
          loanGuaranteeID: guarantee?.guaranteeId,
          partialReleaseInput: values as PartialReleaseGuaranteeInput,
        },
      }),
      msgs: {
        loading: 'Partially releasing guarantee',
        success: 'Guarantee partially released',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanAccountGuaranteeDetails']);

        handleModalClose();
      },
    });
  };

  const handleModalClose = () => {
    methods.reset({ releaseAmount: '', files: [], note: '' });
    onModalClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      primaryButtonLabel="Confirm"
      primaryButtonHandler={handleReleaseGuarantee}
      secondaryButtonLabel="Cancel"
      secondaryButtonHandler={handleModalClose}
      title="Partial Release"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s16">
          <Alert status="info" title="Existing Guarantee Details" hideCloseIcon>
            <UnorderedList>
              <ListItem>{guarantee?.memberName}</ListItem>
              <ListItem>{guarantee?.accountName}</ListItem>
              <ListItem>{`Guarantee Amount: ${amountConverter(
                guarantee?.guranteeAmount ?? 0
              )}`}</ListItem>
            </UnorderedList>
          </Alert>

          <Grid templateColumns="repeat(2,1fr)">
            <FormAmountInput name="releaseAmount" label="Release Amount" />
          </Grid>

          <FormFileInput name="files" label="File Upload" />

          <FormTextArea name="note" label="Note" rows={5} />
        </Box>
      </FormProvider>
    </Modal>
  );
};
