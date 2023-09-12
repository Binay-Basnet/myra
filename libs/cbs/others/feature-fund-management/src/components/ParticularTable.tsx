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
import { CustomFundManagementInput, ParticularTableType } from '../lib/type';

export const ParticularTable = () => {
  const { watch, getValues, setValue } = useFormContext<CustomFundManagementInput>();

  const router = useRouter();

  const netProfit = Number(watch('netProfit') || 0);

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

  const columns: Column<ParticularTableType>[] = [
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
      accessorFn: (row) => ((Number(row.percent) / 100) * Number(netProfit) || 0).toFixed(2),
      getDisabled: () => router?.asPath?.includes('/view'),
    },
  ];

  const generalReserveFund = watch('generalReserveFund');

  useDeepCompareEffect(() => {
    if (generalReserveFund) {
      const generalReserveFundAmount = Number(generalReserveFund[0]?.amount);

      const remainingProfit =
        netProfit && generalReserveFund ? netProfit - generalReserveFundAmount : 0;

      const distributionTableData = getValues()?.distributionTable;

      setValue(
        'distributionTable',
        distributionTableData?.map((row) => ({
          coaHead: row?.coaHead,
          percent: row?.percent,
          amount: ((Number(row?.percent || 0) / 100) * remainingProfit).toFixed(2),
        }))
      );
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
                (Number(netProfit ?? 0) - Number(generalReserveFund[0].amount)).toFixed(2)
              )
            : 0,
        width: 'auto',
        isNumeric: true,
      },
      // {
      //   label: generalReserveFund?.length ? amountConverter(generalReserveFund[0].lastYear) : 0,
      //   width: 'auto',
      //   isNumeric: true,
      // },
    ],
    [generalReserveFund, netProfit]
  );

  return (
    <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
      <FormEditableTable<ParticularTableType> name="generalReserveFund" columns={columns} hideSN />

      <TableOverview columns={generalReserveFundSummary} />
    </GridItem>
  );
};
