import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { usePurchaseDebitNoteHook } from '../hooks/useDebitNoteDetails';

export const GeneralInformationDebitNote = () => {
  const { detailData } = usePurchaseDebitNoteHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Supplier Name" subtitle={detailData?.supplierName} />
      <DetailCardContent title="Bill Reference" subtitle={detailData?.invoiceReference} />
      <DetailCardContent title="Date" subtitle={localizedDate(detailData?.date)} />
    </DetailsCard>
  );
};
