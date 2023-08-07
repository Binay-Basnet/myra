import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { FormSection } from '@myra-ui';

import { useGetDepartmentListQuery } from '@coop/cbs/data-access';
import { FormCheckbox, FormSelect } from '@coop/shared/form';

export const EventsDepartmentSelect = () => {
  const methods = useFormContext();
  const { watch } = methods;
  const depart = watch('department');

  const { data: employeeData } = useGetDepartmentListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const employeeList = useMemo(
    () => employeeData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges ?? [],
    [employeeData]
  );
  const employeeOptions = employeeList?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));
  return (
    <FormSection header="List Attended By" templateColumns={2}>
      <GridItem colSpan={2}>
        <FormCheckbox name="department" label="Department" />
      </GridItem>
      {depart && (
        <FormSelect
          name="departmentIds"
          label="Select Departments"
          options={employeeOptions}
          isMulti
        />
      )}
    </FormSection>
  );
};
