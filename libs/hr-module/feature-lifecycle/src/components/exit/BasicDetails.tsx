import { FormSection, GridItem } from '@myra-ui';

import {
  ExitStatus,
  useGetEmployeeListQuery,
  useGetHrSeperationListQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const exitStatus = [
  { label: 'Active', value: ExitStatus?.Active },
  { label: 'Initiated', value: ExitStatus?.Initiated },
  { label: 'On Notice Period', value: ExitStatus?.OnNoticePeriod },
  { label: 'Exited', value: ExitStatus?.Exited },
];

export const ExitBasicDetails = () => {
  const { data: seperationData } = useGetHrSeperationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const seperationOptions =
    seperationData?.hr?.employeelifecycle?.employeeSeparation?.listEmployeeSeparation?.edges?.map(
      (item) => ({
        label: item?.node?.employeeName as string,
        value: item?.node?.id as string,
      })
    );
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
    <FormSection header="Seperation Details">
      <GridItem colSpan={2}>
        <FormSelect name="separationId" label="Seperation Id" options={seperationOptions} />
      </GridItem>
      <FormSelect name="exitStatus" label="Exit Status" options={exitStatus} />
      <FormSelect name="interviewer" label="Interviewer" options={employeeOptions} />
      <FormDatePicker name="exitDate" label="Exit Date" />
    </FormSection>
  );
};
