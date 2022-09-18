import { ValuationAmount } from './ValuationAmount';
import { ValuationMethods } from './ValuationMethods';
import { ValuationRange } from './ValuationRange';
import { ValuationStats } from './ValuationStats';

export const ValuationInputs = () => (
  <>
    <ValuationAmount />
    <ValuationRange />
    <ValuationMethods />
    <ValuationStats />
  </>
);
