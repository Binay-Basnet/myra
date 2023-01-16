import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  DateType,
  InvestmentTransactionInput,
  InvestmentType,
  ShareInvestmentType,
  useAppSelector,
  useSetInvestmentTransactionDataMutation,
} from '@coop/cbs/data-access';
import { FormInvestmentEntrySelect, FormSelect } from '@coop/shared/form';
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
  FixedDepositTransaction,
  SavingsDepositsTransaction,
  ShareTransaction,
} from '../components';

const investmentTypeOptions = [
  { label: 'Share', value: InvestmentType.Share },
  { label: 'Savings / Deposits', value: InvestmentType.Saving },
  { label: 'Fixed Deposits', value: InvestmentType.FixedDeposit },
];

export const AddInvestmentTransaction = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<InvestmentTransactionInput>();

  const { watch, reset, getValues, resetField } = methods;

  const investmentType = watch('investmentType');

  const entryID = watch('entryID');

  useEffect(() => {
    reset({ investmentType, entryID: '' });
  }, [investmentType]);

  useEffect(() => {
    if (preferenceDate) {
      resetField('share.date');
      resetField('saving.amount');
    }
  }, [preferenceDate]);

  const { mutateAsync: setInvestmentTransaction } = useSetInvestmentTransactionDataMutation();

  const handleSave = () => {
    const values = getValues();

    let filteredValues;

    if (values.investmentType === InvestmentType.Saving) {
      filteredValues = {
        ...omit({ ...values }, ['share', 'fd']),
        saving: {
          ...values.saving,
          date:
            preferenceDate === DateType.Bs
              ? { np: values.saving?.date }
              : { en: values.saving?.date },
        },
      };
    }

    if (values.investmentType === InvestmentType.Share) {
      if (values.share?.type === ShareInvestmentType.ShareBonusDividend) {
        filteredValues = {
          ...omit({ ...values }, ['saving', 'fd']),
          share: {
            ...omit({ ...values.share }, [
              'shareReturnKitta',
              'sharePerKitta',
              'totalShareReturnAmount',
            ]),
            date:
              preferenceDate === DateType.Bs
                ? { np: values.share?.date }
                : { en: values.share?.date },
          },
        };
      }

      if (values.share?.type === ShareInvestmentType.ShareReturn) {
        filteredValues = {
          ...omit({ ...values }, ['saving', 'fd']),
          share: {
            ...omit({ ...values.share }, [
              'bonusAmount',
              'dividendAmount',
              'shareQuantity',
              'totalAmount',
            ]),
            date:
              preferenceDate === DateType.Bs
                ? { np: values.share?.date }
                : { en: values.share?.date },
          },
        };
      }
    }

    if (values.investmentType === InvestmentType.FixedDeposit) {
      filteredValues = {
        ...omit({ ...values }, ['saving', 'share']),
      };
    }

    asyncToast({
      id: 'save-accounting-investment-entry',
      promise: setInvestmentTransaction({
        data: filteredValues as InvestmentTransactionInput,
      }),
      msgs: {
        loading: 'Adding investment transaction',
        success: 'Investment transaction added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getInvestmentTransactionsListData']);
        router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Investment Transaction"
            closeLink="/accounting/investment/investment-transaction/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <FormSection>
                  <GridItem colSpan={2}>
                    <FormSelect
                      name="investmentType"
                      label="Investment Type"
                      options={investmentTypeOptions}
                    />
                  </GridItem>

                  <FormInvestmentEntrySelect
                    name="entryID"
                    label="Select Investment Entry"
                    type={investmentType}
                  />
                </FormSection>

                {entryID && (
                  <>
                    {investmentType === InvestmentType.Share && <ShareTransaction />}
                    {investmentType === InvestmentType.Saving && <SavingsDepositsTransaction />}
                    {investmentType === InvestmentType.FixedDeposit && <FixedDepositTransaction />}
                  </>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSave} />
          </Container>
        </Box>
      </Box>
    </>
  );
};
