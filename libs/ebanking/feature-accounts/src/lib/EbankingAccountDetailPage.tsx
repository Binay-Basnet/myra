import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';
import subDays from 'date-fns/subDays';
import dayjs from 'dayjs';
import { CalendarBuilderDate } from 'libs/@myra/date-picker/src/types/date';

import { Box, Button, Divider, Grid, Icon, PathBar } from '@myra-ui';
import { convertDate, convertValueToDate, getTodayDate } from '@myra-ui/date-picker';

import { AccountLargeCard, InfoCard, TransactionCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import {
  EbankingAccount,
  useAppSelector,
  useGetAccountDetailsQuery,
  useGetEbankLoanAccountDetailsQuery,
} from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

import { AccountDetail } from '../components/AccountDetail';

const todayDate = convertDate(getTodayDate().ad as unknown as CalendarBuilderDate);

const oneWeekBeforeDate = convertDate(
  convertValueToDate({ date: subDays(new Date(), 7) })?.ad as unknown as CalendarBuilderDate
);

export const EbankingAccountDetailPage = () => {
  const router = useRouter();
  const isLoan = router.query['loan'];

  const { data: accountDetails, isLoading } = useGetAccountDetailsQuery(
    {
      id: String(router.query['id']),
      transactionPagination: { first: 10, after: '' },
    },
    { enabled: typeof router.query['id'] === 'string' && !isLoan }
  );

  const account = accountDetails?.eBanking?.account?.get?.data;

  const { data: loanAccountDetails, isLoading: loanIsLoading } = useGetEbankLoanAccountDetailsQuery(
    {
      id: String(router.query['id']),
      transactionPagination: { first: 10, after: '' },
    },
    { enabled: typeof router.query['id'] === 'string' && !!isLoan }
  );

  const loanAccount = loanAccountDetails?.eBanking?.loanAccount?.get?.data;

  if (isLoan) {
    return <AccountDetails isLoading={loanIsLoading} account={loanAccount as EbankingAccount} />;
  }

  return <AccountDetails isLoading={isLoading} account={account as EbankingAccount} />;
};

interface IAccountDetailsProps {
  isLoading: boolean;
  account: EbankingAccount | undefined | null;
}

export const AccountDetails = ({ account, isLoading }: IAccountDetailsProps) => {
  const router = useRouter();
  const name = useAppSelector((state) => state?.auth?.cooperative?.user?.memberName);

  const transactions = account?.transactions?.edges;

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
              <AccountDetail title="Account Holder Name " value={name as string} />
              <AccountDetail title="Account Number " value={account.accountNumber} />
              <AccountDetail title="Account Type " value={account.accountSubType} />
              <AccountDetail title="Interest Rate" value={`${account.interestRate.toFixed(2)}%`} />
              <AccountDetail
                title="Interest Booked"
                value={`${Number(account.interestBooked).toFixed(2)}`}
              />
              <AccountDetail
                title="Interest Earned"
                value={`${Number(account.interestEarned).toFixed(2)}`}
              />
              <AccountDetail title="Total Balance" value={amountConverter(account.balance)} />
              <AccountDetail
                title="Subscribed Date"
                value={dayjs(account.subscribedDate).format('DD MMM YYYY [at] hh:mm A')}
              />
            </Grid>
          </InfoCard>
        ) : (
          <Skeleton isLoaded={!isLoading} h="172px" />
        )}

        {/* <InfoCard title="Balance History"> */}
        {/*   <Box position="relative" w="100%" h="300px" p="s8"> */}
        {/*     <Image src="/account-dummy-chart.svg" layout="fill" objectFit="contain" /> */}
        {/*   </Box> */}
        {/* </InfoCard> */}
        <InfoCard
          title="Recent Transactions"
          btn={
            <Button
              variant="ghost"
              onClick={() =>
                router.push(
                  `/transaction-history?accountId=${account?.id}&accountName=${
                    account?.name
                  }&from=${JSON.stringify({
                    en: oneWeekBeforeDate?.en,
                    np: oneWeekBeforeDate?.np,
                    local: '',
                  })}&to=${JSON.stringify({
                    en: todayDate?.en,
                    np: todayDate?.np,
                    local: '',
                  })}`
                )
              }
            >
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
