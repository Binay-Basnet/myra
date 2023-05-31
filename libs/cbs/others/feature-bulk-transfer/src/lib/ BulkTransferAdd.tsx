import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronsRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

import { Alert, asyncToast, Box, FormSection, GridItem, Icon, Text } from '@myra-ui';

import {
  Arrange,
  BulkTransferInput,
  BulkTransferType,
  NatureOfDepositProduct,
  useBulkTransferMutation,
  useGetCoaFullViewQuery,
  useGetDepositProductSettingsListQuery,
} from '@coop/cbs/data-access';
import { localizedText, ROUTES } from '@coop/cbs/utils';
import {
  FormAmountInput,
  FormCOASelectModal,
  FormLayout,
  FormRadioGroup,
  FormSelect,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { BulkTransferAccountTable } from '../components';

const bulkTransferOptions: { label: string; value: BulkTransferType }[] = [
  { label: 'One to many', value: 'ONE_TO_MANY' },
  { label: 'Many to one', value: 'MANY_TO_ONE' },
];

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

type OptionType = { label: string; value: string };

export const BulkTransferAdd = () => {
  const router = useRouter();

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const methods = useForm<BulkTransferInput>({
    defaultValues: { bulkTransferType: 'ONE_TO_MANY' },
  });

  const { watch, getValues } = methods;

  const bulkTransferType = watch('bulkTransferType');

  const ledger = watch('ledger');

  const savingProduct = watch('savingProduct');

  const amount = watch('amount');

  const { data: fullView } = useGetCoaFullViewQuery();

  const { data: depositProductListData, isFetching } = useGetDepositProductSettingsListQuery({
    paginate: {
      first: -1,
      order: {
        arrange: Arrange.Desc,
        column: 'ID',
      },
      after: '',
    },
  });

  const productOptions = [
    ...(depositProductListData?.settings?.general?.depositProduct?.list?.edges?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: `${currentValue?.node?.productName} [${
            accountTypes[currentValue?.node?.nature as NatureOfDepositProduct]
          }]`,
          value: currentValue?.node?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];

  const selectedLedgerName = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView?.data?.find((ldg) => ldg?.id === ledger)?.name,
    [ledger, fullView]
  );

  const selectedProductName = useMemo(
    () =>
      depositProductListData?.settings?.general?.depositProduct?.list?.edges?.find(
        (product) => product?.node?.id === savingProduct
      )?.node?.productName,
    [depositProductListData, savingProduct]
  );

  const { mutateAsync: addBulkTransfer } = useBulkTransferMutation();

  const handleSubmit = () => {
    asyncToast({
      id: 'add-bulk-transfer',
      promise: addBulkTransfer({ data: { ...getValues(), accounts: selectedAccounts } }),
      msgs: {
        loading: 'Adding bulk transfer',
        success: 'Bulk transfer added',
      },
      onSuccess: () => router.push(ROUTES.CBS_OTHERS_BULK_TRANSFERS_LIST),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Bulk Transfer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection>
            <FormRadioGroup
              name="bulkTransferType"
              label="Bulk Transfer Type"
              options={bulkTransferOptions}
            />

            <GridItem colSpan={3}>
              <Box display="flex" alignItems="center" gap="s20">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="s4"
                  flex={1}
                  order={bulkTransferType === 'ONE_TO_MANY' ? 1 : 3}
                >
                  <Text variant="formLabel">Ledger</Text>
                  <FormCOASelectModal name="ledger" />
                </Box>

                <Icon as={FiChevronsRight} color="gray.500" order={2} />

                <Box flex={1} order={bulkTransferType === 'ONE_TO_MANY' ? 3 : 1}>
                  <FormSelect
                    name="savingProduct"
                    label="Product"
                    isLoading={isFetching}
                    options={productOptions}
                  />
                </Box>
              </Box>
            </GridItem>

            <FormAmountInput name="amount" label="Amount to be transferred" />

            {ledger && savingProduct && amount && (
              <GridItem colSpan={3}>
                <Alert
                  status="info"
                  title="Bulk Transfer Details"
                  subtitle={
                    bulkTransferType === 'ONE_TO_MANY'
                      ? `Transfer of ${amountConverter(
                          amount || 0
                        )} from "${ledger} - ${localizedText(
                          selectedLedgerName
                        )}" to "${selectedProductName}"`
                      : `Transfer of ${amountConverter(
                          amount || 0
                        )} from "${selectedProductName}" to "${ledger} - ${localizedText(
                          selectedLedgerName
                        )}"`
                  }
                  hideCloseIcon
                />
              </GridItem>
            )}
          </FormSection>

          {savingProduct && ledger && amount && (
            <BulkTransferAccountTable
              productId={savingProduct as string}
              productName={selectedProductName as string}
              setSelectedAccounts={setSelectedAccounts}
            />
          )}
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Bulk Transfer" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};

export default BulkTransferAdd;
