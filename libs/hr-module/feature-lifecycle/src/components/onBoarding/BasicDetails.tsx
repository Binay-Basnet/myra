import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { useGetBranchListQuery, useGetJobApplicationListQuery } from '@coop/cbs/data-access';
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

  const { data: applicationData } = useGetJobApplicationListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const rowData = useMemo(
    () =>
      applicationData?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges ?? [],
    [applicationData]
  );

  const applicantsOptions = rowData.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));
  return (
    <FormSection header="Basic Details">
      <GridItem colSpan={2}>
        <FormSelect name="applicantId" label="Applicant" options={applicantsOptions} />
      </GridItem>
      <FormSelect name="serviceCenter" label="Service Center" options={serviceCenterOptions} />
    </FormSection>
  );
};
