import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useListLeafCoaHeadsQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, DistributionTableType } from '../lib/type';

export const DistributionTable = () => {
  const { watch, setValue, getValues } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  const netProfit = watch('netProfit');

  const generalReserveFund = watch('generalReserveFund');

  const remainingProfit =
    netProfit && generalReserveFund
      ? Number((Number(netProfit ?? 0) - Number(generalReserveFund?.[0]?.amount)).toFixed(2))
      : 0;

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { data: leafCoaHeadsListData, isFetching } = useListLeafCoaHeadsQuery({
    pagination: {
      ...getPaginationQuery(),
      // first: -1,
      order: {
        arrange: 'ASC',
        column: 'accountCode',
      },
    },
    filter: {
      query: searchTerm,
    },
  });

  const leafCoaHeadsList = leafCoaHeadsListData?.settings?.chartsOfAccount?.listLeafCoaHeads?.edges;

  const accountSearchOptions = useMemo(
    () =>
      leafCoaHeadsList?.map((head) => ({
        label: `${head?.node?.accountCode} - ${head?.node?.Name}`,
        value: head?.node?.accountCode as string,
      })),
    [leafCoaHeadsList]
  );

  const columns: Column<DistributionTableType>[] = [
    {
      accessor: 'coaHead',
      header: 'COA Head',
      fieldType: 'search',
      searchOptions: accountSearchOptions,
      searchLoading: isFetching,
      searchCallback: (newSearch) => {
        setSearchTerm(newSearch);
      },
      getDisabled: () => router?.asPath?.includes('/view'),
    },
    {
      accessor: 'percent',
      header: 'Percent(%)',
      isNumeric: true,
      getDisabled: () => router?.asPath?.includes('/view'),
    },
    {
      accessor: 'amount',
      header: 'Amount',
      isNumeric: true,
      accessorFn: (row) => ((Number(row.percent) / 100) * remainingProfit).toFixed(2),
      getDisabled: () => router?.asPath?.includes('/view'),
    },
  ];

  const distributionTable = watch('distributionTable');

  const profitAfterDistribution = useMemo(() => {
    if (!remainingProfit) {
      return 0;
    }

    let tempRemProfit = Number(remainingProfit);

    if (distributionTable) {
      distributionTable?.forEach((row) => {
        tempRemProfit -= Number(row?.amount || 0);
      });
    }

    return Number(tempRemProfit.toFixed(2));
  }, [remainingProfit, distributionTable]);

  useDeepCompareEffect(() => {
    const values = getValues();

    setValue(
      'otherFunds',
      values?.otherFunds?.map((other) => ({
        coaHead: other?.coaHead,
        percent: other?.percent as number,
        amount: ((Number(other?.percent || 0) / 100) * profitAfterDistribution).toFixed(2),
      }))
    );
  }, [distributionTable]);

  const distributionTableTotal =
    distributionTable?.reduce(
      (accumulator: number, curr) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const distributionTableSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Net off Profit Balance', width: 'auto', isNumeric: false },
      { label: '', width: 'auto', isNumeric: false },
      {
        label:
          remainingProfit && distributionTable?.length
            ? amountConverter((remainingProfit - distributionTableTotal).toFixed(2))
            : 0,
        width: 'auto',
        isNumeric: true,
      },
      // {
      //   label: distributionTable?.length
      //     ? amountConverter(
      //         (
      //           Number(distributionTable[0].lastYear) + Number(distributionTable[1].lastYear)
      //         ).toFixed(2)
      //       )
      //     : 0,
      //   width: 'auto',
      //   isNumeric: true,
      // },
    ],
    [distributionTable, remainingProfit]
  );

  return (
    <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
      <FormEditableTable<DistributionTableType> name="distributionTable" columns={columns} hideSN />

      <TableOverview columns={distributionTableSummary} />
    </GridItem>
  );
};
