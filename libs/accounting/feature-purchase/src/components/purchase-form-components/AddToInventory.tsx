import { useFormContext } from 'react-hook-form';

import { BoxContainer } from '@coop/accounting/ui-components';
import { FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const booleanList = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const AddToInventory = () => {
  const { watch } = useFormContext();

  const { t } = useTranslation();

  const addToInventory = watch('addToInventory');
  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {t['accountingPurchaseAddInventoryAdd']}
        </Text>

        <FormSwitchTab options={booleanList} name="addToInventory" />
      </Box>

      {addToInventory === 'Yes' && (
        <FormSelect
          name="warehouse"
          label={t['accountingPurchaseAddWarehouse']}
          placeholder={t['accountingPurchaseAddWarehouseSelect']}
          options={[]}
        />
      )}
    </BoxContainer>
  );
};
