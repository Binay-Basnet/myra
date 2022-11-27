import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetPreviousYearFundManagementQuery } from '@coop/cbs/data-access';
import { Column } from '@coop/shared/editable-table';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

import { TableOverview } from './TableOverview';
import { CustomFundManagementInput, ParticularTableType } from '../lib/type';

export const ParticularTable = () => {
  const { watch, setValue } = useFormContext<CustomFundManagementInput>();

  const { data: previousYearData } = useGetPreviousYearFundManagementQuery();

  const netProfit = watch('netProfit');

  useEffect(() => {
    if (previousYearData) {
      const generalReserveFundAmount = previousYearData?.profitToFundManagement?.previousYear?.find(
        (fund) => fund?.accountCode === '20.1'
      )?.amount;

      setValue('generalReserveFund', [
        {
          particular: '20.1 General Reserve Fund',
          percent: 0,
          thisYear: 0,
          lastYear: Number(generalReserveFundAmount ?? 0),
        },
      ]);
    }
  }, [previousYearData]);

  const columns: Column<ParticularTableType>[] = [
    {
      accessor: 'particular',
      header: 'Particular',
    },
    {
      accessor: 'percent',
      header: 'Percent',
      isNumeric: true,
      fieldType: 'percentage',
    },
    {
      accessor: 'thisYear',
      header: 'This Year',
      isNumeric: true,
      accessorFn: (row) => ((Number(row.percent) / 100) * Number(netProfit)).toFixed(2),
    },
    {
      accessor: 'lastYear',
      header: 'Last Year',
      isNumeric: true,
      accessorFn: () =>
        previousYearData?.profitToFundManagement?.previousYear?.find(
          (account) => account?.accountCode === '20.1'
        )?.amount ?? 0,
    },
  ];

  const generalReserveFund = watch('generalReserveFund');

  const generalReserveFundSummary = useMemo(
    () => [
      { label: 'Net off Profit Balance', width: 'auto', isNumeric: false },
      { label: '', width: 'auto', isNumeric: false },
      {
        label:
          netProfit && generalReserveFund?.length
            ? amountConverter(
                (Number(netProfit ?? 0) - Number(generalReserveFund[0].thisYear)).toFixed(2)
              )
            : 0,
        width: 'auto',
        isNumeric: true,
      },
      {
        label: generalReserveFund?.length ? amountConverter(generalReserveFund[0].lastYear) : 0,
        width: 'auto',
        isNumeric: true,
      },
    ],
    [generalReserveFund, netProfit]
  );

  return (
    <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
      <FormEditableTable<ParticularTableType>
        name="generalReserveFund"
        columns={columns}
        canAddRow={false}
        canDeleteRow={false}
        hideSN
      />

      <TableOverview columns={generalReserveFundSummary} />
    </GridItem>
  );
};
