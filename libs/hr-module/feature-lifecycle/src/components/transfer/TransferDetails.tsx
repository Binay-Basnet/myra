import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import {
  EmployeeTransferInput,
  EmployeeTransferType,
  useGetBranchListQuery,
  useGetDepartmentListQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';

export const TransferDetails = () => {
  const [selectOptions, setSelectOptions] = useState<
    { label: string; value: string }[] | [] | undefined
  >([]);
  const { watch } = useFormContext<EmployeeTransferInput>();
  const { data: DepartmentData } = useGetDepartmentListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const transferType = watch('transferType');

  const degisnation =
    DepartmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges;
  const degisnationOptions = useMemo(
    () =>
      degisnation?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [degisnation]
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
  useEffect(() => {
    if (transferType === EmployeeTransferType?.Department) {
      setSelectOptions(degisnationOptions);
    }
    if (transferType === EmployeeTransferType?.ServiceCenter) {
      setSelectOptions(serviceCenterOptions);
    }
  }, [transferType, degisnationOptions, serviceCenterOptions]);

  return (
    <FormSection
      header={`New ${
        transferType === EmployeeTransferType.Department ? 'Department' : 'Service Cente'
      } Transfer`}
    >
      <GridItem colSpan={2}>
        <FormSelect
          name="destDepServId"
          label={
            transferType === EmployeeTransferType.Department
              ? 'Select Department'
              : 'Select Service Center'
          }
          options={selectOptions}
        />
      </GridItem>
      <FormDatePicker name="transferDate" label="Transfer Date" />
    </FormSection>
  );
};
