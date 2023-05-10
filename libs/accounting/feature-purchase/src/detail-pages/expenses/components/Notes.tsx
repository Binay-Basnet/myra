import { DetailsCard, Text } from '@myra-ui';

import { useExpensesDetailsHook } from '../hooks/useExpensesDetailsHook';

export const ExpensesNotes = () => {
  const { detailData } = useExpensesDetailsHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.notes}</Text>
    </DetailsCard>
  );
};
