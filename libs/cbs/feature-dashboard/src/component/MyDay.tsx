import { useGetDashboardDayInfoQuery } from '@coop/cbs/data-access';
import { Box, DetailCardStats, Grid, GridItem, Text } from '@coop/shared/ui';

export const MyDay = () => {
  const { data } = useGetDashboardDayInfoQuery();
  const myDayData = data?.dashboard?.myDayInfo?.data;

  const depositData = {
    todayValue: myDayData?.deposit?.todayValue,
    percent: myDayData?.deposit?.percent,
    noOfTransaction: myDayData?.deposit?.noOfTransaction,
    subtitle: 'No. of Transactions',
  };

  const withdrawData = {
    todayValue: myDayData?.withdraw?.todayValue,
    percent: myDayData?.withdraw?.percent,
    noOfTransaction: myDayData?.withdraw?.noOfTransaction,
    subtitle: 'No. of Transactions',
  };

  const cashInHandData = {
    todayValue: myDayData?.cashInHand?.todayValue,
    percent: myDayData?.cashInHand?.percent,
    noOfTransaction: myDayData?.cashInHand?.fromVault,
    subtitle: 'From Vault',
  };

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <Box display="flex">
        <Text fontSize="s3" color="gray.600" fontWeight="600" textTransform="uppercase">
          My Day
        </Text>
      </Box>
      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <GridItem>
          <DetailCardStats
            title="Total Deposits"
            stats={Number(depositData?.todayValue) as number}
            meta={{ growth: Number(depositData?.percent) as number, time: 'Yesterday' }}
          >
            <Text color="gray.500" fontWeight="Regular" fontSize="s3" lineHeight="140%">
              No. of Transactions:
              <Text
                as="span"
                color="gray.500"
                fontWeight="SemiBold"
                fontSize="r1"
                lineHeight="140%"
              >
                {depositData?.noOfTransaction}
              </Text>
            </Text>
          </DetailCardStats>
        </GridItem>
        <GridItem>
          <DetailCardStats
            title="Total Withdraw"
            stats={Number(withdrawData?.todayValue) as number}
            meta={{ growth: Number(withdrawData?.percent) as number, time: 'Yesterday' }}
          >
            <Text color="gray.500" fontWeight="Regular" fontSize="s3" lineHeight="140%">
              No. of Transactions:
              <Text
                as="span"
                color="gray.500"
                fontWeight="SemiBold"
                fontSize="r1"
                lineHeight="140%"
              >
                {withdrawData?.noOfTransaction}
              </Text>
            </Text>
          </DetailCardStats>
        </GridItem>
        <GridItem>
          <DetailCardStats
            title="Cash in Hand"
            stats={Number(cashInHandData?.todayValue) as number}
            meta={{ growth: Number(cashInHandData?.percent) as number, time: 'Yesterday' }}
          >
            <Text color="gray.500" fontWeight="Regular" fontSize="s3" lineHeight="140%">
              No. of Transactions:
              <Text
                as="span"
                color="gray.500"
                fontWeight="SemiBold"
                fontSize="r1"
                lineHeight="140%"
              >
                {cashInHandData?.noOfTransaction}
              </Text>
            </Text>
          </DetailCardStats>
        </GridItem>
      </Grid>
    </Box>
  );
};
