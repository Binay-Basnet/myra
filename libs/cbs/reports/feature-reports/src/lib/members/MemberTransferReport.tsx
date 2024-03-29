import { useState } from 'react';

import { GridItem } from '@myra-ui';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  AccountsMinimal,
  BalanceValue,
  BranchMinimal,
  MemberTransferFilter,
  MemberTransferReportData,
  useGetMemberTransferReportQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter, debitCreditConverter, useTranslation } from '@coop/shared/utils';

type LoanGuranteeData = Partial<{
  memberId: string;
  memberCode: string;
  memberName: string;
  fromBranch: BranchMinimal;
  toBranch: BranchMinimal;
  transferredDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  transferredBy: string;
  shareBalance: string;
  savingAccounts: AccountsMinimal[];
  loanAccounts: AccountsMinimal[];
  accNo: string;
  balance: BalanceValue;
  interestAccured: string;
  disbursedAmount: string;
  looanaccNo: string;
  loanBalance: BalanceValue;
  loanInterestAccured: string;
  loanDisbursedAmount: string;
}>;

type ReportFilter = Omit<MemberTransferFilter, 'fromBranchIds' | 'toBranchIds' | 'filter'> & {
  fromBranchIds: { label: string; value: string }[];
  toBranchIds: { label: string; value: string }[];
  filter: {
    transferredBy: { label: string; value: string }[];
  };
};

export const MemberTransferReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });
  const userList = userListData?.settings?.myraUser?.list?.edges;

  const fromIds =
    filters?.fromBranchIds && filters?.fromBranchIds?.length !== 0
      ? filters?.fromBranchIds?.map((b) => b.value)
      : [];
  const toIds =
    filters?.toBranchIds && filters?.toBranchIds.length !== 0
      ? filters?.toBranchIds?.map((b) => b.value)
      : [];
  const transfereedId =
    filters?.filter?.transferredBy && filters?.filter?.transferredBy?.length !== 0
      ? filters?.filter?.transferredBy?.map((b) => b.value)
      : [];

  const { data, isFetching } = useGetMemberTransferReportQuery(
    {
      data: {
        ...filters,
        filter: {
          transferredBy: transfereedId,
        },
        fromBranchIds: fromIds,
        toBranchIds: toIds,
      } as MemberTransferFilter,
    },
    { enabled: !!filters }
  );
  // const combinedValues = data?.report?.memberReport?.memberTransferReport?.data?.map((d) => ({

  const loanReport = data?.report?.memberReport?.memberTransferReport?.data?.map((d) => ({
    ...d,
    children: combineArrays(d?.savingAccounts as ArrayType[], d?.loanAccounts as ArrayType[]),
  })) as LoanGuranteeData[];

  return (
    <Report
      data={loanReport as MemberTransferReportData[]}
      isLoading={isFetching}
      report={ReportEnum.MEMBER_TRANSFER_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsMemberTransferReport'],
              link: '/cbs/reports/cbs-reports/members/transfer/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={1}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="fromBranchIds"
              label={t['reportsMemberMemberTransferReportSelectSourceServiceCenter']}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="toBranchIds"
              label={t['reportsMemberMemberTransferReportSelectDestinationServiceCenter']}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />{' '}
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
                header: ({ table }) => (
                  <ExpandedHeader
                    table={table}
                    value={t['reportsMemberMemberTransferReportMemberId']}
                  />
                ),
                id: 'MemberId',
                accessorKey: 'memberId',
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
              },
              {
                header: t['reportsMemberMemberTransferReportMemberName'],
                accessorKey: 'memberName',
                cell: (props) => props.row?.original?.memberName ?? '-',
              },
              {
                header: t['reportsMemberMemberTransferReportFromServiceCenter'],
                accessorKey: 'fromBranch',
                cell: (props) => props.row?.original?.fromBranch?.name ?? '-',
              },
              {
                header: t['reportsMemberMemberTransferReportToServiceCenter'],
                accessorKey: 'toBranch',
                cell: (props) => props.row?.original?.toBranch?.name ?? '-',
              },
              {
                header: t['reportsMemberMemberTransferReportTransferredDate'],
                accessorKey: 'transferredDate',
                cell: (props) =>
                  props?.row?.original?.transferredDate
                    ? localizedDate(props?.row?.original?.transferredDate)
                    : '-',
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsMemberMemberTransferReportShareBalance'],
                accessorKey: 'shareBalance',
                cell: (props) =>
                  props?.row?.original?.shareBalance
                    ? amountConverter(props?.row?.original?.shareBalance as string | '0')
                    : '-',
              },

              {
                header: t['reportsMemberMemberTransferReportSavingInformation'],
                columns: [
                  {
                    header: t['reportsMemberMemberTransferReportSavingAccountNo'],
                    accessorKey: 'accNo',
                    cell: (row) => row.getValue() ?? '-',
                  },
                  {
                    header: t['reportsMemberMemberTransferReportSavingBalance'],
                    accessorKey: 'balance',
                    cell: (props) =>
                      props.row?.original?.balance
                        ? debitCreditConverter(
                            props?.row?.original?.balance?.amount as string,
                            props?.row?.original?.balance?.amountType as string
                          )
                        : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsMemberMemberTransferReportSavingInterestAccured'],
                    accessorKey: 'interestAccured',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  // {
                  //   header: 'Disbursed Amount',
                  //   accessorKey: 'disbursedAmount',
                  //   cell: (row) =>
                  //     row.getValue() ? amountConverter(row.getValue() as string) : '',
                  //   meta: {
                  //     isNumeric: true,
                  //   },
                  // },
                ],
              },
              {
                header: t['reportsMemberMemberTransferReportLoanInformation'],
                columns: [
                  {
                    header: t['reportsMemberMemberTransferReportLoanAccountNo'],
                    accessorKey: 'looanaccNo',
                    cell: (row) => row.getValue() ?? '-',
                  },
                  {
                    header: t['reportsMemberMemberTransferReportLoanBalance'],
                    accessorKey: 'loanBalance',
                    cell: (props) =>
                      props.row?.original?.loanBalance
                        ? debitCreditConverter(
                            props?.row?.original?.loanBalance?.amount as string,
                            props?.row?.original?.loanBalance?.amountType as string
                          )
                        : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsMemberMemberTransferReportLoanInterestAccured'],
                    accessorKey: 'loanInterestAccured',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsMemberMemberTransferReportLoanDisbursedAmount'],
                    accessorKey: 'loanDisbursedAmount',
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
          <Report.Filter title={t['reportsMemberMemberTransferReportUserSelect']}>
            <FormSelect
              label={t['reportsMemberMemberTransferReportTransferredByUser']}
              isMulti
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.transferredBy"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

type ArrayType = {
  accNo?: string | null;
  balance?: BalanceValue | null;
  interestAccured?: string | null;
  disbursedAmount?: string | null;
};
type CombinedArrayType = {
  accNo?: string | null;
  balance?: BalanceValue | null;
  interestAccured?: string | null;
  disbursedAmount?: string | null;
  looanaccNo?: string | null;
  loanBalance?: BalanceValue | null;
  loanInterestAccured?: string | null;
  loanDisbursedAmount?: string | null;
};
// Function to combine the arrays
function combineArrays(array1: ArrayType[], loanArray: ArrayType[]): CombinedArrayType[] {
  const combinedArray: CombinedArrayType[] = [];
  const maxLength = Math.max(array1?.length || 0, loanArray?.length || 0);

  // Convert null arrays to empty arrays
  const safeArray1 = array1 || [];
  const safeArray2 = loanArray || [];

  // Add "-" as value to missing keys in the objects to make them have the same keys
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < maxLength; i++) {
    if (!array1 || !array1[i])
      safeArray1[i] = { accNo: null, balance: null, interestAccured: null, disbursedAmount: null };
    if (!loanArray || !loanArray[i])
      safeArray2[i] = { accNo: null, balance: null, interestAccured: null, disbursedAmount: null };
  }

  // Iterate through the modified arrays and combine the objects
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < maxLength; i++) {
    const mergedObject = {
      ...safeArray1[i],
      looanaccNo: safeArray2[i].accNo,
      loanBalance: safeArray2[i].balance,
      loanInterestAccured: safeArray2[i].interestAccured,
      loanDisbursedAmount: safeArray2[i].disbursedAmount,
    };
    combinedArray.push(mergedObject);
  }

  return combinedArray;
}
