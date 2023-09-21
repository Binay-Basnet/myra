import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  useGetAgentAssignedMemberListDataQuery,
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

  const todaysListData = agentTodayListQueryData?.agent?.listAgentTask?.record ?? [];

  const { data: assignedMemberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: {
        first: -1,
        after: '',
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'agentId',
                comparator: 'EqualTo',
                value: id,
              },
            ],
          },
        ],
      },
    },
    { enabled: !!id, staleTime: 0 }
  );

  const columns: Column<typeof todaysListData[0]>[] = [
    {
      accessorKey: 'member',
      header: 'Member',
      accessorFn: (row) => row?.member?.id,
      cell: (cell) => {
        const selectedMember = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
          (member) => member?.node?.member?.id === cell?.row?.original?.member?.id
        )?.node?.member;

        return (
          <Box display="flex" flexDirection="column" py="s4">
            <Text
              fontSize="r1"
              fontWeight={500}
              color="neutralColorLight.Gray-80"
              maxW="32ch"
              wordBreak="break-all"
              whiteSpace="normal"
            >
              {localizedText(selectedMember?.name)}
            </Text>
            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
              {selectedMember?.code}
            </Text>
          </Box>
        );
      },
      meta: {
        width: 'auto',
      },
    },
    {
      header: 'Account',
      accessorFn: (row) => row?.account?.id,
      cell: (cell) => {
        const selectedMember = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
          (member) => member?.node?.account?.id === cell?.row?.original?.account?.id
        )?.node?.account;

        return (
          <Box display="flex" flexDirection="column" py="s4">
            <Text
              fontSize="r1"
              fontWeight={500}
              color="neutralColorLight.Gray-80"
              maxW="32ch"
              wordBreak="break-all"
              whiteSpace="normal"
            >
              {selectedMember?.accountName}
            </Text>
            <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
              {selectedMember?.id}
            </Text>
          </Box>
        );
      },
      meta: {
        width: 'auto',
      },
    },
    {
      header: 'Due Amount',
      id: 'amount',
      cell: (cell) => {
        const selectedAccount = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
          (member) => member?.node?.account?.id === cell?.row?.original?.account?.id
        )?.node?.account;

        return <Box textAlign="right">{amountConverter(selectedAccount?.dues?.totalDue || 0)}</Box>;
      },
      meta: {
        isNumeric: true,
        width: '10%',
      },
    },
    {
      header: 'Installment Amount',
      accessorFn: (row) => amountConverter(row?.account?.installmentAmount || 0),
      meta: {
        isNumeric: true,
        width: '10%',
      },
    },
    {
      header: 'Fine',
      id: 'fine',
      cell: (cell) => {
        const selectedAccount = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
          (member) => member?.node?.account?.id === cell?.row?.original?.account?.id
        )?.node?.account;

        return <Box textAlign="right">{amountConverter(selectedAccount?.dues?.fine || 0)}</Box>;
      },
      meta: {
        isNumeric: true,
        width: '10%',
      },
    },
  ];

  return (
    <Box
      display="none"
      sx={{
        '@media print': {
          display: 'flex',
        },
        '@page': {
          size: 'A4 potrait',
        },
      }}
      ref={ref}
    >
      <Box display="flex" flexDirection="column" gap="s16">
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
