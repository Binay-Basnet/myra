import { useFormContext } from 'react-hook-form';

import { GridItem } from '@myra-ui';

import { ObjState, SavingStatementReportSettings } from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

export const SavingReportInputs = () => {
  const methods = useFormContext<SavingStatementReportSettings>();

  const memberId = methods.watch('memberId');
  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormAccountSelect
          name="accountId"
          memberId={memberId}
          label="Select Account"
          filterBy={ObjState?.Active}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
