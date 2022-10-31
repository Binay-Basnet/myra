import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { FormAccountHeader } from '@coop/ebanking/accounts';
import { ChequeRequestCard, InfoCard } from '@coop/ebanking/cards';
import { EmptyState } from '@coop/ebanking/components';
import {
  EBankingServiceStatus,
  useGetCoopPastChequeRequestsQuery,
} from '@coop/ebanking/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Divider,
  Icon,
  PathBar,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@coop/shared/ui';
import { getLoggedInUserId, useTranslation } from '@coop/shared/utils';

const ChequeStatusOptions = [
  { label: 'Active', value: EBankingServiceStatus.Active },
  { label: 'Completed', value: EBankingServiceStatus.Completed },
  { label: 'Declined', value: EBankingServiceStatus.Declined },
];

const dropdownButtons = [
  {
    label: 'Request Chequebook',
    link: '/coop/cheque/request',
  },
  {
    label: 'Withdraw via Collector',
    link: '/coop/cheque/withdraw',
  },
  {
    label: 'Block Cheque',
    link: '/coop/cheque/block',
  },
];

export const EBankingFeatureAllChequeRequests = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const methods = useForm({ defaultValues: { status: EBankingServiceStatus.Active } });

  const { watch } = methods;

  const memberId = getLoggedInUserId();

  const status = watch('status');

  const { data: chequeRequestsQueryData, refetch: refetchChequeRequests } =
    useGetCoopPastChequeRequestsQuery({
      memberId,
      filter: { status },
    });

  const chequeData = chequeRequestsQueryData?.eBanking?.cooperativeServices?.cheque?.pastRequests;

  useEffect(() => {
    refetchChequeRequests();
  }, [status]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'All Cheque Requests', link: '/coop/cheque/all' },
        ]}
        button={
          <Popover placement="bottom-end" gutter={3}>
            <PopoverTrigger>
              <Button justifyContent="start" leftIcon={<AddIcon />}>
                More Options
              </Button>
            </PopoverTrigger>

            <PopoverContent
              p={0}
              w="225px"
              _focus={{
                boxShadow: 'none',
              }}
            >
              <PopoverBody p={0}>
                <Box>
                  {dropdownButtons.map((addButton) => (
                    <Box
                      px="s16"
                      py="s10"
                      width="100%"
                      display="flex"
                      alignItems="center"
                      _hover={{ bg: 'gray.100' }}
                      cursor="pointer"
                      onClick={() => router.push(addButton.link)}
                      key={addButton.link}
                    >
                      <Icon mr="s10" size="sm" color="primary.500" as={AddIcon} />
                      <Text fontSize="r1" color="neutralColorLight.Gray-80">
                        {t[addButton.label] ?? addButton.label}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        }
      />
      <FormProvider {...methods}>
        <InfoCard header={<FormAccountHeader name="accountId" />}>
          <Box p="s16" display="flex" flexDirection="column" gap="s16">
            <form>
              <FormSwitchTab name="status" label="Cheque History" options={ChequeStatusOptions} />
            </form>

            <VStack
              width="100%"
              bg="white"
              spacing="0"
              alignItems="start"
              divider={<Divider borderBottom="1px" borderBottomColor="border.layout" />}
              borderRadius="br2"
            >
              {chequeData?.length === 0 || !chequeData ? (
                <Box w="100%" display="flex" justifyContent="center" py="s32">
                  <EmptyState title="No Cheque History" />
                </Box>
              ) : (
                chequeData?.map((request) => request && <ChequeRequestCard requestInfo={request} />)
              )}
            </VStack>
          </Box>
        </InfoCard>
      </FormProvider>
    </Box>
  );
};

export default EBankingFeatureAllChequeRequests;
