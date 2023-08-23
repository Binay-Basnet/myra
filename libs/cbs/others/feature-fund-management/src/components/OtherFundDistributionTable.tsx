import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useListLeafCoaHeadsQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

import { TableOverview, TableOverviewColumnType } from './TableOverview';
import { CustomFundManagementInput, OtherFundDistributionTableType } from '../lib/type';

export const OtherFundDistributionTable = () => {
  const { watch } = useFormContext<CustomFundManagementInput>();

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // const { data: previousYearData } = useGetPreviousYearFundManagementQuery();

  const netProfit = Number(watch('netProfit') ?? 0);

  const generalReserveFund = watch('generalReserveFund');

  const distributionTable = watch('distributionTable');

  const remainingProfit = useMemo(() => {
    if (!netProfit) {
      return 0;
    }

    let tempRemProfit = Number(netProfit);

    if (generalReserveFund) {
      tempRemProfit -= Number(generalReserveFund?.[0]?.thisYear);
    }

    if (distributionTable) {
      tempRemProfit -=
        Number(distributionTable?.[0]?.thisYear) + Number(distributionTable?.[1]?.thisYear);
    }

    return tempRemProfit;
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
      accessor: 'accountCode',
      header: 'Other Fund Distribution',
      fieldType: 'search',
      searchOptions: accountSearchOptions,
      searchLoading: isFetching,
      searchCallback: (newSearch) => {
        setSearchTerm(newSearch);
      },
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
      accessorFn: (row) => ((Number(row.percent) / 100) * remainingProfit).toFixed(2),
    },
    {
      accessor: 'lastYear',
      header: 'Last Year',
      isNumeric: true,
      // accessorFn: (row) =>
      //   previousYearData?.profitToFundManagement?.previousYear?.find(
      //     (account) => account?.accountCode === row.accountCode
      //   )?.amount ?? 0,
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
          otherFunds?.reduce((sum, fund) => (sum += Number(fund.thisYear)), 0).toFixed(2) ?? '',
        width: 'auto',
        isNumeric: true,
      },
      {
        label:
          // eslint-disable-next-line no-return-assign
          otherFunds?.reduce((sum, fund) => (sum += Number(fund.lastYear)), 0).toFixed(2) ?? '',
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
