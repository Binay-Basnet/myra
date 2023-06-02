import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useItemDetailsHook } from '../hooks/useItemsDetails';

export const GeneralInformationItems = () => {
  const { detailData } = useItemDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Item Name" subtitle={detailData?.itemName} />

      <DetailCardContent title="Item Code" subtitle={detailData?.itemCode} />
      <DetailCardContent title="Item Group" subtitle={detailData?.itemGroup} />
      <DetailCardContent title="Unit" subtitle={detailData?.unit} />
      <DetailCardContent title="Tax" subtitle={detailData?.tax} />
    </DetailsCard>
  );
};
