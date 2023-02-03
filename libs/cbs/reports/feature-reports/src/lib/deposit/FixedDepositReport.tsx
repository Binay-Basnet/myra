import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  AccountClosingReport,
  FixedDepositReport,
  FixedDepositReportInput,
  useGetFixedDepositReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';

type FixedDepositReportInputs = Omit<FixedDepositReportInput, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const FixedDepositsReport = () => {
  const [filters, setFilters] = useState<FixedDepositReportInputs | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetFixedDepositReportQuery(
    {
      data: { ...filters, branchId: branchIds } as FixedDepositReportInput,
    },
    { enabled: !!filters }
  );

  const fixedDepositReport = data?.report?.depositReport?.fixedDepositReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={fixedDepositReport as AccountClosingReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.FD_PRE_MATURE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            { label: 'Fixed Deposit Maturity Report', link: '/reports/cbs/savings/fd-mature/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<FixedDepositReport & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
              },
              {
                header: 'Member ID',
                accessorKey: 'memberCode',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberID as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
                accessorFn: (row) => localizedText(row?.memberName),
              },
              {
                header: 'Service Center Name',
                accessorKey: 'serviceCenter',
              },
              {
                header: 'Mobile No.',
                accessorKey: 'mobileNo',
              },
              {
                header: 'Account Name',
                accessorKey: 'accountName',
              },
              {
                header: 'Account Open Date',
                accessorFn: (row) => localizedDate(row?.accountOpenDate),
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
                header: 'FD Expiry Date',
                accessorFn: (row) => localizedDate(row?.expiryDate),
              },
              {
                header: 'Nominee Account No',
                accessorKey: 'nomineeAccountNo',
              },
              {
                header: 'FD Amount',
                accessorKey: 'fdAmount',
              },
              {
                header: 'Interest Amount',
                accessorKey: 'interestAmount',
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
