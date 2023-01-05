import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormEditableTable } from '@coop/shared/form';

const denominationsOptions = [
  { label: '1000x', value: '1000' },
  { label: '500x', value: '500' },
  { label: '100x', value: '100' },
  { label: '50x', value: '50' },
  { label: '25x', value: '25' },
  { label: '20x', value: '20' },
  { label: '10x', value: '10' },
  { label: '5x', value: '5' },
  { label: '2x', value: '2' },
  { label: '1x', value: '1' },
];

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

type DenominationProps = { availableCash: string | undefined | null };

export const Denomination = ({ availableCash }: DenominationProps) => {
  const method = useFormContext();
  const { watch } = method;

  const denominations = watch('denomination');
  const amount = watch('amount');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const returnTotal = denominationTotal - amount;

  const availableBalance = Number(availableCash?.split(' ')[1])?.toFixed(0) ?? 0;

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="Medium" color="gray.600">
            Sender Teller Available Cash
          </Text>
          <Text fontSize="r2" fontWeight="SemiBold" color="primary.500">
            {availableCash}
          </Text>
        </Box>
      </GridItem>

      <FormAmountInput
        isRequired
        name="amount"
        label="Cash Information"
        rules={{
          max: {
            value: availableBalance,
            message: 'Cash should be less than available balance',
          },
        }}
      />

      <GridItem colSpan={3} display="flex" flexDirection="column" gap="s4">
        <FormEditableTable<PaymentTableType>
          name="denomination"
          columns={[
            {
              accessor: 'value',
              header: 'Denomination',
              cellWidth: 'auto',
              fieldType: 'search',
              searchOptions: denominationsOptions,
            },
            {
              accessor: 'quantity',
              header: 'Quantity',
              isNumeric: true,
            },
            {
              accessor: 'amount',
              header: 'Amount',
              isNumeric: true,
              accessorFn: (row) => (row.quantity ? Number(row.value) * Number(row.quantity) : '0'),
            },
          ]}
          defaultData={[
            { value: '1000', quantity: '0', amount: '0' },
            { value: '500', quantity: '0', amount: '0' },
            { value: '100', quantity: '0', amount: '0' },
            { value: '50', quantity: '0', amount: '0' },
            { value: '25', quantity: '0', amount: '0' },
            { value: '20', quantity: '0', amount: '0' },
            { value: '10', quantity: '0', amount: '0' },
            { value: '5', quantity: '0', amount: '0' },
            { value: '2', quantity: '0', amount: '0' },
            { value: '1', quantity: '0', amount: '0' },
          ]}
          canDeleteRow={false}
          canAddRow={false}
        />

        <Box
          display="flex"
          flexDirection="column"
          gap="s20"
          px="s8"
          py="s10"
          border="1px"
          borderColor="border.layout"
          borderRadius="br2"
        >
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              Total
            </Text>
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              {denominationTotal.toFixed(2)}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              Return
            </Text>
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              {returnTotal ? returnTotal.toFixed(2) : 0.0}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              Grand Total
            </Text>
            <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
              {amount ? Number(amount).toFixed(2) : 0.0}
            </Text>
          </Box>
        </Box>
      </GridItem>
    </FormSection>
  );
};
