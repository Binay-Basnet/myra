import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import { ExternalLoanPaymentInput, useSetExternalPaymentMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormExternalLoanSelect,
  FormLayout,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ExternalLoanPaymentAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<ExternalLoanPaymentInput>();

  const { getValues, watch, setValue } = methods;

  const principal = watch('principle');
  const interest = watch('interest');
  const rebate = watch('rebate');
  const fine = watch('fine');
  const otherCharge = watch('otherCharge');

  useEffect(() => {
    setValue(
      'amountPaid',
      String(
        Number(principal ?? 0) +
          Number(interest ?? 0) -
          Number(rebate ?? 0) +
          Number(fine ?? 0) +
          Number(otherCharge ?? 0)
      )
    );
  }, [principal, interest, rebate, fine, otherCharge]);

  const { mutateAsync } = useSetExternalPaymentMutation();

  const submitForm = () => {
    const values = getValues();

    asyncToast({
      id: 'external-loan-payment-id',
      msgs: {
        success: 'New External Loan Payment Added',
        loading: 'Adding External Loan Payment',
      },
      onSuccess: () => router.push(ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_LIST),
      promise: mutateAsync({ data: values }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanPaymentInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New External Loan Payment" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection>
            <GridItem colSpan={2}>
              <FormExternalLoanSelect name="loanId" label="Select Loan" />
            </GridItem>
            <GridItem colSpan={1}>
              <FormDatePicker name="date" label="Date" />
            </GridItem>
          </FormSection>

          <FormSection header="Installment Details">
            <FormAmountInput name="principle" label="Principal" type="number" textAlign="right" />
            <FormAmountInput name="interest" label="Interest" type="number" textAlign="right" />
            <FormAmountInput name="rebate" label="Rebate" type="number" textAlign="right" />
            <FormAmountInput name="fine" label="Fine" type="number" textAlign="right" />
            <FormAmountInput
              name="otherCharge"
              label="Other Charges"
              type="number"
              textAlign="right"
            />
            <FormAmountInput
              name="amountPaid"
              label="Amount Paid"
              type="number"
              textAlign="right"
              isDisabled
            />

            <GridItem colSpan={2}>
              <FormBankSelect label="Payment Through (Select Bank)" name="bankId" />
            </GridItem>
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel={t['save']} mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
