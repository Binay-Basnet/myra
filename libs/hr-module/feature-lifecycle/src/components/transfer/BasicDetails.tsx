import { FormSection, GridItem } from '@myra-ui';

import { EmployeeTransferType, useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const transferTypes = [
  { label: 'Service Center', value: EmployeeTransferType?.ServiceCenter },
  { label: 'Department', value: EmployeeTransferType?.Department },
];

export const TransferBasicDetails = () => {
  const { data: employeeListData } = useGetEmployeeListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const employeeOptions = employeeListData?.hr?.employee?.employee?.listEmployee?.edges?.map(
    (item) => ({
      label: item?.node?.employeeName as string,
      value: item?.node?.id as string,
    })
  );

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormSelect name="employeeId" label="Employee" options={employeeOptions} />
      </GridItem>
      <FormSelect name="transferType" label="Transfer Type" options={transferTypes} />
    </FormSection>
  );
};
