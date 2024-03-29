import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { Box, Button, Icon, Text } from '@myra-ui';

import {
  BoxContainer,
  DividerContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput, FormLayout, FormSelect, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SupplierPaymentTable } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseAddSupplierPaymentProps {}

export const AccountingFeaturePurchaseAddSupplierPayment = () => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      data: [
        {
          amount: 45,
          left_to_allocate: 45,
          this_allocation: 23,
        },
      ],
      tds: '',
    },
  });

  const { watch } = methods;

  const tds = watch('tds');

  const booleanList = [
    { label: t['accountingSupplierPaymentAddTDSYes'], value: 'Yes' },
    { label: t['accountingSupplierPaymentAddTDSNo'], value: 'No' },
  ];

  const PaymentModes = [
    {
      label: t['accountingSupplierPaymentAddPaymentModeBankTransfer'],
      value: 'bankTransfer',
    },
    {
      label: t['accountingSupplierPaymentAddPaymentModeCheque'],
      value: 'cheque',
    },
    {
      label: t['accountingSupplierPaymentAddPaymentModeAccount'],
      value: 'account',
    },
    {
      label: t['accountingSupplierPaymentAddPaymentModeCash'],
      value: 'cash',
    },
  ];

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title={t['accountingSupplierPaymentAddNewSupplierPayment']} />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box bg="white" p="s20">
            <DividerContainer>
              <BoxContainer>
                <InputGroupContainer>
                  <FormSelect
                    name="paidTo"
                    label={t['accountingSupplierPaymentAddPaidTo']}
                    __placeholder={t['accountingSupplierPaymentAddPaidTo']}
                    options={[]}
                  />

                  <FormSelect
                    name="paidFrom"
                    label={t['accountingSupplierPaymentAddPaidFrom']}
                    __placeholder={t['accountingSupplierPaymentAddPaidFrom']}
                    options={[]}
                  />

                  <FormInput
                    name="date"
                    type="date"
                    label={t['accountingSupplierPaymentAddDate']}
                  />

                  <FormInput
                    name="amount"
                    type="number"
                    label={t['accountingSupplierPaymentAddAmount']}
                    textAlign="right"
                    __placeholder="0.00"
                  />

                  <FormInput
                    name="dueDate"
                    type="date"
                    label={t['accountingSupplierPaymentAddDueDate']}
                  />
                </InputGroupContainer>
              </BoxContainer>

              <BoxContainer>
                <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-80">
                  {t['accountingSupplierPaymentAddPaymentMode']}
                </Text>

                <FormSwitchTab name="paymentMode" options={PaymentModes} />

                <InputGroupContainer>
                  <FormInput
                    name="paymentReferenceNo"
                    type="text"
                    label={t['accountingSupplierPaymentAddPaymentReferenceNo']}
                    __placeholder={t['accountingSupplierPaymentAddPaymentReferenceNo']}
                  />
                </InputGroupContainer>
              </BoxContainer>

              <BoxContainer>
                <Box display="flex" justifyContent="space-between">
                  <Text fontSize="s3" fontWeight="500" color="gray.700">
                    {t['accountingSupplierPaymentAddTDS']}
                  </Text>

                  <FormSwitchTab options={booleanList} name="tds" />
                </Box>

                {tds === 'Yes' && (
                  <InputGroupContainer>
                    <FormSelect
                      name="tdsAccount"
                      label={t['accountingSupplierPaymentAddTDSAccount']}
                      __placeholder={t['accountingSupplierPaymentAddTDSAccount']}
                      options={[]}
                    />

                    <FormSelect
                      name="tdsType"
                      label={t['accountingSupplierPaymentAddTDSType']}
                      __placeholder={t['accountingSupplierPaymentAddTDSType']}
                      options={[]}
                    />

                    <FormInput
                      name="tdsAmount"
                      type="number"
                      label={t['accountingSupplierPaymentAddTDSAmount']}
                      textAlign="right"
                      __placeholder="0.00"
                    />
                  </InputGroupContainer>
                )}
              </BoxContainer>

              <SupplierPaymentTable />

              <BoxContainer>
                <FormTextArea
                  name="note"
                  label={t['invFormNotes']}
                  __placeholder={t['invFormNote']}
                  rows={5}
                />
              </BoxContainer>
            </DividerContainer>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        draftButton={
          <Button type="submit" variant="ghost" shade="neutral">
            <Icon as={BiSave} />
            <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
              {t['saveDraft']}
            </Text>
          </Button>
        }
        mainButtonLabel={t['submit']}
        mainButtonHandler={() => alert('Submitted')}
      />
    </FormLayout>
  );
};
