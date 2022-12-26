import { amountConverter } from '@coop/shared/utils';

import { Statistics, TabHeader } from '../component';
import { CollateralList } from '../component/CollateralList';

export const CollateralPage = () => {
  const collateralSummary = [
    {
      title: 'No of Guarantee',
      value: amountConverter(112 ?? 0),
    },
    {
      title: 'Total Collateral Value',
      value: amountConverter(322 ?? 0),
    },
    {
      title: 'Total Collateral Release',
      value: amountConverter(23 ?? 0),
    },
  ];

  return (
    <>
      <TabHeader heading="Collateral" />
      <Statistics statsData={collateralSummary} />
      <CollateralList />
    </>
  );
};
