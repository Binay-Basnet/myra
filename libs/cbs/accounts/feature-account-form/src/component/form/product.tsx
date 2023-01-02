import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem, Text } from '@myra-ui';

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
import { useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

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

  const productData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  const genderOptions = genderFields?.form?.options?.predefined?.data;
  const institutionOptions = institutionFields?.form?.options?.predefined?.data;
  const maritialOptions = maritialFields?.form?.options?.predefined?.data;
  const occupationalOptions = occupationFields?.form?.options?.predefined?.data;
  const coopUnionOptions = coopUnionOrgFields?.form?.options?.predefined?.data;
  const coopTypeOptions = coopTypeFields?.form?.options?.predefined?.data;
  const educationOptions = educationFields?.form?.options?.predefined?.data;
  const ethnicityOptions = ethnicityFields?.form?.options?.predefined?.data;

  const tempGender = genderOptions?.map(
    (item) => productData?.genderId?.includes(String(item?.id)) && item?.name?.local
  );

  const tempIns = institutionOptions?.map(
    (item) =>
      productData?.natureOfBusinessInstitution?.includes(String(item?.id)) && item?.name?.local
  );
  const tempMarriage = maritialOptions?.map(
    (item) => productData?.maritalStatusId?.includes(String(item?.id)) && item?.name?.local
  );
  const tempOccupationOptions = occupationalOptions?.map(
    (item) => productData?.occupation?.includes(String(item?.id)) && item?.name?.local
  );
  const tempCoopUnionOptions = coopUnionOptions?.map(
    (item) => productData?.natureOFBusinessCoop?.includes(String(item?.id)) && item?.name?.local
  );
  const tempCoopOptions = coopTypeOptions?.map(
    (item) => productData?.cooperativeType?.includes(String(item?.id)) && item?.name?.local
  );
  const tempEducationOptions = educationOptions?.map(
    (item) => productData?.educationQualification?.includes(String(item?.id)) && item?.name?.local
  );
  const tempEthnicityOptions = ethnicityOptions?.map(
    (item) => productData?.educationQualification?.includes(String(item?.id)) && item?.name?.local
  );

  const productOptions = [
    ...(data?.settings?.general?.depositProduct?.getProductList?.allowed?.reduce(
      (prevVal, curVal) => [
        ...prevVal,
        {
          label: `${curVal?.productName} [${
            accountTypes[curVal?.nature as NatureOfDepositProduct]
          }]`,
          value: curVal?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (prevVal, curVal) => [
        ...prevVal,
        {
          label: `${curVal?.data?.productName} [${
            accountTypes[curVal?.data?.nature as NatureOfDepositProduct]
          }]`,
          value: curVal?.data?.id as string,
          disabled: true,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
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
                    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data
                      ?.productCode?.prefix
                  }
                  -
                  {
                    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data
                      ?.productCode?.initialNo
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
              {productData?.nature !== NatureOfDepositProduct?.Saving &&
                productData?.nature !== NatureOfDepositProduct?.Current && (
                  <GridItem display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                        {/* {t['accInterestRate']} */}
                        Tenure
                      </Text>
                      <Box pl="s24">
                        <ul>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Minimum: {productData?.minTenureUnitNumber} {productData?.tenureUnit}
                            </Text>
                          </li>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Maximum: : {productData?.maxTenureUnitNumber}{' '}
                              {productData?.tenureUnit}
                            </Text>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </GridItem>
                )}

              <GridItem display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                    {/* {t['accInterestRate']} */}
                    Deposit Amount Limit
                  </Text>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <Text color="neutralColorLight.Gray-70" fontSize="s2" fontWeight="Regular">
                          Minimum:
                          {productData?.nature !== NatureOfDepositProduct?.Saving &&
                          productData?.nature !== NatureOfDepositProduct?.Current
                            ? productData?.depositAmount?.minAmount
                            : productData?.balanceLimit?.minAmount}
                        </Text>
                      </li>

                      <li>
                        <Text color="neutralColorLight.Gray-70" fontSize="s2" fontWeight="Regular">
                          Maximum:{' '}
                          {productData?.nature !== NatureOfDepositProduct?.Saving &&
                          productData?.nature !== NatureOfDepositProduct?.Current
                            ? productData?.depositAmount?.minAmount
                            : productData?.balanceLimit?.maxAmount}
                        </Text>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </GridItem>

              <GridItem display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                    {/* {t['accInterestRate']} */}
                    Transaction Limit
                  </Text>
                  <Box pl="s24">
                    <ul>
                      <li>
                        <Text color="neutralColorLight.Gray-70" fontSize="s2" fontWeight="Regular">
                          Minimum: {productData?.depositAmount?.minAmount}
                        </Text>
                      </li>

                      <li>
                        <Text color="neutralColorLight.Gray-70" fontSize="s2" fontWeight="Regular">
                          Maximum: {productData?.depositAmount?.maxAmount}
                        </Text>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </GridItem>

              {productData?.criteria && (
                <>
                  <GridItem display="flex" flexDirection="column">
                    <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                      {/* {t['accInterestRate']} */}
                      Criteria
                    </Text>
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Box display="flex" flexDirection="column" gap="s16" pl="s24">
                        <ul>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Age:{' '}
                              <b>
                                {' '}
                                Mininum: {productData?.minAge} : Maximum {productData?.maxAge}
                              </b>
                            </Text>
                          </li>
                          {productData?.genderId && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                display="flex"
                                flexDirection="row"
                                gap="s4"
                                fontWeight="Regular"
                              >
                                Gender:{' '}
                                {tempGender?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" pl="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                        </ul>

                        <ul>
                          {productData?.foreignEmployment && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                                display="flex"
                                flexDirection="row"
                                gap="s4"
                              >
                                Foreign Employment:{' '}
                                <b>{productData?.foreignEmployment ? 'true' : 'false'}</b>
                              </Text>
                            </li>
                          )}

                          {productData?.typeOfMember?.includes(KymMemberTypesEnum.Institution) && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                              >
                                Business (Institutions):{' '}
                                {tempIns?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" p="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                        </ul>
                      </Box>
                    </Box>
                  </GridItem>
                  {productData?.maritalStatusId ||
                    productData?.occupation ||
                    productData?.typeOfMember?.includes(KymMemberTypesEnum?.CooperativeUnion) ||
                    productData?.typeOfMember?.includes(KymMemberTypesEnum?.Cooperative)}
                  <GridItem display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Box display="flex" flexDirection="column" gap="s16" pl="s24">
                        <ul>
                          {productData?.maritalStatusId && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                                display="flex"
                                flexDirection="row"
                                gap="s4"
                              >
                                {' '}
                                Marital Status:
                                {tempMarriage?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" pl="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                          {productData?.occupation && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                                display="flex"
                                flexDirection="row"
                                gap="s4"
                              >
                                Occupation Detail
                                {tempOccupationOptions?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" p="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                        </ul>

                        <ul>
                          {productData?.typeOfMember?.includes(
                            KymMemberTypesEnum?.CooperativeUnion
                          ) && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                              >
                                Nature of Business ( COOP Union):
                                {tempCoopUnionOptions?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" p="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                          {productData?.typeOfMember?.includes(KymMemberTypesEnum?.Cooperative) && (
                            <li>
                              <Text
                                color="neutralColorLight.Gray-70"
                                fontSize="s2"
                                fontWeight="Regular"
                                display="flex"
                                flexDirection="row"
                                gap="s4"
                              >
                                Cooperative Type:{' '}
                                {tempCoopOptions?.map((item) => (
                                  <Text fontSize="s2" fontWeight="bold" p="s4">
                                    {item}
                                  </Text>
                                ))}
                              </Text>
                            </li>
                          )}
                        </ul>
                      </Box>
                    </Box>
                  </GridItem>
                  <GridItem display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Box display="flex" flexDirection="column" gap="s16" pl="s24">
                        <ul>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Education Qualification:{' '}
                              {tempEducationOptions?.map((item) => (
                                <Text fontSize="s2" fontWeight="bold" p="s4">
                                  {item}
                                </Text>
                              ))}
                            </Text>
                          </li>

                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Ethinicity:{' '}
                              {tempEthnicityOptions?.map((item) => (
                                <Text fontSize="s2" fontWeight="bold" p="s4">
                                  {item}
                                </Text>
                              ))}
                            </Text>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </GridItem>
                </>
              )}

              <GridItem display="flex" flexDirection="column">
                <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                  {t['accRequiredDocument']}
                </Text>
                <Box pl="s24" display="grid">
                  <ul>
                    {productData?.individualDocuments?.map((item) => (
                      <li key={`${item}`}>
                        <Text color="neutralColorLight.Gray-70" fontSize="s2" fontWeight="Regular">
                          {item === IndividualRequiredDocument?.Fingerprint
                            ? 'FingerPrint'
                            : item === IndividualRequiredDocument?.Form
                            ? 'Form'
                            : item === IndividualRequiredDocument?.NomineeDocument
                            ? 'Nominee Document'
                            : item === IndividualRequiredDocument?.Photo
                            ? 'Photo'
                            : 'Signature'}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </Box>
              </GridItem>

              {productData?.nature !== NatureOfDepositProduct?.Current &&
                productData?.nature !== NatureOfDepositProduct?.Saving && (
                  <>
                    {' '}
                    <GridItem display="flex" flexDirection="column">
                      <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                        {t['accPenalty']}
                      </Text>
                      <Box pl="s24">
                        <ul>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Penalty {productData?.penaltyData?.penaltyRate} %
                            </Text>
                          </li>
                          {/*
                      <li>
                        <Text
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 2
                        </Text>
                      </li>

                      <li>
                        <Text
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Penalty 3
                        </Text>
                      </li> */}
                        </ul>
                      </Box>
                    </GridItem>
                    <GridItem display="flex" flexDirection="column" gap="s4">
                      <Text color="primary.800" fontSize="s3" fontWeight="Medium">
                        {t['accRebate']}
                      </Text>
                      <Box pl="s24">
                        <ul>
                          <li>
                            <Text
                              color="neutralColorLight.Gray-70"
                              fontSize="s2"
                              fontWeight="Regular"
                            >
                              Rebate {productData?.rebateData?.rebateAmount} %
                            </Text>
                          </li>
                          {/*
                      <li>
                        <Text
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 2
                        </Text>
                      </li>

                      <li>
                        <Text
                          color="neutralColorLight.Gray-70"
                          fontSize="s2"
                          fontWeight="Regular"
                        >
                          Rebate 3
                        </Text>
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
