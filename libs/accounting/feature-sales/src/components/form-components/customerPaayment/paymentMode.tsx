// import debounce from 'lodash/debounce';
import { CustomerPayment } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const PaymentMode = () => {
  const { t } = useTranslation();

  const paymentModeOptions = [
    {
      label: t['accountingCustomerPaymentAddPaymentModeBankTransfer'],
      value: CustomerPayment.BankTransfer,
    },
    {
      label: t['accountingCustomerPaymentAddPaymentModeCheque'],
      value: CustomerPayment.Cheque,
    },
    {
      label: t['accountingCustomerPaymentAddPaymentModeCash'],
      value: CustomerPayment.Cash,
    },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormSwitchTab
          name="paymentMethod"
          label={t['accountingCustomerPaymentAddPaymentMode']}
          options={paymentModeOptions}
        />
      </GridItem>

      <FormInput
        type="text"
        name="paymentReferenceNo"
        label={t['accountingCustomerPaymentAddPaymentReferenceNo']}
      />
    </FormSection>
  );
};
