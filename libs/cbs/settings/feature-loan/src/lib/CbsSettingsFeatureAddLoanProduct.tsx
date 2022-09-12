import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  Collateral,
  LoanProductInput,
  LoanRepaymentScheme,
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
  InsuranceApplicable,
  Interest,
  LoanProcessing,
  LoanRepayment,
  LoanRepaymentSchemes,
  MaximumTenure,
  MinimunTenure,
  NewQuestions,
  PartialPayment,
  Penalty,
  PrematurePenalty,
  ProductCode,
  Rebate,
  RequiredDocumentSetup,
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
  };

  const methods = useForm<LoanProductForm>({});

  const { getValues, reset, watch } = methods;

  const repaymentScheme = watch('repaymentScheme');

  const { data: editValues, refetch } = useGetLoanProductEditDataQuery(
    {
      id,
    },
    {
      staleTime: 0,
    }
  );
  const editVals = editValues?.settings?.general?.loanProducts?.formState?.data;

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

    const loanProcessingChargeList = values?.loanProcessingCharge?.map((data) => ({
      serviceName: data?.serviceName,
      ledgerName: data?.ledgerName,
      amount: data?.amount.toString(),
    }));

    const landList = values?.collateralTypes?.includes(Collateral.Land)
      ? {
          type: Collateral.Land,
          minFMV: values?.land?.minFMV,
          maxFMV: values?.land?.maxFMV,
          minDV: values?.land?.minDV,
          maxDV: values?.land?.maxDV,
        }
      : null;

    const landAndVehicleList = values?.collateralTypes?.includes(Collateral.LandAndBuilding)
      ? {
          type: Collateral.LandAndBuilding,
          minFMV: values?.landAndBuilding?.minFMV,
          maxFMV: values?.landAndBuilding?.maxFMV,
          minDV: values?.landAndBuilding?.minDV,
          maxDV: values?.landAndBuilding?.maxDV,
        }
      : null;

    const vehicleList = values?.collateralTypes?.includes(Collateral.Vehicle)
      ? {
          type: Collateral.Vehicle,
          minValue: values?.vehicle?.minValue,
          maxValue: values?.vehicle?.maxValue,
        }
      : null;

    const depositList = values?.collateralTypes?.includes(Collateral.DepositOrSaving)
      ? {
          type: Collateral.DepositOrSaving,
          minValue: values?.deposit?.minValue,
          maxValue: values?.deposit?.maxValue,
        }
      : null;

    const collateralValueArray = [landList, landAndVehicleList, vehicleList, depositList];

    const collateralValueList = collateralValueArray?.filter(
      (item) =>
        item?.type === Collateral.Land ||
        item?.type === Collateral.LandAndBuilding ||
        item?.type === Collateral.Vehicle ||
        item?.type === Collateral.DepositOrSaving
    );

    const updatedData = {
      ...omit(values, ['id', 'createdAt', 'modifiedAt', 'objState', 'land', 'landAndBuilding']),
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      loanProcessingCharge: loanProcessingChargeList,
      minTenureUnit: values?.minTenureUnit ? values?.minTenureUnit : null,
      maxTenureUnit: values?.maxTenureUnit ? values?.maxTenureUnit : null,
      minAge: values?.minAge ? values?.minAge : null,
      maxAge: values?.maxAge ? values?.maxAge : null,
      interestMethod: values?.interestMethod ?? null,
      postingFrequency: values?.postingFrequency ?? null,
      maxTenureUnitNumber: values?.maxTenureUnitNumber ? values?.maxTenureUnitNumber : null,
      minTenureUnitNumber: values?.minTenureUnitNumber ? values?.minTenureUnitNumber : null,
      minGraceDurationUnit: values?.minGraceDurationUnit ? values?.minGraceDurationUnit : null,
      maxGraceDurationUnit: values?.maxGraceDurationUnit ? values?.maxGraceDurationUnit : null,
      maxLoanAmount: values?.maxLoanAmount ?? null,
      minimumLoanAmount: values?.minimumLoanAmount ?? null,
      rebate: {
        ...values?.rebate,
        rebateAmount: values?.rebate?.rebateAmount ?? null,
      },
      penaltyOnPrincipal: {
        ...values?.penaltyOnPrincipal,
        penaltyRate: values?.penaltyOnPrincipal?.penaltyRate ?? null,
        dayAfterInstallmentDate: values?.penaltyOnPrincipal?.dayAfterInstallmentDate ?? null,
        penaltyAmount: values?.penaltyOnPrincipal?.penaltyAmount ?? null,
        penaltyLedgerMapping: values?.penaltyOnPrincipal?.penaltyLedgerMapping ?? null,
      },
      penaltyOnInterest: {
        ...values?.penaltyOnInterest,
        penaltyRate: values?.penaltyOnInterest?.penaltyRate ?? null,
        dayAfterInstallmentDate: values?.penaltyOnInterest?.dayAfterInstallmentDate ?? null,
        penaltyAmount: values?.penaltyOnInterest?.penaltyAmount ?? null,
        penaltyLedgerMapping: values?.penaltyOnInterest?.penaltyLedgerMapping ?? null,
      },
      penaltyOnInstallment: {
        ...values?.penaltyOnInstallment,
        penaltyRate: values?.penaltyOnInstallment?.penaltyRate ?? null,
        dayAfterInstallmentDate: values?.penaltyOnInstallment?.dayAfterInstallmentDate ?? null,
        penaltyAmount: values?.penaltyOnInstallment?.penaltyAmount ?? null,
        penaltyLedgerMapping: values?.penaltyOnInstallment?.penaltyLedgerMapping ?? null,
      },
      collateralValue: collateralValueList,
    };

    asyncToast({
      id: 'loan-id',
      msgs: {
        success: 'New Product Added',
        loading: 'Adding New Loan Product',
      },
      onSuccess: () => router.push('/settings/general/loan-products'),
      promise: mutateAsync({ id, data: updatedData as LoanProductInput }),
    });
  };

  useEffect(() => {
    if (editVals) {
      // const landEditData = editVals?.collateralValue?.filter(
      //   (item) => item?.type === Collateral.Land
      // );

      // const landAndBuildingEditData = editVals?.collateralValue?.filter(
      //   (item) => item?.type === Collateral.LandAndBuilding
      // );

      // const vehicleEditData = editVals?.collateralValue?.filter(
      //   (item) => item?.type === Collateral.Vehicle
      // );

      // const depositEditData = editVals?.collateralValue?.filter(
      //   (item) => item?.type === Collateral.DepositOrSaving
      // );
      reset({
        ...(editVals as unknown as LoanProductForm),
        // land: {
        //   minFMV: landEditData?.minFMV,
        //   maxFMV: landEditData?.maxFMV,
        //   minDV: landEditData?.minDV,
        //   maxDV: landEditData?.maxDV,
        // },

        // landAndBuilding: {
        //   minFMV: landAndBuildingEditData?.minFMV,
        //   maxFMV: landAndBuildingEditData?.maxFMV,
        //   minDV: landAndBuildingEditData?.minDV,
        //   maxDV: landAndBuildingEditData?.maxDV,
        // },
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

            <MinimunTenure />

            <MaximumTenure />

            <AmountLimit />
            <LoanRepaymentSchemes />
            <PartialPayment />
            <Penalty />
            <PrematurePenalty />
            {repaymentScheme && repaymentScheme?.includes(LoanRepaymentScheme.Epi) && <Rebate />}

            <LoanRepayment />
            <NewQuestions />
            <Interest />
            <InsuranceApplicable />
            {/* <LedgerMapping /> */}
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
