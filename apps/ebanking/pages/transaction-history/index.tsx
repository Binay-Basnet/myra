import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoFilter } from 'react-icons/io5';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { GridItem } from '@chakra-ui/react';

import { InfoCard, TransactionCard, TransactionHeaderCard } from '@coop/ebanking/cards';
import {
  DateFilter,
  EbankingTransactionCrOrDr,
  EbankingTransactionFilter,
  useGetTransactionListsQuery,
} from '@coop/ebanking/data-access';
import { EbankingAccountLayout } from '@coop/ebanking/ui-layout';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
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

type TransactionFormFilters = {
  accounts: { label: string; value: string }[];
  date: DateFilter;
  transactionDirection: EbankingTransactionCrOrDr | 'All';
};

const TransactionHistoryPage = () => {
  const [filter, setFilter] = useState<EbankingTransactionFilter | null>(null);

  const methods = useForm<TransactionFormFilters>({
    defaultValues: {
      transactionDirection: 'All',
    },
  });
  const { data, isFetching } = useGetTransactionListsQuery({
    pagination: { after: '', first: -1 },
    filter,
  });

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <TransactionHeaderCard />
      <Divider />

      <Accordion allowMultiple allowToggle>
        <AccordionItem border="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                h="50px"
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
                        options={data?.eBanking?.account?.list?.accounts?.map((account) => ({
                          label: `${account?.name} - ${account.accountNumber.slice(0, 12)}`,
                          value: account?.id,
                        }))}
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
                      <FormInput name="date.from" type="date" label="From Date" />
                      <FormInput name="date.to" type="date" label="To Date" />
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
                              : {
                                  from: values?.date?.from,
                                  to: values?.date?.to,
                                },
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
                        methods.reset();
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

      <InfoCard title="October 2022">
        {isFetching ? (
          <Loader />
        ) : (
          data?.eBanking?.account?.list?.recentTransactions?.edges?.map((transaction) => (
            <TransactionCard
              accountName={
                data?.eBanking?.account?.list?.accounts?.find(
                  (account) => account?.id === transaction?.node?.accountId
                )?.name as string
              }
              transaction={transaction?.node}
            />
          ))
        )}
      </InfoCard>
    </Box>
  );
};

TransactionHistoryPage.getLayout = (page: ReactElement) => (
  <EbankingAccountLayout>{page}</EbankingAccountLayout>
);

export default TransactionHistoryPage;
