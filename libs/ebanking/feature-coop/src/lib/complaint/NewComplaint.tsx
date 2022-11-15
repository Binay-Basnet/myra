import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import { useAddNewComplaintMutation } from '@coop/ebanking/data-access';
import { FormInput, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, PathBar } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

export const NewComplaint = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm();

  const memberId = getLoggedInUserId();

  const { mutateAsync: applyForLoan } = useAddNewComplaintMutation();

  const handleSubmitApplication = async () => {
    await asyncToast({
      id: 'add-new-cheque-request',
      promise: applyForLoan({
        memberId,
        data: methods.getValues(),
      }),
      msgs: {
        loading: 'Adding New Complaint',
        success: 'Added New Complaint Request',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getComplaintsList']);
        router.push('/coop');
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'New Complaint', link: '/coop/complaints/new' },
        ]}
      />
      <InfoCard
        title="New Complaint"
        footerButtonLabel="Submit Application"
        footerButtonHandler={handleSubmitApplication}
      >
        <FormProvider {...methods}>
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <Box display="grid" gridTemplateColumns="repeat(2,1fr)" gap="s20">
                <FormInput name="date" type="date" label="Date" />
                <FormInput name="peopleInvolved" label="Person/s involved (if any)" />
              </Box>

              <FormTextArea
                name="detailedAccount"
                placeholder="Explain briefly why need this loan"
                label="Detailed account of your complaint"
              />

              <FormTextArea name="policiesViolated" label="Policies you think have been violated" />

              <FormTextArea name="proposedSolution" label="Proposed solution to complaint" />
            </Box>
          </form>
        </FormProvider>
      </InfoCard>
    </Box>
  );
};
