import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import {
  ExternalLoanApplicationInput,
  ExternalLoanPaymentMethod,
  FrequencyTenure,
  InstallmentFrequency,
  InvestmentType,
  LoanRepaymentScheme,
  useGetInvestmentEntriesListDataQuery,
  useGetNewIdMutation,
  useGetSettingsUserListDataQuery,
  useSetExternalLoanMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

import {
  AddCollateral,
  Documents,
  ExternalLoanInfo,
  Installment,
  Insurance,
  LoanProcessTable,
  LoanTenure,
} from '../component';

/* eslint-disable-next-line */
export interface ExternalLoanAddProps {}

export const ExternalLoanAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<ExternalLoanApplicationInput>({
    defaultValues: {
      tenureUnit: FrequencyTenure.Day,
      insurance: false,
      installmentType: LoanRepaymentScheme.Emi,
      installmentFrequency: InstallmentFrequency.Daily,
      paymentMethod: ExternalLoanPaymentMethod.Cash,
    },
  });
  // const id = String(router?.query?.['id']);
  const { getValues } = methods;

  const [collateralId, setCollateralId] = useState<string[]>([]);

  const { mutateAsync } = useSetExternalLoanMutation();

  const paymentModeList = [
    { label: 'Cash', value: ExternalLoanPaymentMethod.Cash },
    { label: 'Bank', value: ExternalLoanPaymentMethod.Bank },
  ];

  const { data: investmentData } = useGetInvestmentEntriesListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: { type: InvestmentType.FixedDeposit },
  });

  const investmentList = investmentData?.accounting?.investment?.listEntry?.edges;

  const fixedDepositList =
    investmentList &&
    investmentList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const { data: userListQueryData } = useGetSettingsUserListDataQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
    },
    { staleTime: 0 }
  );

  const userList = userListQueryData?.settings?.myraUser?.list?.edges;

  const representativeList =
    userList &&
    userList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setCollateralId([...collateralId, res.newId]);
    },
  });

  const addCollateral = () => {
    newIdMutate({});
  };

  const submitForm = () => {
    const values = getValues();

    asyncToast({
      id: 'external-loan-id',
      msgs: {
        success: 'New External Loan Added',
        loading: 'Adding External Loan',
      },
      onSuccess: () => router.push('/accounting/loan/external-loan/list'),
      promise: mutateAsync({ data: values }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ExternalLoanApplicationInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title="New External Loan" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <ExternalLoanInfo />

              <LoanTenure />

              <Installment />

              <FormSection header="Collaterals" divider={false}>
                <GridItem
                  p="s10"
                  border="1px solid"
                  borderColor="border.layout"
                  display="flex"
                  flexDirection="column"
                  gap="s16"
                  colSpan={3}
                  borderRadius="br2"
                >
                  {collateralId.map(() => (
                    <AddCollateral />
                  ))}
                  <Button
                    alignSelf="start"
                    leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                    variant="outline"
                    onClick={addCollateral}
                  >
                    Add New
                  </Button>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormSelect
                    name="fixDeposit"
                    label="Fix Deposit"
                    options={fixedDepositList ?? []}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormSelect
                    name="nameOfRepresentative"
                    label="Name of Representative"
                    options={representativeList ?? []}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="position" type="text" label="Position" />
                </GridItem>
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <LoanProcessTable />
                </GridItem>
              </FormSection>

              <Insurance />

              <FormSection>
                <FormSwitchTab
                  name="paymentMethod"
                  label="Payment Method"
                  defaultValue="cash"
                  options={paymentModeList}
                />
              </FormSection>
              <Documents />
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
            mainButtonHandler={submitForm}
          />
        </Container>
      </Box>
    </>
  );
};

export default ExternalLoanAdd;
