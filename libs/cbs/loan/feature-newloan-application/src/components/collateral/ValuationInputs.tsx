import { LoanProduct } from '@coop/cbs/data-access';

import { ValuationAmount } from './ValuationAmount';
import { ValuationMethods } from './ValuationMethods';
import { ValuationRange } from './ValuationRange';
import { ValuationStats } from './ValuationStats';

interface LandCollateralProps {
  product?: LoanProduct;
}

export const ValuationInputs = ({ product }: LandCollateralProps) => (
  <>
    <ValuationAmount />
    <ValuationRange product={product} />
    <ValuationMethods />
    <ValuationStats />
  </>
);
