import { FormProvider, useForm } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { Box, Divider, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const WarehouseTransferForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <form>
        <Box
          w="100%"
          background="white"
          p="s20"
          display="flex"
          flexDirection="column"
          gap="s32"
        >
          <Grid templateColumns="repeat(4,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormSelect
                name="sourceWarehouse"
                label={t['warehouseTransferSourceWarehouse']}
                placeholder={t['warehouseTransferSourceWarehouse']}
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
                placeholder={t['warehouseTransferDestinationWarehouse']}
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
                placeholder={t['warehouseTransferCode']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="date"
                name="date"
                label={t['warehouseTransferDate']}
                placeholder={t['warehouseTransferDate']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="referenceNumber"
                label={t['warehouseTransferReferenceNumber']}
                placeholder={t['warehouseTransferReferenceNumber']}
              />
            </GridItem>
            <GridItem>
              <FormSelect
                name="authorizedSender"
                label={t['warehouseTransferAuthorizedSender']}
                placeholder={t['warehouseTransferSelectAuthorizedSender']}
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
                placeholder={t['warehouseTransferSelectAuthorizedReceiver']}
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

          <Box flexDirection="column" display="flex" gap="s16">
            <FormTextArea
              name="description"
              label={t['warehouseTransferDescription']}
              placeholder={t['warehouseTransferNote']}
            />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
