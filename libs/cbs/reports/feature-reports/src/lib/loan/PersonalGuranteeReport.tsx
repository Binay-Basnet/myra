import { useState } from 'react';

import { Box } from '@myra-ui';
import { Chips, GridItem } from '@myra-ui/components';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  GuaranteeStatus,
  LoanAccountGuaranteeReportInput,
  LoanGuarantorInfo,
  LocalizedDateFilter,
  useGetLoanPersonalGuranteeReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
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
  guaranteeStatus: string;
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
              label: 'Loan Personal Gurantee Report',
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
                      <ExpandedCell
                        row={props.row}
                        value={
                          <RouteToDetailsPage
                            id={props?.row?.original?.memberId as string}
                            type="member"
                            label={props?.row?.original?.memberCode}
                          />
                        }
                      />
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
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.loanAccountNo as string}
                        type="loan"
                        label={props?.row?.original?.loanAccountNo}
                      />
                    ),
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
                    cell: (row) =>
                      row.getValue() ? (
                        <RouteToDetailsPage
                          id={row?.row?.original?.memId as string}
                          type="member"
                          label={row?.getValue() as string}
                        />
                      ) : (
                        '-'
                      ),
                  },

                  {
                    header: 'Member Name',
                    accessorKey: 'memName',
                    cell: (row) => (row.getValue() ? row.getValue() : '-'),
                  },
                  {
                    header: 'Saving Account No',
                    accessorKey: 'depositAccountNo',
                    cell: (row) =>
                      row.getValue() ? (
                        <RouteToDetailsPage
                          id={row?.row?.original?.depositAccountNo as string}
                          type="savings"
                          label={row?.getValue() as string}
                        />
                      ) : (
                        '-'
                      ),
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
                  {
                    header: 'Status',
                    accessorKey: 'guaranteeStatus',
                    cell: (row) => {
                      const dataVal = row?.getValue() as string;
                      return (
                        <Box>
                          {dataVal === 'ACTIVE' && (
                            <Chips
                              label="Active"
                              theme="success"
                              size="md"
                              type="label"
                              variant="outline"
                            />
                          )}
                          {dataVal === 'RELEASED' && (
                            <Chips
                              label="Released"
                              theme="info"
                              size="md"
                              type="label"
                              variant="outline"
                            />
                          )}
                        </Box>
                      );
                    },
                  },
                ],
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Guarantee Status">
            <FormSelect
              name="filter.status"
              options={[
                {
                  label: 'Active',
                  value: GuaranteeStatus?.Active,
                },
                {
                  label: ' Released',
                  value: GuaranteeStatus?.Released,
                },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
