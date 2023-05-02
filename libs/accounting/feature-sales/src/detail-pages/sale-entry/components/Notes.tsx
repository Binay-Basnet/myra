import { DetailsCard, Text } from '@myra-ui';

import { useSalesDetailsHooks } from '../hooks/useSalesEntry';

export const GeneralInformationSalesNote = () => {
  const { detailData } = useSalesDetailsHooks();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.notes}</Text>
    </DetailsCard>
  );
};
