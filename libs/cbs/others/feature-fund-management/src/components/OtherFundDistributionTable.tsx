import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useListLeafCoaHeadsQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, OtherFundDistributionTableType } from '../lib/type';

export const OtherFundDistributionTable = () => {
  const router = useRouter();

  const { watch } = useFormContext<CustomFundManagementInput>();

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const netProfit = Number(watch('netProfit') ?? 0);

  const generalReserveFund = watch('generalReserveFund');

  const distributionTable = watch('distributionTable');

  const remainingProfit = useMemo(() => {
    if (!netProfit) {
      return 0;
    }

    let tempRemProfit = Number(netProfit);

    if (generalReserveFund) {
      generalReserveFund?.forEach((row) => {
        tempRemProfit -= Number(row?.amount || 0);
      });
    }

    if (distributionTable) {
      distributionTable?.forEach((row) => {
        tempRemProfit -= Number(row?.amount || 0);
      });
    }

    return Number(tempRemProfit.toFixed(2));
  }, [netProfit, generalReserveFund, distributionTable]);

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

  const columns: Column<OtherFundDistributionTableType>[] = [
    {
      accessor: 'coaHead',
      header: 'Other Fund Distribution',
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

  const otherFunds = watch('otherFunds');

  const otherFundsSummary: TableOverviewColumnType[] = useMemo(
    () => [
      { label: 'Total', width: 'auto', isNumeric: true },
      {
        // eslint-disable-next-line no-return-assign
        label: otherFunds?.reduce((sum, fund) => (sum += Number(fund.percent)), 0).toFixed(2) ?? '',
        width: 'auto',
        isNumeric: true,
      },
      {
        label:
          // eslint-disable-next-line no-return-assign
          otherFunds?.reduce((sum, fund) => (sum += Number(fund.amount)), 0).toFixed(2) ?? '',
        width: 'auto',
        isNumeric: true,
      },
      {
        label:
          // eslint-disable-next-line no-return-assign
          otherFunds?.reduce((sum, fund) => (sum += Number(fund.amount)), 0).toFixed(2) ?? '',
        width: 'auto',
        isNumeric: true,
      },
    ],
    [otherFunds]
  );

  return (
    <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
      <FormEditableTable<OtherFundDistributionTableType>
        name="otherFunds"
        columns={columns}
        hideSN
      />
      <TableOverview columns={otherFundsSummary} />
    </GridItem>
  );
};
