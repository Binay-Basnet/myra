import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  LoanProductInput,
  LoanRepaymentScheme,
  useGetLoanProductEditDataQuery,
  useSetLoanProductMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AllowGaurantee,
  AmountLimit,
  Collateral,
  Critera,
  GeneralSetup,
  GridItems,
  InsuranceApplicable,
  Interest,
  LedgerMapping,
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

export function SettingsLoanProductForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);
  const { mutateAsync } = useSetLoanProductMutation();

  type SelectOption = {
    label: string;
    value: string;
  }[];

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
  const editVals = editValues?.settings?.general?.loanProducts?.formState;

  const submitForm = () => {
    const values = getValues();

    const genderList = values?.genderId?.map((data) => data?.value);
    const maritalStatusList = values?.maritalStatusId?.map(
      (data) => data?.value
    );
    const educationQualificationList = values?.educationQualification?.map(
      (data) => data?.value
    );
    const occupationList = values?.occupation?.map((data) => data?.value);
    const ethnicityList = values?.ethnicity?.map((data) => data?.value);
    const natureOFBusinessCoopList = values?.natureOFBusinessCoop?.map(
      (data) => data?.value
    );
    const natureOfBusinessInstitutionList =
      values?.natureOfBusinessInstitution?.map((data) => data?.value);

    const serviceChargeList = values?.serviceCharge?.map((data) => {
      return {
        serviceName: data?.serviceName,
        ledgerName: data?.ledgerName,
        amount: data?.amount.toString(),
      };
    });

    const goodLoanProvision =
      values?.loanProvisiontable !== undefined &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'good'
      );

    const doubtfulLoanProvision =
      values?.loanProvisiontable !== undefined &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'doubtful'
      );
    const problematicLoanProvision =
      values?.loanProvisiontable !== undefined &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'problematic'
      );
    const badLoanProvision =
      values?.loanProvisiontable !== undefined &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'bad'
      );

    const updatedData = {
      ...omit(values, [
        'id',
        'createdAt',
        'modifiedAt',
        'objState',
        'loanProvisiontable',
      ]),
      genderId: genderList,
      maritalStatusId: maritalStatusList,
      educationQualification: educationQualificationList,
      ethnicity: ethnicityList,
      occupation: occupationList,
      natureOfBusinessInstitution: natureOfBusinessInstitutionList,
      natureOFBusinessCoop: natureOFBusinessCoopList,
      serviceCharge: serviceChargeList,
      minTenureUnit: values?.minTenureUnit ? values?.minTenureUnit : null,
      maxTenureUnit: values?.maxTenureUnit ? values?.maxTenureUnit : null,
      minAge: values?.minAge ? values?.minAge : null,
      maxAge: values?.maxAge ? values?.maxAge : null,
      maxTenureUnitNumber: values?.maxTenureUnitNumber
        ? values?.maxTenureUnitNumber
        : null,
      minTenureUnitNumber: values?.minTenureUnitNumber
        ? values?.minTenureUnitNumber
        : null,
      installmentType: values?.installmentType ? values?.installmentType : null,
      modeOfPayment: values?.modeOfPayment ? values?.modeOfPayment : null,
      minGraceDurationUnit: values?.minGraceDurationUnit
        ? values?.minGraceDurationUnit
        : null,
      maxGraceDurationUnit: values?.maxGraceDurationUnit
        ? values?.maxGraceDurationUnit
        : null,
      interest: {
        ...values?.interest,
        interestMethod: values?.interest?.interestMethod
          ? values?.interest?.interestMethod
          : null,
      },
      goodLoanProvision:
        goodLoanProvision && goodLoanProvision?.length > 0
          ? Number(goodLoanProvision[0].provision)
          : editVals?.goodLoanProvision,
      doubtfulLoanProvision:
        doubtfulLoanProvision && doubtfulLoanProvision?.length > 0
          ? Number(doubtfulLoanProvision[0].provision)
          : editVals?.doubtfulLoanProvision,
      problematicLoanProvision:
        problematicLoanProvision && problematicLoanProvision?.length > 0
          ? Number(problematicLoanProvision[0].provision)
          : editVals?.problematicLoanProvision,
      badLoanProvision:
        badLoanProvision && badLoanProvision?.length > 0
          ? Number(badLoanProvision[0].provision)
          : editVals?.badLoanProvision,
      maxLoanAmount: values?.maxLoanAmount ?? null,
      minimumLoanAmount: values?.minimumLoanAmount ?? null,
      rebate: {
        ...values?.rebate,
        rebateAmount: values?.rebate?.rebateAmount ?? null,
      },
      penalty: {
        ...values?.penalty,
        minimumAmount: values?.penalty?.minimumAmount ?? null,
        penaltyAmount: values?.penalty?.penaltyAmount
          ? values?.penalty?.penaltyAmount
          : null,
        rateType: values?.penalty?.rateType ? values?.penalty?.rateType : null,
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
    });
  };

  useEffect(() => {
    if (editVals) {
      reset({
        ...(editVals as unknown as LoanProductForm),
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

      <Container
        minW="container.lg"
        height="fit-content"
        bg="gray.0"
        pb="55px"
        paddingInline="0"
      >
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

            {repaymentScheme &&
              repaymentScheme?.includes(LoanRepaymentScheme.Epi) && <Rebate />}

            <LoanRepayment />
            <NewQuestions />
            <Interest />
            <InsuranceApplicable />
            <LedgerMapping />
            <LoanProcessing />
            {/* <LoanLimit
              data={editValues?.settings?.general?.loanProducts?.formState}
            /> */}
            <Collateral />
            <AllowGaurantee />
            <RequiredDocumentSetup />
            <PrematurePenalty />
          </form>
        </FormProvider>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    as="i"
                    fontSize="r1"
                  >
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
}

export default SettingsLoanProductForm;
