import { useState } from 'react';
import { Text } from '@chakra-ui/react';

import { GridItem } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';
import { ExpandedCell, ExpandedHeader, MultiFooter } from '@myra-ui/table';

import {
  LocalizedDateFilter,
  useGetDayBookReportQuery,
  useGetTellerListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormDatePicker, FormSelect } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type DayBookTable = {
  accountHead: string;
  amount: string;
  particular: string;
  voucherNo: string;
  ledger: string;
  children: DayBookTable[];
}[];

type ReportFilter = {
  branchId: { label: string; value: string }[];
  period: LocalizedDateFilter;
  filter: {
    user: string;
  };
};

export const DayBookReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const { isCbs } = useIsCbs();

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetDayBookReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
        user: filters?.filter?.user ? [filters?.filter?.user as string] : null,
        // date: filters?.date,
        branchId: branchIDs,
      },
    },
    { enabled: !!filters }
  );

  const { data: userListData } = useGetTellerListQuery();

  const userList = userListData?.settings?.myraUser?.tellers;

  const receiptData = data?.report?.transactionReport?.financial?.dayBookReport?.data;
  const totalAmount = receiptData?.totalAmount;
  const openingBalance = receiptData?.openingBalance;
  const totalReceipt = receiptData?.totalReceipts;
  const totalPayment = receiptData?.totalPayment;
  const closingAmount = receiptData?.closingAmount;

  const receipts: DayBookTable =
    data?.report?.transactionReport?.financial?.dayBookReport?.data?.receipts?.map((receipt) => ({
      accountHead: receipt?.accountHead,
      amount: receipt?.amount,
      particular: '-',
      voucherNo: '-',
      ledger: '-',
      children: sortParticular(
        receipt?.entries?.map((entry) => ({
          ...entry,
          children: [],
          accountHead: entry?.particular,
        })) as unknown as DayBookTable
      ),
    })) as unknown as DayBookTable;

  const payments: DayBookTable =
    data?.report?.transactionReport?.financial?.dayBookReport?.data?.payments?.map((receipt) => ({
      accountHead: receipt?.accountHead,
      amount: receipt?.amount,
      voucherNo: '-',
      ledger: '-',
      children: sortParticular(
        receipt?.entries?.map((entry) => ({
          ...entry,
          children: [],
          accountHead: entry?.particular,
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
            {
              label: 'Transaction Reports',
              link: isCbs ? '/reports/cbs/transactions' : '/accounting/reports/transactions',
            },
            {
              label: 'Day Book Report',
              link: isCbs
                ? '/reports/cbs/transactions/day-book/new'
                : '/accounting/reports/transactions/day-book/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
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
                    <Box whiteSpace="pre-line" my="s4">
                      <ExpandedCell row={props.row} value={props.getValue() as string} />
                    </Box>
                  ),
                  footer: () => <MultiFooter texts={['Total Receipts', 'Total Amount']} />,
                  meta: {
                    width: '30%',
                    Footer: {
                      colspan: 3,
                    },
                  },
                },
                {
                  header: 'Ledgers',
                  accessorKey: 'ledger',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" w="100%" my="s4">
                      {props.getValue() as string}
                    </Box>
                  ),
                  meta: {
                    width: '40%',
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Voucher No',
                  accessorKey: 'voucherNo',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" w="100%">
                      <RouteToDetailsPage
                        id={props?.row?.original?.voucherNo as string}
                        type="transactions"
                        label={props?.row?.original?.voucherNo as string}
                      />
                    </Box>
                  ),
                  meta: {
                    width: '50px',
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Detail Amount',
                  accessorKey: 'amount',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" w="100%">
                      {amountConverter(props.getValue() as string)}
                    </Box>
                  ),
                  meta: {
                    width: '50px',
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
              tableTitle="Receipts (Cr.)"
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
                    <Box whiteSpace="pre-line" my="s4">
                      <ExpandedCell row={props.row} value={props.getValue() as string} />
                    </Box>
                  ),
                  footer: () => <MultiFooter texts={['Total Receipts', 'Total Amount']} />,
                  meta: {
                    width: '30%',
                    Footer: {
                      colspan: 3,
                    },
                  },
                },
                {
                  header: 'Ledgers',
                  accessorKey: 'ledger',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" my="s4">
                      {props.getValue() as string}
                    </Box>
                  ),
                  meta: {
                    width: '30%',
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Voucher No',
                  accessorKey: 'voucherNo',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" w="100%">
                      <RouteToDetailsPage
                        id={props?.row?.original?.voucherNo as string}
                        type="transactions"
                        label={props?.row?.original?.voucherNo as string}
                      />
                    </Box>
                  ),
                  meta: {
                    width: '50px',
                    Footer: {
                      display: 'none',
                    },
                  },
                },
                {
                  header: 'Detail Amount',
                  accessorKey: 'amount',
                  cell: (props) => (
                    <Box whiteSpace="pre-line" w="100%">
                      {amountConverter(props.getValue() as string)}
                    </Box>
                  ),
                  meta: {
                    width: '50px',
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
              tableTitle="Payments (Dr.)"
            />
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User">
            <FormSelect
              label="User"
              options={userList?.map((user) => ({
                label: user?.name as string,
                value: user?.id as string,
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
