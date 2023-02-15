import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LoanCallReport,
  LoanCallReportFilter,
  useGetLoanCallSheetReportQuery,
  useGetLoanProductTypeQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportCustomDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormDatePicker, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanCallFilters = Omit<LoanCallReportFilter, 'branchId' | 'accountTypeId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
  accountTypeId: {
    label: string;
    value: string;
  }[];
};

export const LoanCallSheetReport = () => {
  const [filters, setFilters] = useState<LoanCallFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const accountIds =
    filters?.accountTypeId && filters?.accountTypeId.length !== 0
      ? filters?.accountTypeId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetLoanCallSheetReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        accountTypeId: accountIds,
      } as LoanCallReportFilter,
    },
    { enabled: !!filters }
  );
  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const loanProductType = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;

  const loanCallReport = data?.report?.loanReport?.loanCallReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={loanCallReport as LoanCallReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_CALL_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Loan Call Sheet Report', link: '/reports/cbs/loan/call-sheet/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              isMulti
              name="accountTypeId"
              label="Account Types"
              options={loanProductType?.map((product) => ({
                label: product?.productType as string,
                value: product?.id as string,
              }))}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportCustomDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LoanCallReport & { index: number }>
            columns={[
              {
                header: 'Loan to be Paid list',
                columns: [
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    meta: {
                      width: '60px',
                    },
                  },
                  {
                    header: 'Member ID',
                    accessorKey: 'memberId',
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.memberId as string}
                        type="member"
                        label={props?.row?.original?.memberCode as string}
                      />
                    ),
                  },
                  {
                    header: 'Member ID',
                    accessorFn: (row) => localizedText(row?.memberName),
                  },
                  {
                    header: 'Loan Account Number',
                    accessorKey: 'loanAccountNo',
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.loanAccountNo as string}
                        type="loan"
                        label={props?.row?.original?.loanAccountNo as string}
                      />
                    ),
                  },
                  {
                    header: 'Loan Type',
                    accessorKey: 'loanType',
                  },
                  {
                    header: 'Service Center Name',
                    accessorKey: 'serviceCenter',
                  },
                  {
                    header: 'Installment Date',
                    accessorFn: (row) => localizedDate(row?.installmentDate),
                  },
                  {
                    header: 'Installment Amount',
                    accessorKey: 'installmentAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Installment Due Amount',
                    accessorKey: 'installmentDueAmount',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Installment Due Days',
                    accessorKey: 'installmentDueDays',
                  },
                  {
                    header: 'Total Installment to Pay',
                    accessorKey: 'totalInstallment',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
            ]}
          />
        </Report.Content>

        <Report.Filters>
          <Report.Filter title="Installment Date">
            <FormDatePicker name="installmentDate" label="Installment Date" />
          </Report.Filter>
          <Report.Filter title="Amount Wise">
            <FormAmountFilter name="amountRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
