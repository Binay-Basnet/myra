import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useCreditNoteDetailsHook } from '../hooks/useCreditNote';

export const GeneralInformationCreditNote = () => {
  const { detailData } = useCreditNoteDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Order No" subtitle={detailData?.customerName} />

      <DetailCardContent title="Invoice Reference" subtitle={detailData?.invoiceReference} />
      <DetailCardContent title="Date" subtitle={localizedDate(detailData?.date)} />
    </DetailsCard>
  );
};
