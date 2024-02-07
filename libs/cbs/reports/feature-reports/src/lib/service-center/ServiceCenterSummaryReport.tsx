import { useState } from 'react';

import {
  BranchWiseFilter,
  BranchWiseReportNode,
  useGetServiceCenterSummaryReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormCBSDatePicker } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const ServiceCenterSummaryReport = () => {
  const [filters, setFilters] = useState<BranchWiseFilter | null>(null);

  const { data, isFetching } = useGetServiceCenterSummaryReportQuery(
    {
      data: filters as BranchWiseFilter,
    },
    { enabled: !!filters }
  );

  const serviceCenterReport =
    data?.report?.otherReport?.BranchWiseReport?.data?.branchWiseReportNode;

  return (
    <Report
      defaultFilters={{}}
      data={serviceCenterReport as BranchWiseReportNode[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SERVICE_CENTER_SUMMARY_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Service Center Reports',
              link: '/cbs/reports/cbs-reports/service-center',
            },
            {
              label: 'Service Center Summary Report',
              link: '/cbs/reports/cbs-reports/service-center/service-center-summmary-report/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <FormCBSDatePicker name="date" label="Date" setInitialDate />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<
            BranchWiseReportNode & {
              index: number;
            }
          >
            hasSNo
            columns={[
              {
                header: 'SN',
                accessorKey: 'index',
              },
              {
                header: 'Service Center Name',
                accessorKey: 'branchName',
              },
              {
                header: 'Total Member',
                accessorKey: 'totalMember',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Share',
                accessorFn: (row) => amountConverter(row?.totalShare || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Savings',
                accessorFn: (row) => amountConverter(row?.totalSavings || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Loan',
                accessorFn: (row) => amountConverter(row?.totalLoan || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Asset',
                accessorFn: (row) => amountConverter(row?.totalAsset || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Liability',
                accessorFn: (row) => amountConverter(row?.totalLiability || 0),
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
