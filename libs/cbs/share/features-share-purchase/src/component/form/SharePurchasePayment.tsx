import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { SharePaymentMode, ShareVoucherDepositedBy } from '@coop/cbs/data-access';
import { ShareAccount, ShareCash } from '@coop/cbs/share/shared-ui';
import { FormFileInput, FormInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { BankVoucher } from './BankVoucher';

type PurchaseProps = {
  totalAmount: number;
  denominationTotal: number;
  totalCashPaid: number;
  returnAmount: number;
};

export const SharePurchasePayment = ({
  totalAmount,
  denominationTotal,
  totalCashPaid,
  returnAmount,
}: PurchaseProps) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const depositedBy = watch('bankVoucher.depositedBy');
  const paymentModes = watch('paymentMode');

  const accountList = [
    { label: t['sharePurchaseCash'], value: SharePaymentMode.Cash },
    {
      label: t['sharePurchaseBankVoucher'],
      value: SharePaymentMode.BankVoucherOrCheque,
    },
    { label: t['sharePurchaseAccount'], value: SharePaymentMode.Account },
  ];

  const depositedByList = [
    { label: t['sharePurchaseSelf'], value: ShareVoucherDepositedBy?.Self },
    {
      label: t['sharePurchaseOthers'],
      value: ShareVoucherDepositedBy?.Other,
    },
  ];

  useEffect(() => {
    setValue('cash.cashPaid', String(totalAmount));
  }, [totalAmount, setValue]);

  return (
    <Box minHeight="100vh" background="gray.0" borderRight="1px solid" borderColor="border.layout">
      <Box p="s20">
        <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Medium" mb="s16">
          {t['sharePurchasePaymentMode']}
        </Text>

        <FormSwitchTab
          name="paymentMode"
          options={accountList.map((value) => ({
            label: value.label,
            value: value.value,
          }))}
        />
      </Box>

      {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
        <BankVoucher totalAmount={totalAmount} />
      )}

      {paymentModes === SharePaymentMode.Account && <ShareAccount totalAmount={totalAmount} />}

      {paymentModes === SharePaymentMode.Cash && (
        <ShareCash
          totalAmount={totalAmount}
          denominationTotal={denominationTotal}
          totalCashPaid={totalCashPaid}
          returnAmount={returnAmount}
        />
      )}

      {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
        <FormSection>
          <GridItem colSpan={2}>
            <FormSwitchTab
              label={t['sharePurchaseDepositedBy']}
              name="bankVoucher.depositedBy"
              options={depositedByList}
            />
          </GridItem>
          {depositedBy === ShareVoucherDepositedBy?.Other && (
            <GridItem colSpan={2}>
              <GridItem colSpan={2}>
                <FormInput
                  type="text"
                  name="bankVoucher.depositedByOtherName"
                  label={t['sharePurchaseName']}
                />
              </GridItem>
              <GridItem mt="s10" colSpan={2}>
                <FormFileInput
                  name="bankVoucher.citizenshipDocument"
                  label={t['sharePurchaseCitizenshipDocument']}
                />
              </GridItem>
            </GridItem>
          )}
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
        <FormSection>
          <GridItem colSpan={3}>
            <Grid mt="s16" templateColumns="repeat(2,1fr)" gap="s20">
              <GridItem colSpan={1}>
                {/* <FormSelect
                  name="bankVoucher.sourceOfFund"
                  label={t['sharePurchaseSourceofFund']}
                  options={sourceOfFundsList.map((source) => ({
                    label: source,
                    value: source,
                  }))}
                /> */}
                <FormInput name="bankVoucher.sourceOfFund" label={t['sharePurchaseSourceofFund']} />
              </GridItem>
              <GridItem colSpan={1}>
                <FormFileInput name="bankVoucher.fileUpload" label={t['sharePurchaseFileUpload']} />
              </GridItem>
            </Grid>
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.Cash && (
        <FormSection>
          <GridItem colSpan={3}>
            <Grid mt="s16" templateColumns="repeat(2,1fr)" gap="s20">
              <GridItem colSpan={1}>
                {/* <FormSelect
                  name="cash.sourceOfFund"
                  label={t['sharePurchaseSourceofFund']}
                  options={sourceOfFundsList.map((source) => ({
                    label: source,
                    value: source,
                  }))}
                /> */}
                <FormInput name="cash.sourceOfFund" label={t['sharePurchaseSourceofFund']} />
              </GridItem>
              <GridItem colSpan={1}>
                <FormFileInput name="cash.fileUpload" label={t['sharePurchaseFileUpload']} />
              </GridItem>
            </Grid>
          </GridItem>
        </FormSection>
      )}

      {paymentModes === SharePaymentMode.BankVoucherOrCheque && (
        <FormSection divider={false}>
          <GridItem colSpan={3}>
            <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
              {t['sharePurchaseNote']}
            </Text>
            <FormTextArea name="bankVoucher.note" />
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
