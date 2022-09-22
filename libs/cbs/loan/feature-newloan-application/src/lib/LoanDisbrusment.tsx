import { FormProvider, useForm } from 'react-hook-form';

import { LoanDisbursementMethod, useGetBankListQuery } from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import { FormInput, FormSelect, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { Divider, FormAccountSelect, Grid, GridItem } from '@coop/shared/ui';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: LoanDisbursementMethod?.Account,
  },
  {
    label: 'Bank Cheque',
    value: LoanDisbursementMethod?.BankCheque,
  },
];

/* eslint-disable-next-line */
export interface PaymentProps {
  totalDeposit: number;
}

// type PaymentTableType = {
//   value: string;
//   quantity: string;
//   amount: string;
// };

export const Payment = () => {
  const methods = useForm();
  const { watch } = methods;

  const selectedPaymentMode = watch('method');

  const { data: bankList } = useGetBankListQuery();

  const memberId = watch('memberID');

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormProvider {...methods}>
          <form>
            <FormSwitchTab label="Disbursement Method" options={paymentModes} name="method" />

            {selectedPaymentMode === LoanDisbursementMethod?.Account && (
              <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                <GridItem colSpan={2}>
                  <FormAccountSelect
                    name="accountPayment.destinationAccount"
                    label="Destination Account"
                    memberId={memberId}
                  />
                </GridItem>
                <FormInput
                  name="amount"
                  type="number"
                  label="Amount"
                  textAlign="right"
                  placeholder="0.00"
                />
                <Divider />
                <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                  {' '}
                  <FormTextArea name="accountPayment.note" label="Note" />
                </GridItem>
              </Grid>
            )}

            {selectedPaymentMode === LoanDisbursementMethod?.BankCheque && (
              <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                {' '}
                <GridItem colSpan={2}>
                  <FormSelect
                    name="bankChequePayment.bankAccountId"
                    label="Bank Name"
                    options={
                      bankList?.bank?.bank?.list?.map((bank) => ({
                        label: bank?.name as string,
                        value: bank?.id as string,
                      })) ?? []
                    }
                  />
                </GridItem>
                <FormInput
                  name="bankChequePayment.chequeNo"
                  label="Cheque No"
                  placeholder="Cheque No"
                />
                <FormInput
                  name="amount"
                  type="number"
                  label="Amount"
                  textAlign="right"
                  placeholder="0.00"
                />
                {/* <FormInput
              type="date"
              name="cheque.depositedAt"
              label="Deposited Date"
            />

            <FormInput
              type="text"
              name="cheque.depositedBy"
              label="Deposited By"
            /> */}
                <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                  {' '}
                  <FormTextArea name="bankChequePayment.note" label="Note" />
                </GridItem>
              </Grid>
            )}
          </form>
        </FormProvider>
      </BoxContainer>
    </ContainerWithDivider>
  );
};
