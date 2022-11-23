import { useFormContext } from 'react-hook-form';

import { InterestStatementFilter } from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect, GridItem } from '@coop/shared/ui';

import { ReportDateRange } from '../components';

type ReportFilterType = InterestStatementFilter & {
  memberId: string;
};

export const InterestStatementInputs = () => {
  const methods = useFormContext<ReportFilterType>();

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
