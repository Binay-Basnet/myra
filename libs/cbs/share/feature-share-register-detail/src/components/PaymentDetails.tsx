import { DetailCardContent, DetailsCard } from '@myra-ui';

import { SharePaymentMode } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

type PaymentDataProps = {
  paymentData:
    | {
        paymentMode?: SharePaymentMode | null | undefined;
        amount?: string | null | undefined;
        sourceOfFund?: string | null | undefined;
      }
    | undefined
    | null;
};
export const PaymentDetails = ({ paymentData }: PaymentDataProps) => (
  <DetailsCard title="Payment Details" hasThreeRows>
    <DetailCardContent
      title="Payment Mode"
      subtitle={paymentData?.paymentMode?.split('_')?.join(' ')}
    />
    <DetailCardContent title="Amount" subtitle={amountConverter(paymentData?.amount as string)} />
    <DetailCardContent title="Source of Fund" subtitle={paymentData?.sourceOfFund} />
  </DetailsCard>
);
