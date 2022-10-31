import { ReactElement } from 'react';

import { EbankingLoanProductList } from '@coop/ebanking/products';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <EbankingLoanProductList />;

ProductListPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ProductListPage;
