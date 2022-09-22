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
type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

interface AccountTransferFormProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const AccountTransferForm = ({ setPaymentStatus }: AccountTransferFormProps) => {
  const methods = useForm<AccountTransferFormType>({
    defaultValues: {
      source_account: '1',
    },
  });

  return (
    <InfoCard
      title="Account Transfer"
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
                  __placeholder="Select Source Account"
                  options={accounts}
                />
              </GridItem>

              <GridItem colSpan={2}>
                <FormSelect
                  name="destination_account"
                  label="Destination Account"
                  __placeholder="Select Destination Account"
                  options={accounts}
                  rules={{ required: 'Destination Account is Required.' }}
                />
              </GridItem>

              <FormInput
                name="amount"
                type="number"
                label="Amount"
                __placeholder="0.00"
                rules={{ required: 'Transaction Amount is Required.' }}
              />
              <FormInput
                name="remarks"
                label="Remarks"
                __placeholder="Enter Remarks"
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
