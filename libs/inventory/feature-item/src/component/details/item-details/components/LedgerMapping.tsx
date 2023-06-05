import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useItemDetailsHook } from '../hooks/useItemsDetails';

export const LedgerMapping = () => {
  const { detailData } = useItemDetailsHook();

  return (
    <DetailsCard title="Ledger Mapping" bg="white" hasThreeRows>
      <DetailCardContent title="Sales Ledger" subtitle={detailData?.ledgerDetail?.salesLedger} />

      <DetailCardContent
        title="Sales Return Ledger"
        subtitle={detailData?.ledgerDetail?.salesReturnLedger}
      />
      <DetailCardContent
        title="Purchase Ledger"
        subtitle={detailData?.ledgerDetail?.purchaseLedger}
      />
      <DetailCardContent
        title="Purchase Return Ledger"
        subtitle={detailData?.ledgerDetail?.purchaseReturnLedger}
      />
    </DetailsCard>
  );
};
