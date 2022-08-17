import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  LoanProductInput,
  LoanProductSubType,
  LoanProductType,
  NatureOfLoanProduct,
  useGetLoanProductEditDataQuery,
  useSetLoanProductMutation,
} from '@coop/cbs/data-access';
import {
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  Box,
  Container,
  FormFooter,
  FormHeader,
  GridItem,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountServicesCharge,
  AmountLimit,
  Critera,
  GridItems,
  Interest,
  LoanLimit,
  LoanRepayment,
  LoanRepaymentSchemes,
  MaximumTenure,
  MinimunTenure,
  Penalty,
  Questions,
  Rebate,
  RequiredDocumentSetup,
  TypesOfMember,
} from '../components/form';

export function SettingsLoanProductForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetLoanProductMutation();

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
  const { data: editValues, refetch } = useGetLoanProductEditDataQuery({
    id,
  });
  const editVals = editValues?.settings?.general?.loanProducts?.formState;

  const productType = [
    {
      label: t['loanProductAgriculture'],
      value: LoanProductType.Agriculture,
    },
    {
      label: t['loanProductAlternativeEnergy'],
      value: LoanProductType.AlternativeEnergy,
    },
    {
      label: t['loanProductAssetsPurchasesAndMaintenance'],
      value: LoanProductType.AssetsPurchasesAndMaintenance,
    },
    {
      label: t['loanProductTypeBusiness'],
      value: LoanProductType.Business,
    },
    {
      label: t['loanProductCreditUnion'],
      value: LoanProductType.CreditUnion,
    },
    {
      label: t['loanProductEducational'],
      value: LoanProductType.Educational,
    },
    {
      label: t['loanProductForeignEmployee'],
      value: LoanProductType.ForeignEmployee,
    },
    {
      label: t['loanProductHirePurchase'],
      value: LoanProductType.HirePurchase,
    },
    {
      label: t['loanProductTypeIndustrial'],
      value: LoanProductType.Industrial,
    },
    {
      label: t['loanProductMicroEntrepreneur'],
      value: LoanProductType.MicroEntrepreneur,
    },
    {
      label: t['loanProductSocialSector'],
      value: LoanProductType.SocialSector,
    },
    {
      label: t['loanProductStaff'],
      value: LoanProductType.Staff,
    },
  ];

  const productSubType = [
    {
      label: 'Agriculture Business Loan',
      value: LoanProductSubType.AgricultureBusiness,
    },
    {
      label: 'Big Industrial Loan',
      value: LoanProductSubType.BigIndustrial,
    },
    {
      label: 'Bio Gas Loan',
      value: LoanProductSubType.BioGas,
    },
    {
      label: 'Business Line Of Credit Loan',
      value: LoanProductSubType.BusinessLineOfCredit,
    },
  ];

  const productNature = [
    {
      label: t['loanProductProductive'],
      value: NatureOfLoanProduct.Productive,
    },
    {
      label: t['loanProductUnproductive'],
      value: NatureOfLoanProduct.Unproductive,
    },
  ];

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
        goodLoanProvision?.length > 0
          ? Number(goodLoanProvision[0].provision)
          : editVals?.goodLoanProvision,
      doubtfulLoanProvision:
        doubtfulLoanProvision?.length > 0
          ? Number(doubtfulLoanProvision[0].provision)
          : editVals?.doubtfulLoanProvision,
      problematicLoanProvision:
        problematicLoanProvision?.length > 0
          ? Number(problematicLoanProvision[0].provision)
          : editVals?.problematicLoanProvision,
      badLoanProvision:
        badLoanProvision?.length > 0
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

    mutate(
      { id, data: updatedData as LoanProductInput },
      {
        onSuccess: () => router.push('/settings/general/loan-products'),
      }
    );
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
            {/* main */}
            <Box px="s20" py="s24">
              <ContainerWithDivider>
                <Box background="white">
                  <Text
                    fontSize="r2"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-70"
                    mb="s16"
                  >
                    {t['loanProductGeneralSetup']}
                  </Text>
                  <InputGroupContainer>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="productName"
                        label={t['loanProductProductName']}
                        placeholder={t['loanProductEnterProductName']}
                      />
                    </GridItem>

                    <FormSelect
                      name="productType"
                      options={productType}
                      label={t['loanProductProductType']}
                      placeholder={t['loanProductSelectProductType']}
                    />
                    <GridItem colSpan={2}>
                      <FormSelect
                        name="productSubType"
                        options={productSubType}
                        label={t['loanProductProductSubtype']}
                        placeholder={t['loanProductSelectProductType']}
                      />
                    </GridItem>

                    <FormSelect
                      name="productNature"
                      options={productNature}
                      label={t['loanProductNatureLoanProduct']}
                      placeholder={t['loanProductSelectNatureofDepositProduct']}
                    />
                  </InputGroupContainer>
                </Box>
                <Box>
                  <Text fontWeight="500" fontSize={'r1'} color="gray.700">
                    {t['loanProductProductCode']}
                  </Text>
                  <Text
                    mt="s4"
                    fontWeight="400"
                    fontSize={'s2'}
                    color="gray.700"
                  >
                    {t['loanProductAddprefixInitial']}
                  </Text>
                  <InputGroupContainer mt="s16">
                    <FormInput
                      label={t['loanProductPrefix']}
                      placeholder={t['loanProductEnterPrefix']}
                      name="productCode.prefix"
                    />
                    <FormInput
                      label={t['loanProductIntitialNumber']}
                      placeholder={t['loanProductIntitialNumber']}
                      name="productCode.initialNo"
                    />
                    <Box></Box>
                  </InputGroupContainer>
                </Box>
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
                <Penalty />
                <Rebate />
                <LoanRepayment />
                <Interest />
                <AccountServicesCharge />
                <LoanLimit
                  data={editValues?.settings?.general?.loanProducts?.formState}
                />
                <Questions />
                <RequiredDocumentSetup />
              </ContainerWithDivider>
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
