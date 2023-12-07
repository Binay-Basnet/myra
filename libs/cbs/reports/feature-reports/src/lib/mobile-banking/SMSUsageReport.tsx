import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  SmsReportResult,
  useGetSmsUsageReportQuery,
  UtilityUsageReportResultList,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
};

export const SMSUsageReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetSmsUsageReportQuery(
    {
      data: {
        branchId: branchIds as string[],
        period: filters?.period as LocalizedDateFilter,
      },
    },
    { enabled: !!filters }
  );

  const utilityUsageData = data?.report?.smsReport?.data ?? [];

  return (
    <Report
      defaultFilters={{}}
      data={utilityUsageData as UtilityUsageReportResultList[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MB_UTILITY_USAGE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Mobile Banking Reports', link: '/cbs/reports/cbs-reports/mobile-banking' },
            {
              label: 'SMS Usage Report',
              link: '/cbs/reports/cbs-reports/mobile-banking/sms-usage/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportDateRange name="period" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SmsReportResult>
            columns={[
              {
                header: 'Service Center',
                accessorKey: 'branchName',
              },
              {
                header: 'Member Code',
                accessorKey: 'memberNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberNo as string}
                  />
                ),
              },
              {
                header: 'Member',
                accessorKey: 'memberName',
              },
              {
                header: 'SMS Type',
                accessorKey: 'smsType',
              },

              {
                header: 'SMS Status',
                accessorKey: 'messageSent',
              },
              {
                header: 'SMS Sent Date',
                accessorKey: 'smsSentDate',
                cell: (props) => localizedDate(props?.row?.original?.smsSentDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Destination Mobile Number',
                accessorKey: 'smsSentMobileNumber',
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
