import { useFormContext } from 'react-hook-form';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { TextBoxContainer, TopText } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type IProductSubTypeTable = {
  productSubType: string;
  productTypeID: string;
  amount: number;
};

type ProductTypeTable = {
  id: string;
  productType: string;
  description: string;
};

type ProductTypeForm = {
  productType: ProductTypeTable[];
};

export const ProductSubTypeTable = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<ProductTypeForm>();

  const productType = watch('productType');

  return (
    <Box pb="s20" width="full" display="flex" flexDirection="column">
      <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
        <TextBoxContainer>
          <TopText>{t['loanProductTypeProductSubtype']} </TopText>
        </TextBoxContainer>
        <Box>
          <FormEditableTable<IProductSubTypeTable>
            name="productSubType"
            columns={[
              {
                accessor: 'productSubType',
                header: t['loanProductTypeProductSubtype'],
                cellWidth: 'auto',
              },
              {
                accessor: 'productTypeID',
                header: t['loanProductTypeProductType'],
                fieldType: 'select',
                selectOptions: productType
                  ?.filter((p) => !!p.productType)
                  .map((product) => ({
                    label: product.productType,
                    value: product.id,
                  })),
                cellWidth: 'auto',
              },
            ]}
          />
        </Box>
      </GroupContainer>
    </Box>
  );
};

export default ProductSubTypeTable;
