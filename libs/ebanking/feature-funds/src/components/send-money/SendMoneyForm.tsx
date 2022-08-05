import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { InfoCard } from '@coop/ebanking/cards';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon } from '@coop/shared/ui';

type AccountTransferFormType = {
  source_account: string;
  destination_account: string;
  amount: string;
  remarks: string;
};

const accounts = [
  {
    label: 'Salary Saving Account - 10390390 ( Default Account )',
    value: '1',
  },
  {
    label: 'Current Account - 3904430',
    value: '2',
  },
];

const purposes = [
  {
    label: 'Personal Use',
    value: 'personal_use',
  },
  {
    label: 'Work Use',
    value: 'work_use',
  },
];

type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

interface SendMoneyProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const SendMoneyForm = ({ setPaymentStatus }: SendMoneyProps) => {
  const methods = useForm<AccountTransferFormType>({
    defaultValues: {
      source_account: '1',
    },
  });

  return (
    <InfoCard
      title={'Send Money'}
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            if (+data.amount < 1000) {
              methods.setError('amount', { message: 'Insufficient Amount.' });
              return;
            }
            setPaymentStatus('review');
          })}
        >
          <Box p="s16" display="flex" flexDir="column" gap="s32">
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem colSpan={2}>
                <FormSelect
                  name="source_account"
                  label="Source Account"
                  placeholder="Select Source Account"
                  options={accounts}
                />
              </GridItem>

              <FormInput
                name="recipient name"
                label="Recipient Name"
                placeholder="Enter recipient full name"
                rules={{ required: 'Name is Required.' }}
              />

              <FormInput
                name="recipient_mobile_number"
                label="Recipient Mobile Number"
                placeholder="Enter Recipient Mobile Number"
                rules={{ required: 'Mobile Number is Required.' }}
              />

              <FormInput
                name="recipient_account_number"
                label="Recipient Account Number"
                placeholder="Enter Account Number"
                rules={{ required: 'Account Number is Required.' }}
              />

              <FormInput
                name="amount"
                type="number"
                label="Amount"
                placeholder="0.00"
                rules={{ required: 'Transaction Amount is Required.' }}
              />
              <FormSelect
                name="purpose"
                label="Purpose"
                placeholder="Select Purpose of transaction"
                options={purposes}
                rules={{ required: 'Purpose is Required.' }}
              />
              <FormInput
                name="remarks"
                label="Remarks"
                placeholder="Enter Remarks"
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
