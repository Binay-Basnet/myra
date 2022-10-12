import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import { AccountPopover } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import { useApplyForLoanMutation } from '@coop/ebanking/data-access';
import { FormBranchSelect, FormInput, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, PathBar } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

export const ApplyForLoan = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm();

  const memberId = getLoggedInUserId();

  const { mutateAsync: applyForLoan } = useApplyForLoanMutation();

  const handleSubmitApplication = async () => {
    await asyncToast({
      id: 'add-new-cheque-request',
      promise: applyForLoan({
        memberId,
        data: methods.getValues(),
      }),
      msgs: {
        loading: 'Applying for Loan',
        success: 'Added New Loan Request',
      },
      onSuccess: () => {
        queryClient.invalidateQueries('getLoanHistory');
        router.push('/coop');
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Apply For Loan', link: '/coop/loan/apply' },
        ]}
      />
      <InfoCard
        title="New Loan Application"
        btn={<AccountPopover />}
        footerButtonLabel="Submit Application"
        footerButtonHandler={handleSubmitApplication}
      >
        <FormProvider {...methods}>
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <FormBranchSelect name="branch" label="Branch" />
              <FormInput name="amount" type="number" placeholder="0.00" label="Amount" />
              <FormTextArea name="purpose" label="Purpose of Loan" />
            </Box>
          </form>
        </FormProvider>
      </InfoCard>
    </Box>
  );
};
