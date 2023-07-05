import { useMemo } from 'react';

import { Button, FormSection } from '@myra-ui';

import {
  useGetBranchListQuery,
  useGetDepartmentListQuery,
  useGetDesignationListQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

export const PayrollEntryEmployees = () => {
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
  const { data: departmentData } = useGetDepartmentListQuery({
    pagination: {
      after: '',
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const departmentOptions =
    departmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
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
    <FormSection header="Employees">
      <FormSelect name="serviceCenter" label="Service Center" options={serviceCenterOptions} />
      <FormSelect name="department" label="Department" options={departmentOptions} />
      <FormSelect name="designation" label="Designation" options={degisnationOptions} />
      <Button variant="outline"> Get Employees </Button>
    </FormSection>
  );
};
