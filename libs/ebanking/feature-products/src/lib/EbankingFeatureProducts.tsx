import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import { NatureOfDepositProduct, useGetDepositProductQuery } from '@coop/ebanking/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { Box, PathBar, TextFields } from '@coop/shared/ui';

import { ProductSelectCard } from '../components/ProductSelectCard';

const PRODUCTS_ENUM: Record<string, NatureOfDepositProduct> = {
  'recurring-saving': NatureOfDepositProduct.RecurringSaving,
  current: NatureOfDepositProduct.Current,
  saving: NatureOfDepositProduct.Saving,
  'term-saving': NatureOfDepositProduct.TermSavingOrFd,
};

const DEPOSIT_PRODUCT_LIST = [
  { label: 'Recurring Saving', link: '/coop/products/deposit/recurring-saving' },
  { label: 'Current', link: '/coop/products/deposit/current' },
  { label: 'Saving', link: '/coop/products/deposit/saving' },
  { label: 'Term Saving', link: '/coop/products/deposit/term-saving' },
];

const LOAN_PRODUCT_LIST = [
  { label: 'Agriculture Sector Loan', link: '/coop/products/loan/agriculture' },
  { label: 'Industrial Sector Loan', link: '/coop/products/loan/industrial' },
  { label: 'Other Sector Loan', link: '/coop/products/loan/other' },
];

const PRODUCTS: Record<string, { label: string; link: string }[]> = {
  LOAN: LOAN_PRODUCT_LIST,
  DEPOSIT: DEPOSIT_PRODUCT_LIST,
};

export const EbankingFeatureProducts = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      productType: 'LOAN',
    },
  });

  const productNature = router.asPath.split('/')[4];

  const productType = methods.watch('productType');
  const { data } = useGetDepositProductQuery({ nature: PRODUCTS_ENUM[productNature] });

  useEffect(() => {
    if (router.asPath.split('/')[4] === 'loan') {
      methods.reset({
        productType: 'LOAN',
      });
    } else if (router.asPath.split('/')[4] === 'saving') {
      methods.reset({
        productType: 'DEPOSIT',
      });
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products',
          },
        ]}
      />

      <InfoCard title="Products">
        <Box p="s16" display="flex" flexDir="column" gap="s20">
          <FormProvider {...methods}>
            <FormSwitchTab
              name="productType"
              label="Product Category"
              options={[
                { label: 'Loan Products', value: 'LOAN' },
                { label: 'Deposit Products', value: 'DEPOSIT' },
              ]}
            />
          </FormProvider>

          <Box display="flex" flexDir="column" gap="s4">
            <TextFields variant="formLabel" color="gray.700">
              Product List
            </TextFields>
            <Box display="flex" flexDir="column" gap="s16">
              {router.asPath.split('/')[4]
                ? data?.eBanking?.products?.depositProduct?.data?.map((product) => (
                    <ProductSelectCard
                      key={product?.id}
                      label={product?.productName as string}
                      link={`${router.asPath}/${product?.id}`}
                    />
                  ))
                : PRODUCTS[productType].map((product) => (
                    <ProductSelectCard key={product.label} {...product} />
                  ))}
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};

export default EbankingFeatureProducts;
