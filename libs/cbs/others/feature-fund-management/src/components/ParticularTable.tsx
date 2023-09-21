import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { FundManagementTable } from './FundManagementTable';
import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { useFundManagement } from '../hooks';

export const ParticularTable = () => {
  const { remainingProfitAfterTax, remainingProfitAfterReserve } = useFundManagement({});

  const generalReserveFundSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Net off Profit Balance', width: 'auto', isNumeric: false },
      { label: '', width: 'auto', isNumeric: false },
      {
        label: amountConverter(remainingProfitAfterReserve),
        width: 'auto',
        isNumeric: true,
      },
    ],
    [remainingProfitAfterReserve]
  );

  return (
    <FormSection header="General Reserve Fund">
      <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
        <FundManagementTable name="generalReserveFund" remainingProfit={remainingProfitAfterTax} />

        <TableOverview columns={generalReserveFundSummary} />
      </GridItem>
    </FormSection>
  );
};
