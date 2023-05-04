import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { asyncToast, FormSection, MemberCard, Modal } from '@myra-ui';

import {
  useGetIndividualMemberDetails,
  useMemberDormancyDetailsQuery,
  useUpdateMemberDormancyMutation,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';

interface IMemberDormancyEditModalProps {
  memberId: string;
  open: boolean;
  onClose: () => void;
}

const transactionOptions = [
  { label: 'Saving Transaction', value: 'saving' },
  { label: 'Loan Transaction', value: 'loan' },
  { label: 'Share Transaction', value: 'share' },
];

export const MemberDormancyEditModal = ({
  open,
  onClose,
  memberId,
}: IMemberDormancyEditModalProps) => {
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

      methods.setValue('blockTransactions', blocked);
    }
  }, [dormancyDetails]);

  const { mutateAsync: updateDormancy } = useUpdateMemberDormancyMutation();

  const handleRevoceDormancy = () => {
    const values = methods.getValues();

    const filteredValues = {
      ...omit(values, ['blockTransactions']),
      blockSavingTransaction: values.blockTransactions?.includes('saving'),
      blockLoanTransaction: values.blockTransactions?.includes('loan'),
      blockShareTransaction: values.blockTransactions?.includes('share'),
    };

    asyncToast({
      id: 'update-member-dormancy',
      msgs: {
        loading: 'Updating member dormancy',
        success: 'Member dormancy updated',
      },
      promise: updateDormancy({ memberId: memberId as string, data: filteredValues }),
      onSuccess: () => {
        methods.reset();
        queryClient.invalidateQueries(['getMemberList']);
        queryClient.invalidateQueries(['memberDormancyDetails']);
        onClose();
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

    methods.reset({ blockTransactions: blocked });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Update Member Dormancy"
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

        <FormSection header="Block Transactions" templateColumns={1} divider={false}>
          <FormCheckboxGroup
            name="blockTransactions"
            list={transactionOptions}
            orientation="column"
          />
        </FormSection>
      </FormProvider>
    </Modal>
  );
};
