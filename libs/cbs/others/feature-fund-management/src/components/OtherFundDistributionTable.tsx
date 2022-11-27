import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  useGetCoaAccountsUnderListQuery,
  useGetPreviousYearFundManagementQuery,
} from '@coop/cbs/data-access';
import { Column } from '@coop/shared/editable-table';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@myra-ui';

import { TableOverview } from './TableOverview';
import { CustomFundManagementInput, OtherFundDistributionTableType } from '../lib/type';

export const OtherFundDistributionTable = () => {
  const { watch } = useFormContext<CustomFundManagementInput>();

  const { data: previousYearData } = useGetPreviousYearFundManagementQuery();

  const { data: coaListQueryData } = useGetCoaAccountsUnderListQuery({
    accountCode: ['20.4'],
  });

  const coaSearchOptions = useMemo(
    () =>
      coaListQueryData?.settings?.chartsOfAccount?.accountsUnder?.data?.map((account) => ({
        label: `${account?.accountCode} ${account?.name?.local}`,
        value: account?.accountCode as string,
      })) ?? [],
    [coaListQueryData]
  );

  const netProfit = Number(watch('netProfit') ?? 0);

  const generalReserveFund = watch('generalReserveFund');

  const distributionTable = watch('distributionTable');

  const remainingProfit = useMemo(() => {
    if (!netProfit) {
      return 0;
    }

    let tempRemProfit = Number(netProfit);

    if (generalReserveFund) {
      tempRemProfit -= Number(generalReserveFund[0].thisYear);
    }

    if (distributionTable) {
      tempRemProfit -=
        Number(distributionTable[0].thisYear) + Number(distributionTable[1].thisYear);
    }

    return tempRemProfit;
  }, [netProfit, generalReserveFund, distributionTable]);

  const columns: Column<OtherFundDistributionTableType>[] = [
    {
      accessor: 'accountCode',
      header: 'Other Fund Distribution',
      fieldType: 'search',
      searchOptions: coaSearchOptions,
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
      accessorFn: (row) =>
        previousYearData?.profitToFundManagement?.previousYear?.find(
          (account) => account?.accountCode === row.accountCode
        )?.amount ?? 0,
    },
  ];

  const otherFunds = watch('otherFunds');

  const otherFundsSummary = useMemo(
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
