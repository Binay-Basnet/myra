import { ReactElement, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePrinter } from 'react-icons/ai';
import { IoFilter } from 'react-icons/io5';
import ReactToPrint from 'react-to-print';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { GridItem } from '@chakra-ui/react';
import subDays from 'date-fns/subDays';
import { CalendarBuilderDate } from 'libs/@myra/date-picker/src/types/date';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Loader,
  Text,
} from '@myra-ui';
import { convertDate, convertValueToDate, getTodayDate } from '@myra-ui/date-picker';

import { LocalizedDateFilter } from '@coop/cbs/data-access';
import { InfoCard, TransactionCard, TransactionHeaderCard } from '@coop/ebanking/cards';
import {
  EbankingTransactionCrOrDr,
  EbankingTransactionFilter,
  useGetAccountListQuery,
  useGetTransactionListsQuery,
} from '@coop/ebanking/data-access';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { FormEbankingDatePicker, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type TransactionFormFilters = {
  accounts: { label: string; value: string }[];
  date: LocalizedDateFilter;
  transactionDirection: EbankingTransactionCrOrDr | 'All';
};

type BalanceMap = Record<
  string,
  {
    Closing: {
      Value: string;
      Type: string;
    };
    Opening: {
      Value: string;
      Type: string;
    };
  }
>;

const todayDate = convertDate(getTodayDate().ad as unknown as CalendarBuilderDate);

const oneWeekBeforeDate = convertDate(
  convertValueToDate({ date: subDays(new Date(), 7) })?.ad as unknown as CalendarBuilderDate
);

const TransactionHistoryPage = () => {
  const router = useRouter();

  const componentRef = useRef<HTMLInputElement | null>(null);

  const [filter, setFilter] = useState<EbankingTransactionFilter | null>({
    date: {
      from: {
        en: oneWeekBeforeDate?.en,
        np: oneWeekBeforeDate?.np,
        local: '',
      },
      to: {
        en: todayDate?.en,
        np: todayDate?.np,
        local: '',
      },
    },
  });

  const methods = useForm<TransactionFormFilters>({
    defaultValues: {
      transactionDirection: 'All',
      date: {
        from: {
          en: oneWeekBeforeDate?.en,
          np: oneWeekBeforeDate?.np,
          local: '',
        },
        to: {
          en: todayDate?.en,
          np: todayDate?.np,
          local: '',
        },
      },
    },
  });

  const { getValues, reset } = methods;

  const { data, isFetching } = useGetTransactionListsQuery({
    pagination: { after: '', first: -1, order: { column: 'date', arrange: 'DESC' } },
    filter,
  });

  const { data: accountListData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });

  const accountOptions = accountListData?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account.accountNumber}`,
    value: account?.id,
  }));

  const accountMap = data?.eBanking?.account?.list?.recentTransactions?.summary
    ?.accountBalanceMap as unknown as BalanceMap;

  const redirectAccountId = router?.query?.['accountId'];
  const redirectAccountName = router?.query?.['accountName'];
  const redirectFrom = router?.query?.['from'];
  const redirectTo = router?.query?.['to'];

  useEffect(() => {
    const tempValues = getValues();

    const tempFilter = filter || {};

    if (redirectAccountId && redirectAccountName) {
      tempValues['accounts'] = [
        { label: redirectAccountName as string, value: redirectAccountId as string },
      ];

      tempFilter['accounts'] = [redirectAccountId];
    }

    if (redirectFrom && redirectTo) {
      tempValues['date'] = {
        from: JSON.parse(redirectFrom as string),
        to: JSON.parse(redirectTo as string),
      };

      tempFilter['date'] = {
        from: JSON.parse(redirectFrom as string),
        to: JSON.parse(redirectTo as string),
      };
    }

    reset(tempValues);

    if (Object.keys(tempFilter)?.length) {
      setFilter(tempFilter as EbankingTransactionFilter);
    }
  }, [redirectAccountId, redirectAccountName, redirectFrom, redirectTo]);

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <TransactionHeaderCard />
      <Divider />

      <Accordion allowMultiple allowToggle>
        <AccordionItem border="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                h="3.125rem"
                // bg={isExpanded ? 'red' : 'white'}
                borderRadius="br2"
                p="s16"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                _hover={{ bg: 'highlight.500' }}
                _expanded={{ bg: 'highlight.500', borderBottomRadius: 'none' }}
              >
                <Box display="flex" alignItems="center" gap="s8">
                  <Icon as={IoFilter} color="primary.500" />
                  <Text fontSize="r1" color="gray.700" fontWeight={600}>
                    Filters
                  </Text>
                </Box>
                <Icon
                  as={!isExpanded ? ChevronDownIcon : ChevronUpIcon}
                  color="gray.500"
                  size="lg"
                />
              </AccordionButton>

              <AccordionPanel borderTop="1px" borderColor="border.layout" borderBottomRadius="br2">
                <form>
                  <FormProvider {...methods}>
                    <Grid templateColumns="repeat(2, 1fr)" gap="s16">
                      <GridItem colSpan={2}>
                        <Input label="Transaction Text" />
                      </GridItem>
                      <FormSelect
                        name="accounts"
                        label="Account Type"
                        isMulti
                        options={accountOptions}
                      />
                      <FormSwitchTab
                        name="transactionDirection"
                        label="Transaction Type"
                        options={[
                          {
                            label: 'All',
                            value: 'All',
                          },
                          {
                            label: 'Debit',
                            value: EbankingTransactionCrOrDr.Debit,
                          },
                          {
                            label: 'Credit',
                            value: EbankingTransactionCrOrDr.Credit,
                          },
                        ]}
                      />
                      <FormEbankingDatePicker name="date.from" label="From Date" />
                      <FormEbankingDatePicker name="date.to" label="To Date" />
                    </Grid>
                  </FormProvider>
                  <Box display="flex" gap="s8" pt="s32">
                    <Button
                      w="100px"
                      onClick={() => {
                        const values = methods.getValues();
                        setFilter({
                          accounts:
                            values?.accounts?.length === 0
                              ? null
                              : values?.accounts?.map((account) => account?.value),
                          date:
                            Object.keys(values?.date).length === 0
                              ? null
                              : ({
                                  from: values?.date?.from,
                                  to: values?.date?.to,
                                } as unknown as LocalizedDateFilter),
                          transactionDirection:
                            values?.transactionDirection === 'All'
                              ? null
                              : values?.transactionDirection,
                        });
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      w="100px"
                      shade="neutral"
                      variant="outline"
                      onClick={() => {
                        methods.reset({
                          accounts: [],
                          date: { from: null, to: null },
                          transactionDirection: 'All',
                        });
                        setFilter(null);
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                </form>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>

      <Box ref={componentRef} sx={{ '@media print': {} }}>
        <InfoCard
          title="All Transactions"
          btn={
            <ReactToPrint
              content={() => componentRef.current}
              trigger={() => (
                <Button
                  sx={{
                    '@media print': {
                      display: 'none',
                    },
                    '@page': {
                      size: 'auto !important',
                      margin: '0.2in',
                      marginLeft: '0.4in',
                      marginBottom: '0',
                    },
                  }}
                  leftIcon={<Icon as={AiOutlinePrinter} />}
                >
                  {' '}
                  Print{' '}
                </Button>
              )}
            />
          }
        >
          {isFetching ? (
            <Loader />
          ) : (
            <Box>
              <Box p="s16" borderBottom="1px" borderBottomColor="border.layout" fontSize="s3">
                <Box as="span" display="flex" flexDir="column" gap="s8" mt="4px">
                  {(filter?.accounts || Object.keys(accountMap || {}))?.map((f) => (
                    <Box>
                      <Box fontWeight={600} color="gray.800">
                        {accountOptions?.find((a) => a.value === f)?.label}
                      </Box>

                      <Box>
                        Opening Balance: {amountConverter(accountMap?.[f]?.Opening?.Value)}{' '}
                        {accountMap?.[f]?.Opening?.Type}, Closing Balance:{' '}
                        {amountConverter(accountMap?.[f]?.Closing?.Value)}{' '}
                        {accountMap?.[f]?.Closing?.Type}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {data?.eBanking?.account?.list?.recentTransactions?.edges?.map((transaction) => (
                <TransactionCard
                  accountName={
                    data?.eBanking?.account?.list?.accounts?.find(
                      (account) => account?.id === transaction?.node?.accountId
                    )?.name as string
                  }
                  transaction={transaction?.node}
                />
              ))}
            </Box>
          )}
        </InfoCard>
      </Box>
    </Box>
  );
};

TransactionHistoryPage.getLayout = (page: ReactElement) => (
  <EbankingAccountLayout>{page}</EbankingAccountLayout>
);

export default TransactionHistoryPage;
