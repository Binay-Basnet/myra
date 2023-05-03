import { DetailCardContent, DetailsCard } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { useCreditNoteDetailsHook } from '../hooks/useCreditNote';

export const PaymentDetailsCreditNote = () => {
  const { detailData } = useCreditNoteDetailsHook();

  return (
    <DetailsCard title="Payment Details" bg="white" hasThreeRows>
      <DetailCardContent
        title="Sub Total"
        subtitle={amountConverter(detailData?.paymentDetail?.subTotal || '0')}
      />
      <DetailCardContent
        title="Non-Taxable Amount"
        subtitle={amountConverter(detailData?.paymentDetail?.nonTaxableTotal || '0')}
      />
      <DetailCardContent
        title="VAT"
        subtitle={amountConverter(detailData?.paymentDetail?.vat || '0')}
      />
      <DetailCardContent
        title="Taxable Total"
        subtitle={amountConverter(detailData?.paymentDetail?.taxableTotal || '0')}
      />
      <DetailCardContent
        title="Grand Total"
        subtitle={amountConverter(detailData?.paymentDetail?.grandTotal || '0')}
      />
    </DetailsCard>
  );
};
