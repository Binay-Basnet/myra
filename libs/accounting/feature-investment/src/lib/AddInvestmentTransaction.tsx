import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

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
  InvestmentTransactionInput,
  InvestmentType,
  useSetInvestmentTransactionDataMutation,
} from '@coop/cbs/data-access';
import { FormInvestmentEntrySelect, FormSelect } from '@coop/shared/form';

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
  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<InvestmentTransactionInput>();

  const { watch, reset, getValues } = methods;

  const investmentType = watch('investmentType');

  const entryID = watch('entryID');

  useEffect(() => {
    reset({ investmentType, entryID: '' });
  }, [investmentType]);

  const { mutateAsync: setInvestmentTransaction } = useSetInvestmentTransactionDataMutation();

  const handleSave = () => {
    const values = getValues();

    let filteredValues;

    if (values.investmentType === InvestmentType.Saving) {
      filteredValues = {
        ...omit({ ...values }, ['share', 'fd']),
      };
    }

    if (values.investmentType === InvestmentType.Share) {
      filteredValues = {
        ...omit({ ...values }, ['saving', 'fd']),
      };
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
