import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { FormEditableTable } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, DistributionTableType } from '../lib/type';

export const DistributionTable = () => {
  const { watch, setValue, getValues } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  const netProfit = watch('netProfit');

  const generalReserveFund = watch('generalReserveFund');

  const remainingProfit =
    netProfit && generalReserveFund
      ? Number((Number(netProfit ?? 0) - Number(generalReserveFund?.[0]?.thisYear)).toFixed(2))
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
    },
    {
      accessor: 'thisYear',
      header: 'This Year',
      isNumeric: true,
      accessorFn: (row) => ((Number(row.percent) / 100) * remainingProfit).toFixed(2),
    },
    {
      accessor: 'lastYear',
      header: 'Last Year',
      isNumeric: true,
    },
  ];

  const distributionTable = watch('distributionTable');

  const profitAfterDistribution = useMemo(() => {
    if (!remainingProfit) {
      return 0;
    }

    let tempRemProfit = Number(remainingProfit);

    if (distributionTable) {
      tempRemProfit -=
        Number(distributionTable?.[0]?.thisYear) + Number(distributionTable?.[1]?.thisYear);
    }

    return Number(tempRemProfit.toFixed(2));
  }, [remainingProfit, distributionTable]);

  useDeepCompareEffect(() => {
    const values = getValues();

    setValue(
      'otherFunds',
      values?.otherFunds?.map((other) => ({
        accountCode: other?.accountCode,
        percent: other?.percent as number,
        thisYear: Number(
          ((Number(other?.percent || 0) / 100) * profitAfterDistribution).toFixed(2)
        ),
        lastYear: 0,
      }))
    );
  }, [distributionTable]);

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
