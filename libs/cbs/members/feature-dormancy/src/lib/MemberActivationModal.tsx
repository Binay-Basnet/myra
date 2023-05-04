import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { asyncToast, FormSection, MemberCard, Modal } from '@myra-ui';

import {
  useGetIndividualMemberDetails,
  useMemberDormancyDetailsQuery,
  useRevokeMemberDormancyMutation,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormFileInput, FormTextArea } from '@coop/shared/form';

interface IMemberActivationModalProps {
  memberId: string;
  open: boolean;
  onClose: () => void;
}

const transactionOptions = [
  { label: 'Saving Transaction', value: 'saving' },
  { label: 'Loan Transaction', value: 'loan' },
  { label: 'Share Transaction', value: 'share' },
];

export const MemberActivationModal = ({ open, onClose, memberId }: IMemberActivationModalProps) => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { data: dormancyDetailsData } = useMemberDormancyDetailsQuery(
    { memberId },
    { enabled: !!memberId }
  );

  const dormancyDetails = dormancyDetailsData?.members?.dormancyDetails?.data;

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({
    memberId,
  });

  useEffect(() => {
    if (dormancyDetails) {
      const blocked = [];

      if (dormancyDetails?.blockSavingTransaction) {
        blocked.push('saving');
      }
      if (dormancyDetails?.blockLoanTransaction) {
        blocked.push('loan');
      }
      if (dormancyDetails?.blockShareTransaction) {
        blocked.push('share');
      }

      methods.setValue('activateTransactions', blocked);
    }
  }, [dormancyDetails]);

  const { mutateAsync: revokeDormancy } = useRevokeMemberDormancyMutation();

  const handleRevoceDormancy = () => {
    const values = methods.getValues();

    const filteredValues = {
      ...omit(values, ['activateTransactions', 'specificReason']),
      activateSavingTransaction: values.activateTransactions?.includes('saving'),
      activateLoanTransaction: values.activateTransactions?.includes('loan'),
      activateShareTransaction: values.activateTransactions?.includes('share'),
    };

    asyncToast({
      id: 'make-revoke-dormancy',
      msgs: {
        loading: 'Revoking member dormancy',
        success: 'Member dormancy revoked',
      },
      promise: revokeDormancy({ memberId: memberId as string, data: filteredValues }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getMemberList']);
        queryClient.invalidateQueries(['memberDormancyDetails']);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    const blocked = [];

    if (dormancyDetails?.blockSavingTransaction) {
      blocked.push('saving');
    }
    if (dormancyDetails?.blockLoanTransaction) {
      blocked.push('loan');
    }
    if (dormancyDetails?.blockShareTransaction) {
      blocked.push('share');
    }

    methods.reset({ activateTransactions: blocked, documents: [], notes: '' });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Member Activation"
      primaryButtonLabel="Confirm"
      primaryButtonHandler={handleRevoceDormancy}
    >
      <FormProvider {...methods}>
        <FormSection templateColumns={1}>
          <MemberCard
            memberDetails={{
              name: memberDetailData?.name,
              avatar: memberDetailData?.profilePicUrl ?? '',
              code: memberDetailData?.code,
              memberID: memberDetailData?.id,
              gender: memberDetailData?.gender,
              age: memberDetailData?.age,
              maritalStatus: memberDetailData?.maritalStatus,
              dateJoined: memberDetailData?.dateJoined,
              // branch: 'Basantapur',
              phoneNo: memberDetailData?.contact,
              email: memberDetailData?.email,
              address: memberDetailData?.address,
            }}
            // notice="KYM needs to be updated"
            citizenshipPath={memberCitizenshipUrl}
            isInline
          />
        </FormSection>

        <FormSection header="Activate" templateColumns={1}>
          <FormCheckboxGroup
            name="activateTransactions"
            list={transactionOptions}
            orientation="column"
          />
        </FormSection>

        <FormSection templateColumns={1}>
          <FormFileInput name="documents" label="File Upload" />
        </FormSection>

        <FormSection templateColumns={1} divider={false}>
          <FormTextArea name="notes" label="Notes" rows={3} />
        </FormSection>
      </FormProvider>
    </Modal>
  );
};
