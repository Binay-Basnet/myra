import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

import { Box, Button, GridItem, Icon } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { useAppSelector, useGetAccountListQuery } from '@coop/ebanking/data-access';
import { FormAmountInput, FormNumberInput, FormSelect } from '@coop/shared/form';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading' | 'pending';

interface MobileTopupProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const MobileTopup = ({ setPaymentStatus }: MobileTopupProps) => {
  const user = useAppSelector((state) => state.auth.cooperative.user);
  const { data } = useGetAccountListQuery({ transactionPagination: { after: '', first: 1 } });

  const accounts = data?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber} ${
      user?.defaultAccount === account?.id ? '( Default Account )' : ''
    }`,
    value: account?.id as string,
  }));

  const { reset, handleSubmit } = useFormContext();

  return (
    <InfoCard
      title="Mobile Topup"
      btn={
        <Button variant="ghost" gap="s4">
          <Icon as={AiOutlinePlus} color="priamry.500" />
          Schedule for later
        </Button>
      }
    >
      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
          <GridItem colSpan={2}>
            <FormSelect
              name="sourceAccount"
              label="Source Account"
              options={accounts}
              rules={{ required: 'Source Account is required' }}
            />
          </GridItem>

          <FormNumberInput
            name="mobileNumber"
            label="Topup Number"
            rightElement={<Icon as={FaUser} color="gray.500" size="sm" />}
            rules={{
              required: 'Topup Number is Required.',
              maxLength: { value: 10, message: 'Invalid Subscription Number' },
              minLength: { value: 10, message: 'Invalid Subscription Number' },
            }}
          />

          <Box />

          <FormAmountInput
            name="amount"
            label="Amount"
            rules={{
              required: 'Transaction Amount is Required.',
              max: { value: 1001, message: 'Amount should be less than 1000' },
              min: { value: 9, message: 'Amount should be greater than 10' },
            }}
          />
        </Box>

        <Box display="flex" gap="s16">
          <Button w="100px" onClick={handleSubmit(() => setPaymentStatus('review'))}>
            Proceed
          </Button>
          <Button
            type="reset"
            variant="outline"
            colorScheme="gray"
            w="100px"
            cursor="pointer"
            onClick={() => {
              reset({ sourceAccount: '', mobileNumber: '', amount: '' });
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};
