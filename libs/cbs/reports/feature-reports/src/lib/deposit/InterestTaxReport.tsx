import { useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  InterestTaxReportEntry,
  InterestTaxReportFilter,
  LocalizedDate,
  useGetInterestTaxReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type InterestTaxReportFilters = Omit<InterestTaxReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const InterestTaxReport = () => {
  const [filters, setFilters] = useState<InterestTaxReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data: interestTaxReportData, isFetching } = useGetInterestTaxReportQuery(
    {
      data: {
        branchId: branchIds,
        filter: filters?.filter,
        period: filters?.period as LocalizedDate,
      },
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
            { label: 'Saving Reports', link: '/cbs/reports/cbs-reports/savings' },
            {
              label: 'Interest Tax Report',
              link: '/cbs/reports/cbs-reports/savings/interest-tax/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Select Branch" />
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
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
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
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Account No',
                accessorKey: 'accountNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountNo as string}
                    type="savings"
                    label={props?.row?.original?.accountNo as string}
                  />
                ),
              },
              {
                header: 'Tax Deduct Date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Remarks',
                accessorKey: 'remarks',
              },
              {
                header: 'Opening Balance',
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
