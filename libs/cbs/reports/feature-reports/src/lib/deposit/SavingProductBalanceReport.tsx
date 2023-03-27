import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Column, GridItem } from '@myra-ui';

import {
  Maybe,
  NatureOfDepositProduct,
  SavingProductBalanceEntry,
  SavingProductBalanceFilter,
  Scalars,
  useGetBranchListQuery,
  useGetSavingProductBalanceQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

type SavingProductBalanceInputs = Omit<SavingProductBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};
type TrialBalance = Record<
  string,
  {
    amount?: string;
    amountType?: string;
    // Total: string;
    // Type: string;
    // OpeningBalance: string;
    // OpeningBalanceType: string;
    // ClosingBalance: string;
    // ClosingBalanceType: string;
  }
>;
type NoOfAccount = Record<string, number>;

type TrialSheetReportDataEntry = {
  balanceMap?: TrialBalance;
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nature?: Maybe<NatureOfDepositProduct>;
  noOfAccountsMap?: Maybe<NoOfAccount>;
};

export const SavingProductBalanceReport = () => {
  const [filters, setFilters] = useState<SavingProductBalanceInputs | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetSavingProductBalanceQuery(
    {
      data: { ...filters, branchId: branchIds } as SavingProductBalanceFilter,
    },
    { enabled: !!filters }
  );

  const savingProductBalanceReportData =
    data?.report?.depositReport?.savingProductBalanceReport?.data;

  const savingProductBalanceReport = savingProductBalanceReportData?.entries;

  return (
    <Report
      defaultFilters={null}
      data={savingProductBalanceReport as SavingProductBalanceEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_PRODUCT_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Saving Product Balance Report',
              link: '/reports/cbs/savings/saving-product-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          {/* <Report.Table<SavingProductBalanceEntry & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => 'Total',
                meta: {
                  isNumeric: true,

                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Product Code',
                accessorKey: 'code',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Name',
                accessorKey: 'name',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.id as string}
                    type="saving-product"
                    label={props?.row?.original?.name as string}
                  />
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Nature',
                accessorKey: 'nature',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props.row.original.nature?.toLowerCase()?.replace(/_/g, ' ')}
                  </Box>
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'No. of Accounts',
                accessorKey: 'noOfAccounts',
                footer: () => quantityConverter(savingProductBalanceReportData?.accountTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Balance',
                accessorKey: 'totalBalance',
                footer: () =>
                  debitCreditConverter(
                    savingProductBalanceReportData?.balanceTotal || '0.00',
                    savingProductBalanceReportData?.balanceTotalType || ''
                  ),
                cell: (props) =>
                  debitCreditConverter(
                    props.row.original.totalBalance || '0.00',
                    props.row.original.balanceType || ''
                  ),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          /> */}
          <COATable data={savingProductBalanceReport as TrialSheetReportDataEntry[]} type="test" />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Product Nature">
            <FormCheckboxGroup
              name="filter.nature"
              list={[
                { label: 'Current', value: NatureOfDepositProduct.Current },
                { label: 'Recurring Saving', value: NatureOfDepositProduct.RecurringSaving },
                { label: 'Saving', value: NatureOfDepositProduct.Saving },
                { label: 'Term Saving', value: NatureOfDepositProduct.TermSavingOrFd },
              ]}
            />
          </Report.Filter>
          <Report.Filter title="Total Balance">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
interface ICOATableProps {
  data: TrialSheetReportDataEntry[];
  type: string;
  // total?: TrialBalance | null | undefined;
}

const COATable = ({ data, type }: ICOATableProps) => {
  const { getValues } = useFormContext<SavingProductBalanceInputs>();
  const branchIDs = getValues()?.branchId?.map((a) => a.value);

  const { data: branchListQueryData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  if (data?.length === 0 && !branchListQueryData) {
    return null;
  }

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;
  const headers =
    branchIDs?.length === branchList?.length
      ? ['Total']
      : [
          ...((branchList
            ?.filter((a) => branchIDs.includes(a?.node?.id || ''))
            ?.map((a) => a.node?.id) || []) as string[]),
          branchIDs.length === 1 ? undefined : 'Total',
        ]?.filter(Boolean);

  const baseColumn: Column<TrialSheetReportDataEntry>[] = [
    {
      header: 'S.No.',
      accessorKey: 'index',
      footer: () => 'Total',
      meta: {
        isNumeric: true,

        Footer: {
          colspan: 1,
        },
      },
    },
    {
      header: 'Product Code',
      accessorKey: 'code',
      meta: {
        Footer: {
          display: 'none',
        },
      },
    },
    {
      header: 'Product Name',
      accessorKey: 'name',
      cell: (props) => (
        <RouteToDetailsPage
          id={props?.row?.original?.id as string}
          type="saving-product"
          label={props?.row?.original?.name as string}
        />
      ),
      meta: {
        Footer: {
          display: 'none',
        },
      },
    },
    {
      header: 'Product Nature',
      accessorKey: 'nature',
      cell: (props) => (
        <Box textTransform="capitalize">
          {props.row.original.nature?.toLowerCase()?.replace(/_/g, ' ')}
        </Box>
      ),
      meta: {
        Footer: {
          display: 'none',
        },
      },
    },
  ];

  const columns: Column<TrialSheetReportDataEntry>[] = [
    ...baseColumn,
    ...headers.map(
      (header) =>
        ({
          header: branchList?.find((b) => b?.node?.id === header)?.node?.name || 'Total',
          accessorKey: 'balanceMap',
          columns: [
            {
              header: 'No of Accounts',
              accessorFn: (row) => row?.noOfAccountsMap,
              footer: () => 'sameer noob',
              cell: (props) => props?.row?.original?.noOfAccountsMap?.[header || ''],
              meta: {
                isNumeric: true,
              },
            },
            {
              header: 'Total Balance',
              accessorFn: (row) => row?.balanceMap,
              footer: () => 'hello',

              cell: (props) =>
                debitCreditConverter(
                  props?.row?.original?.balanceMap?.[header || '']?.amount || '0.00',
                  props?.row?.original?.balanceMap?.[header || '']?.amountType || ''
                ),
              meta: {
                isNumeric: true,
              },
            },
          ],
        } as Column<TrialSheetReportDataEntry>)
    ),
  ];

  // const tree = arrayToTree(
  //   data.map((d) => ({ ...d, id: d?.ledgerId as string })).filter((d) => !!d.id),
  //   ''
  // );

  return (
    <Report.Table<TrialSheetReportDataEntry>
      showFooter
      data={data}
      columns={columns}
      tableTitle={type}
    />
  );
};
