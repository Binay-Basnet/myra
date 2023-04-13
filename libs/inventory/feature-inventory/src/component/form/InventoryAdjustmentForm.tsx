import { FormProvider, useForm } from 'react-hook-form';

import { Box, Divider, Text } from '@myra-ui';

import { InventoryAdjustmentMode } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormRadioGroup, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { InventoryAdjustmentTable } from './InventoryAdjustmentTable';

type InventoryAdjustmentTable = {
  product_id: string;
  quantity: number;
  rate: number;
  totalAmount: number;
  product_description: string;
};

const searchOptions = [
  { label: 'MI 001 - Lenovo Laptop', value: 'mi001' },
  { label: 'MI 002 - Lenovo Laptop', value: 'mi002' },
  { label: 'MI 003 - Lenovo Laptop', value: 'mi003' },
  { label: 'MI 004 - Lenovo Laptop', value: 'mi004' },
  { label: 'MI 005 - Lenovo Laptop', value: 'mi005' },
  { label: 'MI 006 - Lenovo Laptop', value: 'mi006' },
  { label: 'MI 007 - Lenovo Laptop', value: 'mi007' },
  { label: 'MI 008 - Lenovo Laptop', value: 'mi008' },
  { label: 'MI 009 - Lenovo Laptop', value: 'mi009' },
  { label: 'MI 0010 - Lenovo Laptop', value: 'mi0010' },
];

const InventoryAdjustmentForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});
  const modeOfAdjustment = methods?.watch('modeOfAdjustment');
  return (
    <FormProvider {...methods}>
      <form>
        <Box p="s20" display="flex" flexDirection="column" gap="s32" bg="neutralColorLight.Gray-0">
          <InputGroupContainer>
            <FormRadioGroup
              label="Mode of Adjustment"
              name="modeOfAdjustment"
              options={[
                { label: 'Quantity Adjustment', value: InventoryAdjustmentMode?.Quantity },
                { label: 'Value Adjustment', value: InventoryAdjustmentMode?.Value },
              ]}
            />
          </InputGroupContainer>

          <Divider />
          <Text>Adjustment Details</Text>
          <InputGroupContainer>
            <FormInput label="Reference Number" name="referenceNumber" />
            <FormInput label="Code" name="code" />
            <FormDatePicker label="Date" name="date" />
          </InputGroupContainer>
          <InventoryAdjustmentTable modeOfAdjustment={modeOfAdjustment} />

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

          <Box>
            <FormTextArea name="note" label=" " __placeholder={t['invFormNote']} />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default InventoryAdjustmentForm;
