import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import pickBy from 'lodash/pickBy';

import {
  InvestmentAccountInput,
  InvestmentType,
  useGetInvestmentAccountFormStateDataQuery,
  useSetInvestmentAccountDataMutation,
} from '@coop/cbs/data-access';
import { FormAddress, FormInput, FormSelect } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
} from '@coop/shared/ui';

const investmentTypeOptions = [
  { label: 'Share', value: InvestmentType.Share },
  { label: 'Savings / Deposits', value: InvestmentType.Saving },
  { label: 'Fixed Deposits', value: InvestmentType.FixedDeposit },
];

export const AddInvestmentAccount = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const id = router.query?.['id'];

  const methods = useForm<InvestmentAccountInput>();

  const { getValues, reset } = methods;

  const { data: accountFormStateQueryData } = useGetInvestmentAccountFormStateDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  const accountEditData = accountFormStateQueryData?.accounting?.investment?.accountFormState?.data;

  useEffect(() => {
    if (accountEditData) {
      reset({
        ...pickBy(
          {
            ...accountEditData,
            address: {
              ...accountEditData?.address,
              locality: accountEditData?.address?.locality?.local,
            },
          } ?? {},
          (v) => v !== null
        ),
      });
    }
  }, [accountEditData]);

  const { mutateAsync: upsertInvestmentAccount } = useSetInvestmentAccountDataMutation();

  const handleSubmit = () => {
    asyncToast({
      id: 'save-accounting-investment-account',
      promise: upsertInvestmentAccount({ id: String(id), data: getValues() }),
      msgs: {
        loading: 'Saving investment account',
        success: 'Investment account saved',
      },
      onSuccess: () => {
        queryClient.invalidateQueries('getInvesmentAccountsListData');
        router.push('/accounting/investment/investment-account/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Investment Account"
            closeLink="/accounting/investment/investment-account/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <FormSection>
                  <GridItem colSpan={2}>
                    <FormInput name="name" label="Name" />
                  </GridItem>

                  <FormSelect name="type" label="Type" options={investmentTypeOptions} />
                </FormSection>

                <FormAddress name="address" sectionId="address" sectionHeader="Address" />
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSubmit} />
          </Container>
        </Box>
      </Box>
    </>
  );
};
