import { DetailCardContent, DetailsCard } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { useCustomerDetailsHook } from '../hooks/useCreditNote';

export const AdditionalDDetailsCustomer = () => {
  const { detailData } = useCustomerDetailsHook();

  return (
    <DetailsCard title="Additional Details" bg="white" hasThreeRows>
      <DetailCardContent title="Email Address" subtitle={detailData?.email} />
      <DetailCardContent title="Credit Terms" subtitle={detailData?.creditTerms} />
      <DetailCardContent
        title="Opening Balance"
        subtitle={amountConverter(detailData?.openingBalance || '0')}
      />
    </DetailsCard>
  );
};
