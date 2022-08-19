import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormCategory,
  FormFieldSearchTerm,
  IndividualRequiredDocument,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  useGetAccountOpenProductDetailsQuery,
  useGetProductListQuery,
  useGetSettingsOptionsFieldsQuery,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { Box, Grid, GridItem, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

export const Product = () => {
  const { data: genderFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
    category: FormCategory.KymIndividual,
  });

  const { data: institutionFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
    category: FormCategory.KymInstitution,
  });
  const { data: maritialFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.MaritalStatus,
    category: FormCategory.KymIndividual,
  });
  const { data: occupationFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
    category: FormCategory.KymIndividual,
  });
  const { data: coopUnionOrgFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
    category: FormCategory.KymCoopUnion,
  });
  const { data: coopTypeFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.CooperativeType,
    category: FormCategory.KymCoop,
  });
  const { data: educationFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.EducationQualification,
    category: FormCategory.KymIndividual,
  });
  const { data: ethnicityFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Ethnicity,
    category: FormCategory.KymIndividual,
  });

  const [triggerQuery, setTriggerQuery] = useState(false);
  const [triggerProductQuery, setTriggerProductQuery] = useState(false);
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const memberId = watch('memberId');
  const products = watch('productId');
  const { data, isFetching } = useGetProductListQuery(
    {
      memberId,
    },
    { enabled: triggerProductQuery }
  );
  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);
  const productId = watch('productId');
  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  useEffect(() => {
    if (memberId) {
      setTriggerProductQuery(true);
    }
  }, [memberId]);

  const productData =
    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  const genderOptions = genderFields?.form?.options?.predefined?.data;
  const institutionOptions = institutionFields?.form?.options?.predefined?.data;
  const maritialOptions = maritialFields?.form?.options?.predefined?.data;
  const occupationalOptions = occupationFields?.form?.options?.predefined?.data;
  const coopUnionOptions = coopUnionOrgFields?.form?.options?.predefined?.data;
  const coopTypeOptions = coopTypeFields?.form?.options?.predefined?.data;
  const educationOptions = educationFields?.form?.options?.predefined?.data;
  const ethnicityOptions = ethnicityFields?.form?.options?.predefined?.data;

  const tempGender = genderOptions?.map(
    (item) =>
      productData?.genderId?.includes(String(item?.id)) && item?.name?.local
  );

  const tempIns = institutionOptions?.map(
    (item) =>
      productData?.natureOfBusinessInstitution?.includes(String(item?.id)) &&
      item?.name?.local
  );
  const tempMarriage = maritialOptions?.map(
    (item) =>
      productData?.maritalStatusId?.includes(String(item?.id)) &&
      item?.name?.local
  );
  const tempOccupationOptions = occupationalOptions?.map(
    (item) =>
      productData?.occupation?.includes(String(item?.id)) && item?.name?.local
  );
  const tempCoopUnionOptions = coopUnionOptions?.map(
    (item) =>
      productData?.natureOFBusinessCoop?.includes(String(item?.id)) &&
      item?.name?.local
  );
  const tempCoopOptions = coopTypeOptions?.map(
    (item) =>
      productData?.cooperativeType?.includes(String(item?.id)) &&
      item?.name?.local
  );
  const tempEducationOptions = educationOptions?.map(
    (item) =>
      productData?.educationQualification?.includes(String(item?.id)) &&
      item?.name?.local
  );
  const tempEthnicityOptions = ethnicityOptions?.map(
    (item) =>
      productData?.educationQualification?.includes(String(item?.id)) &&
      item?.name?.local
  );

  const productOptions = [
    ...(data?.settings?.general?.depositProduct?.getProductList?.allowed?.reduce(
      (prevVal, curVal) => {
        return [
          ...prevVal,
          { label: curVal?.productName as string, value: curVal?.id as string },
        ];
      },
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (prevVal, curVal) => {
        return [
          ...prevVal,
          {
            label: curVal?.productName as string,
            value: curVal?.id as string,
            disabled: true,
          },
        ];
      },
      [] as OptionType[]
    ) ?? []),
  ];

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box
        display="flex"
        flexDirection="column"
        background="neutralColorLight.Gray-0"
        p="s16"
        gap="s8"
      >
        <Box w="50%">
          <FormSelect
            name="productId"
            label={t['accProductName']}
            placeholder={t['accSelectProduct']}
            isLoading={isFetching}
            options={productOptions}
          />
        </Box>
        {products && (
          <Box
            p="s16"
            display="flex"
            flexDirection="column"
            gap="s32"
            borderRadius="br2"
            bg="gray.0"
            border="1px solid"
            borderColor="border.layout"
          >
            <Box
              p="s20"
              gap="s10"
              bg="primary.100"
              display="grid"
              gridTemplateColumns="repeat(2,1fr)"
              borderRadius="br2"
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontWeight="Medium" color="primary.400" fontSize="s2">
                  {
                    poductDetails?.data?.settings?.general?.depositProduct
                      ?.formState?.data?.productCode?.prefix
                  }
                  -
                  {
                    poductDetails?.data?.settings?.general?.depositProduct
                      ?.formState?.data?.productCode?.initialNo
                  }
                </Text>
                <Text fontWeight="Medium" color="primary.500" fontSize="r2">
                  {productData?.productName}
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontWeight="Medium" color="primary.400" fontSize="s2">
                  Interest Rate
                </Text>
                <Text fontWeight="Medium" color="primary.500" fontSize="r2">
                  {productData?.interest?.defaultRate}%
                </Text>
              </Box>
            </Box>

            <Grid templateColumns="repeat(3,1fr)" gap="s32">
              {productData?.nature !==
                NatureOfDepositProduct?.VoluntaryOrOptional && (
                <GridItem display="flex" flexDirection="column">
                  <Box display="flex" flexDirection="column" gap="s4">
                    <TextFields
                      color="primary.800"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {/* {t['accInterestRate']} */}
                      Tenure
                    </TextFields>
                    <Box pl="s24">
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Minimum: {productData?.minTenureUnitNumber}{' '}
                            {productData?.minTenureUnit}
                          </TextFields>
                        </li>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Maximum: : {productData?.maxTenureUnitNumber}{' '}
                            {productData?.maxTenureUnit}
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </Box>
                </GridItem>
              )}

              <GridItem display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s4">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {/* {t['accInterestRate']} */}
                    Deposit Amount Limit
                  </TextFields>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Minimum:
                          {productData?.nature !==
                          NatureOfDepositProduct?.VoluntaryOrOptional
                            ? productData?.depositAmount?.minAmount
                            : productData?.balanceLimit?.minAmount}
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Maximum:{' '}
                          {productData?.nature !==
                          NatureOfDepositProduct?.VoluntaryOrOptional
                            ? productData?.depositAmount?.minAmount
                            : productData?.balanceLimit?.maxAmount}
                        </TextFields>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </GridItem>

              <GridItem display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s4">
                  <TextFields
                    color="primary.800"
                    fontSize="s3"
                    fontWeight="Medium"
                  >
                    {/* {t['accInterestRate']} */}
                    Transaction Limit
                  </TextFields>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Minimum: {productData?.depositAmount?.minAmount}
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Maximum: {productData?.depositAmount?.maxAmount}
                        </TextFields>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </GridItem>

              {(productData?.nature ===
                NatureOfDepositProduct?.RecurringSaving ||
                productData?.nature ===
                  NatureOfDepositProduct?.TermSavingOrFd ||
                productData?.nature ===
                  NatureOfDepositProduct?.VoluntaryOrOptional) &&
                productData?.criteria && (
                  <>
                    <GridItem display="flex" flexDirection="column">
                      <TextFields
                        color="primary.800"
                        fontSize="s3"
                        fontWeight="Medium"
                      >
                        {/* {t['accInterestRate']} */}
                        Criteria
                      </TextFields>
                      <Box display="flex" flexDirection="column" gap="s4">
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap="s16"
                          pl="s24"
                        >
                          <ul>
                            <li>
                              <TextFields
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                              >
                                Age:{' '}
                                <b>
                                  {' '}
                                  Mininum: {productData?.minAge} : Maximum{' '}
                                  {productData?.maxAge}
                                </b>
                              </TextFields>
                            </li>
                            {productData?.genderId && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  display={'flex'}
                                  flexDirection="row"
                                  gap="s4"
                                  fontWeight="Regular"
                                >
                                  Gender:{' '}
                                  {tempGender?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        pl="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                          </ul>

                          <ul>
                            {productData?.foreignEmployment && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                  display={'flex'}
                                  flexDirection="row"
                                  gap="s4"
                                >
                                  Foreign Employment:{' '}
                                  <b>
                                    {productData?.foreignEmployment
                                      ? 'true'
                                      : 'false'}
                                  </b>
                                </TextFields>
                              </li>
                            )}

                            {productData?.typeOfMember?.includes(
                              KymMemberTypesEnum.Institution
                            ) && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                >
                                  Business (Institutions):{' '}
                                  {tempIns?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        p="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                          </ul>
                        </Box>
                      </Box>
                    </GridItem>
                    {productData?.maritalStatusId ||
                      productData?.occupation ||
                      productData?.typeOfMember?.includes(
                        KymMemberTypesEnum?.CooperativeUnion
                      ) ||
                      productData?.typeOfMember?.includes(
                        KymMemberTypesEnum?.Cooperative
                      )}
                    <GridItem display="flex" flexDirection="column">
                      <Box display="flex" flexDirection="column" gap="s4">
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap="s16"
                          pl="s24"
                        >
                          <ul>
                            {productData?.maritalStatusId && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                  display={'flex'}
                                  flexDirection="row"
                                  gap="s4"
                                >
                                  {' '}
                                  Marital Status:
                                  {tempMarriage?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        pl="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                            {productData?.occupation && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                  display={'flex'}
                                  flexDirection="row"
                                  gap="s4"
                                >
                                  Occupation Detail
                                  {tempOccupationOptions?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        p="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                          </ul>

                          <ul>
                            {productData?.typeOfMember?.includes(
                              KymMemberTypesEnum?.CooperativeUnion
                            ) && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                >
                                  Nature of Business ( COOP Union):
                                  {tempCoopUnionOptions?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        p="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                            {productData?.typeOfMember?.includes(
                              KymMemberTypesEnum?.Cooperative
                            ) && (
                              <li>
                                <TextFields
                                  color="neutralColorLight.Gray-70"
                                  fontSize="s2"
                                  fontWeight="Regular"
                                  display={'flex'}
                                  flexDirection="row"
                                  gap="s4"
                                >
                                  Cooperative Type:{' '}
                                  {tempCoopOptions?.map((item) => {
                                    return (
                                      <Text
                                        fontSize={'s2'}
                                        fontWeight="bold"
                                        p="s4"
                                      >
                                        {item}
                                      </Text>
                                    );
                                  })}
                                </TextFields>
                              </li>
                            )}
                          </ul>
                        </Box>
                      </Box>
                    </GridItem>
                    <GridItem display="flex" flexDirection="column">
                      <Box display="flex" flexDirection="column" gap="s4">
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap="s16"
                          pl="s24"
                        >
                          <ul>
                            <li>
                              <TextFields
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                              >
                                Education Qualification:{' '}
                                {tempEducationOptions?.map((item) => {
                                  return (
                                    <Text
                                      fontSize={'s2'}
                                      fontWeight="bold"
                                      p="s4"
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </TextFields>
                            </li>

                            <li>
                              <TextFields
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                              >
                                Ethinicity:{' '}
                                {tempEthnicityOptions?.map((item) => {
                                  return (
                                    <Text
                                      fontSize={'s2'}
                                      fontWeight="bold"
                                      p="s4"
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </TextFields>
                            </li>
                          </ul>
                        </Box>
                      </Box>
                    </GridItem>
                  </>
                )}

              <GridItem display="flex" flexDirection="column">
                <TextFields
                  color="primary.800"
                  fontSize="s3"
                  fontWeight="Medium"
                >
                  {t['accRequiredDocument']}
                </TextFields>
                <Box pl="s24" display="grid">
                  <ul>
                    {productData?.individualDocuments?.map((item, index) => {
                      return (
                        <li key={`${item}${index}`}>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            {item === IndividualRequiredDocument?.Fingerprint
                              ? 'FingerPrint'
                              : item === IndividualRequiredDocument?.Form
                              ? 'Form'
                              : item ===
                                IndividualRequiredDocument?.NomineeDocument
                              ? 'Nominee Document'
                              : item === IndividualRequiredDocument?.Photo
                              ? 'Photo'
                              : 'Signature'}
                          </TextFields>
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              </GridItem>

              {productData?.nature !==
                NatureOfDepositProduct?.VoluntaryOrOptional && (
                <>
                  {' '}
                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="primary.800"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accPenalty']}
                    </TextFields>
                    <Box pl="s24">
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Penalty {productData?.penaltyData?.penaltyRate} %
                          </TextFields>
                        </li>
                        {/*
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 2
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 3
                        </TextFields>
                      </li> */}
                      </ul>
                    </Box>
                  </GridItem>
                  <GridItem display="flex" flexDirection="column" gap="s4">
                    <TextFields
                      color="primary.800"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accRebate']}
                    </TextFields>
                    <Box pl="s24">
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-70"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Rebate {productData?.rebateData?.percentage} %
                          </TextFields>
                        </li>
                        {/*
                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 2
                        </TextFields>
                      </li>

                      <li>
                        <TextFields
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 3
                        </TextFields>
                      </li> */}
                      </ul>
                    </Box>
                  </GridItem>
                </>
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </GroupContainer>
  );
};
