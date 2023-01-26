import { useMemo } from 'react';

import { Loader } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

import { CoaView, useGetCoaFullViewQuery } from '@coop/cbs/data-access';

import { CoaTreeTable } from './CoaTreeTable';

const COA_CLASS = [
  {
    label: '1. Equity and Liabilities',
    value: 'EQUITY_AND_LIABILITIES',
  },
  {
    label: '2. Assets',
    value: 'ASSETS',
  },
  {
    label: '3. Expenditure',
    value: 'EXPENDITURE',
  },
  {
    label: '4. Income',
    value: 'INCOME',
  },
  {
    label: '5. Off Balance Sheet',
    value: 'OFF_BALANCE_SHEET',
  },
];

export const CoaTreeTableView = () => {
  const { data: fullView, isFetching, isInitialLoading } = useGetCoaFullViewQuery();

  const coaViews = useMemo(
    () =>
      COA_CLASS.map((coaCLass) => ({
        label: coaCLass.label,
        value: fullView?.settings?.chartsOfAccount?.fullView.data?.filter(
          (account) => account?.accountClass === coaCLass.value
        ) as CoaView[],
      })),

    [isFetching]
  );

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <Box p="s16" display="flex" flexDir="column" gap="s16">
      {coaViews.map((coaView) =>
        coaView.value ? <CoaTreeTable data={coaView.value} type={coaView.label} /> : null
      )}
    </Box>
  );
};
