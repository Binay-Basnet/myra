import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { TextBoxContainer, TopText } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type ProductTypeTable = {
  productType: string;
  description: string;
};

export function ProductTypeTable() {
  const { t } = useTranslation();
  const { mutateAsync } = useGetNewIdMutation();

  const getId = (): Promise<{ newId: string }> => {
    return new Promise((resolve) => {
      const response = mutateAsync({});
      if (response) {
        resolve(response);
      }
    });
  };

  return (
    <Box width="full" display={'flex'} flexDirection={'column'}>
      <GroupContainer scrollMarginTop={'200px'} display="flex" flexDirection={'column'} gap="s16">
        <TextBoxContainer>
          <TopText>{t['loanProductTypeProductType']}</TopText>
        </TextBoxContainer>
        <Box>
          <FormEditableTable<ProductTypeTable>
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
          />
        </Box>
      </GroupContainer>
    </Box>
  );
}

export default ProductTypeTable;
