import { Box } from '@myra-ui';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { TextBoxContainer, TopText } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

type ProductTableType = {
  productType: string;
  description: string;
};

export const ProductTypeTable = () => {
  const { t } = useTranslation();
  const { mutateAsync } = useGetNewIdMutation();

  const getId = (): Promise<{ newId: string }> =>
    new Promise((resolve) => {
      const response = mutateAsync({});
      if (response) {
        resolve(response);
      }
    });

  return (
    <Box width="full" display="flex" flexDirection="column">
      <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
        <TextBoxContainer>
          <TopText>{`${t['loanProductTypeProductType']} - ${featureCode.loanProductTypeSetting}`}</TopText>
        </TextBoxContainer>
        <Box>
          <FormEditableTable<ProductTableType>
            name="productType"
            getRowId={getId}
            columns={[
              {
                accessor: 'productType',
                header: t['loanProductTypeProductType'],
                cellWidth: 'lg',
              },
              {
                accessor: 'description',
                header: t['loanProductTypeDescription'],
                cellWidth: 'auto',
              },
            ]}
            canAddRow={false}
            canDeleteRow={false}
          />
        </Box>
      </GroupContainer>
    </Box>
  );
};

export default ProductTypeTable;
