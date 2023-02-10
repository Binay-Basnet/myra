import { Box, GridItem, Text } from '@myra-ui';

import { CashValue } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

type DenominationTableType = {
  value: string;
  quantity: string;
  amount: string;
};

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
  { label: 'Paisa', value: 'PAISA' },
];

export const CashOptions: Record<string, string> = {
  '1000': CashValue.Cash_1000,
  '500': CashValue.Cash_500,
  '100': CashValue.Cash_100,
  '50': CashValue.Cash_50,
  '25': CashValue.Cash_25,
  '20': CashValue.Cash_20,
  '10': CashValue.Cash_10,
  '5': CashValue.Cash_5,
  '2': CashValue.Cash_2,
  '1': CashValue.Cash_1,
  PAISA: CashValue.Paisa,
};

type PurchaseProps = {
  denominationTotal: number;
  totalCashPaid?: number;
  returnAmount?: number;
  fieldName: string;
  cashPaid?: string;
  disableDenomination?: boolean;
  denominationTotalOnly?: boolean;
  hideReturnAmount?: boolean;
};

export const DenominationTable = ({
  denominationTotal,
  totalCashPaid,
  returnAmount = 0,
  fieldName,
  cashPaid,
  disableDenomination,
  denominationTotalOnly,
  hideReturnAmount = false,
}: PurchaseProps) => (
  <Box>
    {!disableDenomination && (
      <GridItem colSpan={3}>
        <FormEditableTable<DenominationTableType>
          name={fieldName}
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
              accessorFn: (row) =>
                row.value === 'PAISA'
                  ? Number(row.quantity) / 100
                  : row.quantity
                  ? Number(row.value) * Number(row.quantity)
                  : '0',
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
            { value: 'PAISA', quantity: '0', amount: '0' },
          ]}
          canDeleteRow={false}
          canAddRow={false}
        />
        {denominationTotalOnly ? (
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
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-60">
                Grand Total
              </Text>
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-60">
                {denominationTotal || 0}
              </Text>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            gap="s20"
            px="s8"
            py="s10"
            border="1px"
            borderColor="border.layout"
            borderRadius="br2"
          >
            <Box
              color="neutralColorLight.Gray-60"
              fontSize="r1"
              fontWeight="Regular"
              display="flex"
              flexDirection="column"
              gap="s8"
            >
              <Text>Total</Text>
              {!hideReturnAmount && <Text>Return</Text>}
              <Text>Grand Total</Text>
            </Box>

            <Box
              color="neutralColorLight.Gray-60"
              fontSize="r1"
              fontWeight="Regular"
              display="flex"
              flexDirection="column"
              gap="s8"
            >
              <Text>{denominationTotal}</Text>
              {!hideReturnAmount && <Text>{totalCashPaid ? returnAmount.toFixed(2) : 0}</Text>}
              <Text>{(totalCashPaid && totalCashPaid.toFixed(2)) || 0}</Text>
            </Box>
          </Box>
        )}
      </GridItem>
    )}

    {disableDenomination && (
      <GridItem colSpan={2}>
        <Box
          border="1px solid"
          borderColor="border.layout"
          display="flex"
          justifyContent="space-between"
          mt="s16"
          borderRadius="br2"
          p="s8"
        >
          <Box
            color="neutralColorLight.Gray-60"
            fontSize="r1"
            fontWeight="Regular"
            display="flex"
            flexDirection="column"
            gap="s8"
          >
            <Text>Total</Text>
            {!hideReturnAmount && <Text>Return</Text>}
            <Text>Grand Total</Text>
          </Box>

          <Box
            color="neutralColorLight.Gray-60"
            fontSize="r1"
            fontWeight="Regular"
            display="flex"
            flexDirection="column"
            gap="s8"
          >
            <Text>{cashPaid || 0}</Text>
            {!hideReturnAmount && <Text>{returnAmount.toFixed(2) || 0}</Text>}
            <Text>{Number(totalCashPaid).toFixed(2) || 0}</Text>
          </Box>
        </Box>
      </GridItem>
    )}
  </Box>
);
