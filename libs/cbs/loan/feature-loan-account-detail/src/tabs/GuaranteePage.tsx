import { amountConverter } from '@coop/shared/utils';

import { GuaranteeList, Statistics, TabHeader } from '../component';

export const GuaranteePage = () => {
  const guaranteeSummary = [
    {
      title: 'No of Guarantee',
      value: amountConverter(112 ?? 0),
    },
    {
      title: 'Total Guarantee Value',
      value: amountConverter(322 ?? 0),
    },
    {
      title: 'Total Guarantee Release',
      value: amountConverter(23 ?? 0),
    },
  ];

  return (
    <>
      <TabHeader heading="Guarantee" />
      <Statistics statsData={guaranteeSummary} />
      <GuaranteeList />
    </>
  );
};
