import { BranchReadinessReportData, useGetBranchReadinessReportQuery } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';

export const BranchReadinessReport = () => {
  const { isFetching, data } = useGetBranchReadinessReportQuery();

  const branchReadinessReport = data?.report?.branchReport?.branchReadinessReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={branchReadinessReport as BranchReadinessReportData[]}
      filters={{}}
      setFilters={() => null}
      isLoading={isFetching}
      report={ReportEnum.BRANCH_READINESS_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Service Center Reports', link: '/cbs/reports/cbs-reports/service-center' },
            {
              label: 'Branch Readiness Report',
              link: '/cbs/reports/cbs-reports/service-center/branch-readiness/new',
            },
          ]}
        />
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<BranchReadinessReportData>
            columns={[
              {
                header: 'Branch Code',
                accessorKey: 'branchCode',
              },
              {
                header: 'Branch Name',
                accessorKey: 'branchName',
              },
              {
                header: 'Status',
                accessorKey: 'status',
                accessorFn: (row) => (row?.status ? 'Yes' : 'No'),
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
