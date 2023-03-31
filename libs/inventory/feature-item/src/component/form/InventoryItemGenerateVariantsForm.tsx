import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Grid, Icon, Text } from '@myra-ui';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
} from '@coop/neosys-admin/layout';
import { FormEditableTable, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type VarinatProductTable = {
  sku: string;
  itemName: string;
  sellingPrice: string;
  costPrice: string;
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
          name={`variants.${index}.variantName`}
          label={t['invItemsVariantnName']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`variants.${index}.options`}
          label={t['invItemsOptions']}
        />
      </Grid>
    </DynamicBoxContainer>
  );
};

export const InventoryItemGenerateVariantsForm = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;
  const {
    fields: variantProducts,
    append: variantProductAppend,
    remove: variantProductRemove,
  } = useFieldArray({ name: 'variants' });

  const generate = () => {
    const itemName = watch('itemName');
    const itemCode = watch('itemCode');

    const variantProduct = watch('variants') as {
      variantName: string;
      options: string;
    }[];

    const tableData = variantProduct.reduce(
      (accumulator, currentVal) =>
        accumulator.concat(
          currentVal.options?.split(',')?.map((option: string, index: number) => ({
            sku: `${itemCode}-${index + 1}`,
            itemName: `${itemName}-${option}`,
          }))
        ),
      [{}]
    );

    methods.setValue('variantList', tableData.slice(1));
    // reset({
    //   ...data,
    //   variants: {
    //     ...data['variants'],
    //     variantList: tableData.slice(1),
    //   },
    //   //   data: tableData.slice(1),
    // });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s32" pt="s24">
      <Text fontSize="r1"> Generate Variant</Text>
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

      <FormEditableTable<VarinatProductTable>
        name="variantList"
        canAddRow={false}
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
            accessor: 'costPrice',
            header: t['inventoryItemTablePurchasePrice'],
            isNumeric: true,
          },
        ]}
      />
      <Divider />
    </Box>
  );
};
