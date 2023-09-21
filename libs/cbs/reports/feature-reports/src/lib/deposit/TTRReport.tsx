import { useState } from 'react';

import { Box, GridItem, Text } from '@myra-ui';

import {
  Address,
  LocalizedDateFilter,
  MinMaxFilter,
  NatureOfTransaction,
  TtrDataEntry,
  useGetTtrReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormSelect,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: { label: string; value: string }[];
  filter?: {
    amount?: MinMaxFilter;
    fiscalYear?: LocalizedDateFilter;
    member?: {
      label: string;
      value: string;
    }[];
    natureOfTransactions?: NatureOfTransaction[];
  };
  period: LocalizedDateFilter;
};

export const TTRReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const memberIds =
    filters?.filter?.member && filters?.filter?.member.length !== 0
      ? filters?.filter?.member?.map((m) => m.value)
      : null;

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetTtrReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          ...filters?.filter,
          member: memberIds,
        },
      },
    },
    { enabled: !!filters }
  );
  const reportData = data?.report?.depositReport?.thresholdTransactionReport?.data?.yearly;
  const eachTransReport = data?.report?.depositReport?.thresholdTransactionReport?.data?.perTranx;

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
      data={(reportData || eachTransReport) as TtrDataEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.THRESHOLD_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/cbs/reports/cbs-reports/savings' },
            { label: 'TTR Report', link: '/cbs/reports/cbs-reports/savings/ttr/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" py="s32" flexDir="column">
            {reportData && reportData?.length !== 0 && (
              <Box display="flex" py="s8" flexDir="column">
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Yearly Transaction (above 30 Lakh){' '}
                </Text>
                <Report.Table<TtrDataEntry & { index: number }>
                  data={reportData?.map((d, index) => ({ ...d, index: index + 1 })) || []}
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
                      header: 'Service Center',
                      accessorKey: 'branch',
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
                      accessorFn: (row) => localizedDate(row?.date),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: 'Nature of Transaction',
                      accessorKey: 'nature',
                      cell: (props) => (
                        <Box textTransform="capitalize">
                          {' '}
                          {props?.row?.original?.nature?.toLowerCase()?.replace(/_/g, ' ')}
                        </Box>
                      ),
                    },
                    {
                      header: 'Account Type of No.',
                      accessorKey: 'accountNo',
                      cell: (props) => (
                        <RouteToDetailsPage
                          id={props?.row?.original?.accountNo as string}
                          type="savings"
                          label={props?.row?.original?.accountNo as string}
                        />
                      ),
                      meta: {
                        skipExcelFormatting: true,
                      },
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
                  tableTitle="Yearly Transaction (above 30 Lakh)"
                />
              </Box>
            )}
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
                    header: 'Service Center',
                    accessorKey: 'branch',
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
                    accessorFn: (row) => localizedDate(row?.date),
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
                tableTitle="Each Transaction (above 10 Lakh)"
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
                memberListArray.filter((m) => !!m.value),
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
