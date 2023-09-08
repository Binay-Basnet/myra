import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { FormEditableTable } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, DistributionTableType } from '../lib/type';

export const DistributionTable = () => {
  const { watch, setValue } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  // const { data: previousYearData } = useGetPreviousYearFundManagementQuery();

  useEffect(() => {
    // if (previousYearData) {
    // const patronageRefundFundAmount =
    //   previousYearData?.profitToFundManagement?.previousYear?.find(
    //     (fund) => fund?.accountCode === '20.2'
    //   )?.amount;

    // const cooperativePromotionFundAmount =
    //   previousYearData?.profitToFundManagement?.previousYear?.find(
    //     (fund) => fund?.accountCode === '20.3'
    //   )?.amount;

    if (!router?.asPath?.includes('/edit')) {
      setValue('distributionTable', [
        {
          distribution: '20.2 Patronage Refund Fund',
          percent: 0,
          thisYear: 0,
          // lastYear: Number(patronageRefundFundAmount ?? 0),
          lastYear: 0,
        },
        {
          distribution: '20.3 Cooperative Promotion Fund',
          percent: 0,
          thisYear: 0,
          // lastYear: Number(cooperativePromotionFundAmount ?? 0),
          lastYear: 0,
        },
      ]);
    }
    // }
  }, [router?.asPath]);

  const netProfit = watch('netProfit');

  const generalReserveFund = watch('generalReserveFund');

  const remainingProfit =
    netProfit && generalReserveFund
      ? Number(netProfit ?? 0) - Number(generalReserveFund?.[0]?.thisYear)
      : 0;

  const columns: Column<DistributionTableType>[] = [
    {
      accessor: 'distribution',
      header: 'Distribution',
      getDisabled: () => router?.asPath?.includes('/view'),
    },
    {
      accessor: 'percent',
      header: 'Percent(%)',
      isNumeric: true,
      getDisabled: () => router?.asPath?.includes('/view'),
      // fieldType: 'percentage',
    },
    {
      accessor: 'thisYear',
      header: 'This Year',
      isNumeric: true,
      // getDisabled: () => true,
      accessorFn: (row) => ((Number(row.percent) / 100) * remainingProfit).toFixed(2),
      // cell: (props) => ((Number(props.percent) / 100) * remainingProfit).toFixed(2),
    },
    {
      accessor: 'lastYear',
      header: 'Last Year',
      isNumeric: true,
      // accessorFn: (row) =>
      //   previousYearData?.profitToFundManagement?.previousYear?.find(
      //     (account) => account?.accountCode === row.distribution?.split(' ')[0]
      //   )?.amount ?? 0,
    },
  ];

  const distributionTable = watch('distributionTable');

  // useDeepCompareEffect(() => {
  //   if (distributionTable?.length) {
  //     setValue(
  //       'distributionTable',
  //       distributionTable?.map((fund) => ({
  //         distribution: fund?.distribution,
  //         percent: fund?.percent,
  //         thisYear: Number(((Number(fund?.percent) / 100) * remainingProfit || 0).toFixed(2)),
  //         lastYear: 0,
  //       }))
  //     );
  //   }
  // }, [distributionTable, remainingProfit]);

  const distributionTableSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Net off Profit Balance', width: 'auto', isNumeric: false },
      { label: '', width: 'auto', isNumeric: false },
      {
        label:
          remainingProfit && distributionTable?.length
            ? amountConverter(
                (
                  remainingProfit -
                  Number(distributionTable[0].thisYear) -
                  Number(distributionTable[1].thisYear)
                ).toFixed(2)
              )
            : 0,
        width: 'auto',
        isNumeric: true,
      },
      {
        label: distributionTable?.length
          ? amountConverter(
              (
                Number(distributionTable[0].lastYear) + Number(distributionTable[1].lastYear)
              ).toFixed(2)
            )
          : 0,
        width: 'auto',
        isNumeric: true,
      },
    ],
    [distributionTable, remainingProfit]
  );

  return (
    <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
      <FormEditableTable<DistributionTableType>
        name="distributionTable"
        columns={columns}
        canAddRow={false}
        canDeleteRow={false}
        hideSN
      />

      <TableOverview columns={distributionTableSummary} />
    </GridItem>
  );
};
