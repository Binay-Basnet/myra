import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';

import { useAccountDetails, useGetAccountTransactionListsQuery } from '@coop/cbs/data-access';
import { Box, DetailsCard, Text } from '@myra-ui';
import { amountConverter, getRouterQuery } from '@coop/shared/utils';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const BalanceChart = () => {
  const { accountDetails } = useAccountDetails();

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: {
        accountIds: [accountDetails?.accountId as string],
        date: {
          from: {
            en: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
            np: '',
            local: '',
          },
          to: { en: format(new Date(), 'yyyy-MM-dd'), np: '', local: '' },
        },
      },
      pagination: { ...getRouterQuery({ type: ['PAGINATION'] }), first: -1, after: '' },
    },
    {
      enabled: !!accountDetails?.accountId,
    }
  );

  const dataForGraph = useMemo(
    () =>
      (transactionListQueryData?.account?.listTransactions?.edges?.map((transaction) => [
        new Date(transaction?.node?.date?.en as string).getTime(),
        Number(transaction?.node?.currentBalance),
      ]) as [number, number][]) ?? [],
    [transactionListQueryData]
  );

  const transactionSummary = useMemo(
    () => [
      {
        label: 'Total Deposits',
        value: amountConverter(
          transactionListQueryData?.account?.listTransactions?.summary?.totalDeposit ?? 0
        ),
      },
      {
        label: 'Total Withdraw',
        value: amountConverter(
          transactionListQueryData?.account?.listTransactions?.summary?.totalWithdraw ?? 0
        ),
      },
      {
        label: 'Average Balance',
        value: amountConverter(
          transactionListQueryData?.account?.listTransactions?.summary?.averageBalance ?? 0
        ),
      },
    ],
    [transactionListQueryData]
  );

  return (
    <DetailsCard
      title="Balance History"
      hasTable
      leftBtn={
        <Text fontSize="s3" fontWeight={400} color="neutralLightColor.Gray-60">
          Last 30 days
        </Text>
      }
    >
      <Box display="flex" gap="80px">
        {transactionSummary.map((summary) => (
          <Box display="flex" flexDirection="column">
            <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
              {summary.label}
            </Text>
            <Text fontSize="r2" fontWeight={700} color="#333333">
              {summary.value}
            </Text>
          </Box>
        ))}
      </Box>
      <Charts
        series={[
          {
            name: 'Balance',
            data: dataForGraph,
          },
        ]}
        type="area"
        height="400px"
        w="100%"
        options={{
          xaxis: {
            type: 'datetime',
          },
          colors: ['#82CA9D'],
          fill: {
            type: 'gradient',
          },
          legend: {
            show: true,
            horizontalAlign: 'right',
            position: 'bottom',

            showForSingleSeries: true,
          },
          // fill: {
          //   colors: ['#82CA9D'],
          // },
          dataLabels: {
            enabled: false,
          },
          grid: {
            borderColor: '#cccccc',
            strokeDashArray: 2,
            yaxis: {
              lines: {
                show: true,
              },
            },
            xaxis: {
              lines: {
                show: true,
              },
            },
          },
        }}
      />
    </DetailsCard>
  );
};
