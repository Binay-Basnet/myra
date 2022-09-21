import { useFormContext } from 'react-hook-form';

import { FormEditableTable, FormInput, FormSwitch } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type PaymentTableType = {
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
];

type PurchaseProps = {
  denominationTotal: number;
  totalCashPaid: number;
  returnAmount: number;
};

export const Cash = ({ denominationTotal, totalCashPaid, returnAmount }: PurchaseProps) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;

  const disableDenomination = watch('cash.disableDenomination');

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={1}>
        <FormInput type="text" name="cash.cashPaid" label={t['sharePurchaseCash']} />
      </GridItem>

      <GridItem colSpan={2}>
        <FormSwitch name="cash.disableDenomination" label={t['sharePurchaseDisableDenomination']} />
      </GridItem>

      {!disableDenomination && (
        <GridItem colSpan={2}>
          <FormEditableTable<PaymentTableType>
            name="cash.denominations"
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
                  row.quantity ? Number(row.value) * Number(row.quantity) : '0',
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
              <Text>{t['sharePurchaseTotal']}</Text>
              <Text>{t['sharePurchaseReturn']}</Text>
              <Text>{t['sharePurchaseGrandTotal']}</Text>
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
              <Text>{totalCashPaid ? returnAmount : 0}</Text>
              <Text>
                {denominationTotal && returnAmount ? denominationTotal + returnAmount : 0}
              </Text>
            </Box>
          </Box>
        </GridItem>
      )}
    </FormSection>
  );
};
