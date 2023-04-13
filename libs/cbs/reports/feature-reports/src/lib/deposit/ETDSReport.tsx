import { useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  EtdsReportEntry,
  EtdsReportFilter,
  useAppSelector,
  useGetEtdsStatementQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const ETDSReport = () => {
  const dateType = useAppSelector((state) => state.auth?.preference?.date);
  const [filters, setFilters] = useState<EtdsReportFilter | null>(null);

  const { data: edTdsReport, isFetching } = useGetEtdsStatementQuery(
    {
      data: filters as EtdsReportFilter,
    },
    { enabled: !!filters }
  );
  const eTDSReportData = edTdsReport?.report?.depositReport?.ETDSReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={eTDSReportData as EtdsReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.E_TDS_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Interest Tax Report',
              link: '/reports/cbs/savings/interest-tax/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect name="branchId" label="Select Branch" />
          </GridItem>
          <GridItem colSpan={2}>
            <ReportDateRange label="Tax Deduct Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<EtdsReportEntry>
            columns={[
              {
                header: 'PAN',
                accessorKey: 'panNo',
              },
              {
                header: 'Name',
                accessorFn: (row) => row?.memberName,
              },
              {
                header: 'T Date',
                accessorFn: (row) => row?.date,
              },
              {
                header: 'Date Type',
                accessorFn: (row) => row?.tdsType,
                cell: () => dateType,
              },
              {
                header: 'Payment Amount',
                accessorFn: (row) => row.interest,
                cell: (props) => amountConverter(props.row.original.interest || '0.00'),
              },
              {
                header: 'TDS Amount',
                accessorFn: (row) => row.tax,
                cell: (props) => amountConverter(props.row.original.tax || '0.00'),
              },
              {
                header: 'TDS Type',
                accessorFn: (row) => row?.tdsType,
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
