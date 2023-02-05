import { useState } from 'react';

import { Box } from '@myra-ui';

import {
  ClosedSavingAccountData,
  ClosedSavingAccountInput,
  SavingTransactionType,
  useGetClosedSavingAccountStatementQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ClosedAccountInputs, ReportMember } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormRadioGroup } from '@coop/shared/form';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

export const ClosedSavingAccountStatement = () => {
  const [filters, setFilters] = useState<ClosedSavingAccountInput | null>(null);

  const { data, isFetching } = useGetClosedSavingAccountStatementQuery(
    {
      data: {
        accountId: filters?.accountId,
        period: filters?.period,
        filter: filters?.filter,
      } as ClosedSavingAccountInput,
    },
    { enabled: !!filters }
  );

  const closedAccountReport = data?.report?.depositReport?.closedSavingAccountReport?.data;

  const closedAccountReportData = closedAccountReport?.entries;

  return (
    <Report
      defaultFilters={{
        filter: {
          type: 'ALL',
        },
      }}
      data={closedAccountReportData as ClosedSavingAccountData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.CLOSED_SAVING_ACCOUNT_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Closed Saving Account Statement',
              link: '/reports/cbs/savings/closed-account-statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <ClosedAccountInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <ReportMember
            member={{
              name: closedAccountReport?.memberName,
              address: closedAccountReport?.address,
              code: closedAccountReport?.memberShipCode || '',
              activeDate: closedAccountReport?.closedDate,
            }}
            accountCloseDate={localizedDate(closedAccountReport?.closedDate)}
          />
          <Report.Table<ClosedSavingAccountData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="right">Total Balance</Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Date',
                accessorKey: 'date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
                meta: {
                  width: '100%',
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Transaction ID',
                accessorKey: 'transactionID',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.transactionID as string}
                    type="transactions"
                    label={props?.row?.original?.transactionID as string}
                  />
                ),
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Withdraw Amount (Dr.)',
                accessorKey: 'withdrawAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                // footer: () => amountConverter(savingReportTotal?.totalWithdraw as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Deposit Amount (Cr.)',
                accessorKey: 'depositAmount',
                cell: (props) => amountConverter(props.getValue() as string),

                // footer: () => amountConverter(savingReportTotal?.totalDeposit as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance Amount',
                accessorKey: 'balanceAmount',

                cell: (props) =>
                  debitCreditConverter(
                    props.row.original.balanceAmount || '0.00',
                    props.row.original.balanceType || ''
                  ),

                // footer: () => amountConverter(savingReportTotal?.totalBalance as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Transaction">
            <FormRadioGroup
              name="filter.type"
              options={[
                { label: 'All', value: SavingTransactionType.All },
                { label: 'Deposit', value: SavingTransactionType.Deposit },
                { label: 'Withdraw', value: SavingTransactionType.Withdraw },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
