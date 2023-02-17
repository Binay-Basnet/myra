import { useState } from 'react';
import { useRouter } from 'next/router';

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
import { ReportMember, SavingReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const SavingStatementReport = () => {
  const [filters, setFilters] = useState<SavingStatementReportSettings | null>(null);
  const router = useRouter();

  const { data, isFetching } = useGetSavingStatementQuery(
    {
      data: filters as SavingStatementReportSettings,
    },
    { enabled: !!filters }
  );

  const savingMember = data?.report?.depositReport?.savingStatementReport?.member;
  const memberId = router.query?.['memberId'];
  const accountId = router.query?.['accountId'];

  const savingData = data?.report?.depositReport?.savingStatementReport?.statement;
  const savingReport =
    savingData && 'savingStatement' in savingData ? savingData.savingStatement : [];
  const savingReportTotal = (
    savingData && 'totals' in savingData ? savingData?.totals : {}
  ) as SavingTotalReport;

  return (
    <Report
      defaultFilters={{
        memberId: memberId as string,
        accountId: accountId as string,
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
          <ReportMember member={savingMember} savingData={savingData || []} />
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
                accessorKey: 'chequeOrVoucherNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.chequeOrVoucherNo as string}
                    type="transactions"
                    label={props?.row?.original?.chequeOrVoucherNo as string}
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
                accessorKey: 'withdrawDr',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(savingReportTotal?.totalWithdraw as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Deposit Amount (Cr.)',
                accessorKey: 'depositCr',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(savingReportTotal?.totalDeposit as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance Amount',
                accessorKey: 'balanceAmount',
                // cell: (props) => (
                //   <Box display="flex" gap="s16">
                //     <Text fontSize="r1" fontWeight="400">
                //       {amountConverter(props.getValue() as string)}
                //     </Text>

                //   </Box>
                // ),

                footer: () => amountConverter(savingReportTotal?.totalBalance as string),
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
