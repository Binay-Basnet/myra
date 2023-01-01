import { DetailsCard } from '@myra-ui';

import { GuaranteeList, Statistics, TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const GuaranteePage = () => {
  const { guaranteeSummary, gauranteeListInfo } = useLoanAccountDetailHooks();

  return (
    <>
      <TabHeader heading="Guarantee" />
      <Statistics statsData={guaranteeSummary} />
      <DetailsCard title={`Guarantee List ${gauranteeListInfo?.length} `} bg="white" hasTable>
        {gauranteeListInfo &&
          gauranteeListInfo?.map((item) => <GuaranteeList gauranteeList={item} />)}
      </DetailsCard>
    </>
  );
};
