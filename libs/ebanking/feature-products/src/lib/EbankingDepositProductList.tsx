import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import {
  NatureOfDepositProduct,
  useGetEbankingDepositProductsQuery,
} from '@coop/ebanking/data-access';
import { Box, PathBar, SwitchTabs, TextFields } from '@myra-ui';

import { ProductSelectCard } from '../components/ProductSelectCard';

const PRODUCTS_ENUM: Record<string, NatureOfDepositProduct> = {
  'recurring-saving': NatureOfDepositProduct.RecurringSaving,
  current: NatureOfDepositProduct.Current,
  saving: NatureOfDepositProduct.Saving,
  'term-saving': NatureOfDepositProduct.TermSavingOrFd,
};

export const EbankingDepositProductList = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      productType: 'DEPOSIT',
    },
  });

  const productNature = router.asPath.split('/')[4];

  const { data } = useGetEbankingDepositProductsQuery({ filter: PRODUCTS_ENUM[productNature] });

  useEffect(() => {
    methods.reset({
      productType: 'DEPOSIT',
    });
  }, [methods]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products/deposit',
          },
        ]}
      />

      <InfoCard title="Products">
        <Box p="s16" display="flex" flexDir="column" gap="s20">
          <SwitchTabs
            value={router.asPath.split('/')[3] === 'deposit' ? 'DEPOSIT' : 'LOAN'}
            onChange={(nextValue) => {
              router.push(`/coop/products/${nextValue.toLowerCase()}`);
            }}
            name="productType"
            label="Product Category"
            options={[
              { label: 'Loan Products', value: 'LOAN' },
              { label: 'Deposit Products', value: 'DEPOSIT' },
            ]}
          />

          <Box display="flex" flexDir="column" gap="s4">
            <TextFields variant="formLabel" color="gray.700">
              Product List
            </TextFields>

            <Box display="flex" flexDir="column" gap="s16">
              {data?.eBanking?.products?.depositProductList?.data?.map((product) => (
                <ProductSelectCard
                  key={product?.id}
                  label={product?.productName as string}
                  link={`${router.asPath}/${product?.id}`}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};
