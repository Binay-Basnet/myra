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

  const { data: suppliersDetails } = useGetDesignationListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const inventoryItemsData =
    suppliersDetails?.settings?.general?.HCM?.employee?.listDesignation?.edges;
  const supplierSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );

  return (
    <FormSection header="Joining Details">
      <FormDatePicker name="dateOfJoining" label="Date of Joining" />
      <FormSelect name="designation" label="Designation" options={supplierSearchOptions} />
      <FormSelect
        name="serviceCenter"
        label="Onboarding Status"
        options={onboardingStatusOptions}
      />
    </FormSection>
  );
};
