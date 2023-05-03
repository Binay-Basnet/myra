import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedText } from '@coop/cbs/utils';

import { useCustomerDetailsHook } from '../hooks/useCreditNote';

export const CustomerAddress = () => {
  const { detailData } = useCustomerDetailsHook();

  return (
    <DetailsCard title="Address" bg="white" hasThreeRows>
      <DetailCardContent title="Province" subtitle={localizedText(detailData?.address?.state)} />
      <DetailCardContent title="District" subtitle={localizedText(detailData?.address?.district)} />
      <DetailCardContent
        title="Local Goverment"
        subtitle={localizedText(detailData?.address?.localGovernment)}
      />
      <DetailCardContent title="Locality" subtitle={localizedText(detailData?.address?.locality)} />
      <DetailCardContent title="House No" subtitle={detailData?.address?.houseNo} />
    </DetailsCard>
  );
};
