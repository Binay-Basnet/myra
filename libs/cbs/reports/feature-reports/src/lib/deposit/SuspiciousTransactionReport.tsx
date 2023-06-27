import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  MinMaxFilter,
  NatureOfTransaction,
  SuspiciousTransactionReport,
  useGetSuspiciousTransactionReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
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

    memberId?: {
      label: string;
      value: string;
    }[];
    nature?: NatureOfTransaction[];
  };
  period: LocalizedDateFilter;
};

export const SuspiousTransactionReport = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const memberIds =
    filters?.filter?.memberId && filters?.filter?.memberId.length !== 0
      ? filters?.filter?.memberId?.map((m) => m.value)
      : null;

  const { data, isFetching } = useGetSuspiciousTransactionReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        filter: {
          ...filters?.filter,
          memberId: memberIds,
        },
      },
    },
    { enabled: !!filters }
  );
  const reportData = data?.report?.depositReport?.suspiciousTransctionReport?.data;

  const memberFromYearlyData =
    reportData?.map((d) => ({
      label: d?.memberName?.local as string,
      value: d?.memberId as string,
    })) || [];

  const memberListArray = [...memberFromYearlyData];

  return (
    <Report
      defaultFilters={{
        filter: {
          nature: [NatureOfTransaction?.All],
        },
      }}
      data={reportData as SuspiciousTransactionReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_SUSPICIOUS_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Suspicious Transaction Report',
              link: '/reports/cbs/savings/suspicious-transactions/new',
            },
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

          <Report.Table<SuspiciousTransactionReport>
            columns={[
              {
                header: 'Service Center',
                accessorKey: 'branchName',
              },
              {
                header: 'Transaction Id',
                cell: (props) => (
                  <Button
                    variant="link"
                    onClick={() =>
                      router.push(
                        `/reports/cbs/savings/suspicious-transactions/details?id=${props?.row?.original?.id}`
                      )
                    }
                  >
                    {props?.row?.original?.id}
                  </Button>
                ),
              },
              {
                header: 'Transaction Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'Member Id',
                accessorKey: 'memberId',
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
                accessorFn: (row) => row?.memberName?.local,
              },
              {
                header: 'Transaction Amount',
                accessorKey: 'amount',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Product Name',
                accessorKey: 'product_name',
              },
              {
                header: 'Type of Transaction',

                accessorKey: 'tranxType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {' '}
                    {props?.row?.original?.tranxType?.toLowerCase()?.replace(/_/g, ' ')}
                  </Box>
                ),
              },
              {
                header: 'Status',
                accessorKey: 'status',
                accessorFn: (row) =>
                  row?.status !== null ? (row?.status ? 'Accepted' : 'Declined') : 'Pending',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Type of Transaction">
            <FormCheckboxGroup
              name="filter.nature"
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
              name="filter.memberId"
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
