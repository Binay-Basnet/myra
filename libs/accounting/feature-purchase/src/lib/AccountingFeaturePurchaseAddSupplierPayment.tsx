import { FormProvider, useForm, ArrayPath } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';

import {
  BoxContainer,
  DividerContainer,
  InputGroupContainer,
  AccountsDetailPageLayout,
} from '@coop/accounting/ui-components';
import {
  FormInput,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SupplierPaymentTable } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseAddSupplierPaymentProps {}

export function AccountingFeaturePurchaseAddSupplierPayment(
  props: AccountingFeaturePurchaseAddSupplierPaymentProps
) {
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
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <Box
          height="50px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="neutralColorLight.Gray-0"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
          position="sticky"
          top="110px"
          zIndex={8}
        >
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            {t['accountingSupplierPaymentAddNewSupplierPayment']}
          </Text>
          <IconButton
            variant={'ghost'}
            aria-label="close"
            icon={<GrClose />}
            onClick={() => router.back()}
          />
        </Box>

        <FormProvider {...methods}>
          <form>
            <Box bg="white" p="s20">
              <DividerContainer>
                <BoxContainer>
                  <InputGroupContainer>
                    <FormSelect
                      name="paidTo"
                      label={t['accountingSupplierPaymentAddPaidTo']}
                      placeholder={t['accountingSupplierPaymentAddPaidTo']}
                      options={[]}
                    />

                    <FormSelect
                      name="paidFrom"
                      label={t['accountingSupplierPaymentAddPaidFrom']}
                      placeholder={t['accountingSupplierPaymentAddPaidFrom']}
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
                      textAlign={'right'}
                      placeholder="0.00"
                    />

                    <FormInput
                      name="dueDate"
                      type="date"
                      label={t['accountingSupplierPaymentAddDueDate']}
                    />
                  </InputGroupContainer>
                </BoxContainer>

                <BoxContainer>
                  <Text
                    fontSize={'s3'}
                    fontWeight="500"
                    color="neutralColorLight.Gray-80"
                  >
                    {t['accountingSupplierPaymentAddPaymentMode']}
                  </Text>

                  <FormSwitchTab name={'paymentMode'} options={PaymentModes} />

                  <InputGroupContainer>
                    <FormInput
                      name="paymentReferenceNo"
                      type="text"
                      label={
                        t['accountingSupplierPaymentAddPaymentReferenceNo']
                      }
                      placeholder={
                        t['accountingSupplierPaymentAddPaymentReferenceNo']
                      }
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
                        placeholder={
                          t['accountingSupplierPaymentAddTDSAccount']
                        }
                        options={[]}
                      />

                      <FormSelect
                        name="tdsType"
                        label={t['accountingSupplierPaymentAddTDSType']}
                        placeholder={t['accountingSupplierPaymentAddTDSType']}
                        options={[]}
                      />

                      <FormInput
                        name="tdsAmount"
                        type="number"
                        label={t['accountingSupplierPaymentAddTDSAmount']}
                        textAlign={'right'}
                        placeholder="0.00"
                      />
                    </InputGroupContainer>
                  )}
                </BoxContainer>

                <SupplierPaymentTable />

                <BoxContainer>
                  <FormTextArea
                    name="note"
                    label={t['invFormNotes']}
                    placeholder={t['invFormNote']}
                    rows={5}
                  />
                </BoxContainer>
              </DividerContainer>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  {t['formDetails']}
                </Text>
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  09:41 AM
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost">
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => alert('Submitted')}
          />
        </Container>
      </Box>
    </>
  );
}
