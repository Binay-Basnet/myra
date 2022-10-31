import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  Collateral,
  CriteriaSection,
  FrequencyTenure,
  LoanProductInput,
  LoanProductInstallment,
  LoanRepaymentScheme,
  PenaltyType,
  useGetLoanGeneralSettingsQuery,
  useGetLoanProductEditDataQuery,
  useSetLoanProductMutation,
} from '@coop/cbs/data-access';
import { asyncToast, Box, Container, FormFooter, FormHeader, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AllowGaurantee,
  AmountLimit,
  CollateralForm,
  Critera,
  GeneralSetup,
  GridItems,
  InstallmentFrequency,
  InsuranceApplicable,
  Interest,
  LoanProcessing,
  LoanRepayment,
  LoanRepaymentSchemes,
  NewQuestions,
  PartialPayment,
  Penalty,
  PrematurePenalty,
  ProductCode,
  Rebate,
  RequiredDocumentSetup,
  Tenure,
  TypesOfMember,
} from '../components/form';

export const SettingsLoanProductForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);
  const { mutateAsync } = useSetLoanProductMutation();

  type SelectOption = {
    label: string;
    value: string;
  }[];

  type CollateralValues = {
    type?: Collateral;
    minFMV?: number;
    maxFMV?: number;
    minDV?: number;
    maxDV?: number;
    minValue?: number;
    maxValue?: number;
  };

  type LoanProvisionType = {
    loanProvision: string;
    provision: string;
  }[];

  type LoanProductForm = Omit<
    LoanProductInput,
    | 'genderId'
    | 'maritalStatusId'
    | 'educationQualification'
    | 'occupation'
    | 'ethnicity'
    | 'natureOFBusinessCoop'
    | 'natureOfBusinessInstitution'
    | 'loanProvisiontable'
    | 'land'
    | 'landAndBuilding'
    | 'vehicle'
    | 'document'
    | 'others'
    | 'deposit'
  > & {
    genderId: SelectOption;
    maritalStatusId: SelectOption;
    educationQualification: SelectOption;
    occupation: SelectOption;
    ethnicity: SelectOption;
    natureOFBusinessCoop: SelectOption;
    natureOfBusinessInstitution: SelectOption;
    loanProvisiontable: LoanProvisionType;
    productName: string;
    land: CollateralValues;
    landAndBuilding: CollateralValues;
    vehicle: CollateralValues;
    deposit: CollateralValues;
    document: CollateralValues;
    others: CollateralValues;
  };

  const methods = useForm<LoanProductForm>({
    defaultValues: {
      isPenaltyApplicable: false,
      allowPartialInstallment: false,
      isMonthlyInstallmentCompulsory: false,
      minGraceDurationUnit: FrequencyTenure.Day,
      maxGraceDurationUnit: FrequencyTenure.Day,
      isStaffProduct: false,
      supportMultipleAccounts: false,
      loanScheduleChangeOverride: false,
      updateInterest: false,
      waiveInterest: false,
      isInsuranceApplicable: false,
      isCollateralRequired: false,
      allowGurantee: false,
      installmentFrequency: LoanProductInstallment.Daily,
      isRebateApplicable: false,
      tenureUnit: FrequencyTenure.Day,
      penaltyType: PenaltyType.Principal,
      isPrematurePenaltyApplicable: false,
    },
  });

  const { getValues, reset, watch } = methods;

  const criteria = watch('criteria');
  const allowGurantee = watch('allowGurantee');
  const repaymentScheme = watch('repaymentScheme');
  const isCollateralRequired = watch('isCollateralRequired');
  const collateralTypes = watch('collateralTypes');
  const isPenaltyApplicable = watch('isPenaltyApplicable');
  const isInsuranceApplicable = watch('isInsuranceApplicable');

  const { data: editValues, refetch } = useGetLoanProductEditDataQuery(
    {
      id,
    },
    {
      staleTime: 0,
    }
  );
  const editVals = editValues?.settings?.general?.loanProducts?.formState?.data;

  const { data: coaData } = useGetLoanGeneralSettingsQuery();

  const colValue = coaData?.settings?.general?.loan?.general?.collateralList;

  const collateralList = colValue?.map((item) => ({
    label: item?.name as string,
    value: item?.id as string,
  }));

  const landData = collateralList?.filter((item) => item?.label === 'Land');
  const landaAndBuildingData = collateralList?.filter(
    (item) => item?.label === 'Land and Building'
  );
  const vehicleData = collateralList?.filter((item) => item?.label === 'Vehicle');
  const depositData = collateralList?.filter((item) => item?.label === 'Deposit / Saving');
  const documentData = collateralList?.filter((item) => item?.label === 'Documents');
  const othersData = collateralList?.filter((item) => item?.label === 'Others');

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

    const loanProcessingChargeList = values?.loanProcessingCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const landList = collateralTypes?.includes(landData[0]?.value)
      ? {
          type: landData[0]?.value,
          minFMV: values?.land?.minFMV,
          maxFMV: values?.land?.maxFMV,
          minDV: values?.land?.minDV,
          maxDV: values?.land?.maxDV,
        }
      : null;

    const landAndVehicleList = collateralTypes?.includes(landaAndBuildingData[0]?.value)
      ? {
          type: landaAndBuildingData[0]?.value,
          minFMV: values?.landAndBuilding?.minFMV,
          maxFMV: values?.landAndBuilding?.maxFMV,
          minDV: values?.landAndBuilding?.minDV,
          maxDV: values?.landAndBuilding?.maxDV,
        }
      : null;

    const vehicleList = collateralTypes?.includes(vehicleData[0]?.value)
      ? {
          type: vehicleData[0]?.value,
          minValue: values?.vehicle?.minValue,
          maxValue: values?.vehicle?.maxValue,
        }
      : null;

    // const depositList = collateralTypes?.includes(depositData[0]?.value)
    //   ? {
    //       type: depositData[0]?.value,
    //       minValue: values?.deposit?.minValue,
    //       maxValue: values?.deposit?.maxValue,
    //     }
    //   : null;

    const documentList = collateralTypes?.includes(documentData[0]?.value)
      ? {
          type: documentData[0]?.value,
          minValue: values?.document?.minValue,
          maxValue: values?.document?.maxValue,
        }
      : null;

    const otherList = collateralTypes?.includes(othersData[0]?.value)
      ? {
          type: othersData[0]?.value,
          minValue: values?.others?.minValue,
          maxValue: values?.others?.maxValue,
        }
      : null;

    const collateralValueArray = [
      landList,
      landAndVehicleList,
      vehicleList,
      // depositList,
      documentList,
      otherList,
    ];

    const collateralValueList = collateralValueArray?.filter(
      (item) =>
        // item?.type === depositData[0]?.value ||
        item?.type === vehicleData[0]?.value ||
        item?.type === landaAndBuildingData[0]?.value ||
        item?.type === landData[0]?.value ||
        item?.type === documentData[0]?.value ||
        item?.type === othersData[0]?.value
    );

    const updatedData = {
      ...omit(values, [
        'id',
        'createdAt',
        'modifiedAt',
        'objState',
        'land',
        'landAndBuilding',
        'vehicle',
        'document',
        'others',
        'deposit',
      ]),
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      cooperativeType: coopTypeList,
      loanProcessingCharge: loanProcessingChargeList,
      minAge: values?.minAge && criteria?.includes(CriteriaSection.Age) ? values?.minAge : null,
      maxAge: values?.maxAge && criteria?.includes(CriteriaSection.Age) ? values?.maxAge : null,
      interestMethod: values?.interestMethod ?? null,
      postingFrequency: values?.postingFrequency ?? null,
      tenureUnit: values?.tenureUnit ? values?.tenureUnit : null,
      maxTenureUnitNumber: values?.maxTenureUnitNumber ? values?.maxTenureUnitNumber : null,
      minTenureUnitNumber: values?.minTenureUnitNumber ? values?.minTenureUnitNumber : null,
      minGraceDurationUnit: values?.minGraceDurationUnit ? values?.minGraceDurationUnit : null,
      maxGraceDurationUnit: values?.maxGraceDurationUnit ? values?.maxGraceDurationUnit : null,
      maxLoanAmount: values?.maxLoanAmount ?? null,
      minimumLoanAmount: values?.minimumLoanAmount ?? null,
      installmentFrequency: values?.installmentFrequency ?? null,
      collateralValue: isCollateralRequired ? collateralValueList : null,
      collateralTypes: isCollateralRequired ? collateralTypes : null,
      maxPercentOfGurantee: allowGurantee ? values?.maxPercentOfGurantee : null,
      rebate: {
        ...values?.rebate,
        rebateAmount: values?.rebate?.rebateAmount ?? null,
      },
      penaltyOnPrincipal: {
        penaltyRate: isPenaltyApplicable ? values?.penaltyOnPrincipal?.penaltyRate : null,
        dayAfterInstallmentDate: isPenaltyApplicable
          ? values?.penaltyOnPrincipal?.dayAfterInstallmentDate
          : null,
        penaltyAmount: isPenaltyApplicable ? values?.penaltyOnPrincipal?.penaltyAmount : null,
        // penaltyLedgerMapping: isPenaltyApplicable ? values?.penaltyOnPrincipal?.penaltyLedgerMapping : null,
      },
      penaltyOnInterest: {
        penaltyRate: isPenaltyApplicable ? values?.penaltyOnInterest?.penaltyRate : null,
        dayAfterInstallmentDate: isPenaltyApplicable
          ? values?.penaltyOnInterest?.dayAfterInstallmentDate
          : null,
        penaltyAmount: isPenaltyApplicable ? values?.penaltyOnInterest?.penaltyAmount : null,
        // penaltyLedgerMapping: isPenaltyApplicable ? values?.penaltyOnInterest?.penaltyLedgerMapping : null,
      },
      penaltyOnInstallment: {
        penaltyRate: isPenaltyApplicable ? values?.penaltyOnInstallment?.penaltyRate : null,
        dayAfterInstallmentDate: isPenaltyApplicable
          ? values?.penaltyOnInstallment?.dayAfterInstallmentDate
          : null,
        penaltyAmount: isPenaltyApplicable ? values?.penaltyOnInstallment?.penaltyAmount : null,
        // penaltyLedgerMapping: isPenaltyApplicable ? values?.penaltyOnInstallment?.penaltyLedgerMapping : null,
      },
      prematurePenaltySetup: {
        noOfDays: values?.prematurePenaltySetup?.noOfDays ?? null,
        penaltyAmount: values?.prematurePenaltySetup?.penaltyAmount ?? null,
        penaltyDateType: values?.prematurePenaltySetup?.penaltyDateType ?? null,
        penaltyRate: values?.prematurePenaltySetup?.penaltyRate ?? null,
        // penaltyLedgerMapping: values?.prematurePenaltySetup?.penaltyLedgerMapping ?? null,
      },
      insuranceType: {
        amount: isInsuranceApplicable ? values?.insuranceType?.amount : null,
        rate: isInsuranceApplicable ? values?.insuranceType?.rate : null,
        type: isInsuranceApplicable ? values?.insuranceType?.type : null,
      },
    };

    asyncToast({
      id: 'loan-id',
      msgs: {
        success: 'New Product Added',
        loading: 'Adding New Loan Product',
      },
      onSuccess: () => router.push('/settings/general/loan-products'),
      promise: mutateAsync({ id, data: updatedData as LoanProductInput }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof LoanProductInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  useEffect(() => {
    if (editVals) {
      const landEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === landData[0]?.value
      );

      const landAndBuildingEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === landaAndBuildingData[0]?.value
      );

      const vehicleEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === vehicleData[0]?.value
      );

      const depositEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === depositData[0]?.value
      );

      const documentEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === documentData[0]?.value
      );

      const othersEditData = editVals?.collateralValue?.filter(
        (item) => item?.type === othersData[0]?.value
      );

      reset({
        ...(editVals as unknown as LoanProductForm),
        land: {
          minFMV: landEditData && landEditData[0]?.minFMV,
          maxFMV: landEditData && landEditData[0]?.maxFMV,
          minDV: landEditData && landEditData[0]?.minDV,
          maxDV: landEditData && landEditData[0]?.maxDV,
        },

        landAndBuilding: {
          minFMV: landAndBuildingEditData && landAndBuildingEditData[0]?.minFMV,
          maxFMV: landAndBuildingEditData && landAndBuildingEditData[0]?.maxFMV,
          minDV: landAndBuildingEditData && landAndBuildingEditData[0]?.minDV,
          maxDV: landAndBuildingEditData && landAndBuildingEditData[0]?.maxDV,
        },

        vehicle: {
          minValue: vehicleEditData && vehicleEditData[0]?.minValue,
          maxValue: vehicleEditData && vehicleEditData[0]?.maxValue,
        },

        deposit: {
          minValue: depositEditData && depositEditData[0]?.minValue,
          maxValue: depositEditData && depositEditData[0]?.maxValue,
        },

        document: {
          minValue: documentEditData && documentEditData[0]?.minValue,
          maxValue: documentEditData && documentEditData[0]?.maxValue,
        },

        others: {
          minValue: othersEditData && othersEditData[0]?.minValue,
          maxValue: othersEditData && othersEditData[0]?.maxValue,
        },
      });
    }
  }, [editVals, reset]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const memberType = watch('typeOfMember');

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['loanProductAddLoanProduct']} />
        </Container>
      </Box>

      <Container minW="container.lg" height="fit-content" bg="gray.0" pb="55px" paddingInline="0">
        <FormProvider {...methods}>
          <form>
            <GeneralSetup />
            <ProductCode />
            <TypesOfMember />

            {memberType && (
              <>
                <Critera />
                <GridItems />
              </>
            )}

            <Tenure />
            <AmountLimit />
            <LoanRepaymentSchemes />
            <PartialPayment />
            <Penalty />
            <PrematurePenalty />
            {repaymentScheme && repaymentScheme?.includes(LoanRepaymentScheme.Epi) && <Rebate />}

            <LoanRepayment />
            <NewQuestions />
            <InstallmentFrequency />
            <Interest />
            <InsuranceApplicable />
            <LoanProcessing />
            <CollateralForm />
            <AllowGaurantee />
            <RequiredDocumentSetup />
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
                    {t['loanProductPressCompletetoSaveForm']}
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
