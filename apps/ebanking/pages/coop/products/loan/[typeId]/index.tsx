import { ReactElement } from 'react';

import { EbankingLoanSubType } from '@coop/ebanking/products';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <EbankingLoanSubType />;

ProductListPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ProductListPage;
