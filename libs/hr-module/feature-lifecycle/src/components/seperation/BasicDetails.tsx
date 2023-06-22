import { FormSection, GridItem } from '@myra-ui';

import {
  SeparationStatusEnum,
  SeparationTypeEnum,
  useGetEmployeeListQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const seperationStatus = [
  { label: 'Active', value: SeparationStatusEnum?.Active },
  { label: 'Inactive', value: SeparationStatusEnum?.Inactive },
];

const seperationType = [
  { label: 'Resigned', value: SeparationTypeEnum?.Resigned },
  { label: 'Transferred', value: SeparationTypeEnum?.Transferred },
  { label: 'Retired', value: SeparationTypeEnum?.Retired },
];

export const SeperationBasicDetails = () => {
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
      <FormSelect name="separationStatus" label="Seperation Status" options={seperationStatus} />
      <FormSelect name="separationType" label="Seperation Type" options={seperationType} />
      <FormDatePicker name="date" label="Resignation Letter Date" />
    </FormSection>
  );
};
