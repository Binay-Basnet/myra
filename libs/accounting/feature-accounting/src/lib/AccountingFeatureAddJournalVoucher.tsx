import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, FormSection, GridItem, ResponseDialog, Text } from '@myra-ui';

import {
  JournalVoucherInput,
  JournalVoucherPaymentMode,
  useApproveIbtMutation,
  useGetEndOfDayDateDataQuery,
  useSetJournalVoucherDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, localizedTime } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormLayout, FormTextArea } from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

import { JournalVouchersTable } from '../components';
import { CustomJournalVoucherInput } from '../types';

/* eslint-disable-next-line */

export const AccountingFeatureAddJournalVoucher = () => {
  const { t } = useTranslation();
  const { data } = useGetEndOfDayDateDataQuery();

  const transactionDate = data?.transaction?.endOfDayDate?.value?.en;

  const router = useRouter();

  const redirectFrom = router?.query['redirectFrom'];

  const requestId = router?.query['requestId'];

  const methods = useForm<CustomJournalVoucherInput>({
    defaultValues: {
      paymentMode: JournalVoucherPaymentMode.Cash,
      notes:
        redirectFrom === 'IBT' ? `IBT TRANSFER FROM ${router?.query?.['senderBranch']} BRANCH` : '',
    },
  });

  const { getValues, setValue } = methods;

  const { mutateAsync } = useSetJournalVoucherDataMutation();

  const { mutateAsync: approveIbt } = useApproveIbtMutation();

  const handleSave = () => {
    const values = getValues();

    const filteredValues = {
      ...values,
      entries: values?.entries?.map((entry) => ({
        accountId: entry.accountId.value,
        drAmount: String(entry.drAmount),
        crAmount: String(entry.crAmount),
        description: entry.description,
      })),
    };
    return filteredValues as JournalVoucherInput;
  };

  useEffect(() => {
    setValue('date', { en: transactionDate as string, local: '', np: '' });
  }, [setValue, transactionDate]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={`${t['accountingJournalVoucherAddNewJournalVoucher']} - ${featureCode.newJournalVoucher}`}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection>
            <FormDatePicker
              isRequired
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
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel={t['save']}
        mainButtonHandler={handleSave}
        mainButton={
          redirectFrom ? (
            <ResponseDialog
              onSuccess={() => router.back()}
              promise={() => approveIbt({ requestId: requestId as string, data: handleSave() })}
              successCardProps={(response) => {
                const result = response?.transaction?.approveIBT?.record;
                const temp: Record<string, React.ReactNode> = {};

                let total = 0;

                result?.entries?.forEach((fee, index) => {
                  if (fee?.value?.includes('Dr')) {
                    total += Number(fee?.value?.split('. ')[1] ?? 0);
                  }

                  if (fee?.name && fee?.value) {
                    temp[`${index + 1}. ${fee.name}`] = fee?.value?.includes('Dr') ? (
                      <Box display="flex" gap="s8">
                        <Text fontSize="s3" fontWeight="600">
                          {amountConverter(fee?.value?.split('. ')[1])}
                        </Text>
                        <Text fontSize="s3" color="accent.700" fontWeight="600">
                          DR
                        </Text>
                      </Box>
                    ) : (
                      <Box display="flex" gap="s8">
                        <Text fontSize="s3" fontWeight="600">
                          {amountConverter(fee?.value?.split('. ')[1])}
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
                  showSignatures: true,
                  jVPrint: {
                    glTransactions: result?.glTransaction,
                    date: result?.date?.local,
                    note: result?.note,
                    refrence: result?.reference,
                    totalDebit: result?.totalAmount,
                    transactionId: result?.transactionId,
                    transactionTime: localizedTime(result?.createdAt),
                  },
                  total: amountConverter(total),
                  totalWords: amountToWordsConverter(total),
                  title: 'Journal Voucher Entry Successful',
                  details: {
                    'Transaction Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.transactionId}
                      </Text>
                    ),
                    Date: localizedDate(result?.date),
                    'Transaction Time': localizedTime(result?.createdAt),
                    Refrence: result?.reference,
                    ...temp,
                    'Total Amount': amountConverter(total),
                    'Total Amount in words': amountToWordsConverter(total),

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
          ) : (
            <ResponseDialog
              onSuccess={() => router.back()}
              promise={() => mutateAsync({ data: handleSave() })}
              successCardProps={(response) => {
                const result = response?.accounting?.journalVoucher?.new?.record;
                const temp: Record<string, React.ReactNode> = {};

                let total = 0;

                result?.entries?.forEach((fee, index) => {
                  if (fee?.value?.includes('Dr')) {
                    total += Number(fee?.value?.split('. ')[1] ?? 0);
                  }

                  if (fee?.name && fee?.value) {
                    temp[`${index + 1}. ${fee.name}`] = fee?.value?.includes('Dr') ? (
                      <Box display="flex" gap="s8">
                        <Text fontSize="s3" fontWeight="600">
                          {amountConverter(fee?.value?.split('. ')[1])}
                        </Text>
                        <Text fontSize="s3" color="accent.700" fontWeight="600">
                          DR
                        </Text>
                      </Box>
                    ) : (
                      <Box display="flex" gap="s8">
                        <Text fontSize="s3" fontWeight="600">
                          {amountConverter(fee?.value?.split('. ')[1])}
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
                  showSignatures: true,
                  jVPrint: {
                    glTransactions: result?.glTransaction,
                    date: result?.date?.local,
                    note: result?.note,
                    refrence: result?.reference,
                    totalDebit: result?.totalAmount,
                    transactionId: result?.transactionId,
                    transactionTime: localizedTime(result?.createdAt),
                  },
                  totalWords: amountToWordsConverter(total),
                  title: 'Journal Voucher Entry Successful',
                  details: {
                    'Transaction Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.transactionId}
                      </Text>
                    ),
                    Date: localizedDate(result?.date),
                    'Transaction Time': localizedTime(result?.createdAt),
                    Refrence: result?.reference,
                    ...temp,
                    'Total Amount': amountConverter(total),
                    'Total Amount in words': amountToWordsConverter(total),

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
          )
        }
      />
    </FormLayout>
  );
};

export default AccountingFeatureAddJournalVoucher;
