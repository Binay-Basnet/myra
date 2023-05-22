import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  CopomisFinancial,
  CopomisFinancialInput,
  useGetCopomisFinancialReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormDatePicker } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const CopomisFinancialReport = () => {
  const [filters, setFilters] = useState<CopomisFinancialInput | null>(null);

  const { data: interestTaxReportData, isFetching } = useGetCopomisFinancialReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        },
      } as CopomisFinancialInput,
    },
    { enabled: !!filters }
  );
  const copomisReport = interestTaxReportData?.report?.copomisFinancialReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={copomisReport as CopomisFinancial[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.COPOMIS_IMPORT_MEMBER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/reports/cbs/others' },
            {
              label: 'Copomis Financial Report',
              link: '/reports/cbs/others/copomis-financial/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormDatePicker label="Select Date" name="period.from" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<CopomisFinancial>
            columns={[
              //   {
              //     header: 'Id',
              //     accessorKey: 'id',
              //   },
              {
                header: 'Indicator Name',
                accessorKey: 'indicatorName',
              },
              {
                header: 'Cr',
                accessorFn: (row) => amountConverter(row?.cr || '0'),
                // cell: (props) => localizedDate(props.row.original.memberRegistrationDate),
                accessorKey: 'cr',
              },
              {
                header: 'Dr',
                accessorKey: 'dr',
                accessorFn: (row) => amountConverter(row?.dr || '0'),
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
