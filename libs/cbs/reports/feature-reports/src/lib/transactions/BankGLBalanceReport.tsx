import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  BankGlBalanceEntry,
  BankGlBalanceFilter,
  useGetBankGlBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormBranchSelect, FormDatePicker } from '@coop/shared/form';
import { amountConverter, debitCreditConverter, useIsCbs } from '@coop/shared/utils';

type BankGlBalanceFilters = Omit<BankGlBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const BankGLBalanceReport = () => {
  const [filters, setFilters] = useState<BankGlBalanceFilters | null>(null);
  const { isCbs } = useIsCbs();

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetBankGlBalanceReportQuery(
    {
      data: {
        ...filters,
        period: { from: filters?.period.from, to: filters?.period.from },
        branchId: branchIds,
      } as BankGlBalanceFilter,
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
            {
              label: 'Transaction Reports',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions'
                : '/accounting/reports/transactions',
            },
            {
              label: 'Bank Gl Balance Report',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/bankGL-balance/new'
                : '/accounting/reports/transactions/bankGL-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label="Select Service Center"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
          </GridItem>
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
