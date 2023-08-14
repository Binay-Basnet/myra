import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { asyncToast, Box, Loader, Text } from '@myra-ui';

import {
  CriteriaSection,
  DepositFrequency as DepositFreq,
  DepositProductInput,
  Frequency,
  FrequencyTenure,
  Id_Type,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  ServiceType,
  useGetDepositProductSettingsEditDataQuery,
  useGetNewIdMutation,
  useSetDepositProductMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

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
  | 'typeOfMember'
  | 'maritalStatusId'
  | 'educationQualification'
  | 'occupation'
  | 'ethnicity'
  | 'natureOFBusinessCoop'
  | 'natureOfBusinessInstitution'
> & {
  typeOfMember: KymMemberTypesEnum | undefined | string;
  genderId: SelectOption;
  maritalStatusId: SelectOption;
  educationQualification: SelectOption;
  occupation: SelectOption;
  ethnicity: SelectOption;
  natureOFBusinessCoop: SelectOption;
  natureOfBusinessInstitution: SelectOption;
  chequeCharge: ServiceType[];
  atmCharge: ServiceType[];
  isFrequencyMandatory: boolean;
};

export const SettingsDepositProductsAdd = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [newId, setNewId] = useState('');
  const { mutateAsync: getId } = useGetNewIdMutation();
  useEffect(() => {
    getId({ idType: Id_Type.Depositproduct }).then((res) => setNewId(res?.newId as string));
  }, []);

  const id = (router?.query?.['id'] as string) || newId;

  const { mutateAsync } = useSetDepositProductMutation();

  const methods = useForm<DepositForm>({
    mode: 'onChange',
    defaultValues: {
      depositFrequency: Frequency.Daily,
      transactionAllowed: DepositFreq.Monthly,
      isTenureApplicable: false,
      penalty: false,
      rebate: false,
      postingFrequency: DepositFreq.Daily,
      autoOpen: false,
      staffProduct: false,
      isForMinors: false,
      atmFacility: false,
      chequeIssue: false,
      allowLoan: false,
      supportMultiple: false,
      withdrawRestricted: false,
      wealthBuildingProduct: false,
      ladderRate: false,
      isMandatorySaving: false,
      alternativeChannels: false,
      tenureUnit: FrequencyTenure.Day,
      isPrematurePenaltyApplicable: false,
    },
  });

  const { getValues, watch, reset } = methods;
  const criteria = watch('criteria');
  const chequeIssue = watch('chequeIssue');
  const penalty = watch('penalty');
  const rebate = watch('rebate');
  const atmFacility = watch('atmFacility');
  const allowLoan = watch('allowLoan');
  const depositNature = watch('nature');
  const ladderRate = watch('ladderRate');
  const typesOfMember = watch('typeOfMember');
  const withdrawRestricted = watch('withdrawRestricted');
  const isMandatorySaving = watch('isMandatorySaving');

  const submitForm = () => {
    const values = getValues();

    const genderList = criteria?.includes(CriteriaSection.Gender)
      ? values?.genderId?.map((data) => data?.value ?? data)
      : null;
    const maritalStatusList = criteria?.includes(CriteriaSection.MaritalStatus)
      ? values?.maritalStatusId?.map((data) => data?.value ?? data)
      : null;
    const educationQualificationList = criteria?.includes(CriteriaSection.EducationQualification)
      ? values?.educationQualification?.map((data) => data?.value ?? data)
      : null;
    const occupationList = criteria?.includes(CriteriaSection.OccupationDetails)
      ? values?.occupation?.map((data) => data?.value ?? data)
      : null;
    const ethnicityList = criteria?.includes(CriteriaSection.Ethnicity)
      ? values?.ethnicity?.map((data) => data?.value ?? data)
      : null;
    const natureOFBusinessCoopList = criteria?.includes(CriteriaSection.NatureOfBusinessCoopunion)
      ? values?.natureOFBusinessCoop?.map((data) => data?.value ?? data)
      : null;
    const natureOfBusinessInstitutionList = criteria?.includes(
      CriteriaSection.NatureOfBusinessInstitutions
    )
      ? values?.natureOfBusinessInstitution?.map((data) => data?.value ?? data)
      : null;
    const coopTypeList = criteria?.includes(CriteriaSection.CooperativeType)
      ? values?.cooperativeType?.map((data) => data)
      : null;

    const ladderRateDataList = ladderRate
      ? values?.ladderRateData?.map((data) => ({
          type: data?.type,
          rate: data?.rate,
          amount: data?.amount.toString(),
        }))
      : null;

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

    const chequeChargeList = chequeIssue
      ? values?.chequeCharge?.map((data) => ({
          serviceName: data?.serviceName,
          ledgerName: data?.ledgerName,
          amount: data?.amount.toString(),
        }))
      : null;

    const atmChargeList = atmFacility
      ? values?.atmCharge?.map((data) => ({
          serviceName: data?.serviceName,
          ledgerName: data?.ledgerName,
          amount: data?.amount.toString(),
        }))
      : null;

    const updatedData = {
      ...omit(values, ['isFrequencyMandatory']),
      typeOfMember: values?.typeOfMember ?? null,
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      cooperativeType: coopTypeList,
      ladderRateData: ladderRateDataList,
      serviceCharge: serviceChargeList,
      accountCloseCharge: accountCloseChargeList,
      chequeCharge: chequeChargeList,
      atmCharge: atmChargeList,
      isTenureApplicable:
        depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.TermSavingOrFd
          ? true
          : values?.isTenureApplicable,
      specifyWithdrawRestriction: withdrawRestricted ? values?.specifyWithdrawRestriction : null,
      transactionAllowed:
        depositNature !== NatureOfDepositProduct.TermSavingOrFd && values?.transactionAllowed
          ? values?.transactionAllowed
          : null,
      tenureUnit:
        depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.TermSavingOrFd
          ? values?.tenureUnit ?? null
          : null,
      maxTenureUnitNumber:
        depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.TermSavingOrFd
          ? values?.maxTenureUnitNumber ?? null
          : null,
      minTenureUnitNumber:
        depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.TermSavingOrFd
          ? values?.minTenureUnitNumber ?? null
          : null,
      depositFrequency:
        (depositNature === NatureOfDepositProduct.RecurringSaving &&
          values?.isFrequencyMandatory) ||
        isMandatorySaving
          ? values?.depositFrequency
          : null,
      postingFrequency: values?.postingFrequency ? values?.postingFrequency : null,
      accountType: values?.accountType ? values?.accountType : null,
      productPremiumInterest: values?.productPremiumInterest ?? null,
      interest: {
        additionalRate: values?.interest?.additionalRate ?? null,
        boardAuthority: values?.interest?.boardAuthority ?? null,
        ceoAuthority: values?.interest?.ceoAuthority ?? null,
        defaultRate: values?.interest?.defaultRate ?? null,
        maxRate: values?.interest?.maxRate ?? null,
        minRate: values?.interest?.minRate ?? null,
        changeMin: values?.interest?.changeMin ?? null,
        changeMax: values?.interest?.changeMax ?? null,
      },
      penaltyData: {
        dayAfterInstallmentDate: penalty ? values?.penaltyData?.dayAfterInstallmentDate : null,
        penaltyAmount: penalty ? values?.penaltyData?.penaltyAmount : null,
        penaltyRate: penalty ? values?.penaltyData?.penaltyRate : null,
      },
      rebateData: {
        dayBeforeInstallmentDate: rebate ? values?.rebateData?.dayBeforeInstallmentDate : null,
        noOfInstallment: rebate ? values?.rebateData?.noOfInstallment : null,
        rebateRate: rebate ? values?.rebateData?.rebateRate : null,
        rebateAmount: rebate ? values?.rebateData?.rebateAmount : null,
        rebateLedgerMapping: rebate ? values?.rebateData?.rebateLedgerMapping : null,
      },
      maxAge:
        values?.maxAge && criteria?.includes(CriteriaSection.Age) ? Number(values?.maxAge) : null,
      minAge:
        values?.minAge && criteria?.includes(CriteriaSection.Age) ? Number(values?.minAge) : null,
      maxPostingFreqDifference: values?.maxPostingFreqDifference ?? null,
      percentageOfDeposit: allowLoan ? values?.percentageOfDeposit : null,
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
      // isPrematurePenaltyApplicable:
      //   depositNature === NatureOfDepositProduct.RecurringSaving ||
      //   depositNature === NatureOfDepositProduct.TermSavingOrFd
      //     ? true
      //     : values?.isPrematurePenaltyApplicable,
      prematurePenalty:
        depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.TermSavingOrFd
          ? {
              ...values?.prematurePenalty,
              penaltyDateType: values?.prematurePenalty?.penaltyDateType
                ? values?.prematurePenalty?.penaltyDateType
                : null,
            }
          : null,
    };

    asyncToast({
      id: 'deposit-id',
      msgs: {
        success: router?.asPath?.includes('/edit')
          ? 'Saving Product Updated'
          : 'New Saving Product Added',
        loading: router?.asPath?.includes('/edit')
          ? 'Updated Saving Product'
          : 'Adding New Saving Product',
      },
      onSuccess: () => router.push(ROUTES.SETTINGS_GENERAL_SP_LIST),
      promise: mutateAsync({
        id,
        data: updatedData as unknown as DepositProductInput,
        edit: router?.asPath?.includes('/edit'),
      }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof DepositProductInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  const {
    data: editValues,
    refetch,
    isLoading: editDataLoading,
  } = useGetDepositProductSettingsEditDataQuery(
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
          isFrequencyMandatory: !!editValueData?.depositFrequency,
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  // useEffect(() => {
  //   reset({
  //     ...getValues(),
  //     typeOfMember: '',
  //   });
  //   resetField('minAge');
  //   resetField('maxAge');
  //   resetField('genderId');
  //   resetField('maritalStatusId');
  //   resetField('educationQualification');
  //   resetField('ethnicity');
  //   resetField('occupation');
  //   resetField('natureOfBusinessInstitution');
  //   resetField('foreignEmployment');
  //   resetField('cooperativeType');
  //   resetField('natureOFBusinessCoop');
  //   // resetField('typeOfMember');
  //   resetField('criteria');
  // }, [JSON.stringify(depositNature)]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title={
          router?.asPath?.includes('/edit')
            ? 'Edit Saving Product'
            : `${t['depositProductAddDepositProducts']} - ${featureCode.newSavingProduct}`
        }
      />

      <FormLayout.Content>
        <FormLayout.Form>
          {editDataLoading && router?.asPath?.includes('edit') ? (
            <Box display="flex" bg="white" h="100vh" justifyContent="center" pt="100px">
              <Loader />
            </Box>
          ) : (
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

                {depositNature === NatureOfDepositProduct.RecurringSaving && <DepositFrequency />}

                {depositNature !== NatureOfDepositProduct.TermSavingOrFd && <TransactionLimit />}

                {depositNature === NatureOfDepositProduct.Saving && <MandatoryProduct />}

                {depositNature === NatureOfDepositProduct.Saving && isMandatorySaving && (
                  <DepositFrequency />
                )}

                {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                  (depositNature === NatureOfDepositProduct.Saving && isMandatorySaving)) && (
                  <>
                    {/* <DepositAmount /> */}
                    <Penalty />
                    <Rebate />
                  </>
                )}

                {depositNature === NatureOfDepositProduct.TermSavingOrFd && <FixedDepositAmount />}

                {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                  depositNature === NatureOfDepositProduct.TermSavingOrFd) && <Tenure />}

                {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                  depositNature === NatureOfDepositProduct.TermSavingOrFd) && (
                  <DefaultAccountName />
                )}

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

                {(depositNature === NatureOfDepositProduct.Current ||
                  depositNature === NatureOfDepositProduct.Saving) && <DormantSetup />}

                {(depositNature === NatureOfDepositProduct.RecurringSaving ||
                  depositNature === NatureOfDepositProduct.TermSavingOrFd) && <PrematuredPenalty />}

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
          )}
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        status={
          <Box display="flex" gap="s8">
            <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
              {t['depositProductPressCompletetosaveform']}
            </Text>
          </Box>
        }
        mainButtonLabel={t['complete']}
        mainButtonHandler={() => submitForm()}
      />
    </FormLayout>
  );
};

export default SettingsDepositProductsAdd;
