import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useItemDetailsHook } from '../hooks/useItemsDetails';

export const AdditionalInformationItems = () => {
  const { detailData } = useItemDetailsHook();

  return (
    <DetailsCard title="Additional Information" bg="white" hasThreeRows>
      <DetailCardContent title="Recorder Level" subtitle={detailData?.reorderLevel} />

      <DetailCardContent title="Valuation Method" subtitle={detailData?.valuationMethod} />
    </DetailsCard>
  );
};
