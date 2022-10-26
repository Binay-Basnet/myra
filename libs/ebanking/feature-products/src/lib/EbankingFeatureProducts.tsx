import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import { useGetEbankingLoanProductTypeListQuery } from '@coop/ebanking/data-access';
import { Box, PathBar, SwitchTabs, TextFields } from '@coop/shared/ui';

import { ProductSelectCard } from '../components/ProductSelectCard';

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

  const productType = methods.watch('productType');
  const { data: loanProductTypeData } = useGetEbankingLoanProductTypeListQuery();

  useEffect(() => {
    if (router.asPath.split('/')[3] === 'loan') {
      methods.reset({
        productType: 'LOAN',
      });
    } else if (router.asPath.split('/')[3] === 'deposit') {
      methods.reset({
        productType: 'DEPOSIT',
      });
    }
  }, [methods, router]);

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
              {(() => {
                if (router.asPath.split('/')[3] === 'loan') {
                  return loanProductTypeData?.eBanking?.products?.loanProductTypes?.map((type) => (
                    <Fragment key={type?.id}>
                      <ProductSelectCard
                        label={type?.productType as string}
                        link={`${router.asPath}/${type?.id}`}
                      />
                    </Fragment>
                  ));
                }
                return PRODUCTS[productType].map((product) => (
                  <Fragment key={product?.label}>
                    <ProductSelectCard key={product.label} {...product} />
                  </Fragment>
                ));
              })()}
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};

export default EbankingFeatureProducts;
