import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { AccountPopover } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeBlockInput,
  useSetBlockChequeRequestDataMutation,
} from '@coop/ebanking/data-access';
import { FormInput, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, PathBar, Text } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

export const EBankingFeatureBlockChequeRequest = () => {
  const router = useRouter();

  const methods = useForm<EBankingChequeBlockInput>();

  const { getValues } = methods;

  const { mutateAsync: addNewWithdrawViaCollectorRequest } = useSetBlockChequeRequestDataMutation();

  const memberID = getLoggedInUserId();

  const handleSubmitRequest = () => {
    asyncToast({
      id: 'add-new-block-cheque-request',
      promise: addNewWithdrawViaCollectorRequest({
        memberID,
        data: getValues(),
      }),
      msgs: {
        loading: 'Adding New Block Request',
        success: 'Added New Block Request',
      },
      onSuccess: () => {
        router.push('/coop');
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Cheque Block Request', link: '/coop/cheque/block' },
        ]}
      />
      <InfoCard
        title="Saving Account"
        subtitle="23,456.78"
        btn={<AccountPopover />}
        footerButtonLabel="Submit Request"
        footerButtonHandler={handleSubmitRequest}
      >
        <FormProvider {...methods}>
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <Text fontSize="r1" fontWeight={500} color="neutralColorLight.gray-70">
                Request to block cheque
              </Text>

              <FormInput type="text" name="chequeNumber" label="Cheque Number" />

              <FormTextArea name="reason" label="Reason" />
            </Box>
          </form>
        </FormProvider>
      </InfoCard>
    </Box>
  );
};

export default EBankingFeatureBlockChequeRequest;
