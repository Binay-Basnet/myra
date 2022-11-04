import React, { useEffect } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { InfoCard } from '@coop/ebanking/cards';
import {
  EbankingSendMoneyInput,
  PurposeOfTransaction,
  useCheckForSendMoneyMutation,
  useGetAccountListQuery,
} from '@coop/ebanking/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, toast } from '@coop/shared/ui';

const purposes = [
  {
    label: 'Personal Use',
    value: PurposeOfTransaction.PersonalUse,
  },
  {
    label: 'Family Expenses',
    value: PurposeOfTransaction.FamilyExpenses,
  },
  {
    label: 'Bill Sharing',
    value: PurposeOfTransaction.BillSharing,
  },
  {
    label: 'Lend or Borrow',
    value: PurposeOfTransaction.LendOrBorrow,
  },
];

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

interface SendMoneyProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const SendMoneyForm = ({ setPaymentStatus }: SendMoneyProps) => {
  const { data: accountData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });

  const { mutateAsync: checkData } = useCheckForSendMoneyMutation();

  const accountOptions = accountData?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.id} ${account?.isDefault ? '( Default )' : ''}`,
    value: account?.id as string,
  }));

  const methods = useFormContext<EbankingSendMoneyInput>();

  useEffect(() => {
    methods.reset({});
  }, []);

  return (
    <InfoCard
      title="Send Money"
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(async (data) => {
            const response = await checkData({ data });

            if (response?.eBanking?.webUtilityPayments?.sendMoney?.check?.verified) {
              setPaymentStatus('review');
            } else {
              const error = response?.eBanking?.webUtilityPayments?.sendMoney?.check?.error;

              const badRequestError =
                error?.__typename === 'BadRequestError' ? error?.badRequestErrorMessage : '';

              if (badRequestError) {
                toast({
                  id: 'error',
                  type: 'error',
                  message: badRequestError as string,
                });
              } else {
                toast({
                  id: 'error',
                  type: 'error',
                  message: 'Something went wrong!!',
                });
              }
            }
          })}
        >
          <Box p="s16" display="flex" flexDir="column" gap="s32">
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem colSpan={2}>
                <FormSelect name="sourceAccount" label="Source Account" options={accountOptions} />
              </GridItem>

              <FormInput
                name="recipientName"
                label="Recipient Name"
                rules={{ required: 'Name is Required.' }}
              />

              <FormInput
                name="recipientMobileNumber"
                label="Recipient Mobile Number"
                rules={{ required: 'Mobile Number is Required.' }}
              />

              <FormInput
                name="recipientAccountNumber"
                label="Recipient Account Number"
                rules={{ required: 'Account Number is Required.' }}
              />

              <FormInput
                name="amount"
                type="number"
                label="Amount"
                rules={{ required: 'Transaction Amount is Required.' }}
              />
              <FormSelect
                name="purposeOfTransaction"
                label="Purpose"
                options={purposes}
                rules={{ required: 'Purpose is Required.' }}
              />
              <FormInput
                name="remarks"
                label="Remarks"
                rules={{ required: 'Remarks is Required.' }}
              />
            </Box>

            <Box display="flex" gap="s16">
              <Button w="100px" type="submit">
                Continue
              </Button>
              <Button
                type="reset"
                variant="outline"
                colorScheme="gray"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  methods.reset();
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </InfoCard>
  );
};
