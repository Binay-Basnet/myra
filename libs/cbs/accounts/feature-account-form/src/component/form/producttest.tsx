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
import { GroupContainer, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

export const ProductTest = () => {
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
        { label: curVal?.productName as string, value: curVal?.id as string },
      ],
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (prevVal, curVal) => [
        ...prevVal,
        {
          label: curVal?.data?.productName as string,
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
            __placeholder={t['accSelectProduct']}
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
              gap="s20"
              bg="primary.100"
              display="grid"
              gridTemplateColumns="repeat(2,1fr)"
              borderRadius="br2"
              p="s16"
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontWeight="Medium" fontSize="s3">
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
                <Text fontWeight="Medium" fontSize="r2">
                  {productData?.productName}
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontWeight="Medium" fontSize="s3">
                  Interest Rate
                </Text>
                <Text fontWeight="Medium" fontSize="r2">
                  {productData?.interest?.defaultRate}%
                </Text>
              </Box>
            </Box>
            <InputGroupContainer>
              {(productData?.tenureUnit || productData?.tenureUnit) && (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="s3" fontWeight="600">
                    Tenure
                  </Text>
                  {productData?.tenureUnit && (
                    <Text fontSize="s3" fontWeight="600">
                      Minimum:{productData?.minTenureUnitNumber} {productData?.tenureUnit}
                    </Text>
                  )}
                  {productData?.tenureUnit && (
                    <Text fontSize="s3" fontWeight="400">
                      Maximum: {productData?.minTenureUnitNumber} {productData?.tenureUnit}
                    </Text>
                  )}
                </Box>
              )}
              {NatureOfDepositProduct?.VoluntaryOrOptional && (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="s3" fontWeight="600">
                    Balance Limit
                  </Text>
                  {productData?.balanceLimit?.minAmount && (
                    <Text fontSize="s3" fontWeight="400">
                      Minimum:{productData?.balanceLimit?.minAmount}
                    </Text>
                  )}
                  {productData?.balanceLimit?.maxAmount && (
                    <Text fontSize="s3" fontWeight="400">
                      Maximum: {productData?.balanceLimit?.maxAmount}
                    </Text>
                  )}
                </Box>
              )}
              {(productData?.depositAmount?.minAmount || productData?.depositAmount?.maxAmount) && (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="s3" fontWeight="600">
                    Deposit Amount Limit
                  </Text>
                  {productData?.depositAmount?.minAmount && (
                    <Text fontSize="s3" fontWeight="400">
                      Minimum: {productData?.depositAmount?.minAmount}
                    </Text>
                  )}
                  {productData?.depositAmount?.maxAmount && (
                    <Text fontSize="s3" fontWeight="400">
                      Maximum: {productData?.depositAmount?.maxAmount}
                    </Text>
                  )}
                </Box>
              )}{' '}
            </InputGroupContainer>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight="600">
                Criteria
              </Text>
              <InputGroupContainer>
                {(productData?.maxAge || productData?.minAge) && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Age:
                    </Text>
                    {productData?.minAge && (
                      <Text fontSize="s3" fontWeight="400">
                        Minimum: {productData?.minAge}
                      </Text>
                    )}
                    {productData?.maxAge && (
                      <Text fontSize="s3" fontWeight="400">
                        Maximum:{productData?.maxAge}
                      </Text>
                    )}
                  </Box>
                )}
                {productData?.maritalStatusId && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Marital status{' '}
                    </Text>
                    {tempMarriage?.map((item) => (
                      <Text fontSize="s3" fontWeight="bold" pl="s4">
                        {item}
                      </Text>
                    ))}
                  </Box>
                )}
                {productData?.educationQualification && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Educational Qalification:{' '}
                    </Text>
                    {tempEducationOptions?.map((item) => (
                      <Text fontSize="s3" fontWeight="bold">
                        {item}
                      </Text>
                    ))}
                  </Box>
                )}
                {productData?.genderId && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Gender
                    </Text>
                    {tempGender?.map((item) => (
                      <Text fontSize="s3" fontWeight="bold" pl="s4">
                        {item}
                      </Text>
                    ))}
                  </Box>
                )}
                {productData?.occupation && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Occupational Details
                    </Text>
                    {tempOccupationOptions?.map((item) => (
                      <Text fontSize="s3" fontWeight="bold" p="s4">
                        {item}
                      </Text>
                    ))}
                  </Box>
                )}
                {productData?.ethnicity && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Ethnicity
                    </Text>
                    <Box>
                      {tempEthnicityOptions?.map((item) => (
                        <Text fontSize="s3" fontWeight="bold" p="s4">
                          {item}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                )}

                {productData?.foreignEmployment && (
                  <Box display="flex" flexDirection="row" gap="s4">
                    <Text fontSize="s3" fontWeight="400">
                      Foreign Employment{' '}
                    </Text>
                    <Text fontSize="s3" fontWeight="500">
                      {productData?.foreignEmployment ? 'Yes' : 'No'}
                    </Text>
                  </Box>
                )}
                {productData?.typeOfMember?.includes(KymMemberTypesEnum?.CooperativeUnion) &&
                  productData?.natureOFBusinessCoop && (
                    <Box display="flex" flexDirection="row" gap="s4">
                      <Text fontSize="s3" fontWeight="400">
                        Nature of Business (Coop Union)
                      </Text>
                      {tempCoopUnionOptions?.map((item) => (
                        <Text fontSize="s3" fontWeight="bold" p="s4">
                          {item}
                        </Text>
                      ))}
                    </Box>
                  )}
                {productData?.typeOfMember?.includes(KymMemberTypesEnum.Institution) &&
                  productData?.natureOfBusinessInstitution && (
                    <Box display="flex" flexDirection="row" gap="s4">
                      <Text fontSize="s3" fontWeight="400">
                        Business (Institutions):{' '}
                      </Text>
                      {tempIns?.map((item) => (
                        <Text fontSize="s3" fontWeight="bold" p="s4">
                          {item}
                        </Text>
                      ))}
                    </Box>
                  )}
                {productData?.typeOfMember?.includes(KymMemberTypesEnum?.Cooperative) &&
                  productData?.cooperativeType && (
                    <Box display="flex" flexDirection="row" gap="s4">
                      <Text fontSize="s3" fontWeight="400">
                        Cooperative Type:{' '}
                      </Text>
                      <Box>
                        {tempCoopOptions?.map((item) => (
                          <Text fontSize="s3">{item}</Text>
                        ))}
                      </Box>
                    </Box>
                  )}
              </InputGroupContainer>
            </Box>
            <InputGroupContainer>
              {productData?.individualDocuments && (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="r1" fontWeight="600">
                    Required Document
                  </Text>
                  {productData?.individualDocuments?.map((item, index) => (
                    <Box key={`${item}${index}`}>
                      <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Regular">
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
                    </Box>
                  ))}
                </Box>
              )}
            </InputGroupContainer>
          </Box>
        )}
      </Box>
    </GroupContainer>
  );
};
