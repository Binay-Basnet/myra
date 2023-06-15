import { useMemo } from 'react';

import { FormSection } from '@myra-ui';

import { OnboardingStatus, useGetDesignationListQuery } from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';

export const OnboardingJoiningDetails = () => {
  const onboardingStatusOptions = [
    {
      label: 'Draft',
      value: OnboardingStatus?.Draft,
    },
    {
      label: 'Pending ',
      value: OnboardingStatus?.Pending,
    },
    {
      label: 'Completed',
      value: OnboardingStatus?.Completed,
    },
  ];

  const { data: degisnationData } = useGetDesignationListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const degisnation =
    degisnationData?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges;
  const degisnationOptions = useMemo(
    () =>
      degisnation?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [degisnation]
  );

  return (
    <FormSection header="Joining Details">
      <FormDatePicker name="dateOfJoining" label="Date of Joining" />
      <FormSelect name="designation" label="Designation" options={degisnationOptions} />
      <FormSelect
        name="serviceCenter"
        label="Onboarding Status"
        options={onboardingStatusOptions}
      />
    </FormSection>
  );
};
