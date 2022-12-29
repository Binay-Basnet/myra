import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  ResponseDialog,
  Text,
} from '@myra-ui';

import {
  JournalVoucherInput,
  JournalVoucherPaymentMode,
  useSetJournalVoucherDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { JournalVouchersTable } from '../components';
import { CustomJournalVoucherInput } from '../types';

/* eslint-disable-next-line */
export interface AccountingFeatureAddJournalVoucherProps {}

// const PaymentModeOptions = [
//   { label: 'Cash', value: JournalVoucherPaymentMode.Cash },
//   { label: 'Cheque', value: JournalVoucherPaymentMode.Cheque },
// ];

export const AccountingFeatureAddJournalVoucher = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const methods = useForm<CustomJournalVoucherInput>({
    defaultValues: { paymentMode: JournalVoucherPaymentMode.Cash },
  });

  const { getValues } = methods;

  // const paymentMode = watch('paymentMode');

  const { mutateAsync } = useSetJournalVoucherDataMutation();

  const handleSave = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      // eslint-disable-next-line unused-imports/no-unused-vars
      entries: values?.entries?.map((entry) => ({
        accountId: entry.accountId,
        drAmount: String(entry.drAmount),
        crAmount: String(entry.crAmount),
        description: entry.description,
      })),
    };
    return filteredValues as JournalVoucherInput;
    // asyncToast({
    //   id: 'set-accounting-journal-voucher-data',
    //   msgs: {
    //     loading: 'Adding journal voucher',
    //     success: 'Journal voucher added',
    //   },
    //   promise: setJournalVoucherData({ data: filteredValues }),
    //   onSuccess: () => router.back(),
    // });
  };

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title={t['accountingJournalVoucherAddNewJournalVoucher']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <FormDatePicker
                  isRequired
                  name="date"
                  type="date"
                  label={t['accountingJournalVoucherAddDueDate']}
                />
                <FormInput
                  isRequired
                  name="reference"
                  type="text"
                  label={t['accountingJournalVoucherAddReference']}
                />
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <JournalVouchersTable />
                </GridItem>
              </FormSection>

              {/* <FormSection>
                <GridItem colSpan={3}>
                  <FormSwitchTab
                    name="paymentMode"
                    label="Payment Mode"
                    options={PaymentModeOptions}
                  />
                </GridItem>

                {paymentMode === JournalVoucherPaymentMode.Cheque && (
                  <FormInput name="chequeNo" label="Cheque No" />
                )}
              </FormSection> */}
              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormTextArea
                    isRequired
                    name="notes"
                    label={t['accountingJournalVoucherAddNotes']}
                    rows={3}
                  />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            mainButtonLabel={t['save']}
            mainButtonHandler={handleSave}
            mainButton={
              <ResponseDialog
                onSuccess={() => router.back()}
                promise={() => mutateAsync({ data: handleSave() })}
                successCardProps={(response) => {
                  const result = response?.accounting?.journalVoucher?.new?.record;
                  const temp: Record<string, React.ReactNode> = {};

                  result?.entries?.forEach((fee) => {
                    if (fee?.name && fee?.value) {
                      temp[String(fee.name)] = fee?.value?.includes('Dr') ? (
                        <Box display="flex" gap="s8">
                          <Text fontSize="s3" fontWeight="600">
                            {fee?.value?.split('.')[1]}
                          </Text>
                          <Text fontSize="s3" color="accent.700" fontWeight="600">
                            DR
                          </Text>
                        </Box>
                      ) : (
                        <Box display="flex" gap="s8">
                          <Text fontSize="s3" fontWeight="600">
                            {fee?.value?.split('.')[1]}
                          </Text>
                          <Text fontSize="s3" color="accent.100" fontWeight="600">
                            CR
                          </Text>
                        </Box>
                      );
                    }
                  });

                  return {
                    type: 'Journal Voucher',

                    title: 'Journal Voucher Entry Successful',
                    details: {
                      'Transaction Id': (
                        <Text fontSize="s3" color="primary.500" fontWeight="600">
                          {result?.transactionId}
                        </Text>
                      ),
                      Date: localizedDate(result?.date),
                      Refrence: result?.reference,
                      ...temp,
                      Note: result?.note,
                    },
                    subTitle:
                      'Journal Voucher entered successfully. Details of the entry is listed below.',
                  };
                }}
                errorCardProps={{
                  title: 'Jornal Voucher Entry Failed',
                }}
              >
                <Button width="160px">{t['save']}</Button>
              </ResponseDialog>
            }
          />
        </Container>
      </Box>
    </>
  );
};

export default AccountingFeatureAddJournalVoucher;
