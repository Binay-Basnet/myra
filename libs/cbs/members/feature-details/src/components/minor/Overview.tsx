import React from 'react';

import { Box, Column, DetailCardContent, Grid, Table, Text } from '@myra-ui';

import { DepositAccount, MinorProfile } from '@coop/cbs/data-access';
import { formatTableAddress } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const Overview = (props: { data: MinorProfile }) => {
  const { data } = props;
  const savingAccounts = data?.savingAccounts as [DepositAccount];
  const columns = React.useMemo<Column<typeof savingAccounts[0]>[]>(
    () => [
      {
        header: 'Account Name',
        accessorKey: 'accountName',
      },
      {
        header: 'Interest Rate',
        accessorFn: (row) => `${row?.interestRate} %`,
      },
      {
        header: 'Balance',
        accessorFn: (row) => amountConverter(row?.balance || 0),
      },
    ],
    []
  );

  return (
    <>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Basic Information</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent title="Full Name" subtitle={data?.fullName} />
          <DetailCardContent title="Date of Birth" subtitle={data?.dateOfBirth?.local} />
          <DetailCardContent title="Gender" subtitle={data?.gender} />
          <DetailCardContent title="Parent Name" subtitle={data?.parentName} />
          <DetailCardContent title="Address" subtitle={formatTableAddress(data?.address)} />
          <DetailCardContent title="Member ID" subtitle={data?.memberId} />
          <DetailCardContent title="Service Center" subtitle={data?.serviceCentreName} />
        </Grid>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Table
          isDetailPageTable
          isStatic
          size="compact"
          data={data?.savingAccounts || []}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default Overview;
