import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Box, Button, GridItem, Icon } from '@myra-ui';

import { InfoCard } from '@coop/ebanking/cards';
import { useAppSelector, useGetAccountListQuery } from '@coop/ebanking/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

interface AccountTransferFormProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const AccountTransferForm = ({ setPaymentStatus }: AccountTransferFormProps) => {
  const user = useAppSelector((state) => state.auth.cooperative.user);
  const { data: destinationAccountsData } = useGetAccountListQuery({
    listFilter: { allowedAccount: false },
    transactionPagination: { after: '', first: 1 },
  });

  const destintationAccounts = destinationAccountsData?.eBanking?.account?.list?.accounts?.map(
    (account) => ({
      label: `${account?.name} - ${account?.accountNumber} ${
        user?.defaultAccount === account?.id ? '( Default Account )' : ''
      }`,
      value: account?.id as string,
    })
  );

  const { data: sourceAccountsData } = useGetAccountListQuery({
    listFilter: { allowedAccount: true },
    transactionPagination: { after: '', first: 1 },
  });

  const sourceAccounts = sourceAccountsData?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber} ${
      user?.defaultAccount === account?.id ? '( Default Account )' : ''
    }`,
    value: account?.id as string,
  }));

  const methods = useFormContext();

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
      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
          <GridItem colSpan={2}>
            <FormSelect name="sourceAccount" label="Source Account" options={sourceAccounts} />
          </GridItem>

          <GridItem colSpan={2}>
            <FormSelect
              name="destinationAccount"
              label="Destination Account"
              options={destintationAccounts}
              rules={{ required: 'Destination Account is Required.' }}
            />
          </GridItem>

          <FormInput
            name="amount"
            type="number"
            label="Amount"
            placeholder="0.00"
            rules={{ required: 'Transaction Amount is Required.' }}
          />
          <FormInput name="remarks" label="Remarks" rules={{ required: 'Remarks is Required.' }} />
        </Box>

        <Box display="flex" gap="s16">
          <Button w="100px" type="submit" onClick={() => setPaymentStatus('review')}>
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
              methods.setValue('amount', '');
              methods.setValue('remarks', '');
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </InfoCard>
  );
};
