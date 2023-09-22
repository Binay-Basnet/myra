import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  AccountingBankAccountType,
  NewBankAccountInput,
  useAppSelector,
  useGetBankAccountDetailsQuery,
  useGetBankListQuery,
  useSetBankAccountsMutation,
  useUpdateBankAccountsMutation,
} from '@coop/cbs/data-access';
import {
  FormCOALedgerSelect,
  FormInput,
  FormLayout,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureAddBankAccountProps {}

export const AccountingFeatureAddBankAccount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm();
  const { getValues, reset, watch, setValue } = methods;

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

  const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const { mutateAsync: addAsync } = useSetBankAccountsMutation();
  const { mutateAsync: editAsync } = useUpdateBankAccountsMutation();

  const { data } = useGetBankListQuery();

  const bankList =
    data &&
    data?.bank?.bank?.list?.map((item) => ({
      label: item?.name as string,
      value: item?.id as string,
    }));

  const bankId = watch('bankId');
  const accountName = watch('accountName');

  const selectedBank = useMemo(
    () => bankList?.find((bank) => bank.value === bankId),
    [bankId, bankList]
  );

  useEffect(() => {
    if (selectedBank && !accountName) {
      setValue('accountName', `${selectedBank?.label} - `);
    }

    if (!selectedBank) {
      setValue('accountName', '');
    }
  }, [selectedBank, accountName]);

  const { data: bankAccountDetail } = useGetBankAccountDetailsQuery(
    { id: id as string },
    { enabled: !!id }
  );
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
    <FormLayout methods={methods}>
      <FormLayout.Header title={t['accountingBankAccountAddNewBankAccount']} />

      <FormLayout.Content>
        <FormLayout.Form>
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

            {router?.asPath?.includes('/add') && (
              <FormCOALedgerSelect
                name="ledgerId"
                label="Ledger"
                branchId={[branchId as string]}
                coaHead={['90.1', '90.2']}
              />
            )}
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
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel={t['save']} mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default AccountingFeatureAddBankAccount;
