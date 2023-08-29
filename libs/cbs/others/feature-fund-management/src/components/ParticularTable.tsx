import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { FormEditableTable } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, ParticularTableType } from '../lib/type';

export const ParticularTable = () => {
  const { watch, setValue } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  // const { data: previousYearData } = useGetPreviousYearFundManagementQuery();

  // const { data } = useGetCurrentFundAmountQuery();

  const netProfit = watch('netProfit');

  useEffect(() => {
    // if (previousYearData) {
    //   const generalReserveFundAmount = previousYearData?.profitToFundManagement?.previousYear?.find(
    //     (fund) => fund?.accountCode === '20.1'
    //   )?.amount;
    if (!router?.asPath?.includes('/edit')) {
      setValue('generalReserveFund', [
        {
          particular: '20.1 General Reserve Fund',
          percent: 0,
          thisYear: 0,
          // lastYear: Number(generalReserveFundAmount ?? 0),
          lastYear: 0,
        },
      ]);
    }
    // }
  }, [router?.asPath]);

  const columns: Column<ParticularTableType>[] = useMemo(
    () => [
      {
        accessor: 'particular',
        header: 'Particular',
        getDisabled: () => router?.asPath?.includes('/view'),
      },
      {
        accessor: 'percent',
        header: 'Percent(%)',
        isNumeric: true,
        // fieldType: 'percentage',
        getDisabled: () => router?.asPath?.includes('/view'),
      },
      {
        accessor: 'thisYear',
        header: 'This Year',
        isNumeric: true,
        getDisabled: () => true,
        // accessorFn: (row) => ((Number(row.percent) / 100) * Number(netProfit) || 0).toFixed(2),
      },
      {
        accessor: 'lastYear',
        header: 'Last Year',
        isNumeric: true,
        // accessorFn: () =>
        //   previousYearData?.profitToFundManagement?.previousYear?.find(
        //     (account) => account?.accountCode === '20.1'
        //   )?.amount ?? 0,
      },
    ],
    [netProfit]
  );

  const generalReserveFund = watch('generalReserveFund');

  useDeepCompareEffect(() => {
    if (generalReserveFund?.length) {
      setValue(
        'generalReserveFund',
        generalReserveFund?.map((fund) => ({
          particular: fund?.particular,
          percent: fund?.percent,
          thisYear: Number(((Number(fund?.percent) / 100) * Number(netProfit) || 0).toFixed(2)),
          lastYear: 0,
        }))
      );
    }
  }, [generalReserveFund, netProfit]);

  const generalReserveFundSummary: TableOverviewColumnType[] = useMemo(
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
