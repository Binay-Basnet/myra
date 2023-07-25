import { useState } from 'react';

import {
  DailyBalanceReportData,
  LocalizedDateFilter,
  useGetDailyBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { DailyBalanceReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

type ReportFilter = {
  branchId: { label: string; value: string }[];
  coaHead: { label: string; value: string }[];
  ledgerId: { label: string; value: string }[];
  period: LocalizedDateFilter;
  allLedgers: boolean;
};

export const DailyBalanceReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const coaHeads =
    filters?.coaHead && filters?.coaHead.length !== 0 ? filters?.coaHead?.map((t) => t.value) : [];

  const allLedgers = filters?.allLedgers ?? false;

  const ledgerIds =
    filters?.ledgerId && filters?.ledgerId.length !== 0
      ? filters?.ledgerId?.map((t) => t.value)
      : [];

  //   const { data: tagOptions } = useGetTagListForReportQuery();

  const { data, isFetching } = useGetDailyBalanceReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.to,
        } as LocalizedDateFilter,
        branchId: branchIDs,
        coaHead: coaHeads,
        allLedgers,
        ledgerId: ledgerIds,
      },
    },
    { enabled: !!filters }
  );

  const report = data?.report?.transactionReport?.financial?.dailyBalanceReport?.data || [];

  return (
    <Report
      data={report || []}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_DAILY_BALANCE_REPORT}
      filters={filters}
      defaultFilters={{ allLedgers: true }}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: '/reports/cbs/transactions',
            },
            {
              label: 'Daily Balance Report',
              link: '/reports/cbs/transactions/daily-balance/new',
            },
          ]}
        />

        <Report.Inputs>
          <DailyBalanceReportInputs />
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          <Report.Table<DailyBalanceReportData>
            data={report}
            columns={[
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'Amount (Dr)',
                accessorFn: (row) => amountConverter(row?.debit || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Amount (Cr)',
                accessorFn: (row) => amountConverter(row.credit || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Balance',
                accessorFn: (row) => amountConverter(row?.balance?.amount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                id: 'netBalanceType',
                header: '',

                accessorFn: (row) => row?.balance?.amountType || '-',
                meta: {
                  width: '50px',
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
