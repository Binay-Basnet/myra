import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { FundManagementTable } from './FundManagementTable';
import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { useFundManagement } from '../hooks';

export const DistributionTable = () => {
  const { remainingProfitAfterReserve, remainingProfitAfterDistribution } = useFundManagement({});

  const distributionTableSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Net off Profit Balance', width: 'auto', isNumeric: false },
      { label: '', width: 'auto', isNumeric: false },
      {
        label: amountConverter(remainingProfitAfterDistribution),
        width: 'auto',
        isNumeric: true,
      },
    ],
    [remainingProfitAfterDistribution]
  );

  return (
    <FormSection header="Patronage Refund/Cooperative Promotion Fund">
      <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
        <FundManagementTable
          name="distributionTable"
          remainingProfit={remainingProfitAfterReserve}
        />
        {/* <FormEditableTable<DistributionTableType>
          name="distributionTable"
          columns={columns}
          hideSN
        /> */}

        <TableOverview columns={distributionTableSummary} />
      </GridItem>
    </FormSection>
  );
};
