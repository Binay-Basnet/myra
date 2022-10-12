import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { AccountPopover } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import { EBankingServiceStatus, useGetComplaintsListQuery } from '@coop/ebanking/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { Box, Button, Divider, PathBar, Text, VStack } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

const ComplaintsOptions = [
  { label: 'Active', value: EBankingServiceStatus.Active },
  { label: 'Completed', value: EBankingServiceStatus.Completed },
  { label: 'Declined', value: EBankingServiceStatus.Declined },
];

export const PastComplaints = () => {
  const router = useRouter();
  const methods = useForm({ defaultValues: { status: EBankingServiceStatus.Active } });

  const { watch } = methods;
  const status = watch('status');
  const memberId = getLoggedInUserId();

  const { data: complaintData, refetch } = useGetComplaintsListQuery({
    memberId,
    filter: { status },
  });

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  const complaints = complaintData?.eBanking.cooperativeServices?.complaint?.history?.data;

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Past Complaints', link: '/coop/complaints/all' },
        ]}
        button={
          <Button
            justifyContent="start"
            leftIcon={<AddIcon />}
            onClick={() => router.push('/coop/complaints/new')}
          >
            New Complaint
          </Button>
        }
      />
      <InfoCard title="Loan History" btn={<AccountPopover />}>
        <Box p="s16" display="flex" flexDirection="column" gap="s16">
          <FormProvider {...methods}>
            <form>
              <FormSwitchTab name="status" label="Cheque History" options={ComplaintsOptions} />
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
            {complaints && complaints.length !== 0 ? (
              complaints.map((loan) => (
                <Box display="flex" alignItems="center" w="100%" justifyContent="space-between">
                  <Text fontSize="r1" color="gray.900">
                    {loan?.detailedAccount}
                  </Text>
                  <Text fontSize="s3" color="gray.500">
                    {loan?.feedbackDate}
                  </Text>
                </Box>
              ))
            ) : (
              <Box w="100%" display="flex" justifyContent="center" py="s32">
                <EmptyState title="No Past Complaints" />
              </Box>
            )}
          </VStack>
        </Box>
      </InfoCard>
    </Box>
  );
};
