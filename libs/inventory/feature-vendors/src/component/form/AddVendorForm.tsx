import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAddOutline } from 'react-icons/io5';

import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Button, Divider, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddVendorForm = () => {
  const { t } = useTranslation();
  const [addnInfo, setAddnInfo] = useState(false);
  const methods = useForm({});
  const { watch } = methods;
  const productInfo = watch('productInfo');

  const productInfoList = [
    { label: t['invItemSimpleProduct'], value: 'simpleProduct' },
    { label: t['invItemVariantProduct'], value: 'variantProduct' },
  ];

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
          <Grid templateColumns="repeat(3,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormInput
                type="text"
                name="name"
                label={t['invItemPrimaryUnit']}
                placeholder={t['invItemSelectItem']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="item"
                label={t['invItemCode']}
                placeholder={t['invItemCode']}
              />
            </GridItem>
            <GridItem>
              <FormSelect
                name="group"
                label={t['invItemGroup']}
                placeholder={t['invItemCategory']}
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
              <FormInput
                type="text"
                name="tax"
                label={t['invItemTax']}
                placeholder={t['invItemTaxType']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="primaryUnit"
                label={t['invItemPrimaryUnit']}
                placeholder={t['invItemPrimaryUnit']}
              />
            </GridItem>
          </Grid>

          <Divider />

          <Box flexDirection="column" display="flex" gap="s16">
            <Text
              fontSize="r2"
              fontWeight="SemiBold"
              color="neutralColorLight.Gray-80"
            >
              {t['invItemProductInformation']}
            </Text>
            <FormSwitchTab
              name="productInfo"
              options={productInfoList.map((value) => ({
                label: value.label,
                value: value.value,
              }))}
            />
            {productInfo === 'simpleProduct' && (
              <Grid templateColumns="repeat(3,1fr)" gap="s20">
                <GridItem>
                  <FormInput
                    type="text"
                    name="purchasePrice"
                    label={t['invItemPurchasePrice']}
                    placeholder={t['invItemPurchasePrice']}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    type="text"
                    name="profit"
                    label={t['invItemProfit']}
                    placeholder={t['invItemProfit']}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    type="text"
                    name="sellingPrice"
                    label={t['invItemSellingPrice']}
                    placeholder={t['invItemSellingPrice']}
                  />
                </GridItem>
              </Grid>
            )}
          </Box>

          {!addnInfo && (
            <Box>
              <Button
                leftIcon={<IoAddOutline />}
                variant="ghost"
                onClick={() => setAddnInfo(true)}
              >
                {t['invItemAddAdditionalInformation']}
              </Button>
            </Box>
          )}

          {addnInfo && (
            <>
              {' '}
              <Divider />
              <Box>
                <Text
                  fontSize="r1"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-50"
                >
                  {t['invItemAddtionalInformation']}
                </Text>

                <Grid mt="s16" templateColumns="repeat(3,1fr)" gap="s20">
                  <GridItem>
                    <FormSelect
                      name="salesLedger"
                      label={t['invItemSalesLedger']}
                      placeholder={t['invItemSelectAccount']}
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
                      name="purchaseLedger"
                      label={t['invItemPurchaseLedger']}
                      placeholder={t['invItemSelectAccount']}
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
                      name="salesReturnLedger"
                      label={t['invItemSalesReturnLedger']}
                      placeholder={t['invItemSelectAccount']}
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
                      name="purchaseReturnLedger"
                      label={t['invItemPurchaseReturnLedger']}
                      placeholder={t['invItemSelectAccount']}
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
                      name="valuationMethod"
                      label={t['invItemValuationMethod']}
                      placeholder={t['invItemSelectMethod']}
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
                    <FormInput
                      type="text"
                      name="minimumStockQuantity"
                      label={t['invItemMinimumStockQuantity']}
                      placeholder={t['invItemMinimumStock']}
                    />
                  </GridItem>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};
