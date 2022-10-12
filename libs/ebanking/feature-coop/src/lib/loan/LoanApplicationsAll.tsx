import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { AccountPopover } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import { EBankingServiceStatus, useGetLoanHistoryQuery } from '@coop/ebanking/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { Box, Button, Divider, PathBar, Tags, Text, VStack } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

const LoanStatusOptions = [
  { label: 'Active', value: EBankingServiceStatus.Active },
  { label: 'Approved', value: EBankingServiceStatus.Completed },
  { label: 'Declined', value: EBankingServiceStatus.Declined },
];

export const LoanApplicationsAll = () => {
  const router = useRouter();
  const methods = useForm({ defaultValues: { status: EBankingServiceStatus.Active } });

  const { watch } = methods;
  const status = watch('status');
  const memberId = getLoggedInUserId();

  const { data: loanHistoryData, refetch } = useGetLoanHistoryQuery({
    memberId,
    filter: { status },
  });

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  const loanHistory = loanHistoryData?.eBanking.cooperativeServices?.loan?.history?.data;

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Loan History', link: '/coop/loan/all' },
        ]}
        button={
          <Button
            justifyContent="start"
            leftIcon={<AddIcon />}
            onClick={() => router.push('/coop/loan/apply')}
          >
            Apply for Loan
          </Button>
        }
      />
      <InfoCard title="Loan History" btn={<AccountPopover />}>
        <Box p="s16" display="flex" flexDirection="column" gap="s16">
          <FormProvider {...methods}>
            <form>
              <FormSwitchTab name="status" label="Cheque History" options={LoanStatusOptions} />
            </form>
          </FormProvider>

          <VStack
            width="100%"
            bg="white"
            spacing="0"
            alignItems="start"
            gap="s16"
            divider={<Divider borderBottom="1px" borderBottomColor="border.layout" />}
          >
            {loanHistory && loanHistory.length !== 0 ? (
              loanHistory.map((loan) => (
                <Box display="flex" alignItems="center" w="100%" justifyContent="space-between">
                  <Box display="flex" flexDir="column" gap="s4">
                    <Box>
                      <Tags
                        type="chip"
                        bgColor="#F9CA2433"
                        fontSize="s2"
                        color="accent.0"
                        label={loan?.activeLoanStatus as string}
                      />
                    </Box>

                    <Text color="gray.900" fontSize="r1">
                      Loan for education
                    </Text>

                    <Text color="gray.600" fontSize="s3">
                      Lagankhel Branch
                    </Text>
                  </Box>
                  <Text fontSize="r1" fontWeight="600" color="gray.800">
                    {loan?.amount}
                  </Text>
                </Box>
              ))
            ) : (
              <Box w="100%" display="flex" justifyContent="center" py="s32">
                <EmptyState title="No Cheque History" />
              </Box>
            )}
          </VStack>
        </Box>
      </InfoCard>
    </Box>
  );
};
