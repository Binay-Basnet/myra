import { useFormContext } from 'react-hook-form';

import { BoxContainer } from '@coop/accounting/ui-components';
import { FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

const booleanList = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const AddToInventory = () => {
  const { watch } = useFormContext();

  const addToInventory = watch('addToInventory');
  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          Add to Inventory
        </Text>

        <FormSwitchTab options={booleanList} name="addToInventory" />
      </Box>

      {addToInventory === 'Yes' && (
        <FormSelect
          name="warehouse"
          label={'Warehouse'}
          placeholder={'Select Warehouse'}
          options={[]}
        />
      )}
    </BoxContainer>
  );
};
