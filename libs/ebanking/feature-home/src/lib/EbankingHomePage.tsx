import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import { AccountCard, InfoCard, TransactionCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import {
  AccountMinimal,
  useGetAccountListQuery,
  useGetEbankingLoanAccountsQuery,
  useGetHomeServiceListQuery,
} from '@coop/ebanking/data-access';
import { Box, Button, Divider, Grid, GridItem, Icon, Text } from '@myra-ui';

import { SERVICE_ICON_DICT, SERVICE_LINK_DICT } from '../constants/SERVICE_ICON';

export const EbankingHomePage = () => {
  const router = useRouter();
  // const { isOpen, onToggle } = useDisclosure();

  const { data: servicesList, isLoading } = useGetHomeServiceListQuery();
  // const { data: utilityList } = useGetUtilityListQuery();
  const { data: accountList, isLoading: accountsLoading } = useGetAccountListQuery({
    transactionPagination: { first: 10, after: '' },
  });
  const accounts = accountList?.eBanking?.account?.list?.accounts;

  const { data: loanAccountList, isLoading: loanAccountsLoading } =
    useGetEbankingLoanAccountsQuery();
  const loanAccounts = loanAccountList?.eBanking?.loanAccount?.list?.accounts;

  // const utilityPayments = [
  //   ...(utilityList?.eBanking?.utilityPayments ?? []),
  //   ...(utilityList?.eBanking?.utilityPayments ?? []),
  // ];

  const transactions = accountList?.eBanking?.account?.list?.recentTransactions?.edges;

  return (
    <Box display="flex" flexDir="column" gap="s24">
      <Box display="flex" flexDir="column" gap="s8">
        <Text fontSize="r1" color="gray.700" fontWeight="600">
          Fund Transfer
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="s8">
          {isLoading && (
            <>
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
              <Skeleton h="s48" />
            </>
          )}
          {servicesList?.eBanking?.services?.map((service) => (
            <GridItem
              display="flex"
              h="s48"
              alignItems="center"
              gap="s16"
              px="s16"
              boxShadow="E0"
              borderRadius="br2"
              bg="white"
              cursor="pointer"
              tabIndex={0}
              key={service?.id}
              onClick={() => {
                service?.service_id && router.push(SERVICE_LINK_DICT[service?.service_id]);
              }}
            >
              <Icon
                as={service?.service_id ? SERVICE_ICON_DICT[service?.service_id] : undefined}
                size="lg"
                color="primary.500"
              />
              <Text fontSize="s3" color="gray.800" fontWeight="500">
                {service?.name}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Divider />
      {/**
       <Box display="flex" flexDir="column" gap="s8">
       <Text fontSize="r1" color="gray.700" fontWeight="600">
       Utility Payments
       </Text>

       <Box bg="white" borderRadius="br2" boxShadow="E0" overflow="hidden">
       <Grid templateColumns="repeat(5, 1fr)" p="s16" rowGap="s16" columnGap="s16">
       {utilityPayments.slice(0, 10).map((utilityPayment) => (
              <UtilityHomeCard
                icon={
                  utilityPayment?.service_id
                    ? UTILITY_ICON_DICT[utilityPayment?.service_id]
                    : undefined
                }
                label={utilityPayment?.name ?? 'N/A'}
              />
            ))}
       </Grid>
       <Collapse in={isOpen} animateOpacity>
       <Grid templateColumns="repeat(5, 1fr)" p="s16" rowGap="s16" columnGap="s16">
       {utilityPayments.slice(10, utilityPayments.length).map((utilityPayment) => (
                <UtilityHomeCard
                  icon={
                    utilityPayment?.service_id
                      ? UTILITY_ICON_DICT[utilityPayment?.service_id]
                      : undefined
                  }
                  label={utilityPayment?.name ?? 'N/A'}
                />
              ))}
       </Grid>
       </Collapse>
       {utilityPayments.length > 10 && (
            <Box
              h="3.125rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="s4"
              _hover={{ bg: 'gray.0' }}
              borderTop="1px"
              borderTopColor="border.layout"
              onClick={onToggle}
            >
              <Button variant="link">
                See all
                <Icon
                  as={ChevronDownIcon}
                  transform={isOpen ? 'rotate(180deg)' : ''}
                  transition="0.1s ease"
                  color="primary.500"
                />
              </Button>
            </Box>
          )}
       </Box>
       </Box>
       <Divider />
       * */}

      <Box display="flex" flexDir="column" gap="s8">
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="s8">
          <Text fontSize="r1" color="gray.700" fontWeight="600">
            Saving Accounts ({accounts?.length})
          </Text>
          <Button
            py="0"
            variant="link"
            h="auto"
            minH="none"
            onClick={() => router.push('/accounts')}
          >
            See all
            <Icon as={ChevronRightIcon} color="primary.500" />
          </Button>
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap="s16">
          {accountsLoading && (
            <>
              <Skeleton h="144px" />
              <Skeleton h="144px" />
            </>
          )}
          {accounts?.slice(0, 2).map((account) => (
            <Fragment key={account?.id}>
              <AccountCard
                account={account as AccountMinimal}
                isDefault={Boolean(account?.isDefault)}
              />
            </Fragment>
          ))}
        </Grid>
      </Box>
      <Divider />

      <Box display="flex" flexDir="column" gap="s8">
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="s8">
          <Text fontSize="r1" color="gray.700" fontWeight="600">
            Loan Accounts ({loanAccounts?.length})
          </Text>
          <Button
            py="0"
            variant="link"
            h="auto"
            minH="none"
            onClick={() => router.push('/accounts')}
          >
            See all
            <Icon as={ChevronRightIcon} color="primary.500" />
          </Button>
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap="s16">
          {loanAccountsLoading && (
            <>
              <Skeleton h="144px" />
              <Skeleton h="144px" />
            </>
          )}
          {loanAccounts?.slice(0, 2).map((account) => (
            <Fragment key={account?.id}>
              <AccountCard
                isLoan
                account={account as AccountMinimal}
                isDefault={Boolean(account?.isDefault)}
              />
            </Fragment>
          ))}
        </Grid>
      </Box>
      <Divider />

      <InfoCard
        title="Recent Transactions"
        btn={
          <Button variant="link" w="auto" px="0">
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
                  accountName={
                    accountList?.eBanking?.account?.list?.accounts?.find(
                      (account) => account?.id === transaction?.node?.accountId
                    )?.name as string
                  }
                  transaction={transaction?.node}
                />
              )}
            </Fragment>
          ))
        )}
      </InfoCard>
    </Box>
  );
};

export default EbankingHomePage;
