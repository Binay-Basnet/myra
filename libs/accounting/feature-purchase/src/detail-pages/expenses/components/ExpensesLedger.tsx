import { DetailsCard } from '@myra-ui';

import { ExpensesLedgerTable } from './ExpensesLedgerTable';
import { useExpensesDetailsHook } from '../hooks/useExpensesDetailsHook';

export const ExpenseLedgers = () => {
  const { detailData } = useExpensesDetailsHook();
  const purchaseData =
    detailData?.ledgerDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      accountId: data?.accountId,
      amount: data?.amount,
      tax: data?.tax,
      taxAmount: data?.taxAmount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Ledger List">
      <ExpensesLedgerTable data={purchaseData} />{' '}
    </DetailsCard>
  );
};
