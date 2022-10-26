import { ReactElement } from 'react';

import { LoanDetails } from '@coop/ebanking/products';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <LoanDetails />;

ProductListPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ProductListPage;
