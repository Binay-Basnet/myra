import { useState } from 'react';

import { Box, Column, GridItem } from '@myra-ui';

import {
  CoaHead,
  ServiceCenterCoaWiseBalanceFilter,
  useGetServiceCenterCoaBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormDatePicker, FormSelect } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

type ServiceCenterBalanceFilters = {
  date: Record<'local' | 'en' | 'np', string>;
  branchId: {
    label: string;
    value: string;
  }[];

  coaHead: {
    label: number;
    value: string;
  }[];
};

type BalanceMap = {
  Value: string;
  Type: string;
};

type ServicCenterBalanceResult = {
  entries: {
    ServiceCenterName: string;
    serviceCenterCode: string;
    serviceCenterId: string;
    balanceMap: Record<number, BalanceMap>;
  };
  total: Record<number, BalanceMap>;
};

export const ServiceCenterCOAWiseBalanceReport = () => {
  const [filters, setFilters] = useState<ServiceCenterBalanceFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const coaHeads =
    filters?.coaHead && filters?.coaHead.length !== 0
      ? filters?.coaHead?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetServiceCenterCoaBalanceReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        coaHead: coaHeads,
      } as ServiceCenterCoaWiseBalanceFilter,
    },
    { enabled: !!filters }
  );

  const serviceCenterCOAReport =
    data?.report?.branchReport?.serviceCenterCOAWiseBalanceReport?.data?.entries;
  const totals = data?.report?.branchReport?.serviceCenterCOAWiseBalanceReport?.data
    ?.total as unknown as ServicCenterBalanceResult['total'];

  return (
    <Report
      defaultFilters={{}}
      data={serviceCenterCOAReport as ServicCenterBalanceResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_SERVICE_CENTER_COA_WISE_BALANCE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Service Center Reports',
              link: '/reports/cbs/service-center',
            },
            {
              label: 'Service Center COA Wise Balance Report',
              link: '/reports/cbs/service-center/service-center-coa-wise-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={2}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              isMulti
              name="coaHead"
              label="Select COA Head"
              options={Object.keys(CoaHead).map((head) => ({
                label: head
                  .replace(/_([0-9]*)/g, '')
                  .replace(/([A-Z])/g, ' $1')
                  .trim(),
                value: CoaHead[head as unknown as keyof typeof CoaHead],
              }))}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="date" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ServicCenterBalanceResult['entries']>
            hasSNo={false}
            showFooter
            columns={[
              {
                header: 'Service Center ID',
                accessorKey: 'serviceCenterId',
                footer: () => <Box textAlign="right">Total Balance</Box>,
                meta: {
                  Footer: {
                    colspan: 2,
                  },
                },
              },
              {
                header: 'Service Center Name',
                accessorKey: 'ServiceCenterName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              ...(filters?.coaHead?.map((coaHead) => {
                const coaHeadArray = coaHead.value.split('_');
                const value = Number(coaHeadArray[coaHeadArray.length - 1]);

                return {
                  header: `${coaHead.label}`,
                  accessorFn: (row) =>
                    debitCreditConverter(
                      row.balanceMap[value]?.Value || '0.00',
                      row.balanceMap[value]?.Type || ''
                    ),
                  footer: () =>
                    debitCreditConverter(totals[value]?.Value || '0.00', totals[value]?.Type || ''),
                  meta: {
                    width: '200px',
                    isNumeric: true,
                  },
                } as Column<ServicCenterBalanceResult['entries']>;
              }) || []),
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
