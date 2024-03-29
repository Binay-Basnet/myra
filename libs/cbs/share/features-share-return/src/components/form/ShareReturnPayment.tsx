import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { SharePaymentMode } from '@coop/cbs/data-access';
import { ShareAccount, ShareCash } from '@coop/cbs/share/shared-ui';
import { FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BankCheque } from './BankCheque';

type ReturnProps = {
  totalAmount: number;
  denominationTotal: number;
  totalCashPaid: number;
  returnAmount: number;
};

export const ShareReturnPayment = ({
  totalAmount,
  denominationTotal,
  totalCashPaid,
  returnAmount,
}: ReturnProps) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const paymentModes = watch('paymentMode');

  const accountList = [
    { label: t['shareReturnCash'], value: SharePaymentMode.Cash },
    {
      label: t['shareReturnBankCheque'],
      value: SharePaymentMode.BankVoucherOrCheque,
    },
    { label: t['shareReturnAccount'], value: SharePaymentMode.Account },
  ];

  useEffect(() => {
    setValue('cash.cashPaid', String(totalAmount));
  }, [totalAmount, setValue]);

  return (
    <Box background="gray.0" borderRight="1px solid" borderColor="border.layout">
      <Box p="s20">
        <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Medium" mb="s16">
          {t['shareReturnPaymentMode']}
        </Text>

        <FormSwitchTab name="paymentMode" options={accountList} />
      </Box>

      <Box>
        {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
          <BankCheque totalAmount={totalAmount} />
        )}

        {paymentModes === SharePaymentMode.Account && <ShareAccount totalAmount={totalAmount} />}

        {paymentModes === SharePaymentMode.Cash && (
          <ShareCash
            denominationTotal={denominationTotal}
            totalCashPaid={totalCashPaid}
            returnAmount={returnAmount}
            totalAmount={totalAmount}
          />
        )}
      </Box>

      {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
        <FormSection>
          <GridItem colSpan={3}>
            <FormTextArea label="Note" name="bankCheque.note" />
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.Account && (
        <FormSection>
          <GridItem colSpan={3}>
            <FormTextArea label="Note" name="account.note" />
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.Cash && (
        <FormSection>
          <GridItem colSpan={3}>
            <FormTextArea label="Note" name="cash.note" />
          </GridItem>
        </FormSection>
      )}
    </Box>
  );
};
