import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  useGetUtilityUsageReportQuery,
  UtilityUsageReportResultList,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
};

export const UtilityUsageReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetUtilityUsageReportQuery(
    {
      data: {
        branchId: branchIds as string[],
        period: filters?.period as LocalizedDateFilter,
      },
    },
    { enabled: !!filters }
  );

  const utilityUsageData = data?.report?.utilityReport?.utilityUsageReport?.data;

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
              label: 'Utility Usage Report',
              link: '/cbs/reports/cbs-reports/mobile-banking/utility-usage/new',
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
          <Report.Table<UtilityUsageReportResultList>
            showFooter
            columns={[
              {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => localizedDate(props?.row?.original?.date),
              },
              {
                header: 'Utility Type',
                accessorKey: 'utilityTypeName',
              },
              {
                header: 'Service',
                accessorKey: 'utilityName',
              },
              {
                header: 'Member ID',
                accessorKey: 'memberId',
                cell: (props) => (
                  <RouteToDetailsPage
                    type="member"
                    label={props.row.original.memberCode as string}
                    id={props.row.original.memberId as string}
                  />
                ),
              },
              {
                header: 'Member Account',
                accessorKey: 'memberAccount',
                cell: (props) => (
                  <RouteToDetailsPage
                    type="savings"
                    label={props.row.original.memberAccount as string}
                    id={props.row.original.memberAccount as string}
                  />
                ),
              },
              {
                header: 'Initiator Phone Number',
                accessorKey: 'initiatorPhoneNo',
              },
              {
                header: 'Destination Account',
                accessorKey: 'destinationAccount',
              },
              {
                header: 'Amount',
                accessorKey: 'amount',
                cell: (props) => amountConverter(props?.row?.original?.amount || 0),
                meta: { isNumeric: true },
              },
              {
                header: 'Cashback',
                accessorKey: 'cashBack',
                cell: (props) => amountConverter(props?.row?.original?.cashBack || 0),
                meta: { isNumeric: true },
              },
              {
                header: 'Service Charge',
                accessorKey: 'serviceCharge',
                cell: (props) => amountConverter(props?.row?.original?.serviceCharge || 0),
                meta: { isNumeric: true },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
