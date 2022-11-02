import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import { useGetEbankingLoanProductsQuery } from '@coop/ebanking/data-access';
import { Box, PathBar, SwitchTabs, TextFields } from '@coop/shared/ui';

import { ProductSelectCard } from '../components/ProductSelectCard';

export const EbankingLoanProductList = () => {
  const router = useRouter();

  const productId = router.query['subTypeId'] as string;

  const { data } = useGetEbankingLoanProductsQuery(
    { id: String(productId) },
    {
      enabled: !!productId,
    }
  );

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products/loan',
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
              {data?.eBanking?.products?.loanProductList?.data?.map((type) => (
                <ProductSelectCard
                  label={type?.productName as string}
                  link={`${router.asPath}/${type?.id}`}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};
