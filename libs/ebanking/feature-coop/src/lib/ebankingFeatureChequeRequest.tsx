import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormAccountHeader } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeRequestInput,
  EBankingChequeRequestType,
  useSetChequeRequestDataMutation,
} from '@coop/ebanking/data-access';
import {
  FormAgentSelect,
  FormBranchSelect,
  FormNumberInput,
  FormSwitchTab,
} from '@coop/shared/form';
import { asyncToast, Box, PathBar } from '@coop/shared/ui';
import { getLoggedInUserId } from '@coop/shared/utils';

const RequestTypeOptions = [
  { label: 'Self-pickup', value: EBankingChequeRequestType.SelfPickup },
  { label: 'Through agent', value: EBankingChequeRequestType.ThroughAgent },
];

export const EbankingFeatureChequeRequest = () => {
  const router = useRouter();

  const methods = useForm<EBankingChequeRequestInput>({
    defaultValues: { type: EBankingChequeRequestType.SelfPickup },
  });

  const { watch, getValues } = methods;

  const type = watch('type');

  const { mutateAsync: addNewChequeRequest } = useSetChequeRequestDataMutation();

  const memberID = getLoggedInUserId();

  const handleSubmitRequest = async () => {
    await asyncToast({
      id: 'add-new-cheque-request',
      promise: addNewChequeRequest({
        memberID,
        data: {
          ...getValues(),
          noOfLeaves: Number(getValues().noOfLeaves),
        },
      }),
      msgs: {
        loading: 'Adding New Cheque Request',
        success: 'Added New Cheque Request',
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
          { label: 'Request Cheque', link: '/coop/cheque/request' },
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
              <FormSwitchTab name="type" label="Request Chequebook" options={RequestTypeOptions} />

              <FormNumberInput name="noOfLeaves" label="No. Of Leaves" />

              {type === EBankingChequeRequestType.SelfPickup && (
                <FormBranchSelect name="branch" label="Branch" />
              )}

              {type === EBankingChequeRequestType.ThroughAgent && (
                <FormAgentSelect label="Collector" name="collector" />
              )}
            </Box>
          </form>
        </InfoCard>
      </FormProvider>
    </Box>
  );
};

export default EbankingFeatureChequeRequest;
