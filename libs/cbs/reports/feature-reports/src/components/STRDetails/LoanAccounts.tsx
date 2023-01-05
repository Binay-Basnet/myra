import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const LoanAccounts = () => {
  const router = useRouter();

  const { loanAccounts } = useSTRDetails();

  const { loanAccountsList, totalSanctionedAmount, totalRemainingBalance, totalRemainingInterest } =
    useMemo(
      () => ({
        loanAccountsList:
          loanAccounts?.map((account, index) => ({
            index: String(index + 1),
            ...account,
          })) ?? [],
        totalSanctionedAmount: loanAccounts?.reduce(
          (sum, curr) => sum + Number(curr?.totalSanctionedAmount ?? 0),
          0
        ),
        totalRemainingBalance: loanAccounts?.reduce(
          (sum, curr) => sum + Number(curr?.remainingBalance ?? 0),
          0
        ),
        totalRemainingInterest: loanAccounts?.reduce(
          (sum, curr) => sum + Number(curr?.remainingInterestTillDate ?? 0),
          0
        ),
      }),
      [loanAccounts]
    );

  const columns = useMemo<Column<typeof loanAccountsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        footer: 'Total Amount',
      },
      {
        header: 'Loan Account Number',
        accessorKey: 'id',
        cell: (props) => (
          <Button
            variant="link"
            onClick={() =>
              router.push(`${ROUTES.CBS_LOAN_DECLINED_DETAILS}?id=${props.getValue() as string}`)
            }
          >
            {props.getValue() as string}
          </Button>
        ),
      },
      {
        header: 'Account Name',
        accessorKey: 'LoanAccountName',
        meta: {
          width: '45%',
        },
      },
      {
        header: 'Product Name',
        cell: (props) => (
          <Button
            variant="link"
            onClick={() =>
              router.push(
                `${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${props.row?.original?.product?.id}`
              )
            }
          >
            {props?.row?.original?.product?.productName}
          </Button>
        ),
      },
      {
        header: 'Sanctioned Amount',
        accessorFn: (row) => amountConverter(row?.totalSanctionedAmount ?? 0),
        footer: amountConverter(totalSanctionedAmount ?? 0) as string,
        meta: { isNumeric: true },
      },
      {
        header: 'Remaining Balance',
        accessorFn: (row) => amountConverter(row?.remainingBalance ?? 0),
        footer: amountConverter(totalRemainingBalance ?? 0) as string,
        meta: { isNumeric: true },
      },
      {
        header: 'Remaining Interest Till Date',
        accessorFn: (row) => amountConverter(row?.remainingInterestTillDate ?? 0),
        footer: amountConverter(totalRemainingInterest ?? 0) as string,
        meta: { isNumeric: true },
      },
    ],
    [totalSanctionedAmount, totalRemainingBalance, totalRemainingInterest]
  );

  return (
    <DetailsCard title="Details of loan and any other business transactions with BFI" hasTable>
      <Table isDetailPageTable isStatic data={loanAccountsList} columns={columns} showFooter />
    </DetailsCard>
  );
};
