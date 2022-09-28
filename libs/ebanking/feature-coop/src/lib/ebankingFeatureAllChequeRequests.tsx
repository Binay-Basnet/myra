import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { AccountPopover } from '@coop/ebanking/accounts';
import { ChequeRequestCard, InfoCard } from '@coop/ebanking/cards';
import {
  EBankingServiceStatus,
  useGetCoopPastChequeRequestsQuery,
} from '@coop/ebanking/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Icon,
  PathBar,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
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

  useEffect(() => {
    refetchChequeRequests();
  }, [status]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Cheque Block Request', link: '/coop/cheque/block' },
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
                      <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                      <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
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
      <InfoCard title="Saving Account" subtitle="23,456.78" btn={<AccountPopover />}>
        <Box p="s16" display="flex" flexDirection="column" gap="s16">
          <FormProvider {...methods}>
            <form>
              <FormSwitchTab name="status" label="Cheque History" options={ChequeStatusOptions} />
            </form>
          </FormProvider>

          <Box>
            {chequeRequestsQueryData?.eBanking?.cooperativeServices?.cheque?.pastRequests?.map(
              (request) => request && <ChequeRequestCard requestInfo={request} />
            )}
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};

export default EBankingFeatureAllChequeRequests;
