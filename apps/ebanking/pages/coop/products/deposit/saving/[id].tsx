import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import {
  useGetEbankingDepositProductCriteriaQuery,
  useGetEbankingDepositProductQuery,
} from '@coop/ebanking/data-access';
import { SavingDetails } from '@coop/ebanking/products';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { Loader } from '@coop/shared/ui';

const ProductListPage = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const { data, isFetching } = useGetEbankingDepositProductQuery({ id });
  const { data: criteriaData } = useGetEbankingDepositProductCriteriaQuery({ id });

  const product = data?.eBanking?.products?.getDepositProduct?.data;
  const criteria = criteriaData?.eBanking?.products?.getDepositProductCriteria?.data;

  if (isFetching) {
    return <Loader />;
  }
  return <SavingDetails product={product} criteria={criteria} />;
};

ProductListPage.getLayout = (page: ReactElement) => (
  <EbankingAccountLayout>{page}</EbankingAccountLayout>
);

export default ProductListPage;
