import { useFormContext } from 'react-hook-form';

import {
  SavingStatementReportSettings,
  useGetMemberLoanAccountsQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { FormMemberSelect, GridItem } from '@myra-ui';

import { ReportDateRange } from '../components';

export const LoanReportInputs = () => {
  const methods = useFormContext<SavingStatementReportSettings>();

  const memberId = methods.watch('memberId');

  const { data: loanAccountData } = useGetMemberLoanAccountsQuery(
    { memberId },
    { enabled: !!memberId }
  );
  const loanAccounts = loanAccountData?.loanAccount?.memberDisbursedLoanAccounts?.map(
    (account) => ({
      label: account?.name as string,
      value: account?.id as string,
    })
  ) as { label: string; value: string }[];

  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect name="loanAccountId" options={loanAccounts} label="Select Account" />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
