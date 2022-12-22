import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {} from 'lodash/omit';

import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import { JournalVoucherPaymentMode, useSetJournalVoucherDataMutation } from '@coop/cbs/data-access';
import { FormInput, FormLocalDatePicker, FormTextArea } from '@coop/shared/form';
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

  const { mutateAsync: setJournalVoucherData } = useSetJournalVoucherDataMutation();

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

    asyncToast({
      id: 'set-accounting-journal-voucher-data',
      msgs: {
        loading: 'Adding journal voucher',
        success: 'Journal voucher added',
      },
      promise: setJournalVoucherData({ data: filteredValues }),
      onSuccess: () => router.back(),
    });
  };

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title={t['accountingJournalVoucherAddNewJournalVoucher']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <FormLocalDatePicker
                  name="date"
                  type="date"
                  label={t['accountingJournalVoucherAddDueDate']}
                />
                <FormInput
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
          <FormFooter mainButtonLabel={t['save']} mainButtonHandler={handleSave} />
        </Container>
      </Box>
    </>
  );
};

export default AccountingFeatureAddJournalVoucher;
