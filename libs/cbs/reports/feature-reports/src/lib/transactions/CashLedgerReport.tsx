import { useState } from 'react';
import dayjs from 'dayjs';

import { Box, GridItem, Text } from '@myra-ui';

import {
  CashLedgerReport,
  CashLedgerTransactionWiseFilter,
  CashLedgerWiseFilter,
  PeriodInput,
  useGetCashLedgerReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: string;
  filter?: {
    ledgerWise?: CashLedgerWiseFilter;
    transactionWise?: CashLedgerTransactionWiseFilter;
    userIds?: {
      label: string;
      value: string;
    }[];
  };
  period: PeriodInput;
};
export const CashLedgersReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);
  const UserIds =
    filters?.filter?.userIds && filters?.filter?.userIds.length !== 0
      ? filters?.filter?.userIds?.map((t) => t.value)
      : null;

  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.HeadTeller, Roles.Teller] },
    paginate: { after: '', first: -1 },
  });
  const userList = userListData?.settings?.myraUser?.list?.edges;

  const { data, isFetching } = useGetCashLedgerReportQuery(
    {
      data: {
        branchId: filters?.branchId as string,
        period: filters?.period as PeriodInput,
        filter: {
          ...filters?.filter,
          userIds: UserIds,
        },
      },
    },
    { enabled: !!filters }
  );

  const summaryData = data?.report?.cashLedgerReport?.summary;
  const summaryLength = summaryData?.length;
  const openingBalance = data?.report?.cashLedgerReport?.openingBalance;
  const closingBalance = data?.report?.cashLedgerReport?.closingBalance;
  const detailsData = data?.report?.cashLedgerReport?.details;
  const detailsLength = detailsData?.length;

  return (
    <Report
      defaultFilters={{}}
      data={(summaryLength !== 0 ? summaryData : detailsData) as CashLedgerReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_CASH_LEDGER}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            { label: 'Cash Ledger', link: '/reports/cbs/transactions/cash-ledger/new' },
          ]}
        />
        <Report.Inputs>
          {' '}
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Box display="flex" py="s32" flexDir="column">
            {summaryData && summaryLength !== 0 && (
              <Box display="flex" py="s8" flexDir="column">
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                    Cash Ledger Report(Summary)
                  </Text>
                  <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                    Opening Balance: {openingBalance ? amountConverter(openingBalance) : '-'}
                  </Text>
                </Box>
                <Report.Table<CashLedgerReport>
                  showFooter
                  columns={[
                    {
                      header: 'Date',
                      footer: () => <Box textAlign="right">Total </Box>,
                      accessorFn: (row) => row?.date?.local,
                      cell: ({ cell }) => dayjs(cell.row.original.date?.en).format('YYYY-MM-DD'),

                      meta: {
                        width: '60px',
                        Footer: {
                          colspan: 1,
                        },
                      },
                    },
                    {
                      header: 'Ledger Code',
                      accessorKey: 'ledgerCode',
                      footer: () => (
                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                            Closing Balance
                          </Text>
                          <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                            {closingBalance ? amountConverter(closingBalance) : '-'}
                          </Text>
                        </Box>
                      ),
                      meta: {
                        Footer: {
                          colspan: 5,
                        },
                      },
                    },
                    {
                      header: 'Particular',
                      accessorKey: 'particular',

                      meta: {
                        Footer: {
                          display: 'none',
                        },
                      },
                    },

                    {
                      header: 'Cash Recieved Dr.',
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'cashDr',
                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Cash Recieved Cr.',
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'cashCr',
                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Balance',
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'balance',
                      footer: () => {
                        openingBalance ? amountConverter(openingBalance) : '-';
                      },

                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                  ]}
                />
              </Box>
            )}
            {detailsData && detailsLength !== 0 && (
              <Box display="flex" py="s8" flexDir="column">
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Cash Ledger Report(Details)
                </Text>
                <Report.Table<CashLedgerReport>
                  data={detailsData as CashLedgerReport[]}
                  showFooter
                  columns={[
                    {
                      header: 'Date',
                      footer: () => <Box textAlign="right">Total </Box>,
                      accessorFn: (row) => row?.date?.local,
                      cell: ({ cell }) => dayjs(cell.row.original.date?.en).format('YYYY-MM-DD'),

                      meta: {
                        width: '60px',
                        Footer: {
                          colspan: 1,
                        },
                      },
                    },
                    {
                      header: 'Ledger Code',
                      accessorKey: 'ledgerCode',
                      footer: () => (
                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                            Closing Balance
                          </Text>
                          <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                            {closingBalance ? amountConverter(closingBalance) : '-'}
                          </Text>
                        </Box>
                      ),
                      meta: {
                        Footer: {
                          colspan: 6,
                        },
                      },
                    },
                    {
                      header: 'Particular',
                      accessorKey: 'particular',

                      meta: {
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Voucher No',
                      accessorKey: 'voucherNo',

                      meta: {
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Cash Recieved Dr.',
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'cashDr',
                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Cash Recieved Cr.',
                      accessorKey: 'cashCr',
                      cell: (props) => amountConverter(props.getValue() as string),

                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                    {
                      header: 'Balance',
                      cell: (props) => amountConverter(props.getValue() as string),
                      accessorKey: 'balance',
                      meta: {
                        isNumeric: true,
                        Footer: {
                          display: 'none',
                        },
                      },
                    },
                  ]}
                />
              </Box>
            )}
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User Wise">
            <FormSelect
              isMulti
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.userIds"
            />
          </Report.Filter>
          <Report.Filter title="Ledger Wise">
            <FormRadioGroup
              name="filter.ledgerWise"
              options={[
                { label: 'All', value: CashLedgerWiseFilter.All },
                { label: 'Summary', value: CashLedgerWiseFilter?.Summary },
                { label: 'Details', value: CashLedgerWiseFilter?.Details },
              ]}
              direction="column"
            />
          </Report.Filter>
          <Report.Filter title="Transaction Wise">
            <FormRadioGroup
              name="filter.transactionWise"
              options={[
                { label: 'All', value: CashLedgerTransactionWiseFilter?.All },
                { label: 'Cash Received', value: CashLedgerTransactionWiseFilter?.CashReceived },
                { label: 'Cash Payment', value: CashLedgerTransactionWiseFilter?.CashPayment },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
