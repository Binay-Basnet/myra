import { useState } from 'react';
import { Text } from '@chakra-ui/react';

import { GridItem } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';
import { ExpandedCell, ExpandedHeader, MultiFooter } from '@myra-ui/table';

import {
  LocalizedDateFilter,
  Roles,
  useGetDayBookReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type DayBookTable = {
  accountHead: string;
  amount: string;
  particular: string;
  voucherNo: string;
  ledger: string;
  children: DayBookTable[];
}[];

type ReportFilter = {
  branchId: string;
  date: LocalizedDateFilter;
  filter: {
    user: string;
  };
};

export const DayBookReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const { data, isFetching } = useGetDayBookReportQuery(
    {
      data: {
        user: filters?.filter?.user ? [filters?.filter?.user as string] : null,
        date: filters?.date,
        branchId: filters?.branchId as string,
      },
    },
    { enabled: !!filters }
  );

  const { data: userListData } = useGetSettingsUserListDataQuery({
    filter: { role: [Roles.Teller, Roles.HeadTeller] },
    paginate: { after: '', first: -1 },
  });

  const userList = userListData?.settings?.myraUser?.list?.edges;

  const receiptData = data?.report?.transactionReport?.financial?.dayBookReport?.data;
  const totalAmount = receiptData?.totalAmount;
  const openingBalance = receiptData?.openingBalance;
  const totalReceipt = receiptData?.totalReceipts;
  const totalPayment = receiptData?.totalPayment;
  const closingAmount = receiptData?.closingAmount;

  const receipts: DayBookTable =
    data?.report?.transactionReport?.financial?.dayBookReport?.data?.receipts?.map((receipt) => ({
      accountHead: receipt?.accountHead,
      amount: amountConverter(receipt?.amount as string),
      particular: '-',
      voucherNo: '-',
      ledger: '-',
      children: sortParticular(
        receipt?.entries?.map((entry) => ({
          ...entry,
          children: [],
          accountHead: '-',
        })) as unknown as DayBookTable
      ),
    })) as unknown as DayBookTable;

  const payments: DayBookTable =
    data?.report?.transactionReport?.financial?.dayBookReport?.data?.payments?.map((receipt) => ({
      accountHead: receipt?.accountHead,
      amount: amountConverter(receipt?.amount as string),
      particular: '-',
      voucherNo: '-',
      ledger: '-',
      children: sortParticular(
        receipt?.entries?.map((entry) => ({
          ...entry,
          children: [],
          accountHead: '-',
        })) as unknown as DayBookTable
      ),
    })) as unknown as DayBookTable;

  return (
    <Report
      data={receipts ?? payments}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_DAY_BOOK_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            { label: 'Day Book Report', link: '/reports/cbs/transactions/day-book/new' },
          ]}
        />

        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange name="date" label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          <Box display="flex" py="s16" flexDir="column">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Receipts (Cr.)
              </Text>
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Opening Balance: {amountConverter(openingBalance || 0)}
              </Text>
            </Box>

            <Report.Table
              data={sortAccountHead(receipts)}
              showFooter
              columns={[
                {
                  header: ({ table }) => (
                    <ExpandedHeader table={table} value="Account Head and Code" />
                  ),

                  accessorKey: 'accountHead',
                  cell: (props) => (
                    <ExpandedCell row={props.row} value={props.getValue() as string} />
                  ),
                  footer: () => <MultiFooter texts={['Total Receipts', 'Total Amount']} />,
                  meta: {
                    Footer: {
                      colspan: 4,
                    },
                  },
                },
                {
                  header: 'Particulars',
                  accessorKey: 'particular',
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Ledgers',
                  accessorKey: 'ledger',
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
                  header: 'Detail Amount',
                  accessorKey: 'amount',
                  meta: {
                    isNumeric: true,
                  },
                  footer: () => (
                    <MultiFooter
                      texts={[
                        amountConverter(totalReceipt || '0') as string,
                        amountConverter(totalAmount || '0') as string,
                      ]}
                    />
                  ),
                },
              ]}
            />
          </Box>

          <Box display="flex" py="s16" flexDir="column">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Payments (Dr.)
              </Text>
            </Box>

            <Report.Table
              data={sortAccountHead(payments)}
              showFooter
              columns={[
                {
                  header: ({ table }) => (
                    <ExpandedHeader table={table} value="Account Head and Code" />
                  ),

                  accessorKey: 'accountHead',
                  cell: (props) => (
                    <ExpandedCell row={props.row} value={props.getValue() as string} />
                  ),
                  footer: () => <MultiFooter texts={['Total Payments', 'Closing Balance']} />,
                  meta: {
                    Footer: {
                      colspan: 4,
                    },
                  },
                },
                {
                  header: 'Particulars',
                  accessorKey: 'particular',
                  meta: {
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Ledgers',
                  accessorKey: 'ledger',
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
                  header: 'Detail Amount',
                  accessorKey: 'amount',
                  meta: {
                    isNumeric: true,
                  },
                  footer: () => (
                    <MultiFooter
                      texts={[
                        amountConverter(totalPayment || '0') as string,
                        amountConverter(closingAmount || '0') as string,
                      ]}
                    />
                  ),
                },
              ]}
            />
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User">
            <FormSelect
              label="User"
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.user"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

export const sortAccountHead = (data: DayBookTable) =>
  data?.sort((a, b) =>
    Number(
      a?.accountHead?.localeCompare(b?.accountHead as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );

export const sortParticular = (data: DayBookTable) =>
  data?.sort((a, b) =>
    Number(
      a?.particular?.localeCompare(b?.particular as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );
