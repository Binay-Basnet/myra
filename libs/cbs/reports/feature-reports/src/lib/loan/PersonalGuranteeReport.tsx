import { useState } from 'react';

import { GridItem } from '@myra-ui/components';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  LoanAccountGuaranteeReportInput,
  LoanGuarantorInfo,
  LocalizedDateFilter,
  useGetLoanPersonalGuranteeReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanGuranteeData = Partial<{
  memberId: string;
  memberCode: string;
  memberName: Record<'local' | 'en' | 'np', string> | null | undefined;
  loanAccountNo: string;
  disbursedAmount: string;
  guarantorInformantion: LoanGuarantorInfo[];
  memId: string;
  memCode: string;
  memName: string;
  depositAccountNo: string;
  guaranteeAmount: string;
  date: Record<'local' | 'en' | 'np', string> | null | undefined;
  totalGuaranteeAmount: string;
}>;

type ReportFilter = Omit<LoanAccountGuaranteeReportInput, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const LoanPersonalGuranteeReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetLoanPersonalGuranteeReportQuery(
    {
      data: {
        ...filters,
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIDs as string[],
      },
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.personalGuaranteeReport?.data?.map((d) => ({
    ...d,
    children: d?.guarantorInformantion,
  })) as LoanGuranteeData[];

  return (
    <Report
      data={loanReport as LoanGuarantorInfo[]}
      isLoading={isFetching}
      report={ReportEnum.LOAN_PERSONAL_GURANTEE_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Loan Reports',
              link: '/reports/cbs/loan',
            },
            {
              label: 'Loan Collateral Report',
              link: '/reports/cbs/loan/personal-gurantee/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
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
          <Report.Table<LoanGuranteeData>
            columns={[
              {
                header: 'Member Loan Information',
                columns: [
                  {
                    header: ({ table }) => <ExpandedHeader table={table} value="Member Id" />,

                    accessorKey: 'memberCode',
                    cell: (props) => (
                      <ExpandedCell row={props.row} value={props.getValue() as string} />
                    ),
                  },
                  {
                    header: 'Member Name',
                    accessorKey: 'memberName',
                    cell: (props) =>
                      props.row?.original?.memberName
                        ? localizedText(props.row?.original?.memberName)
                        : '-',
                  },
                  {
                    header: 'Loan Account No.',
                    accessorKey: 'loanAccountNo',
                  },
                  {
                    header: 'Loan Disbursed Amount',
                    accessorKey: 'disbursedAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Guarantor Information',
                columns: [
                  {
                    header: 'Member ID',
                    accessorKey: 'memCode',
                    cell: (row) => (row.getValue() ? row.getValue() : '-'),
                  },

                  {
                    header: 'Member Name',
                    accessorKey: 'memName',
                    cell: (row) => (row.getValue() ? row.getValue() : '-'),
                  },
                  {
                    header: 'Deposit Account No',
                    accessorKey: 'depositAccountNo',
                    cell: (row) => (row.getValue() ? row.getValue() : '-'),
                  },
                  {
                    header: 'Guarantee Amount',
                    accessorKey: 'guaranteeAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Guarantee Inserted Date',
                    accessorKey: 'date',
                    cell: (props) =>
                      props.row?.original?.date ? localizedDate(props?.row?.original?.date) : '-',
                  },
                ],
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
