import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';

import {
  SavingStatementReportSettings,
  useGetMemberLoanAccountSearchQuery,
} from '@coop/cbs/data-access';
import { FormMemberSelect, FormSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

interface LoanReportInputProps {
  isClosed?: boolean;
  accountName?: string;
}

export const LoanReportInputs = ({ isClosed, accountName }: LoanReportInputProps) => {
  const methods = useFormContext<SavingStatementReportSettings>();
  const router = useRouter();
  const loanAccountId = router.query?.['loanAccountId'];

  const memberId = methods.watch('memberId');

  const { data: loanAccountData } = useGetMemberLoanAccountSearchQuery(
    {
      filter: {
        query: memberId,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: isClosed ? 'COMPLETED' : 'DISBURSED',
              },
              {
                column: 'memberId',
                comparator: 'EqualTo',
                value: memberId
              }
            ],
          },
        ],
      },
      pagination: { first: -1, after: '' },
    },
    { enabled: !!memberId }
  );
  const loanAccounts = loanAccountData?.loanAccount?.list?.edges?.map((account) => ({
    label: account?.node?.LoanAccountName as string,
    value: account?.node?.id as string,
  })) as { label: string; value: string }[];

  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect
          name={accountName || 'loanAccountId'}
          options={loanAccounts}
          label="Select Account"
          isDisabled={!!loanAccountId}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
