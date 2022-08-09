import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositProductInput,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  PrematurePenaltyDateType,
  useGetDepositProductSettingsEditDataQuery,
  useSetDepositProductMutation,
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
  BalanceLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  DormantSetup,
  GridItems,
  Interest,
  MaximumTenure,
  MinimunTenure,
  PostingFrequency,
  PrematuredPenalty,
  Questions,
  RequiredDocumentSetup,
  TypesOfMember,
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
};

export function SettingsDepositProductsAdd() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);

  const { mutate } = useSetDepositProductMutation();

  const optionsSaving = [
    {
      label: t['depositProductRecurringSaving'],
      value: NatureOfDepositProduct.RecurringSaving,
    },
    {
      label: t['depositProductMandatory'],
      value: NatureOfDepositProduct.Mandatory,
    },
    {
      label: t['depositProductVoluntaryOptional'],
      value: NatureOfDepositProduct.VoluntaryOrOptional,
    },
    {
      label: t['depositProductTermSaving'],
      value: NatureOfDepositProduct.TermSavingOrFd,
    },
  ];

  const methods = useForm<DepositForm>({
    defaultValues: {
      nature: NatureOfDepositProduct.RecurringSaving,
      minTenureUnitNumber: 0,
      maxTenureUnitNumber: 0,
      prematurePenalty: {
        penaltyDateType: PrematurePenaltyDateType.EffectiveDaysFromStart,
      },
    },
  });

  const { getValues, watch, reset } = methods;
  const depositNature = watch('nature');
  const typesOfMember = watch('typeOfMember');

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

    const ladderRateDataList = values?.ladderRateData?.map((data) => {
      return {
        type: data?.type,
        rate: data?.rate,
        amount: data?.amount.toString(),
      };
    });

    const serviceChargeList = values?.serviceCharge?.map((data) => {
      return {
        serviceName: data?.serviceName,
        ledgerName: data?.ledgerName,
        amount: data?.amount.toString(),
      };
    });

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
      minTenureUnit: values?.minTenureUnit ? values?.minTenureUnit : null,
      maxTenureUnit: values?.maxTenureUnit ? values?.maxTenureUnit : null,
      maxTenureUnitNumber: values?.maxTenureUnitNumber
        ? values?.maxTenureUnitNumber
        : null,
      minTenureUnitNumber: values?.minTenureUnitNumber
        ? values?.minTenureUnitNumber
        : null,
      depositFrequency: values?.depositFrequency
        ? values?.depositFrequency
        : null,
      postingFrequency: values?.postingFrequency
        ? values?.postingFrequency
        : null,
      accountType: values?.accountType ? values?.accountType : null,
      penaltyData: {
        ...values?.penaltyData,
        rateType: values?.penaltyData?.rateType
          ? values?.penaltyData?.rateType
          : null,
        prematurePenalty: {
          noOfDays: values?.prematurePenalty?.noOfDays,
          penaltyAmount: values?.prematurePenalty?.penaltyAmount,
          penaltyDateType: values?.prematurePenalty?.penaltyDateType,
          penaltyRate: values?.prematurePenalty?.penaltyRate,
          penaltyLedgerMapping:
            values?.prematurePenalty?.penaltyLedgerMapping ?? null,
        },
      },
    };

    mutate(
      { id, data: updatedData },
      {
        onSuccess: () => router.push('/settings/general/deposit-products'),
      }
    );
  };

  const { data: editValues, refetch } =
    useGetDepositProductSettingsEditDataQuery({
      id,
    });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.settings?.general?.depositProduct?.formState?.data;

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

  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title={t['depositProductAddDepositProducts']} />
        </Container>
      </Box>
      <Container
        bg="white"
        height="fit-content"
        minW="container.lg"
        pb="120px"
        paddingInline="0"
      >
        <FormProvider {...methods}>
          <form>
            {/* main */}
            <Box px="s20" py="s24">
              <ContainerWithDivider>
                <Box background="white">
                  <InputGroupContainer>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="productName"
                        label={t['depositProductProductName']}
                        placeholder={t['depositProductEnterProductName']}
                      />
                    </GridItem>
                    <FormSelect
                      name="nature"
                      options={optionsSaving}
                      label={t['depositProductNatureofDepositProduct']}
                      placeholder={
                        t['depositProductSelectNatureofDepositProduct']
                      }
                    />
                  </InputGroupContainer>
                </Box>
                <Box>
                  <Text fontWeight="Medium" fontSize={'r1'} color="gray.700">
                    {t['depositProductProductCode']}
                  </Text>
                  <Text fontWeight="Regular" fontSize="s2" color="gray.700">
                    {t['depositProductAddprefixintial']}
                  </Text>
                  <InputGroupContainer mt="s16">
                    <FormInput
                      label={t['depositProductPrefix']}
                      placeholder={t['depositProductEnterPrefix']}
                      name="productCode.prefix"
                    />
                    <FormInput
                      label={t['depositProductIntitialNumber']}
                      placeholder={t['depositProductIntitialNumber']}
                      name="productCode.initialNo"
                    />
                  </InputGroupContainer>
                </Box>
                {depositNature !== NatureOfDepositProduct.Mandatory && (
                  <TypesOfMember />
                )}

                {depositNature !== NatureOfDepositProduct.Mandatory && (
                  <Box display="flex" flexDirection={'column'} gap="s16">
                    <Critera />
                    <GridItems />
                  </Box>
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <DepositFrequency />
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <MinimunTenure />
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <MaximumTenure />
                )}
                {depositNature !== NatureOfDepositProduct.RecurringSaving && (
                  <BalanceLimit />
                )}

                <Interest />
                <PostingFrequency />
                {depositNature !== NatureOfDepositProduct.TermSavingOrFd && (
                  <AccountServicesCharge />
                )}

                {depositNature === NatureOfDepositProduct.TermSavingOrFd && (
                  <DefaultAccountName />
                )}
                <Questions />
                {depositNature === NatureOfDepositProduct.Mandatory && (
                  <DormantSetup />
                )}
                {(typesOfMember?.includes(KymMemberTypesEnum.Individual) ||
                  typesOfMember?.includes(KymMemberTypesEnum.Institution) ||
                  typesOfMember?.includes(KymMemberTypesEnum.Cooperative) ||
                  typesOfMember?.includes(
                    KymMemberTypesEnum.CooperativeUnion
                  )) && <RequiredDocumentSetup />}

                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <PrematuredPenalty />
                )}
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

export default SettingsDepositProductsAdd;
