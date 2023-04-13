import { useFormContext } from 'react-hook-form';

import { Box, FormSection } from '@myra-ui';

import { InventoryAdjustmentMode } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormRadioGroup, FormTextArea } from '@coop/shared/form';

import { InventoryAdjustmentTable } from './InventoryAdjustmentTable';
import { InventoryAdjustmentValueTable } from './InventoryAdjustmentValuesTable';

const InventoryAdjustmentForm = () => {
  const methods = useFormContext();
  const modeOfAdjustment = methods?.watch('modeOfAdjustment');
  return (
    <Box display="flex" flexDirection="column">
      <FormSection>
        <FormRadioGroup
          label="Mode of Adjustment"
          name="modeOfAdjustment"
          options={[
            { label: 'Quantity Adjustment', value: InventoryAdjustmentMode?.Quantity },
            { label: 'Value Adjustment', value: InventoryAdjustmentMode?.Value },
          ]}
        />
      </FormSection>
      <FormSection header="Adjustment Details">
        <FormInput label="Reference Number" name="referenceNumber" />
        <FormInput label="Code" name="code" />
        <FormDatePicker label="Date" name="date" />
      </FormSection>
      {modeOfAdjustment === InventoryAdjustmentMode?.Quantity && <InventoryAdjustmentTable />}
      {modeOfAdjustment === InventoryAdjustmentMode?.Value && <InventoryAdjustmentValueTable />}

      {/* <Box>
            <FormEditableTable<InventoryAdjustmentTable>
              name="data"
              debug={false}
              columns={[
                {
                  accessor: 'product_id',
                  header: t['inventoryAdjustmentTableProduct'],
                  cellWidth: 'auto',
                  fieldType: 'search',
                  searchOptions,
                },
                {
                  accessor: 'quantity',
                  header: t['inventoryAdjustmentTableQuantity'],
                  isNumeric: true,
                },
                {
                  accessor: 'rate',
                  fieldType: 'percentage',
                  header: t['inventoryAdjustmentTableRate'],
                  isNumeric: true,
                },
                {
                  accessor: 'totalAmount',
                  header: t['inventoryAdjustmentTableTotalAmount'],
                  isNumeric: true,
                },
                {
                  accessor: 'product_description',
                  header: t['inventoryAdjustmentTableDescription'],
                  hidden: true,
                  colSpan: 3,

                  fieldType: 'textarea',
                },
              ]}
            />
          </Box> */}

      <Box p="s20">
        <FormTextArea name="description" label="Description" />
      </Box>
    </Box>
  );
};

export default InventoryAdjustmentForm;
