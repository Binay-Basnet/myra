import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { BalanceValue } from '@coop/cbs/data-access';
import { DenominationTable } from '@coop/shared/components';
import { FormAmountInput, FormTextArea } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

type DenominationProps = { availableCash: BalanceValue | undefined | null };

export const Denomination = ({ availableCash }: DenominationProps) => {
  const method = useFormContext();
  const { watch } = method;

  const denominations = watch('denomination');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  // const availableBalance =
  //   Number(availableCash) === 0 ? 0 : Number(availableCash?.split(' ')[1])?.toFixed(0);

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="Medium" color="gray.600">
            Sender Teller Available Cash
          </Text>
          <Text fontSize="r2" fontWeight="SemiBold" color="primary.500">
            {debitCreditConverter(availableCash?.amount || 0, availableCash?.amountType as string)}
          </Text>
        </Box>
      </GridItem>

      <FormAmountInput
        isRequired
        name="amount"
        label="Cash Information"
        rules={{
          max: {
            value: Number(availableCash?.amount || 0),
            message: 'Insufficient balance',
          },
        }}
      />
      <GridItem colSpan={3}>
        <DenominationTable
          fieldName="denomination"
          denominationTotalOnly
          denominationTotal={denominationTotal}
        />
      </GridItem>
      <FormTextArea isRequired name="note" label="Note" />
    </FormSection>
  );
};
