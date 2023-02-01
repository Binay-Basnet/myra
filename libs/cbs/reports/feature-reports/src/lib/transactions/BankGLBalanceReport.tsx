import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  BankGlBalanceEntry,
  BankGlBalanceFilter,
  useGetBankGlBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormBranchSelect } from '@coop/shared/form';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

type BankGlBalanceFilters = Omit<BankGlBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const BankGLBalanceReport = () => {
  const [filters, setFilters] = useState<BankGlBalanceFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetBankGlBalanceReportQuery(
    {
      data: { ...filters, branchId: branchIds } as BankGlBalanceFilter,
    },
    { enabled: !!filters }
  );

  const serviceCenterReport = data?.report?.transactionReport?.financial?.bankGLBalanceReport?.data;
  const total = data?.report?.transactionReport?.financial?.bankGLBalanceReport?.total;

  return (
    <Report
      defaultFilters={{}}
      data={serviceCenterReport as BankGlBalanceEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_BANK_GL_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            {
              label: 'Bank Gl Balance Report',
              link: '/reports/cbs/transactions/bankGL-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>{' '}
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<BankGlBalanceEntry & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No',
                accessorKey: 'index',
                footer: () => <Box textAlign="right">Total </Box>,
                meta: {
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Bank Name',
                accessorKey: 'bankName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Account Name',
                accessorKey: 'bankAccountName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Account No',
                accessorKey: 'accountNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Closing',
                accessorKey: 'closingBalance',
                cell: (props) =>
                  debitCreditConverter(
                    props.getValue() as string,
                    props?.row?.original?.balanceType as string
                  ),

                footer: () => amountConverter(total as string),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Amount Range">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
