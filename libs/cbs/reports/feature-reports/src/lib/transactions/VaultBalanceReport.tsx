import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  useGetVaultBalanceReportQuery,
  VaultBalanceReportFilter,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormCBSDatePicker } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type VaultBalanceReportDataType = {
  value: string;
  quantity?: {
    opening: number;
    inVault: number;
    outVault: number;
    closingVal: number;
  };
  amount?: {
    opening: string;
    inVault: string;
    outVault: string;
    closingVal: string;
  };
};

const cashOptions = ['1,000', '500', '100', '50', '25', '20', '10', '5', '2', '1', 'None', 'Total'];

export const VaultBalanceReport = () => {
  const [filters, setFilters] = useState<VaultBalanceReportFilter | null>(null);
  const { isCbs } = useIsCbs();

  const { data, isFetching } = useGetVaultBalanceReportQuery(
    {
      data: {
        ...filters,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
      } as VaultBalanceReportFilter,
    },
    { enabled: !!filters }
  );

  const openingBalance =
    data?.report?.transactionReport?.financial?.vaultBalanceReport?.data?.opening;

  const closingBalance =
    data?.report?.transactionReport?.financial?.vaultBalanceReport?.data?.closing;

  const vaultInBalance =
    data?.report?.transactionReport?.financial?.vaultBalanceReport?.data?.vaultIn;

  const vaultOutBalance =
    data?.report?.transactionReport?.financial?.vaultBalanceReport?.data?.vaultOut;

  const arrayNew =
    openingBalance?.denomination?.map((d, index) => ({
      value: cashOptions?.[index],
      quantity: {
        opening: d?.quantity,
        inVault: vaultInBalance?.denomination?.[index]?.quantity,
        outVault: vaultOutBalance?.denomination?.[index]?.quantity,
        closingVal: closingBalance?.denomination?.[index]?.quantity,
      },
      amount: {
        opening: d?.amount,
        inVault: vaultInBalance?.denomination?.[index]?.amount,
        outVault: vaultOutBalance?.denomination?.[index]?.amount,
        closingVal: closingBalance?.denomination?.[index]?.amount,
      },
    })) || [];
  const noneArray = {
    value: cashOptions?.[10],
    quantity: {
      opening: 0,
      inVault: 0,
      outVault: 0,
      closingVal: 0,
    },
    amount: {
      opening: openingBalance?.noneAmount,
      inVault: vaultInBalance?.noneAmount,
      outVault: vaultOutBalance?.noneAmount,
      closingVal: closingBalance?.noneAmount,
    },
  };
  // const combinedArray = arrayNew?.push(noneArray)
  const combinedArray = arrayNew?.length !== 0 ? [...arrayNew, noneArray] : null;

  return (
    <Report
      defaultFilters={{}}
      data={combinedArray as VaultBalanceReportDataType[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_VAULT_BALANCE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions'
                : '/accounting/reports/accounting-reports/transactions',
            },
            {
              label: 'Vault Balance Report',
              link: isCbs
                ? '/cbs/reports/cbs-reports/transactions/vault-balance/new'
                : '/accounting/reports/accounting-reports/transactions/vault-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormCBSDatePicker name="period.from" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDirection="column">
            <Report.Table<VaultBalanceReportDataType & { index: number }>
              showFooter
              columns={[
                {
                  header: 'Opening Cash Balance',
                  id: 'Opening Cash Balance',
                  columns: [
                    {
                      header: 'Opening',
                      id: 'Opening column ',
                      columns: [
                        {
                          header: 'Denomination',
                          accessorKey: 'value',
                          footer: () => 'Total',
                          meta: {
                            isNumeric: true,
                            Footer: {
                              colspan: 1,
                            },
                          },
                        },
                        {
                          header: 'Count',
                          id: 'opening count',
                          accessorFn: (row) => row?.quantity?.opening,
                          footer: () => amountConverter(openingBalance?.noteTotal as string),
                          meta: {
                            isNumeric: true,
                          },
                        },
                        {
                          header: 'Amount',
                          id: 'opening Amount',
                          footer: () => amountConverter(openingBalance?.amountTotal as string),
                          accessorFn: (row) => row?.amount?.opening,
                          cell: (props) => amountConverter(props.getValue() as string),
                          meta: {
                            isNumeric: true,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  header: 'Today’s Transaction',
                  id: "today's transaction",
                  columns: [
                    {
                      header: 'Vault In',
                      columns: [
                        {
                          header: 'Count',
                          id: 'vault In Count',
                          footer: () => amountConverter(vaultInBalance?.noteTotal as string),
                          accessorFn: (row) => row?.quantity?.inVault,
                          meta: {
                            isNumeric: true,
                          },
                        },
                        {
                          header: 'Amount',
                          id: 'vault in Amount',
                          accessorFn: (row) => row?.amount?.inVault,
                          footer: () => amountConverter(vaultInBalance?.amountTotal as string),
                          cell: (props) => amountConverter(props.getValue() as string),
                          meta: {
                            isNumeric: true,
                          },
                        },
                      ],
                    },
                    {
                      header: 'Vault Out',
                      id: 'vault Out Count',
                      columns: [
                        {
                          header: 'Count',
                          id: 'vault out Count',
                          footer: () => amountConverter(vaultOutBalance?.noteTotal as string),
                          accessorFn: (row) => row?.quantity?.outVault,
                          meta: {
                            isNumeric: true,
                          },
                        },
                        {
                          header: 'Amount',
                          accessorFn: (row) => row?.amount?.outVault,
                          id: 'vault out Amount',
                          footer: () => amountConverter(vaultOutBalance?.amountTotal as string),
                          cell: (props) => amountConverter(props.getValue() as string),
                          meta: {
                            isNumeric: true,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  header: 'Closing Cash Balance',
                  columns: [
                    {
                      header: 'Closing',
                      id: 'Closing column',
                      columns: [
                        {
                          header: 'Count',
                          id: 'closing count',
                          footer: () => amountConverter(closingBalance?.noteTotal as string),
                          accessorFn: (row) => row?.quantity?.closingVal,
                          meta: {
                            isNumeric: true,
                          },
                        },
                        {
                          header: 'Amount',
                          id: 'closing Amount',
                          accessorFn: (row) => row?.amount?.closingVal,
                          footer: () => amountConverter(closingBalance?.amountTotal as string),
                          cell: (props) => amountConverter(props.getValue() as string),
                          meta: {
                            isNumeric: true,
                          },
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
