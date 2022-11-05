import { Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { AccountLargeCard, InfoCard, TransactionCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import { EbankingAccount, useGetAccountDetailsQuery } from '@coop/ebanking/data-access';
import { Box, Button, Divider, Grid, Icon, PathBar } from '@coop/shared/ui';

import { AccountDetail } from '../components/AccountDetail';
import { AccountPopover } from '../components/AccountPopover';

export const EbankingAccountDetailPage = () => {
  const router = useRouter();

  const { data: accountDetails, isLoading } = useGetAccountDetailsQuery(
    {
      id: String(router.query['id']),
      transactionPagination: { first: 10, after: '' },
    },
    { enabled: typeof router.query['id'] === 'string' }
  );

  const account = accountDetails?.eBanking?.account?.get?.data;
  const transactions = accountDetails?.eBanking?.account?.get?.data?.transactions?.edges;

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
        button={<AccountPopover selectedAccount={account} />}
      />
      {account ? (
        <AccountLargeCard isDefault={account?.isDefault} account={account as EbankingAccount} />
      ) : (
        <Skeleton isLoaded={!isLoading} h="172px" />
      )}

      <Divider />

      <Box display="flex" flexDir="column" gap="s8">
        {account ? (
          <InfoCard title="Account Details">
            <Grid templateColumns="repeat(3, 1fr)" gap="s16" p="s16">
              <AccountDetail title="Account Holder Name " value="Krishna Thapa" />
              <AccountDetail title="Account Number " value={account.accountNumber} />
              <AccountDetail title="Account Type " value={account.accountSubType} />
              <AccountDetail title="Interest Rate" value={`${account.interestRate.toFixed(2)}%`} />
              <AccountDetail
                title="Interest Booked"
                value={account.interestRate.toLocaleString('en-IN')}
              />
              <AccountDetail
                title="Interest Earned"
                value={account.interestEarned.toLocaleString('en-IN')}
              />
              <AccountDetail
                title="Total Balance"
                value={Number(account.balance).toLocaleString('en-IN')}
              />
              <AccountDetail
                title="Subscribed Date"
                value={dayjs(account.subscribedDate).format('DD MMM YYYY [at] hh:mm A')}
              />
            </Grid>
          </InfoCard>
        ) : (
          <Skeleton isLoaded={!isLoading} h="172px" />
        )}

        <InfoCard title="Balance History">
          <Box position="relative" w="100%" h="300px" p="s8">
            <Image src="/account-dummy-chart.svg" layout="fill" objectFit="contain" />
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
          {transactions?.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" h="200px">
              <EmptyState title="No Recent Transactions Found" />
            </Box>
          ) : (
            transactions?.map((transaction) => (
              <Fragment key={transaction?.node?.id}>
                {transaction && (
                  <TransactionCard
                    accountName={account?.name as string}
                    transaction={transaction?.node}
                  />
                )}
              </Fragment>
            ))
          )}
        </InfoCard>
      </Box>
    </Box>
  );
};
