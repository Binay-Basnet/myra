import { useMemo, useState } from 'react';

import { ExpandedCell, ExpandedHeader, GridItem } from '@myra-ui';

import { LocalizedDateFilter, useGetSavingLoanInterestReportQuery } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type SavingLoanReportEntry = {
  memberId?: string;
  memberCode?: string;
  memberName?: string;
  savingAccountNo?: string | null;
  interestPaid?: string | null;
  tdsDeducted?: string | null;
  loanAccountNo?: string | null;
  interestIncome?: string | null;
  finePaid?: string | null;
  panNumber?: string | null;
};

type Filter = {
  branchId: { label: string; value: string }[];
  period: LocalizedDateFilter;
};

export const SavingLoanInterestReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchId =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetSavingLoanInterestReportQuery(
    {
      data: {
        branchId,
        period: filters?.period as LocalizedDateFilter,
      },
    },
    { enabled: !!filters }
  );

  const {
    reportData,
    grandTotalInterestPaid,
    grandTotalTds,
    grandTotalInterestIncome,
    grandTotalFinePaid,
  } = useMemo(() => {
    const savingLoanInterestData = data?.report?.otherReport?.savingLoanInterestReport;

    const temp = savingLoanInterestData?.data?.map((d) => ({
      ...d,
      interestPaid: savingLoanInterestData?.totalInterestPaid?.[d?.memberId as string],
      tdsDeducted: savingLoanInterestData?.totalTds?.[d?.memberId as string],
      interestIncome: savingLoanInterestData?.totalInterestIncome?.[d?.memberId as string],
      finePaid: savingLoanInterestData?.totalFinePaid?.[d?.memberId as string],
      children: combineArrays(
        d?.savingAccountEntry as SavingAccount[],
        d?.loanAccountEntry as LoanAccount[]
      ),
    })) as SavingLoanReportEntry[];

    return {
      reportData: temp,
      grandTotalInterestPaid: savingLoanInterestData?.grandTotalInterestPaid,
      grandTotalTds: savingLoanInterestData?.grandTotalTds,
      grandTotalInterestIncome: savingLoanInterestData?.grandTotalInterestIncome,
      grandTotalFinePaid: savingLoanInterestData?.grandTotalFinePaid,
    };
  }, [data]);

  return (
    <Report
      defaultFilters={null}
      data={reportData as SavingLoanReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.GENERAL_LEDGER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/cbs/reports/cbs-reports/others' },
            {
              label: 'Saving and Loan Interest Report',
              link: '/cbs/reports/cbs-reports/others/saving-loan-interest/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect
              showUserBranchesOnly
              name="branchId"
              label="Select Service Center"
              isMulti
            />
          </GridItem>

          <GridItem colSpan={2}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SavingLoanReportEntry>
            showFooter
            columns={[
              {
                header: ({ table }) => <ExpandedHeader table={table} value="Member Code" />,
                accessorKey: 'memberCode',
                cell: (props) => (
                  <ExpandedCell
                    row={props.row}
                    value={
                      <RouteToDetailsPage
                        id={props?.row?.original?.memberId as string}
                        type="member"
                        label={props?.row?.original?.memberCode as string}
                      />
                    }
                  />
                ),
                footer: () => 'Total',
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
              },
              {
                header: 'Saving Account',
                columns: [
                  {
                    header: 'Account Number',
                    accessorFn: (row) => row?.savingAccountNo,
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.savingAccountNo as string}
                        type="savings"
                        label={props?.row?.original?.savingAccountNo as string}
                      />
                    ),
                  },
                  {
                    header: 'Interest Paid',
                    accessorFn: (row) => row?.interestPaid,
                    cell: (props) =>
                      props?.row?.original?.interestPaid
                        ? amountConverter(props?.row?.original?.interestPaid || 0)
                        : '',
                    footer: () => amountConverter(grandTotalInterestPaid || 0),
                  },
                  {
                    header: 'Tds Deducted',
                    accessorFn: (row) => row?.tdsDeducted,
                    cell: (props) =>
                      props?.row?.original?.tdsDeducted
                        ? amountConverter(props?.row?.original?.tdsDeducted || 0)
                        : '',
                    footer: () => amountConverter(grandTotalTds || 0),
                  },
                ],
              },
              {
                header: 'Loan Account',
                columns: [
                  {
                    header: 'Account Number',
                    accessorFn: (row) => row?.loanAccountNo,
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.loanAccountNo as string}
                        type="loan"
                        label={props?.row?.original?.loanAccountNo as string}
                      />
                    ),
                  },
                  {
                    header: 'Interest Income',
                    accessorFn: (row) => row?.interestIncome,
                    cell: (props) =>
                      props?.row?.original?.interestIncome
                        ? amountConverter(props?.row?.original?.interestIncome || 0)
                        : '',
                    footer: () => amountConverter(grandTotalInterestIncome || 0),
                  },
                  {
                    header: 'Fine Paid',
                    accessorFn: (row) => row?.finePaid,
                    cell: (props) =>
                      props?.row?.original?.finePaid
                        ? amountConverter(props?.row?.original?.finePaid || 0)
                        : '',
                    footer: () => amountConverter(grandTotalFinePaid || 0),
                  },
                  {
                    header: 'Pan Number',
                    accessorKey: 'panNumber',
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

type SavingAccount = {
  accountNo?: string | null;
  interestPaid?: string | null;
  tdsDeducted?: string | null;
};

type LoanAccount = {
  accountNo?: string | null;
  interestIncome?: string | null;
  finePaid?: string | null;
};

type CombinedArrayType = {
  savingAccountNo?: string | null;
  interestPaid?: string | null;
  tdsDeducted?: string | null;
  loanAccountNo?: string | null;
  interestIncome?: string | null;
  finePaid?: string | null;
};
// Function to combine the arrays
function combineArrays(
  savingArray: SavingAccount[],
  loanArray: LoanAccount[]
): CombinedArrayType[] {
  const combinedArray: CombinedArrayType[] = [];
  const maxLength = Math.max(savingArray?.length || 0, loanArray?.length || 0);

  // Convert null arrays to empty arrays
  const safeArray1 = savingArray || [];
  const safeArray2 = loanArray || [];

  // Add "-" as value to missing keys in the objects to make them have the same keys
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < maxLength; i++) {
    if (!savingArray || !savingArray[i])
      safeArray1[i] = { accountNo: null, interestPaid: null, tdsDeducted: null };
    if (!loanArray || !loanArray[i])
      safeArray2[i] = { accountNo: null, interestIncome: null, finePaid: null };
  }

  // Iterate through the modified arrays and combine the objects
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < maxLength; i++) {
    const mergedObject = {
      ...safeArray1[i],
      savingAccountNo: safeArray1[i]['accountNo'],
      ...safeArray2[i],
      loanAccountNo: safeArray2[i]['accountNo'],
    };
    combinedArray.push(mergedObject);
  }

  return combinedArray;
}
