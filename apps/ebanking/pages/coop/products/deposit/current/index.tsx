import { ReactElement } from 'react';

import { EbankingDepositProductList } from '@coop/ebanking/products';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <EbankingDepositProductList />;

ProductListPage.getLayout = (page: ReactElement) => (
  <EbankingAccountLayout>{page}</EbankingAccountLayout>
);

export default ProductListPage;
