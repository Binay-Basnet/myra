import { useMemo } from 'react';
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
  AccountingExpenseInput,
  useAddNewExpenseMutation,
  useGetSuppliersListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { ExpensesTable } from '../components';
import { ExpensesTotal } from '../components/ExpensesTotal';

export const AccountingFeaturePurchaseAddExpenses = () => {
  const methods = useForm<AccountingExpenseInput>();
  const router = useRouter();
  const { t } = useTranslation();

  const { mutateAsync } = useAddNewExpenseMutation();

  const { data: suppliersDetails } = useGetSuppliersListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = suppliersDetails?.inventory?.suppliers?.list?.edges;

  const supplierSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );

  return (
    <Container minW="container.xl" height="fit-content">
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={t['accountingExpensesAddNewExpense']} />
      </Box>

      <Box bg="white">
        <FormProvider {...methods}>
          <form>
            <Box minH="calc(100vh - 220px)">
              <FormSection>
                <GridItem colSpan={2}>
                  <FormSelect
                    name="supplierId"
                    label="Select Supplier Name"
                    options={supplierSearchOptions}
                  />
                </GridItem>

                <FormDatePicker name="date" label={t['accountingExpensesAddDate']} />

                <FormDatePicker name="dueDate" label={t['accountingExpensesAddDueDate']} />

                <FormInput
                  name="reference"
                  type="text"
                  label={t['accountingExpensesAddReference']}
                  placeholder={t['accountingExpensesAddReference']}
                />
              </FormSection>
              <ExpensesTable />
              <ExpensesTotal />
            </Box>
          </form>
        </FormProvider>
      </Box>

      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <FormFooter
          mainButtonLabel="Save"
          mainButtonHandler={async () => {
            await asyncToast({
              id: 'expense-add',
              promise: mutateAsync({
                data: {
                  ...methods.getValues(),
                  transferredLedgers: methods.getValues().transferredLedgers?.map((ledger) => ({
                    ...ledger,
                    amount: String(ledger?.amount),
                  })),
                },
              }),
              onSuccess: () => {
                router.push(ROUTES.ACCOUNTING_PURCHASE_EXPENSE);
              },
              msgs: {
                success: 'New Expense Added',
                loading: 'Adding new expense',
              },
            });
          }}
        />
      </Box>
    </Container>
  );
};
