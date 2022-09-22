import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositProductInput,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  ServiceType,
  useGetDepositProductSettingsEditDataQuery,
  useSetDepositProductMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountCloseServices,
  AccountOpenServices,
  AllowedTransaction,
  BalanceLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  DormantSetup,
  FixedDepositAmount,
  GridItems,
  Interest,
  LadderRate,
  MandatoryProduct,
  Penalty,
  PostingFrequency,
  PrematuredPenalty,
  Product,
  ProductCode,
  Questions,
  Rebate,
  RequiredDocumentSetup,
  Tenure,
  TransactionLimit,
  TypesOfMember,
  WithdrawPenalty,
} from '../components/form';

type SelectOption = {
  label: string;
  value: string;
}[];

type DepositForm = Omit<
  DepositProductInput,
  | 'genderId'
  | 'maritalStatusId'
  | 'educationQualification'
  | 'occupation'
  | 'ethnicity'
  | 'natureOFBusinessCoop'
  | 'natureOfBusinessInstitution'
> & {
  genderId: SelectOption;
  maritalStatusId: SelectOption;
  educationQualification: SelectOption;
  occupation: SelectOption;
  ethnicity: SelectOption;
  natureOFBusinessCoop: SelectOption;
  natureOfBusinessInstitution: SelectOption;
  chequeCharge: ServiceType[];
  atmCharge: ServiceType[];
};

export const SettingsDepositProductsAdd = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);

  const { mutateAsync } = useSetDepositProductMutation();

  const methods = useForm<DepositForm>({});

  const { getValues, watch, reset, resetField } = methods;
  const depositNature = watch('nature');
  const typesOfMember = watch('typeOfMember');

  const submitForm = () => {
    const values = getValues();

    const genderList = values?.genderId?.map((data) => data?.value);
    const maritalStatusList = values?.maritalStatusId?.map((data) => data?.value);
    const educationQualificationList = values?.educationQualification?.map((data) => data?.value);
    const occupationList = values?.occupation?.map((data) => data?.value);
    const ethnicityList = values?.ethnicity?.map((data) => data?.value);
    const natureOFBusinessCoopList = values?.natureOFBusinessCoop?.map((data) => data?.value);
    const natureOfBusinessInstitutionList = values?.natureOfBusinessInstitution?.map(
      (data) => data?.value
    );

    const ladderRateDataList = values?.ladderRateData?.map((data) => ({
      type: data?.type,
      rate: data?.rate,
      amount: data?.amount.toString(),
    }));

    const serviceChargeList = values?.serviceCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const accountCloseChargeList = values?.accountCloseCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const alternativeChannelList = values?.alternativeChannelCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const chequeChargeList = values?.chequeCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const atmChargeList = values?.atmCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const updatedData = {
      ...values,
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      ladderRateData: ladderRateDataList,
      serviceCharge: serviceChargeList,
      accountCloseCharge: accountCloseChargeList,
      chequeCharge: chequeChargeList,
      alternativeChannelCharge: alternativeChannelList,
      atmCharge: atmChargeList,
      tenureUnit: values?.tenureUnit ? values?.tenureUnit : null,
      maxTenureUnitNumber: values?.maxTenureUnitNumber ? values?.maxTenureUnitNumber : null,
      minTenureUnitNumber: values?.minTenureUnitNumber ? values?.minTenureUnitNumber : null,
      depositFrequency: values?.depositFrequency ? values?.depositFrequency : null,
      postingFrequency: values?.postingFrequency ? values?.postingFrequency : null,
      accountType: values?.accountType ? values?.accountType : null,
      penaltyData: {
        dayAfterInstallmentDate: values?.penaltyData?.dayAfterInstallmentDate ?? null,
        penaltyAmount: values?.penaltyData?.penaltyAmount ?? null,
        penaltyRate: values?.penaltyData?.penaltyRate ?? null,
        penaltyLedgerMapping: values?.penaltyData?.penaltyLedgerMapping ?? null,
      },
      rebateData: {
        dayBeforeInstallmentDate: values?.rebateData?.dayBeforeInstallmentDate ?? null,
        noOfInstallment: values?.rebateData?.noOfInstallment ?? null,
        rebateRate: values?.rebateData?.rebateRate ?? null,
        rebateAmount: values?.rebateData?.rebateAmount ?? null,
        rebateLedgerMapping: values?.rebateData?.rebateLedgerMapping ?? null,
      },
      maxAge: values?.maxAge ? Number(values?.maxAge) : null,
      minAge: values?.minAge ? Number(values?.minAge) : null,
      maxPostingFreqDifference: values?.maxPostingFreqDifference ?? null,
      percentageOfDeposit: values?.percentageOfDeposit ?? null,
      depositAmount: {
        maxAmount: values?.depositAmount?.maxAmount ?? null,
        minAmount: values?.depositAmount?.minAmount ?? null,
      },
      withdrawAmountLimit: {
        maxAmount: values?.withdrawAmountLimit?.maxAmount ?? null,
        minAmount: values?.withdrawAmountLimit?.minAmount ?? null,
      },
      fixedDepositAmountLimit: {
        maxAmount: values?.fixedDepositAmountLimit?.maxAmount ?? null,
        minAmount: values?.fixedDepositAmountLimit?.minAmount ?? null,
      },
      balanceLimit: {
        avgAmount: values?.balanceLimit?.avgAmount ?? null,
        maxAmount: values?.balanceLimit?.maxAmount ?? null,
        minAmount: values?.balanceLimit?.minAmount ?? null,
      },
      prematurePenalty: {
        ...values?.prematurePenalty,
        penaltyDateType: values?.prematurePenalty?.penaltyDateType
          ? values?.prematurePenalty?.penaltyDateType
          : null,
      },
    };

    asyncToast({
      id: 'deposit-id',
      msgs: {
        success: 'New Product Added',
        loading: 'Adding New Deposit',
      },
      onSuccess: () => router.push('/settings/general/deposit-products'),
      promise: mutateAsync({ id, data: updatedData }),
    });
  };

  const { data: editValues, refetch } = useGetDepositProductSettingsEditDataQuery(
    {
      id,
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.depositProduct?.formState?.data;

      if (editValueData) {
        reset({
          ...(editValueData as unknown as DepositForm),
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    resetField('minAge');
    resetField('maxAge');
    resetField('genderId');
    resetField('maritalStatusId');
    resetField('educationQualification');
    resetField('ethnicity');
    resetField('occupation');
    resetField('natureOfBusinessInstitution');
    resetField('foreignEmployment');
    resetField('cooperativeType');
    resetField('natureOFBusinessCoop');
    resetField('typeOfMember');
    resetField('criteria');
  }, [JSON.stringify(depositNature)]);

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['depositProductAddDepositProducts']} />
        </Container>
      </Box>
      <Container bg="white" height="fit-content" minW="container.lg" pb="120px" paddingInline="0">
        <FormProvider {...methods}>
          <form>
            <Box>
              <Product />
              <ProductCode />
              <TypesOfMember />

              <Box display="flex" flexDirection="column" gap="s16">
                {typesOfMember && <Critera />}
                <GridItems />
              </Box>

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <BalanceLimit />}

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.Saving) && <AllowedTransaction />}

              {depositNature === NatureOfDepositProduct.Current && <DepositFrequency />}

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <TransactionLimit />}

              {depositNature === NatureOfDepositProduct.Saving && <MandatoryProduct />}

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <DepositFrequency />}

              {(depositNature === NatureOfDepositProduct.Current ||
                depositNature === NatureOfDepositProduct.RecurringSaving) && (
                <>
                  {/* <DepositAmount /> */}
                  <Penalty />
                  <Rebate />
                </>
              )}

              {depositNature === NatureOfDepositProduct.TermSavingOrFd && <FixedDepositAmount />}

              {depositNature !== NatureOfDepositProduct.Current && <DefaultAccountName />}

              {depositNature !== NatureOfDepositProduct.Current && <Tenure />}

              {/* {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.TermSavingOrFd) && <MaximumTenure />} */}

              {depositNature !== NatureOfDepositProduct.Current && (
                <>
                  <Interest />
                  <PostingFrequency />
                </>
              )}

              <AccountOpenServices />
              <AccountCloseServices />

              <Questions />

              {depositNature === NatureOfDepositProduct.Saving && <LadderRate />}

              {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <DormantSetup />}

              <PrematuredPenalty />

              {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                depositNature === NatureOfDepositProduct.TermSavingOrFd) && <WithdrawPenalty />}

              {(typesOfMember?.includes(KymMemberTypesEnum.Individual) ||
                typesOfMember?.includes(KymMemberTypesEnum.Institution) ||
                typesOfMember?.includes(KymMemberTypesEnum.Cooperative) ||
                typesOfMember?.includes(KymMemberTypesEnum.CooperativeUnion)) && (
                <RequiredDocumentSetup />
              )}
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
                    Press Complete to save form
                  </Text>
                </Box>
              }
              mainButtonLabel={t['complete']}
              mainButtonHandler={() => submitForm()}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SettingsDepositProductsAdd;
