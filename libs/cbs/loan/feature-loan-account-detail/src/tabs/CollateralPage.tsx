import { DetailsCard } from '@myra-ui';

import { Statistics, TabHeader } from '../component';
import { CollateralList } from '../component/CollateralList';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const CollateralPage = () => {
  const { collateralSummary, collatListInfo } = useLoanAccountDetailHooks();

  return (
    <>
      <TabHeader heading="Collateral" />
      <Statistics statsData={collateralSummary} />
      <DetailsCard title={`Collateral List ${collatListInfo?.length} `} bg="white" hasTable>
        {collatListInfo && collatListInfo?.map((item) => <CollateralList collatDataList={item} />)}
      </DetailsCard>
    </>
  );
};
