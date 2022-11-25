import { useFormContext } from 'react-hook-form';

import { SavingStatementReportSettings } from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect, GridItem } from '@coop/shared/ui';

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
        <FormAccountSelect name="accountId" memberId={memberId} label="Select Account" />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
