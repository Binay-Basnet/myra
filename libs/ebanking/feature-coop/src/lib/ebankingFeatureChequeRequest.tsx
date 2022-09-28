import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { AccountPopover } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeRequestInput,
  EBankingChequeRequestType,
  useSetChequeRequestDataMutation,
} from '@coop/ebanking/data-access';
import { FormAgentSelect, FormBranchSelect, FormSwitchTab } from '@coop/shared/form';
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

  const handleSubmitRequest = () => {
    asyncToast({
      id: 'add-new-cheque-request',
      promise: addNewChequeRequest({
        memberID,
        data: getValues(),
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
              <FormSwitchTab name="type" label="Request Chequebook" options={RequestTypeOptions} />

              {type === EBankingChequeRequestType.SelfPickup && (
                <FormBranchSelect name="branch" label="Branch" />
              )}

              {type === EBankingChequeRequestType.ThroughAgent && (
                <FormAgentSelect label="Collector" name="collector" />
              )}
            </Box>
          </form>
        </FormProvider>
      </InfoCard>
    </Box>
  );
};

export default EbankingFeatureChequeRequest;
