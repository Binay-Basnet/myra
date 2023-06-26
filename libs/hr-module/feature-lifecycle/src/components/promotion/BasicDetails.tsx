import { FormSection, GridItem } from '@myra-ui';

import { PromotionType, useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const promotionStatus = [
  { label: 'Degisnation', value: PromotionType?.Designation },
  { label: 'Employee Level', value: PromotionType?.EmployeeLevel },
];

export const PromotionBasicDetails = () => {
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
      <FormSelect name="promotionType" label="Promotion Type" options={promotionStatus} />
      <FormDatePicker name="date" label="Resignation Letter Date" />
    </FormSection>
  );
};
