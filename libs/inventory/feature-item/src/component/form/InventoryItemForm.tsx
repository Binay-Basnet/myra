import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoAddOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Grid, GridItem, Icon, Text } from '@myra-ui';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
} from '@coop/neosys-admin/layout';
import { FormEditableTable, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type VarinatProductTable = {
  sku: string;
  itemName: number;
  sellingPrice: number;
  purchasePrice: number;
};

interface IVariantProduct {
  index: number;
  removeVariantProduct: () => void;
}

const VariantProduct = ({ index, removeVariantProduct }: IVariantProduct) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeVariantProduct}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <Grid templateColumns="repeat(2, 1fr)" gap="s20">
        <FormInput
          type="text"
          bg="white"
          name={`variantProduct.${index}.variantName`}
          label={t['invItemsVariantnName']}
          __placeholder={t['invItemSizes']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`variantProduct.${index}.options`}
          label={t['invItemsOptions']}
          __placeholder={t['invItemsSml']}
        />
      </Grid>
    </DynamicBoxContainer>
  );
};

export const InventoryItemForm = () => {
  const { t } = useTranslation();
  const [addnInfo, setAddnInfo] = useState(false);
  const methods = useFormContext();
  const { watch, getValues, reset } = methods;
  const productInfo = watch('productInfo');
  const {
    fields: variantProducts,
    append: variantProductAppend,
    remove: variantProductRemove,
  } = useFieldArray({ name: 'variantProduct' });

  const productInfoList = [
    { label: t['invItemSimpleProduct'], value: 'simpleProduct' },
    { label: t['invItemVariantProduct'], value: 'variantProduct' },
  ];

  const generate = () => {
    const itemName = watch('itemName');
    const itemCode = watch('itemCode');
    const variantProduct = watch('variantProduct') as {
      variantName: string;
      options: string;
    }[];

    const tableData = variantProduct.reduce(
      (accumulator, currentVal) =>
        accumulator.concat(
          currentVal.options.split(',').map((option: string, index: number) => ({
            sku: `${itemCode}-${index + 1}`,
            itemName: `${itemName}-${option}`,
          }))
        ),
      [{}]
    );
    reset({
      ...getValues(),
      data: tableData.slice(1),
    });
  };

  return (
    <Box
      w="100%"
      background="white"
      p="s20"
      display="flex"
      flexDirection="column"
      gap="s32"
      minH="calc(100vh - 220px)"
    >
      <Grid templateColumns="repeat(3,1fr)" gap="s20">
        <GridItem colSpan={2}>
          <FormSelect
            name="itemName"
            options={[
              {
                label: 'Rice',
                value: 'rice',
              },
              {
                label: 'Pizza',
                value: 'pizze',
              },
            ]}
            label={t['invItemName']}
            __placeholder={t['invItemSelectItem']}
          />
        </GridItem>
        <GridItem>
          <FormInput
            type="text"
            name="itemCode"
            label={t['invItemCode']}
            __placeholder={t['invItemCode']}
          />
        </GridItem>
        <GridItem>
          <FormSelect
            name="group"
            label={t['invItemGroup']}
            __placeholder={t['invItemCategory']}
            options={[
              {
                label: 'Recurring Saving',
                value: 'recurringSaving',
              },
              {
                label: 'Mandatory',
                value: 'mandatory',
              },
              {
                label: 'Voluntary',
                value: 'voluntary',
              },
              {
                label: 'Term Saving',
                value: 'termSaving',
              },
            ]}
          />
        </GridItem>
        <GridItem>
          <FormInput
            type="text"
            name="tax"
            label={t['invItemTax']}
            __placeholder={t['invItemTaxType']}
          />
        </GridItem>
        <GridItem>
          <FormInput
            type="text"
            name="primaryUnit"
            label={t['invItemPrimaryUnit']}
            __placeholder={t['invItemPrimaryUnit']}
          />
        </GridItem>
      </Grid>

      <Divider />

      <Box flexDirection="column" display="flex" gap="s16">
        <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
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
                __placeholder={t['invItemPurchasePrice']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="profit"
                label={t['invItemProfit']}
                __placeholder={t['invItemProfit']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="sellingPrice"
                label={t['invItemSellingPrice']}
                __placeholder={t['invItemSellingPrice']}
              />
            </GridItem>
          </Grid>
        )}
      </Box>

      {productInfo === 'variantProduct' && (
        <Box display="flex" flexDirection="column" gap="s32">
          <GroupContainer scrollMarginTop="200px">
            <Box>
              <DynamicBoxGroupContainer>
                {variantProducts.map((item, index) => (
                  <Box key={item.id}>
                    <VariantProduct
                      index={index}
                      removeVariantProduct={() => variantProductRemove(index)}
                    />
                  </Box>
                ))}
                <Box display="flex" justifyContent="space-between">
                  <Button
                    id="newDetailButton"
                    alignSelf="start"
                    leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                    variant="outline"
                    onClick={() => {
                      variantProductAppend({});
                    }}
                  >
                    {t['invItemAddNewVariant']}
                  </Button>
                  {variantProducts.length > 0 && (
                    <Button
                      id="newDetailButton"
                      alignSelf="start"
                      onClick={() => {
                        generate();
                      }}
                    >
                      {t['generate']}
                    </Button>
                  )}
                </Box>
              </DynamicBoxGroupContainer>
            </Box>
          </GroupContainer>

          <Divider />

          <FormEditableTable<VarinatProductTable>
            name="data"
            columns={[
              {
                accessor: 'sku',
                header: t['inventoryItemTableSKU'],
              },
              {
                accessor: 'itemName',
                header: t['inventoryItemTableItemName'],
              },
              {
                accessor: 'sellingPrice',
                header: t['inventoryItemTableSellingPrice'],
                isNumeric: true,
              },
              {
                accessor: 'purchasePrice',
                header: t['inventoryItemTablePurchasePrice'],
                isNumeric: true,
              },
            ]}
          />
        </Box>
      )}

      {!addnInfo && (
        <Box>
          <Button leftIcon={<IoAddOutline />} variant="ghost" onClick={() => setAddnInfo(true)}>
            {t['invItemAddAdditionalInformation']}
          </Button>
        </Box>
      )}

      {addnInfo && (
        <>
          <Divider />
          <Box>
            <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-50">
              {t['invItemAddtionalInformation']}
            </Text>

            <Grid mt="s16" templateColumns="repeat(3,1fr)" gap="s20">
              <GridItem>
                <FormSelect
                  name="salesLedger"
                  label={t['invItemSalesLedger']}
                  __placeholder={t['invItemSelectAccount']}
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
                  __placeholder={t['invItemSelectAccount']}
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
                  __placeholder={t['invItemSelectAccount']}
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
                  __placeholder={t['invItemSelectAccount']}
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
                  __placeholder={t['invItemSelectMethod']}
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
                  __placeholder={t['invItemMinimumStock']}
                />
              </GridItem>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};
