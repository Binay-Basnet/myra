import { useState } from 'react';
import dayjs from 'dayjs';

import { Box, GridItem } from '@myra-ui';

import {
  EbankingReportResult,
  MBankingTransactionData,
  MBankingTransactionFilter,
  TransactionTypeFilter,
  useGetMbTransactionReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const MBTransactionsReport = () => {
  const [filters, setFilters] = useState<MBankingTransactionFilter | null>(null);

  const { data, isFetching } = useGetMbTransactionReportQuery(
    {
      data: filters as MBankingTransactionFilter,
    },
    { enabled: !!filters }
  );
  const mobileBankingReport = data?.report?.mBankingTransactionReport?.data;

  return (
    <Report
      defaultFilters={{
        filter: { transactionType: [TransactionTypeFilter.All] },
      }}
      data={mobileBankingReport as EbankingReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MB_CHANNEL_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Mobile Banking Reports', link: '/reports/cbs/mobile-banking' },
            {
              label: 'Mobile Banking Registration Report',
              link: '/reports/cbs/mobile-banking/transaction/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={1}>
            <ReportDateRange label="Transaction Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period.periodType} />
          <Report.Table<MBankingTransactionData & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Initiator Member Name',
                accessorKey: 'initiatorName',
                meta: {
                  width: '40%',
                },
              },
              {
                header: 'Initiator Phone Number',
                accessorFn: (row) => row?.phoneNo,
              },
              {
                header: 'From Account',
                accessorFn: (row) => row?.srcAccount,
              },
              {
                header: 'Destination Account',
                accessorFn: (row) => row?.destAccount,
              },
              {
                header: 'Transaction Amount',
                accessorFn: (row) => row?.amount,
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Transaction Type',
                accessorFn: (row) => row?.transactionType?.toLowerCase(),
                cell: (props) => <Box textTransform="capitalize">{props.getValue() as string}</Box>,
              },
              {
                header: 'Bank / Wallet / Fonepay',
                accessorFn: (row) => row?.transThrough,
              },
              {
                header: 'Transaction Date',
                accessorFn: (row) => row?.transDate?.local,
                cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
              },
              {
                header: 'Narration',
                accessorFn: (row) => row?.narration,
              },
              {
                header: 'Status',
                accessorFn: (row) => row?.status?.toLowerCase(),
                cell: (props) => <Box textTransform="capitalize">{props.getValue() as string}</Box>,
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Transaction Type">
            <FormCheckboxGroup
              name="filter.transactionType"
              list={[
                { label: 'All', value: TransactionTypeFilter.All },
                { label: 'Wallet', value: TransactionTypeFilter.Wallet },
                { label: 'IBFT', value: TransactionTypeFilter.Ibft },
                { label: 'QR Wallet', value: TransactionTypeFilter.Qr },
              ]}
              orientation="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
