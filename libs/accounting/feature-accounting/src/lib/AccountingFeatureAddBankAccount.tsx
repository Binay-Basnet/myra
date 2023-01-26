import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@myra-ui';

import {
  AccountingBankAccountType,
  NewBankAccountInput,
  useGetBankAccountDetailsQuery,
  useGetBankListQuery,
  useSetBankAccountsMutation,
  useUpdateBankAccountsMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureAddBankAccountProps {}

export const AccountingFeatureAddBankAccount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm();
  const { getValues, reset } = methods;

  const accountTypeList = [
    {
      label: t['bankAccountCurrent'],
      value: AccountingBankAccountType.Current,
    },
    {
      label: t['bankAccountSaving'],
      value: AccountingBankAccountType.Saving,
    },
  ];

  const { mutateAsync: addAsync } = useSetBankAccountsMutation();
  const { mutateAsync: editAsync } = useUpdateBankAccountsMutation();

  const { data } = useGetBankListQuery();

  const bankList =
    data &&
    data?.bank?.bank?.list?.map((item) => ({
      label: item?.name as string,
      value: item?.id as string,
    }));

  const { data: bankAccountDetail } = useGetBankAccountDetailsQuery({ id: id as string });
  const editedData = bankAccountDetail?.accounting?.bankAccounts?.details?.data;

  const submitForm = () => {
    const values = getValues();

    if (id) {
      asyncToast({
        id: 'accounting-bank-account-id-edit',
        msgs: {
          success: 'Accounting Bank Account Edited',
          loading: 'Editing Accounting Bank Account',
        },
        onSuccess: () => router.push('/accounting/accounting/bank-accounts/list'),
        promise: editAsync({ data: { ...values, id: id as string } }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof NewBankAccountInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'accounting-bank-account-id',
        msgs: {
          success: 'New Accounting Bank Account Added',
          loading: 'Adding Accounting Bank Account',
        },
        onSuccess: () => router.push('/accounting/accounting/bank-accounts/list'),
        promise: addAsync({ data: values }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof NewBankAccountInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    }
  };

  useEffect(() => {
    if (editedData) {
      reset({ ...editedData });
    }
  }, [id, bankAccountDetail]);

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title={t['accountingBankAccountAddNewBankAccount']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection templateColumns={4}>
                <GridItem colSpan={2}>
                  <FormSelect
                    name="bankId"
                    label={t['accountingBankAccountAddSelectBank']}
                    options={bankList}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <FormInput
                    name="displayName"
                    type="text"
                    label={t['accountingBankAccountAddDisplayName']}
                  />
                </GridItem>
              </FormSection>

              <FormSection divider={false} header="bankAccountBankInformation">
                <GridItem colSpan={2}>
                  <FormInput
                    name="accountName"
                    type="text"
                    label={t['accountingBankAccountAddAccountName']}
                  />
                </GridItem>
                <FormInput
                  name="accountNumber"
                  type="text"
                  label={t['accountingBankAccountAddAccountNumber']}
                />
                <FormSelect
                  name="accountType"
                  label={t['accountingBankAccountAddAccountType']}
                  options={accountTypeList}
                />
                {/* <FormAmountInput
                  name="openingBalance"
                  textAlign="right"
                  label={t['accountingBankAccountAddOpeningBalance']}
                /> */}

                <GridItem colSpan={3}>
                  <FormTextArea
                    name="description"
                    label={t['accountingBankAccountAddDesciption']}
                    rows={5}
                  />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter mainButtonLabel={t['save']} mainButtonHandler={submitForm} />
        </Container>
      </Box>
    </>
  );
};

export default AccountingFeatureAddBankAccount;
