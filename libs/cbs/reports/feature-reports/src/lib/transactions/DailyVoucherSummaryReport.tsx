import { useState } from 'react';

import {
  DailyVoucherSummaryReportData,
  LocalizedDateFilter,
  TransactionNature,
  useGetDailyVoucherSummaryReportQuery,
  useGetTellerListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormCBSDatePicker, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  userIds: {
    label: string;
    value: string;
  }[];
  transactionNature: TransactionNature;
  period: LocalizedDateFilter;
};

export const DailyVoucherSummaryReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const userIds =
    filters?.userIds && filters?.userIds.length !== 0
      ? filters?.userIds?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetDailyVoucherSummaryReportQuery(
    {
      data: {
        branchId: branchIds as string[],
        userIds: userIds as string[],
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
        transactionNature: filters?.transactionNature as TransactionNature,
      },
    },
    { enabled: !!filters }
  );

  const reportData =
    data?.report?.transactionReport?.financial?.dailyVoucherSummaryReport?.data ?? [];

  const { data: userListData } = useGetTellerListQuery();

  const userList = userListData?.settings?.myraUser?.tellers;

  return (
    <Report
      defaultFilters={{}}
      data={reportData as DailyVoucherSummaryReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_DAILY_VOUCHER_SUMMARY}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/cbs/reports/cbs-reports/transactions' },
            {
              label: 'Daily Voucher Summary Report',
              link: '/cbs/reports/cbs-reports/transactions/daily-voucher-summary/new',
            },
          ]}
        />
        <Report.Inputs>
          {/* <GridItem colSpan={2}> */}
          <FormBranchSelect
            showUserBranchesOnly
            isMulti
            name="branchId"
            label="Service Center"
            // isDisabled={!!branch}
          />
          {/* </GridItem> */}

          <FormSelect
            label="Teller"
            options={userList?.map((user) => ({
              label: user?.name as string,
              value: user?.id as string,
            }))}
            name="userIds"
            isMulti
          />

          <FormSelect
            label="Transaction Nature"
            options={[
              { label: 'Manual', value: TransactionNature.Manual },
              { label: 'System', value: TransactionNature.System },
              { label: 'All', value: TransactionNature.All },
            ]}
            name="transactionNature"
          />

          {/* <GridItem colSpan={2}> */}
          <FormCBSDatePicker name="period.from" label="Date" setInitialDate />
          {/* </GridItem> */}
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<DailyVoucherSummaryReportData>
            columns={[
              {
                header: 'COA Code',
                accessorKey: 'coaCode',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'COA Head',
                accessorKey: 'coaHeadName',
                meta: {
                  width: 'auto',
                },
              },
              {
                header: 'Debit',
                accessorKey: 'drAmount',
                cell: (props) => amountConverter(props?.row?.original?.drAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Credit',
                accessorKey: 'crAmount',
                cell: (props) => amountConverter(props?.row?.original?.crAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
