import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  useGetAgentDetailDataQuery,
  useGetAgentTodayListDataQuery,
  useGetEndOfDayDateDataQuery,
} from '@coop/cbs/data-access';
import { localizedDate, localizedText } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const TodaysListPrint = React.forwardRef<HTMLInputElement>((props, ref) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const { data: agentDetailQueryData } = useGetAgentDetailDataQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const agentDetail = agentDetailQueryData?.agent?.agentDetail?.data;

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0, enabled: !!id }
  );

  const todaysListData =
    agentTodayListQueryData?.agent?.listAgentTask?.record?.map((d, i) => ({
      ...d,
      index: i + 1,
    })) ?? [];

  const columns = useMemo<Column<typeof todaysListData[0]>[]>(
    () => [
      {
        accessorKey: 'index',
        header: 'SN',
        meta: {
          width: '10px',
        },
      },
      {
        id: 'member',
        header: 'Member',
        cell: (cell) => (
          <Text
            fontSize="r1"
            fontWeight={500}
            color="neutralColorLight.Gray-80"
            maxW="32ch"
            wordBreak="break-all"
            whiteSpace="normal"
          >
            {`${localizedText(cell?.row?.original?.member?.name)} [${
              cell?.row?.original?.member?.code
            }]`}
          </Text>
        ),
        meta: {
          width: 'auto',
        },
      },
      {
        id: 'Account',
        header: 'Account',
        cell: (cell) => (
          <Text
            fontSize="r1"
            fontWeight={500}
            color="neutralColorLight.Gray-80"
            maxW="32ch"
            wordBreak="break-all"
            whiteSpace="normal"
          >
            {`${cell?.row?.original?.account?.accountName} [${cell?.row?.original?.account?.id}]`}
          </Text>
        ),
        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => (row?.amount ? amountConverter(row?.amount || 0) : ''),
        meta: {
          isNumeric: true,
          width: '80px',
        },
      },
      {
        header: 'Fine',
        accessorFn: (row) => (row?.fine ? amountConverter(row?.fine || 0) : ''),
        meta: {
          isNumeric: true,
          width: '80px',
        },
      },
      {
        header: 'Amount to be Collected',
        accessorFn: (row) => amountConverter(row?.amountToBeCollected || 0),
        meta: {
          isNumeric: true,
          width: '80px',
        },
      },
      {
        header: 'Fine to be Collected',
        accessorFn: (row) => amountConverter(row?.fineToBeCollected || 0),
        meta: {
          isNumeric: true,
          width: '80px',
        },
      },
      {
        header: 'Remarks',
        id: 'remarks',
        meta: {
          width: 'auto',
        },
      },
    ],
    []
  );

  return (
    <Box
      display="none"
      sx={{
        '@media print': {
          display: 'block',
        },
        '@page': {
          size: 'auto !important',
        },
      }}
      ref={ref}
    >
      <Box display="flex" flexDirection="column" gap="s16" width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap="s4" fontSize="r1" fontWeight={500}>
            <Text>Market Representative: </Text>
            <Text>{agentDetail?.name}</Text>
          </Box>
          <Box display="flex" gap="s4" fontSize="r1" fontWeight={500}>
            <Text>Date: </Text>
            <Text>{localizedDate(closingDate)}</Text>
          </Box>
        </Box>

        <Table isStatic data={todaysListData} columns={columns} />
      </Box>
    </Box>
  );
});
