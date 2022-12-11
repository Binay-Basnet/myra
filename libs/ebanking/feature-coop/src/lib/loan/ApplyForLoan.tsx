import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';

import { asyncToast, Box, PathBar } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { useApplyForLoanMutation } from '@coop/ebanking/data-access';
import { FormBranchSelectEbanking, FormInput, FormTextArea } from '@coop/shared/form';
import { getLoggedInUserId } from '@coop/shared/utils';

const formSchema = yup.object({
  branch: yup.string().required('This field is required.'),
  amount: yup.string().required('This field is required.'),
  purpose: yup.string().required('This field is required.'),
});

export const ApplyForLoan = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(formSchema),
  });

  const memberId = getLoggedInUserId();

  const { mutateAsync: applyForLoan } = useApplyForLoanMutation();

  const handleSubmitApplication = methods.handleSubmit(async () => {
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
        queryClient.invalidateQueries(['getLoanHistory']);
        router.push('/coop');
      },
    });
  });

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
        footerButtonLabel="Submit Application"
        footerButtonHandler={handleSubmitApplication}
      >
        <FormProvider {...methods}>
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <FormBranchSelectEbanking name="branch" label="Branch" />
              <FormInput name="amount" type="number" placeholder="0.00" label="Amount" />
              <FormTextArea name="purpose" label="Purpose of Loan" />
            </Box>
          </form>
        </FormProvider>
      </InfoCard>
    </Box>
  );
};
