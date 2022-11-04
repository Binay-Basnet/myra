import { useMemo } from 'react';

import {
  DateType,
  SlipState,
  useAppSelector,
  useGetPastSlipsListQuery,
} from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';
import { Box, DetailsCard, Text } from '@coop/shared/ui';
import { useAccountDetails } from '@coop/shared/utils';

export const PastWithdrawSlipList = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { accountDetails } = useAccountDetails();

  const { data: pastSlipsListQueryData } = useGetPastSlipsListQuery(
    { accountId: accountDetails?.accountId as string },
    { enabled: !!accountDetails?.accountId }
  );

  const pastSlipsList = useMemo(
    () =>
      pastSlipsListQueryData?.withdrawSlip?.listPastSlips?.data?.map((withdrawSlip) => ({
        slipNumber: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        state: withdrawSlip?.state,
        date: preferenceDate === DateType.Bs ? withdrawSlip?.date?.np : withdrawSlip?.date?.en,
      })) ?? [],
    [pastSlipsListQueryData, preferenceDate]
  );

  return (
    <DetailsCard title="Past Withdraw Slip List" bg="white" hasTable>
      <Table
        // variant="report"
        // size="small"
        isStatic
        showFooter
        data={pastSlipsList}
        noDataTitle="past withdraw list"
        columns={[
          {
            header: 'Withdraw Slip Number',
            accessorKey: 'slipNumber',
          },
          {
            header: 'Status',
            accessorKey: 'state',
            cell: (props) => (
              <Box display="flex" gap="s8" alignItems="center">
                <Box
                  h="s10"
                  w="s10"
                  borderRadius="50%"
                  bgColor={props?.row?.original?.state === SlipState.Used ? '#3B9C84' : '#FF4538'}
                />

                <Text
                  fontSize="s2"
                  fontWeight={400}
                  color={props?.row?.original?.state === SlipState.Used ? 'gray.800' : '#FF4538'}
                >
                  {props?.row?.original?.state?.toLowerCase()}
                </Text>
              </Box>
            ),
          },
          {
            header: 'Withdraw Slip Issue Date',
            accessorKey: 'date',
          },
        ]}
      />
    </DetailsCard>
  );
};
