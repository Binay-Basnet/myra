import { ReactElement } from 'react';

import { EbankingDepositProductList } from '@coop/ebanking/products';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <EbankingDepositProductList />;

ProductListPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ProductListPage;
