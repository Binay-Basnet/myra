import { ReactElement } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Skeleton } from '@chakra-ui/react';

import { AccountLargeCard, InfoCard } from '@coop/ebanking/cards';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { useGetAccountDetailsQuery } from '@coop/shared/data-access';
import { Box, Divider, Grid, GridItem, PathBar, Text } from '@coop/shared/ui';

const AccountDetailPage = () => {
  const router = useRouter();
  const { data: accountDetails, isLoading } = useGetAccountDetailsQuery(
    {
      id: String(router.query.id),
    },
    { enabled: typeof router.query.id === 'string' }
  );

  const account = accountDetails?.eBanking?.account?.get;

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Accounts', link: '/accounts' },
          {
            label: String(router.query.name),
            link: router.asPath,
          },
        ]}
      />
      {account ? (
        <AccountLargeCard
          isDefault
          account={{
            accountNumber: account.accountNumber,
            name: account.name,
            amount: account.amount,
            interestRate: account.interestRate,
          }}
        />
      ) : (
        <Skeleton isLoaded={!isLoading} h="172px"></Skeleton>
      )}

      <Divider />

      <Box display="flex" flexDir="column" gap="s8">
        {account ? (
          <InfoCard title="Account Details">
            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Account Holder Name
                </Text>
                <Text color="gray.800" fontSize="r1">
                  Krishna Thapa
                </Text>
              </GridItem>{' '}
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Account Number
                </Text>
                <Text color="gray.800" fontSize="r1">
                  {account.accountNumber}
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Account Type
                </Text>
                <Text color="gray.800" fontSize="r1">
                  {account.name}
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Interest Rate
                </Text>
                <Text color="gray.800" fontSize="r1">
                  {account.interestRate.toFixed(2)} %
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Interest Booked
                </Text>
                <Text color="gray.800" fontSize="r1">
                  Rs. {account.interestBooked.toLocaleString('en-IN')}
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Interest Earned
                </Text>
                <Text color="gray.800" fontSize="r1">
                  Rs. {account.interestEarned.toLocaleString('en-IN')}
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Total Balance
                </Text>
                <Text color="gray.800" fontSize="r1">
                  Rs. {account.amount.toLocaleString('en-IN')}
                </Text>
              </GridItem>
              <GridItem>
                <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
                  Subscribed Date
                </Text>
                <Text color="gray.800" fontSize="r1">
                  {account.subscribedDate}
                </Text>
              </GridItem>
            </Grid>
          </InfoCard>
        ) : (
          <Skeleton isLoaded={!isLoading} h="172px" />
        )}

        <InfoCard title="Balance History">
          <Box position="relative" w="100%" h="300px">
            <Image
              src={'/account-dummy-chart.svg'}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </InfoCard>
        <InfoCard title="Recent Transactions"></InfoCard>
      </Box>
    </Box>
  );
};

export default AccountDetailPage;

AccountDetailPage.getLayout = function (page: ReactElement) {
  return <EbankingAccountLayout>{page}</EbankingAccountLayout>;
};
