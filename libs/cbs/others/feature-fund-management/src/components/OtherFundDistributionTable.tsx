import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { FundManagementTable } from './FundManagementTable';
import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { useFundManagement } from '../hooks';

export const OtherFundDistributionTable = () => {
  const {
    remainingProfitAfterDistribution,
    remainingProfitAfterOther,
    otherFundsPercentTotal,
    otherFundsTotal,
  } = useFundManagement({});

  const otherFundsSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Total', width: 'auto', isNumeric: true },
      {
        label: otherFundsPercentTotal,
        width: 'auto',
        isNumeric: true,
      },
      {
        label: amountConverter(otherFundsTotal),
        width: 'auto',
        isNumeric: true,
      },
      {
        label: amountConverter(remainingProfitAfterOther),
        width: 'auto',
        isNumeric: true,
      },
    ],
    [otherFundsPercentTotal, otherFundsTotal, remainingProfitAfterOther]
  );

  return (
    <FormSection header="Other Funds">
      <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
        <FundManagementTable name="otherFunds" remainingProfit={remainingProfitAfterDistribution} />

        <TableOverview columns={otherFundsSummary} />
      </GridItem>
    </FormSection>
  );
};
