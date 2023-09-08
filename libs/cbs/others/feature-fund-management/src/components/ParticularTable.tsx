import { useMemo } from 'react';
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
  const { watch, getValues, setValue } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  const netProfit = watch('netProfit');

  const columns: Column<ParticularTableType>[] = [
    {
      accessor: 'particular',
      header: 'Particular',
      getDisabled: () => router?.asPath?.includes('/view'),
    },
    {
      accessor: 'percent',
      header: 'Percent(%)',
      isNumeric: true,
      fieldType: 'percentage',
      getDisabled: () => router?.asPath?.includes('/view'),
    },
    {
      accessor: 'thisYear',
      header: 'This Year',
      isNumeric: true,
      accessorFn: (row) => ((Number(row.percent) / 100) * Number(netProfit) || 0).toFixed(2),
    },
    {
      accessor: 'lastYear',
      header: 'Last Year',
      isNumeric: true,
    },
  ];

  const generalReserveFund = watch('generalReserveFund');

  useDeepCompareEffect(() => {
    if (generalReserveFund) {
      const values = getValues();

      const generalReserveFundAmount = Number(generalReserveFund[0]?.thisYear);

      const remainingProfit =
        netProfit && generalReserveFund ? netProfit - generalReserveFundAmount : 0;

      const patronageRefundFundPercent = Number(values?.distributionTable?.[0]?.percent || 0);

      const patronageRefundFund = Number(
        ((patronageRefundFundPercent / 100) * remainingProfit).toFixed(2)
      );

      const cooperativePromotionFundPercent = Number(values?.distributionTable?.[0]?.percent || 0);

      const cooperativePromotionFund = Number(
        ((cooperativePromotionFundPercent / 100) * remainingProfit).toFixed(2)
      );

      setValue('distributionTable', [
        {
          distribution: '20.2 Patronage Refund Fund',
          percent: patronageRefundFundPercent,
          thisYear: patronageRefundFund,
          lastYear: 0,
        },
        {
          distribution: '20.3 Cooperative Promotion Fund',
          percent: cooperativePromotionFundPercent,
          thisYear: cooperativePromotionFund,
          lastYear: 0,
        },
      ]);
    }
  }, [generalReserveFund]);

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
