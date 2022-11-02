import { useRouter } from 'next/router';

import {
  useGetEbankingLoanProductCriteriaQuery,
  useGetEbankingLoanProductQuery,
  useGetEbankingLoanProductSubTypeQuery,
  useGetEbankingLoanProductTypeListQuery,
} from '@coop/ebanking/data-access';
import { Box, DetailCardContent, DetailsCard, PathBar, Text } from '@coop/shared/ui';

import { ProductCriteria } from '../../components/deposit';

export const LoanDetails = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const { data } = useGetEbankingLoanProductQuery({ id });
  const { data: typeData } = useGetEbankingLoanProductTypeListQuery();
  const { data: subTypeData } = useGetEbankingLoanProductSubTypeQuery();
  const { data: criteriaData } = useGetEbankingLoanProductCriteriaQuery({ id });

  const product = data?.eBanking?.products?.getLoanProduct?.data;
  const criteria = criteriaData?.eBanking?.products?.getLoanProductCriteria?.data;

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          {
            label: 'Products',
            link: '/coop/products/loan',
          },
          {
            label: product?.productName ?? '',
            link: router.asPath,
          },
        ]}
      />

      <DetailsCard hideBorder hasTable title="About">
        <Text fontSize="r1" color="gray.900">
          {product?.description}
        </Text>
      </DetailsCard>

      <DetailsCard hideBorder title="General Information">
        <DetailCardContent title="Product Name" subtitle={product?.productName} />

        <DetailCardContent
          title="Product Type"
          subtitle={
            typeData?.eBanking?.products?.loanProductTypes?.find(
              (p) => p?.id === product?.productType
            )?.productType
          }
        />
        <DetailCardContent
          title="Product SubType"
          subtitle={
            subTypeData?.eBanking?.products?.loanProductSubTypes?.find(
              (p) => p?.id === product?.productSubType
            )?.productSubType
          }
        />
        <DetailCardContent title="Nature of Loan Product" subtitle={product?.productNature} />
      </DetailsCard>

      {criteria && <ProductCriteria criteria={criteria} />}
    </Box>
  );
};
