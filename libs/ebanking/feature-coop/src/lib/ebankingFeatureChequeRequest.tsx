import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { asyncToast, Box, PathBar } from '@myra-ui';

import { FormAccountHeader } from '@coop/ebanking/accounts';
import { InfoCard } from '@coop/ebanking/cards';
import {
  EBankingChequeRequestInput,
  EBankingChequeRequestType,
  useSetChequeRequestDataMutation,
} from '@coop/ebanking/data-access';
import {
  FormAgentSelectEbanking,
  FormBranchSelectEbanking,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { getLoggedInUserId } from '@coop/shared/utils';

const RequestTypeOptions = [
  { label: 'Self-pickup', value: EBankingChequeRequestType.SelfPickup },
  { label: 'Through agent', value: EBankingChequeRequestType.ThroughAgent },
];

const formSchema = yup.object({
  type: yup.string(),
  branch: yup.string().when('type', {
    is: 'Self_Pickup',
    then: yup.string().required('This field is Required'),
  }),
  collector: yup.string().when('type', {
    is: 'Through_agent',
    then: yup.string().required('This field is Required'),
  }),
  noOfLeaves: yup.string().required('This field is Required'),
});

export const EbankingFeatureChequeRequest = () => {
  const router = useRouter();

  const methods = useForm<EBankingChequeRequestInput>({
    defaultValues: { type: EBankingChequeRequestType.SelfPickup },
    resolver: yupResolver(formSchema),
  });

  const { watch, getValues, handleSubmit, reset } = methods;

  const type = watch('type');

  const { mutateAsync: addNewChequeRequest } = useSetChequeRequestDataMutation();

  const memberID = getLoggedInUserId();

  const handleSubmitRequest = handleSubmit(async () => {
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
  });

  useEffect(() => {
    methods.clearErrors();
  }, [type, reset]);

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

              <FormSelect
                options={[
                  { label: '10', value: 10 },
                  { label: '20', value: 20 },
                  { label: '50', value: 50 },
                  {
                    label: '100',
                    value: 100,
                  },
                ]}
                name="noOfLeaves"
                label="No. Of Leaves"
              />

              {type === EBankingChequeRequestType.SelfPickup ? (
                <FormBranchSelectEbanking name="branch" label="Branch" />
              ) : (
                <FormAgentSelectEbanking label="Collector" name="collector" />
              )}

              <FormTextArea name="note" label="Note" />
            </Box>
          </form>
        </InfoCard>
      </FormProvider>
    </Box>
  );
};

export default EbankingFeatureChequeRequest;
