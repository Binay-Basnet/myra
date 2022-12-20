import { useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  DayBookDataEntry,
  DayBookReportFilter,
  useGetDayBookReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';

export const DayBookReport = () => {
  const [filters, setFilters] = useState<DayBookReportFilter | null>(null);

  const { data, isFetching } = useGetDayBookReportQuery({
    data: {
      branchId: 'TESTBRANCH',
      date: {
        from: { en: '2022-11-10', np: '', local: '' },
        to: { en: '2022-12-20', np: '', local: '' },
      },
    },
  });

  return (
    <Report
      data={
        data?.report?.transactionReport?.financial?.dayBookReport?.data
          ?.payments as DayBookDataEntry[]
      }
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
            { label: 'Trial Balance', link: '/reports/cbs/transactions/trail-sheet/new' },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
    </Report>
  );
};
