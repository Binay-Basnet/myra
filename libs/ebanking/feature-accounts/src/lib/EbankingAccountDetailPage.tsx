import { Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import {
  AccountLargeCard,
  InfoCard,
  TransactionCard,
} from '@coop/ebanking/cards';
import { useGetAccountDetailsQuery } from '@coop/ebanking/data-access';
import { Box, Button, Divider, Grid, Icon, PathBar } from '@coop/shared/ui';

import { AccountDetail } from '../components/AccountDetail';
import { AccountPopover } from '../components/AccountPopover';

export const EbankingAccountDetailPage = () => {
  const router = useRouter();

  const { data: accountDetails, isLoading } = useGetAccountDetailsQuery(
    {
      id: String(router.query['id']),
    },
    { enabled: typeof router.query['id'] === 'string' }
  );

  const account = accountDetails?.eBanking?.account?.get;

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Accounts', link: '/accounts' },
          {
            label: String(router.query['name']),
            link: router.asPath,
          },
        ]}
        button={<AccountPopover />}
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
            <Grid templateColumns="repeat(3, 1fr)" gap="s16" p="s16">
              <AccountDetail
                title={'Account Holder Name '}
                value={'Krishna Thapa'}
              />
              <AccountDetail
                title={'Account Number '}
                value={account.accountNumber}
              />
              <AccountDetail title={'Account Type '} value={account.name} />
              <AccountDetail
                title={'Interest Rate'}
                value={account.interestRate.toFixed(2) + '%'}
              />
              <AccountDetail
                title={'Interest Booked'}
                value={account.interestRate.toLocaleString('en-IN')}
              />
              <AccountDetail
                title={'Interest Earned'}
                value={account.interestEarned.toLocaleString('en-IN')}
              />
              <AccountDetail
                title={'Total Balance'}
                value={account.amount.toLocaleString('en-IN')}
              />
              <AccountDetail
                title={'Subscribed Date'}
                value={account.subscribedDate}
              />
            </Grid>
          </InfoCard>
        ) : (
          <Skeleton isLoaded={!isLoading} h="172px" />
        )}

        <InfoCard title="Balance History">
          <Box position="relative" w="100%" h="300px" p="s8">
            <Image
              src={'/account-dummy-chart.svg'}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </InfoCard>
        <InfoCard
          title="Recent Transactions"
          btn={
            <Button variant="ghost">
              View All Transactions
              <Icon as={ChevronRightIcon} color="priamry.500" />
            </Button>
          }
        >
          {account?.transactions?.map((transaction) => (
            <Fragment key={transaction.id}>
              <TransactionCard transaction={transaction} />
            </Fragment>
          ))}
        </InfoCard>
      </Box>
    </Box>
  );
};
