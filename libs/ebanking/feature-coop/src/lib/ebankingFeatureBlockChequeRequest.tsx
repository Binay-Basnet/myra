import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormAccountHeader } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeBlockInput,
  useSetBlockChequeRequestDataMutation,
} from '@coop/ebanking/data-access';
import { FormInput, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, PathBar, Text } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

const formSchema = yup.object({
  chequeNumber: yup.string().required('This field is required.'),
  reason: yup.string().required('This field is required.'),
});

export const EBankingFeatureBlockChequeRequest = () => {
  const router = useRouter();

  const methods = useForm<EBankingChequeBlockInput>({
    resolver: yupResolver(formSchema),
  });

  const { getValues, handleSubmit } = methods;

  const { mutateAsync: addNewWithdrawViaCollectorRequest } = useSetBlockChequeRequestDataMutation();

  const memberID = getLoggedInUserId();

  const handleSubmitRequest = handleSubmit(() => {
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
  });

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <PathBar
        paths={[
          { label: 'COOP', link: '/coop' },
          { label: 'Cheque Block Request', link: '/coop/cheque/block' },
        ]}
      />
      <FormProvider {...methods}>
        <InfoCard
          header={<FormAccountHeader name="accountId" />}
          footerButtonLabel="Submit Request"
          footerButtonHandler={handleSubmitRequest}
        >
          <form>
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <Text fontSize="r1" fontWeight={500} color="gray.800">
                Request to block cheque
              </Text>

              <FormInput type="text" name="chequeNumber" label="Cheque Number" />

              <FormTextArea name="reason" label="Reason" />
            </Box>
          </form>
        </InfoCard>
      </FormProvider>
    </Box>
  );
};

export default EBankingFeatureBlockChequeRequest;
