import { useState } from 'react';
import dayjs from 'dayjs';

import { Box } from '@myra-ui';

import {
  LoanStatement,
  SavingServiceType,
  SavingStatement,
  SavingStatementReportSettings,
  SavingTotalReport,
  SavingTransactionType,
  useGetSavingStatementQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { SavingReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const SavingStatementReport = () => {
  const [filters, setFilters] = useState<SavingStatementReportSettings | null>(null);

  const { data, isFetching } = useGetSavingStatementQuery(
    {
      data: filters as SavingStatementReportSettings,
    },
    { enabled: !!filters }
  );
  const savingData = data?.report?.depositReport?.savingStatementReport?.statement;
  const savingReport =
    savingData && 'savingStatement' in savingData ? savingData.savingStatement : [];
  const savingReportTotal = (
    savingData && 'totals' in savingData ? savingData?.totals : {}
  ) as SavingTotalReport;

  return (
    <Report
      defaultFilters={{
        filter: {
          service: SavingServiceType.Charges,
          transactionType: SavingTransactionType.All,
        },
      }}
      data={savingReport as LoanStatement[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            { label: 'Saving Statement', link: '/reports/cbs/savings/statement/new' },
          ]}
        />
        <Report.Inputs>
          <SavingReportInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SavingStatement & { index: number }>
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
                cell: ({ cell }) => dayjs(cell.row.original.date?.local).format('YYYY-MM-DD'),
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
                header: 'Cheque/Voucher no',
                accessorKey: 'chequeOrVoucherNo',
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Withdraw Amount (Dr.)',
                accessorKey: 'withdrawDr',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(savingReportTotal?.totalWithdraw),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Deposit Amount (Cr.)',
                accessorKey: 'depositCr',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(savingReportTotal?.totalDeposit),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance Amount',
                accessorKey: 'balanceAmount',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(savingReportTotal?.totalBalance),
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
              name="filter.transactionType"
              options={[
                { label: 'All', value: SavingTransactionType.All },
                { label: 'Deposit', value: SavingTransactionType.Deposit },
                { label: 'Withdraw', value: SavingTransactionType.Withdraw },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Service">
            <FormRadioGroup
              name="filter.service"
              options={[
                { label: 'All', value: SavingServiceType.Interest },
                { label: 'Interest', value: SavingServiceType.Charges },
                { label: 'Charges', value: SavingServiceType.CustomerInitiated },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Amount Range">
            <FormAmountFilter name="filter.amountRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
