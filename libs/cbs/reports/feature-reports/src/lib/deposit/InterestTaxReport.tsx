import { useState } from 'react';

import {
  InterestTaxReportEntry,
  InterestTaxReportFilter,
  useGetInterestTaxReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormAmountFilter } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const InterestTaxReport = () => {
  const [filters, setFilters] = useState<InterestTaxReportFilter | null>(null);

  const { data: interestTaxReportData, isFetching } = useGetInterestTaxReportQuery(
    {
      data: filters as InterestTaxReportFilter,
    },
    { enabled: !!filters }
  );
  const interestTaxReport = interestTaxReportData?.report?.depositReport?.interestTaxReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={interestTaxReport as unknown as InterestTaxReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.INTEREST_TAX_REPORT}
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
          <ReportDateRange label="Tax Deduct Date Period" />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<InterestTaxReportEntry & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberCode',
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.name?.local,
              },
              {
                header: 'Address',
                accessorFn: (row) => row?.address?.district?.local,
              },
              {
                header: 'PAN NO.',
                accessorFn: (row) => row?.panNo,
              },
              {
                header: 'Account No',
                accessorKey: 'accountNo',
              },
              {
                header: 'Tax Deduct Date',
                accessorFn: (row) => localizedDate(row?.date),
              },
              {
                header: 'Remarks',
                accessorKey: 'remarks',
              },
              {
                header: 'Saving Balance',
                accessorKey: 'savingBalance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Amount',
                accessorKey: 'interest',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Tax Amount',
                accessorKey: 'tax',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Closing Balance',
                accessorKey: 'closingBalance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Saving Balance">
            <FormAmountFilter name="filter.savingBalance" />
          </Report.Filter>
          <Report.Filter title="Interest Amount">
            <FormAmountFilter name="filter.interestAmount" />
          </Report.Filter>
          <Report.Filter title=" Tax Amount">
            <FormAmountFilter name="filter.taxAmount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
