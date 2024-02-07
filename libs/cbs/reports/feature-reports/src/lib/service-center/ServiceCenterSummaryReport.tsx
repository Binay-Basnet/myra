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
                accessorKey: 'totalShare',
                cell: (props) => {
                  const totalShare = Number(props?.row?.original?.totalShare) || 0;

                  return totalShare < 0
                    ? amountConverter(-totalShare)
                    : amountConverter(totalShare);
                },
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Savings',
                accessorKey: 'totalSavings',
                cell: (props) => {
                  const totalSavings = Number(props?.row?.original?.totalSavings) || 0;

                  return totalSavings < 0
                    ? amountConverter(-totalSavings)
                    : amountConverter(totalSavings);
                },
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Loan',
                accessorKey: 'totalLoan',
                cell: (props) => {
                  const totalLoan = Number(props?.row?.original?.totalLoan) || 0;

                  return totalLoan < 0 ? amountConverter(-totalLoan) : amountConverter(totalLoan);
                },
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Asset',
                accessorKey: 'totalAsset',
                cell: (props) => {
                  const totalAsset = Number(props?.row?.original?.totalAsset) || 0;

                  return totalAsset < 0
                    ? amountConverter(-totalAsset)
                    : amountConverter(totalAsset);
                },
                meta: {
                  isNumeric: true,
                },
              },
              // {
              //   header: 'Total Liability',
              //   accessorKey: 'totalLiability',
              //   cell: (props) => {
              //     const totalLiability = Number(props?.row?.original?.totalLiability) || 0;

              //     return totalLiability < 0
              //       ? amountConverter(-totalLiability)
              //       : amountConverter(totalLiability);
              //   },
              //   meta: {
              //     isNumeric: true,
              //   },
              // },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
