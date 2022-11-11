import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormAccountHeader } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeWithdrawViaCollectorInput,
  useSetWithdrawViaCollectorRequestDataMutation,
} from '@coop/ebanking/data-access';
import { FormAgentSelect, FormBranchSelect, FormInput, FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, PathBar, Text } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

const formSchema = yup.object({
  branch: yup.string().required('This field is required.'),
  collector: yup.string().required('This field is required.'),
  date: yup.string().required('This field is required.'),
  amount: yup.string().required('This field is required.'),
});

export const EbankingFeaureWithdrawCollectorRequest = () => {
  const router = useRouter();

  const methods = useForm<EBankingChequeWithdrawViaCollectorInput>({
    resolver: yupResolver(formSchema),
  });

  const { getValues, handleSubmit } = methods;

  const { mutateAsync: addNewWithdrawViaCollectorRequest } =
    useSetWithdrawViaCollectorRequestDataMutation();

  const memberID = getLoggedInUserId();

  const handleSubmitRequest = handleSubmit(() => {
    asyncToast({
      id: 'add-new-withdraw-request',
      promise: addNewWithdrawViaCollectorRequest({
        memberID,
        data: getValues(),
      }),
      msgs: {
        loading: 'Adding New Withdraw Request',
        success: 'Added New Withdraw Request',
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
          { label: 'Withdraw Request via Market Representative', link: '/coop/cheque/withdraw' },
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
                Request to withdraw via collector
              </Text>

              <FormBranchSelect name="branch" label="Branch" />

              <FormAgentSelect label="Collector" name="collector" />

              <FormInput type="date" name="date" label="Date" />

              <FormInput type="number" name="amount" label="Amount" />
              <FormTextArea name="note" label="Note" />
            </Box>
          </form>
        </InfoCard>
      </FormProvider>
    </Box>
  );
};

export default EbankingFeaureWithdrawCollectorRequest;
