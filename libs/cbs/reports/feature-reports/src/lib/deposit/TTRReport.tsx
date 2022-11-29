import { useState } from 'react';
import { Box, GridItem, Text } from '@myra-ui';
import dayjs from 'dayjs';

import {
  Address,
  LocalizedDateFilter,
  MinMaxFilter,
  NatureOfTransaction,
  PeriodInput,
  TtrDataEntry,
  useGetTtrReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormSelect,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: string;
  filter?: {
    amount?: MinMaxFilter;
    fiscalYear?: LocalizedDateFilter;
    member?: {
      label: string;
      value: string;
    }[];
    natureOfTransactions?: NatureOfTransaction[];
  };
  period: PeriodInput;
};

export const TTRReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const memberIds =
    filters?.filter?.member && filters?.filter?.member.length !== 0
      ? filters?.filter?.member?.map((m) => m.value)
      : null;

  const { data, isFetching } = useGetTtrReportQuery(
    {
      data: {
        branchId: filters?.branchId as string,
        period: filters?.period as PeriodInput,
        filter: {
          ...filters?.filter,
          member: memberIds,
        },
      },
    },
    { enabled: !!filters }
  );
  const reportData = data?.report?.thresholdTransactionReport?.data?.yearly;
  const eachTransReport = data?.report?.thresholdTransactionReport?.data?.perTranx;

  const memberFromYearlyData =
    reportData?.map((d) => ({
      label: d?.name?.local as string,
      value: d?.memberId as string,
    })) || [];
  const memberFromEachData =
    eachTransReport?.map((d) => ({
      label: d?.name?.local as string,
      value: d?.memberId as string,
    })) || [];

  const memberListArray = [...memberFromYearlyData, ...memberFromEachData];

  return (
    <Report
      defaultFilters={{
        filter: {
          natureOfTransactions: [NatureOfTransaction?.All],
        },
      }}
      data={reportData as TtrDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.THRESHOLD_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            { label: 'TTR Report', link: '/reports/cbs/savings/ttr/new' },
          ]}
        />
        <Report.Inputs
          defaultFilters={{
            filter: {
              natureOfTransactions: [NatureOfTransaction?.All],
            },
          }}
          setFilters={setFilters}
        >
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Box display="flex" py="s32" flexDir="column">
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Yearly Transaction (above 30 Lakh){' '}
              </Text>
              <Report.Table<TtrDataEntry & { index: number }>
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',

                    meta: {
                      width: '60px',
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: 'Name',
                    accessorFn: (row) => row?.name?.local,
                  },
                  {
                    header: 'Address',
                    accessorKey: 'address',
                    cell: (props) => formatAddress(props.getValue() as Address),
                  },
                  {
                    header: 'Branch',
                    accessorKey: 'branch',
                  },
                  {
                    header: 'Date',
                    accessorFn: (row) => row?.date?.local,
                    cell: ({ cell }) => dayjs(cell.row.original.date?.en).format('YYYY-MM-DD'),
                  },
                  {
                    header: 'Nature of Transaction',
                    accessorKey: 'nature',
                    cell: (props) => (
                      <Box textTransform="capitalize">
                        {' '}
                        {props?.cell?.row?.original?.nature?.toLowerCase()?.replace(/_/g, ' ')}
                      </Box>
                    ),
                  },
                  {
                    header: 'Account Type of No.',
                    accessorKey: 'accountNo',
                  },
                  {
                    header: 'Source of Fund',
                    accessorKey: 'sourceOfFund',
                  },
                  {
                    header: 'Amount Involved',
                    accessorKey: 'amount',
                    cell: (props) => amountConverter(props.getValue() as string),
                  },
                  {
                    header: 'Remarks',
                    accessorKey: 'remarks',
                  },
                ]}
              />
            </Box>
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Each Transaction (above 10 Lakh){' '}
              </Text>
              <Report.Table<TtrDataEntry & { index: number }>
                data={eachTransReport?.map((d, index) => ({ ...d, index: index + 1 }))}
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',

                    meta: {
                      width: '60px',
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: 'Name',
                    accessorFn: (row) => row?.name?.local,
                  },
                  {
                    header: 'Address',
                    accessorKey: 'address',
                    cell: (props) => formatAddress(props.getValue() as Address),
                  },
                  {
                    header: 'Branch',
                    accessorKey: 'branch',
                  },
                  {
                    header: 'Date',
                    accessorFn: (row) => row?.date?.local,
                    cell: ({ cell }) => dayjs(cell.row.original.date?.en).format('YYYY-MM-DD'),
                  },
                  {
                    header: 'Nature of Transaction',
                    accessorKey: 'nature',
                    cell: (props) => (
                      <Box textTransform="capitalize">
                        {' '}
                        {props?.cell?.row?.original?.nature?.toLowerCase()?.replace(/_/g, ' ')}
                      </Box>
                    ),
                  },
                  {
                    header: 'Account Type of No.',
                    accessorKey: 'accountNo',
                  },
                  {
                    header: 'Source of Fund',
                    accessorKey: 'sourceOfFund',
                  },
                  {
                    header: 'Amount Involved',
                    accessorKey: 'amount',
                    cell: (props) => amountConverter(props.getValue() as string),
                  },
                  {
                    header: 'Remarks',
                    accessorKey: 'remarks',
                  },
                ]}
              />
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Transaction">
            <FormCheckboxGroup
              name="filter.natureOfTransactions"
              list={[
                { label: 'All', value: NatureOfTransaction.All },
                { label: 'Deposit', value: NatureOfTransaction.Deposit },
                { label: 'Withdraw', value: NatureOfTransaction.Withdraw },
                { label: 'Transfer', value: NatureOfTransaction.Transfer },
                { label: 'Loan Disbursment', value: NatureOfTransaction.LoanDisbursment },
                { label: 'Loan Repayment', value: NatureOfTransaction.LoanRepayment },
                { label: 'Share Purchase', value: NatureOfTransaction.SharePurchase },
                { label: 'Share Return', value: NatureOfTransaction.ShareReturn },
                { label: 'Account Close', value: NatureOfTransaction.AccountClose },
                { label: 'Alternate Channels', value: NatureOfTransaction.AlternateChannel },
                { label: 'Ebanking', value: NatureOfTransaction.Ebanking },
                { label: 'Interest Booking', value: NatureOfTransaction.InterestBooking },
                { label: 'Interest Posting', value: NatureOfTransaction.InterestPosting },
                { label: 'Membership', value: NatureOfTransaction.Membership },
                { label: 'Teller Transfer', value: NatureOfTransaction.TellerTransfer },
              ]}
              orientation="column"
            />
          </Report.Filter>
          <Report.Filter title="Member">
            <FormSelect
              name="filter.member"
              options={getUniqueListBy(
                memberListArray.filter((m) => !m.value),
                'value'
              )}
              isMulti
            />
          </Report.Filter>
          <Report.Filter title="Amount Range">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

const getUniqueListBy = <T extends Record<string, unknown>>(arr: Partial<T>[], key: string) =>
  [...new Map(arr.map((item) => [item[key], item])).values()] as T[];
