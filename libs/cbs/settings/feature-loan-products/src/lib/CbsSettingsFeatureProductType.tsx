import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Divider, Loader, SettingsFooter } from '@myra-ui';

import { useGetLoanProductTypeQuery, useSetProductTypeMutation } from '@coop/cbs/data-access';

import { ProductSubTypeTable, ProductTypeTable } from '../components';

type ProductTypeTableType = {
  id?: string;
  productType: string;
  description: string;
};

type ProductSubTypeTableType = {
  productSubType: string;
  productTypeID: string;
  id?: string;
};

type ProductTypeForm = {
  productType: ProductTypeTableType[];
  productSubType: ProductSubTypeTableType[];
};

export const CbsSettingsFeatureProductType = () => {
  const methods = useForm<ProductTypeForm>();

  const { mutateAsync: setProductType } = useSetProductTypeMutation();
  const { data, isLoading, refetch } = useGetLoanProductTypeQuery();

  const productData = data?.settings?.general?.loan?.productType;

  const handleSave = async () => {
    await asyncToast({
      id: 'loan-product',
      promise: setProductType(methods.getValues()),
      msgs: {
        success: 'Loan Settings Updated Successfully',
        loading: 'Updating Loan Settings',
      },
      onSuccess: () => refetch(),
    });
  };

  useEffect(() => {
    if (productData) {
      methods.reset({
        productType: productData.productTypes as ProductTypeTableType[],
        productSubType: productData.productSubTypes as ProductSubTypeTableType[],
      });
    }
  }, [isLoading]);

  return (
    <Box pb="s40" width="full" display="flex" flexDirection="column">
      {isLoading ? (
        <Box display="flex" bg="white" h="100vh" justifyContent="center" pt="100px">
          <Loader />
        </Box>
      ) : (
        <FormProvider {...methods}>
          <form>
            <Box display="flex" flexDirection="column" rowGap="s32" padding="s16">
              <ProductTypeTable />
              <Divider />
              <ProductSubTypeTable />
            </Box>
            <SettingsFooter handleSave={handleSave} zIndex={1} />
          </form>
        </FormProvider>
      )}
    </Box>
  );
};

export default CbsSettingsFeatureProductType;
