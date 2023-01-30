import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  AbbsReportFilter,
  AbbsSatusEntry,
  useGetAbbsStatusReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';

type AbbsReportFilters = Omit<AbbsReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
const activeIactive = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

export const ABBSStatusReport = () => {
  const [filters, setFilters] = useState<AbbsReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const serviceCenterActive = filters?.active && filters?.active === 'Active';
  const abbbsActive = filters?.abbs && filters?.abbs === 'Active';

  const { data, isFetching } = useGetAbbsStatusReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        abbs: abbbsActive,
        active: serviceCenterActive,
      } as AbbsReportFilter,
    },
    { enabled: !!filters }
  );

  const abbsStatusReport = data?.report?.transactionReport?.financial?.abbsStatusReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={abbsStatusReport as AbbsSatusEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_SERVICE_CENTER_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Transaction Reports', link: '/reports/cbs/transactions' },
            {
              label: 'ABBS Report',
              link: '/reports/cbs/transactions/abbs-status/new',
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
          <Report.Table<AbbsSatusEntry>
            hasSNo={false}
            columns={[
              {
                header: 'Service Center Code',
                accessorKey: 'serviceCenterId',
              },
              {
                header: 'Service Center Name',
                accessorKey: 'ServiceCenterName',
              },
              {
                header: 'Service Center Status',
                accessorKey: 'serviceCenterActive',
                cell: (props) => (props?.getValue() ? 'Active' : 'Inactive'),
              },
              {
                header: 'ABBS Status',
                accessorKey: 'abbsActive',
                cell: (props) => (props?.getValue() ? 'Active' : 'Inactive'),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Service Center Status">
            <FormRadioGroup name="active" options={activeIactive} direction="column" />
          </Report.Filter>
          <Report.Filter title="ABBS Status">
            <FormRadioGroup name="abbs" options={activeIactive} direction="column" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
