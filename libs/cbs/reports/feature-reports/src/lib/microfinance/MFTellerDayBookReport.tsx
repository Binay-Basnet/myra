import { useState } from 'react';
import { Text } from '@chakra-ui/react';

import { Box } from '@myra-ui/foundations';
import { ExpandedCell, ExpandedHeader, MultiFooter } from '@myra-ui/table';

import {
  LocalizedDateFilter,
  useGetMfTellerDayBookReportQuery,
  useGetTellerListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormDatePicker, FormMFGroupSelect, FormSelect } from '@coop/shared/form';
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
  branchId: { label: string; value: string }[];
  period: LocalizedDateFilter;
  user: string;
  groupId: string[];
};

export const MFTellerDayBookReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetMfTellerDayBookReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
        user: filters?.user as string,
        // date: filters?.date,
        branchId: branchIDs,
        groupId: filters?.groupId as string[],
      },
    },
    { enabled: !!filters }
  );

  const { data: userListData } = useGetTellerListQuery();

  const userList = userListData?.settings?.myraUser?.tellers;

  const receiptData = data?.report?.microfinanceReport?.mFTellerDayBookReport?.data;
  const totalAmount = receiptData?.totalAmount;
  const totalReceipt = receiptData?.totalReceipts;
  const totalPayment = receiptData?.totalPayment;
  const closingAmount = receiptData?.closingAmount;
  const tellerBalance = receiptData?.tellerBalance;
  const vaultBalance = receiptData?.vaultBalance;
  const openingBalance = receiptData?.openingBalance;

  const remainingBalance = receiptData?.remainingBalance;
  const toVault = receiptData?.cashToVault;

  const receipts: DayBookTable =
    data?.report?.microfinanceReport?.mFTellerDayBookReport?.data?.receipts?.map((receipt) => ({
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
    data?.report?.microfinanceReport?.mFTellerDayBookReport?.data?.payments?.map((receipt) => ({
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
      data={receipts?.length ? receipts : payments}
      isLoading={isFetching}
      report={ReportEnum.MICROFINANCE_TELLER_DAY_BOOK_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Micro Finance Reports',
              link: '/cbs/reports/cbs-reports/micro-finance',
            },
            {
              label: 'Micro Finance Teller Day Book Report',
              link: '/cbs/reports/cbs-reports/micro-finance/teller-day-book/new',
            },
          ]}
        />

        <Report.Inputs>
          <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          <FormMFGroupSelect name="groupId" label="Group" />
          <FormSelect
            label="Teller"
            options={userList?.map((user) => ({
              label: user?.name as string,
              value: user?.id as string,
            }))}
            name="user"
          />
          <FormDatePicker name="period.from" label="Date" isTransactionBaseDate />
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

              <Box display="flex" gap="s16">
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Teller Balance: {amountConverter(tellerBalance || 0)}
                </Text>
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  From Vault : {amountConverter(vaultBalance || 0)}
                </Text>
                <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                  Opening Balance: {amountConverter(openingBalance || 0)}
                </Text>
              </Box>
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
                    width: '3.125rem',
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
                    width: '3.125rem',
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
                  footer: () => (
                    <MultiFooter texts={['Total Payments', 'Remaining Balance', 'To Vault']} />
                  ),
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
                    width: '3.125rem',
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
                    width: '3.125rem',
                    isNumeric: true,
                  },
                  footer: () => (
                    <MultiFooter
                      texts={[
                        amountConverter(totalPayment || '0') as string,
                        amountConverter(remainingBalance || '0') as string,

                        amountConverter(toVault || '0') as string,
                      ]}
                    />
                  ),
                },
              ]}
              tableTitle="Payments (Dr.)"
            />
            <Box display="flex" gap="s16" justifyContent="flex-end">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                Closing Balance: {amountConverter(closingAmount || 0)}
              </Text>
            </Box>
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

const sortAccountHead = (data: DayBookTable) =>
  data?.sort((a, b) =>
    Number(
      a?.accountHead?.localeCompare(b?.accountHead as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );

const sortParticular = (data: DayBookTable) =>
  data?.sort((a, b) =>
    Number(
      a?.particular?.localeCompare(b?.particular as string, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
  );
