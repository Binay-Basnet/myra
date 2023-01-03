import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

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
  InstallmentFrequency,
  InvestmentEntryInput,
  InvestmentType,
  useAppSelector,
  useGetInvestmentAccountFormStateDataQuery,
  useGetInvestmentEntryFormStateDataQuery,
  useSetInvestmentEntryDataMutation,
} from '@coop/cbs/data-access';
import { FormInvestmentAccountSelect, FormSelect } from '@coop/shared/form';

import { FixedDepositInvestment, SavingsDepositsInvestment, ShareInvestment } from '../components';

const investmentTypeOptions = [
  { label: 'Share', value: InvestmentType.Share },
  { label: 'Savings / Deposits', value: InvestmentType.Saving },
  { label: 'Fixed Deposits', value: InvestmentType.FixedDeposit },
];

// type CustomShareInvestmentInput = Omit<ShareInvestmentInput, 'date'> & { date: string | undefined };
//
// type CustomSavingInvestmentInput = Omit<SavingInvestmentInput, 'openDate'> & {
//   openDate: string | undefined;
// };
//
// type CustomFDInvestmentInput = Omit<FdInvestmentInput, 'startDate' | 'maturityDate'> & {
//   startDate: string | undefined;
//   maturityDate: string | undefined;
// };
//
// type CustomInvestmentEntryInput = Omit<InvestmentEntryInput, 'share' | 'saving' | 'fd'> & {
//   share?: CustomShareInvestmentInput | undefined | null;
//   saving?: CustomSavingInvestmentInput | undefined | null;
//   fd?: CustomFDInvestmentInput | undefined | null;
// };

export const AddInvestment = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm<InvestmentEntryInput>({
    defaultValues: { saving: { frequency: InstallmentFrequency.Daily } },
  });

  const { watch, setValue, getValues, reset } = methods;

  const accountID = watch('accountID');

  const { data: accountFormStateQueryData } = useGetInvestmentAccountFormStateDataQuery(
    { id: accountID },
    { enabled: !!accountID }
  );

  const accountEditData = accountFormStateQueryData?.accounting?.investment?.accountFormState?.data;

  useEffect(() => {
    if (accountEditData) {
      setValue('investmentType', accountEditData?.type);
    }
  }, [accountEditData]);

  const investmentType = watch('investmentType');

  const { data: formStateQueryData } = useGetInvestmentEntryFormStateDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  const formState = formStateQueryData?.accounting?.investment?.entryFormState?.data;

  useEffect(() => {
    if (router?.asPath?.includes('edit')) {
      if (formState) {
        let filteredFormState: InvestmentEntryInput;

        if (formState.investmentType === InvestmentType.Saving) {
          filteredFormState = {
            accountID: formState.accountID,
            investmentType: formState.investmentType,
            saving: formState.saving,
          };
        }

        if (formState.investmentType === InvestmentType.Share) {
          filteredFormState = {
            accountID: formState.accountID,
            investmentType: formState.investmentType,
            share: formState.share,
          };
        }

        if (formState.investmentType === InvestmentType.FixedDeposit) {
          filteredFormState = {
            accountID: formState.accountID,
            investmentType: formState.investmentType,
            fd: formState.fd,
          };
        }

        reset({
          ...pickBy(
            {
              ...filteredFormState,
            } ?? {},
            (v) => v !== null
          ),
        });
      }
    }

    // if (router?.asPath?.includes('add')) {
    //   setValue('saving.openDate', '');
    //   setValue('share.date', '');
    //   setValue('fd.startDate', '');
    //   setValue('fd.maturityDate', '');
    // }
  }, [formState, preferenceDate]);

  const { mutateAsync: setInvestmentEntry } = useSetInvestmentEntryDataMutation();

  const handleSave = () => {
    const values = getValues();

    let filteredValues;

    if (values.investmentType === InvestmentType.Saving) {
      filteredValues = {
        ...omit({ ...values }, ['share', 'fd']),
        saving: values.saving,
      };
    }

    if (values.investmentType === InvestmentType.Share) {
      filteredValues = {
        ...omit({ ...values }, ['saving', 'fd']),
        share: { ...values.share, purchaseAmount: String(values?.share?.purchaseAmount) },
      };
    }

    if (values.investmentType === InvestmentType.FixedDeposit) {
      filteredValues = {
        ...omit({ ...values }, ['saving', 'share']),
        fd: values.fd,
      };
    }

    asyncToast({
      id: 'save-accounting-investment-entry',
      promise: setInvestmentEntry({ id: String(id), data: filteredValues as InvestmentEntryInput }),
      msgs: {
        loading: 'Saving investment entry',
        success: 'Investment entry saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getInvestmentEntriesListData']);
        router.push('/accounting/investment/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="New Investment Entry" closeLink="/accounting/investment/list" />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <FormSection>
                  <GridItem colSpan={2}>
                    <FormInvestmentAccountSelect
                      name="accountID"
                      label="Select Investment Account"
                    />
                  </GridItem>

                  <FormSelect
                    name="investmentType"
                    label="Investment Type"
                    options={investmentTypeOptions}
                    isDisabled
                  />
                </FormSection>

                {investmentType === InvestmentType.Share && <ShareInvestment />}
                {investmentType === InvestmentType.Saving && <SavingsDepositsInvestment />}
                {investmentType === InvestmentType.FixedDeposit && <FixedDepositInvestment />}
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
