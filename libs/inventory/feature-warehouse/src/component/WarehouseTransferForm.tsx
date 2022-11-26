import { FormProvider, useForm } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable, FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { Box, Divider, Grid, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const WarehouseTransferForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});
  type WareHouseTransferTable = {
    product_id: string;
    quantity: number;
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
  return (
    <FormProvider {...methods}>
      <form>
        <Box w="100%" background="white" p="s20" display="flex" flexDirection="column" gap="s32">
          <Grid templateColumns="repeat(4,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormSelect
                name="sourceWarehouse"
                label={t['warehouseTransferSourceWarehouse']}
                __placeholder={t['warehouseTransferSourceWarehouse']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormSelect
                name="destinationWarehouse"
                label={t['warehouseTransferDestinationWarehouse']}
                __placeholder={t['warehouseTransferDestinationWarehouse']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
          </Grid>
          <InputGroupContainer>
            <GridItem>
              <FormInput
                type="text"
                name="code"
                label={t['warehouseTransferCode']}
                __placeholder={t['warehouseTransferCode']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="date"
                name="date"
                label={t['warehouseTransferDate']}
                __placeholder={t['warehouseTransferDate']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="referenceNumber"
                label={t['warehouseTransferReferenceNumber']}
                __placeholder={t['warehouseTransferReferenceNumber']}
              />
            </GridItem>
            <GridItem>
              <FormSelect
                name="authorizedSender"
                label={t['warehouseTransferAuthorizedSender']}
                __placeholder={t['warehouseTransferSelectAuthorizedSender']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
            <GridItem>
              <FormSelect
                name="authorizedReceiver"
                label={t['warehouseTransferAuthorizedReceiver']}
                __placeholder={t['warehouseTransferSelectAuthorizedReceiver']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
          </InputGroupContainer>

          <Divider />

          <Box>
            <FormEditableTable<WareHouseTransferTable>
              name="data"
              columns={[
                {
                  accessor: 'product_id',
                  header: t['warehouseTransferProduct'],
                  cellWidth: 'auto',
                  fieldType: 'search',
                  searchOptions,
                },

                {
                  accessor: 'quantity',
                  header: t['warehouseTransfertableQuantity'],
                  isNumeric: true,
                },
                {
                  accessor: 'product_description',
                  header: t['warehouseTransfertableDescription'],
                  hidden: true,
                  colSpan: 3,

                  fieldType: 'textarea',
                },
              ]}
            />
          </Box>
          <Divider />
          <Box flexDirection="column" display="flex" gap="s16">
            <FormTextArea
              name="description"
              label={t['warehouseTransferDescription']}
              __placeholder={t['warehouseTransferNote']}
            />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
