import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
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
  GridItem,
  Icon,
  IconButton,
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

/* eslint-disable-next-line */
export interface loanProductsAdd {}

export function SettingsLoanProductForm(props: loanProductsAdd) {
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
  };

  const methods = useForm<LoanProductForm>({
    defaultValues: {
      productType: LoanProductType.Agriculture,
    },
  });

  const { getValues, reset } = methods;
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
      values?.loanProvisiontable &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'good'
      );

    const doubtfulLoanProvision =
      values?.loanProvisiontable &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'doubtful'
      );
    const problematicLoanProvision =
      values?.loanProvisiontable &&
      values?.loanProvisiontable?.filter(
        (item) => item?.loanProvision === 'problematic'
      );
    const badLoanProvision =
      values?.loanProvisiontable &&
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
      installmentType: values?.installmentType ? values?.installmentType : null,
      modeOfPayment: values?.modeOfPayment ? values?.modeOfPayment : null,
      penalty: {
        ...values?.penalty,
        rateType: values?.penalty?.rateType ? values?.penalty?.rateType : null,
      },
      goodLoanProvision: goodLoanProvision
        ? Number(goodLoanProvision[0].provision)
        : editVals?.goodLoanProvision,
      doubtfulLoanProvision: doubtfulLoanProvision
        ? Number(doubtfulLoanProvision[0].provision)
        : editVals?.doubtfulLoanProvision,
      problematicLoanProvision: problematicLoanProvision
        ? Number(problematicLoanProvision[0].provision)
        : editVals?.problematicLoanProvision,
      badLoanProvision: badLoanProvision
        ? Number(badLoanProvision[0].provision)
        : editVals?.badLoanProvision,
    };

    mutate(
      { id, data: updatedData },
      {
        onSuccess: () => router.push('/settings/general/loan-products'),
      }
    );
  };
  console.log(editVals);
  useEffect(() => {
    if (editValues) {
      if (editVals) {
        reset({
          ...(editVals as unknown as LoanProductForm),
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  return (
    <>
      <Container p="0" height="fit-content" minW="container.lg">
        <Box position="relative" margin="0px auto">
          <Box
            position="fixed"
            margin="0px auto"
            bg="gray.100"
            minW="container.lg"
            zIndex="10"
          >
            <Box
              height="50px"
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
              px="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
            >
              <Text fontSize="r2" fontWeight="SemiBold">
                {t['loanProductAddLoanProduct']}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoCloseOutline} size="md" />}
                onClick={() => router.back()}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Container minW="container.lg" height="fit-content" bg="gray.0" pb="55px">
        <FormProvider {...methods}>
          <form>
            {/* main */}
            <Box px="s20" py="s24">
              <ContainerWithDivider>
                <Box background="white" mt="50px">
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

                <Box display="flex" flexDirection={'column'} gap="s16">
                  <Critera />
                  <GridItems />
                </Box>
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
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
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
