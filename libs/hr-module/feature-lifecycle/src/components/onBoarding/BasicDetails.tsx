import { FormSection, GridItem } from '@myra-ui';

import { useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

export const OnboardingBasicDetails = () => {
  const { data: branchData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const serviceCenterOptions = branchData?.settings?.general?.branch?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));
  return (
    <FormSection header="Basic Details">
      <GridItem colSpan={2}>
        <FormSelect name="applicantId" label="Applicant" />
      </GridItem>
      <FormSelect name="serviceCenter" label="Service Center" options={serviceCenterOptions} />
    </FormSection>
  );
};
