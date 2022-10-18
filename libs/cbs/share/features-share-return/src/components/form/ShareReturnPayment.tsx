import { useFormContext } from 'react-hook-form';

import { SharePaymentMode } from '@coop/cbs/data-access';
import { ShareAccount, ShareCash } from '@coop/cbs/share/shared-ui';
import { FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
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
  const { watch } = methods;

  const paymentModes = watch('paymentMode');

  const accountList = [
    {
      label: t['shareReturnBankCheque'],
      value: SharePaymentMode.BankVoucherOrCheque,
    },
    { label: t['shareReturnAccount'], value: SharePaymentMode.Account },
    { label: t['shareReturnCash'], value: SharePaymentMode.Cash },
  ];

  return (
    <Box minHeight="100vh" background="gray.0" border="1px solid" borderColor="border.layout">
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
            <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
              {t['sharePurchaseNote']}
            </Text>
            <FormTextArea name="bankCheque.note" />
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.Account && (
        <FormSection>
          <GridItem colSpan={3}>
            <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
              {t['sharePurchaseNote']}
            </Text>
            <FormTextArea name="account.note" />
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.Cash && (
        <FormSection>
          <GridItem colSpan={3}>
            <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
              {t['sharePurchaseNote']}
            </Text>
            <FormTextArea name="cash.note" />
          </GridItem>
        </FormSection>
      )}
    </Box>
  );
};
