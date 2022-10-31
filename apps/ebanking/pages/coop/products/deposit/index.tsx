import { ReactElement } from 'react';

import { EbankingFeatureProducts } from '@coop/ebanking/products';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const ProductListPage = () => <EbankingFeatureProducts />;

ProductListPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ProductListPage;
