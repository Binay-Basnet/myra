import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  ServiceCenterBalanceEntry,
  ServiceCenterBalanceFilter,
  useGetServiceCenterBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';

type ServiceCenterBalanceFilters = Omit<ServiceCenterBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const ServviceCenterBalanceReport = () => {
  const [filters, setFilters] = useState<ServiceCenterBalanceFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetServiceCenterBalanceReportQuery(
    {
      data: { ...filters, branchId: branchIds } as ServiceCenterBalanceFilter,
    },
    { enabled: !!filters }
  );

  const serviceCenterReport =
    data?.report?.transactionReport?.financial?.serviceCenterBalanceReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={serviceCenterReport as ServiceCenterBalanceEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_SERVICE_CENTER_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Service Center Reports',
              link: '/reports/cbs/service-center',
            },
            {
              label: 'Service Center Wise Cash Bank Balance Report',
              link: '/reports/cbs/service-center/service-center-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ServiceCenterBalanceEntry>
            hasSNo={false}
            columns={[
              {
                header: 'Service Center ID',
                accessorKey: 'serviceCenterId',
              },
              {
                header: 'Service Center Name',
                accessorKey: 'ServiceCenterName',
              },
              {
                header: 'Today Cash Balance(80)',
                accessorKey: 'todayCashBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Today Bank Balance(90)',
                accessorKey: 'todayBankBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Today’s Total Cash & Bank(80+90)',
                accessorKey: 'todayTotalBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Today Saving Balance(30)',
                accessorKey: 'todaySavingBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Cash Balance(80)',
                accessorKey: 'totalCashBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Bank Balance (90)',
                accessorKey: 'totalBankBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Cash &  Bank(80+90)',
                accessorKey: 'totalTotalBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Saving Balance(30)',
                accessorKey: 'totalSavingBalance',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Deposit to Liquidity Ratio',
                accessorKey: 'depositToLiquidityRatio',
                cell: (props) => <Box textTransform="capitalize"> {`${props.getValue()} %`}</Box>,
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
