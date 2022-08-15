import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormCategory,
  FormFieldSearchTerm,
  useGetSettingsOptionsFieldsQuery,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckboxGroup,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer } from '../formui';

export const GridItems = () => {
  const { watch, reset, getValues } = useFormContext();
  const ageCheck = watch('criteria');
  const genderCheck = watch('criteria');
  const marriageCheck = watch('criteria');
  const occupationCheck = watch('criteria');
  const educationCheck = watch('criteria');
  const ethnicityCheck = watch('criteria');
  const foreignCheck = watch('criteria');
  const nobusInstitution = watch('criteria');
  const cooperativeUnionstatus = watch('criteria');
  const coperativeStatus = watch('criteria');
  const memberType = watch('typeOfMember');

  useEffect(() => {
    if (ageCheck === undefined || ageCheck?.length === 0) {
      reset({
        ...getValues(),
        minAge: null,
        maxAge: null,
      });
    }
  }, [ageCheck]);

  const { t } = useTranslation();

  const CheckboxYesNo = [
    {
      label: t['yes'],
      value: true,
    },
    {
      label: t['no'],
      value: false,
    },
  ];

  const { data: genderFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
    category: FormCategory.KymIndividual,
  });

  const { data: maritialFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.MaritalStatus,
    category: FormCategory.KymIndividual,
  });

  const { data: educationFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.EducationQualification,
    category: FormCategory.KymIndividual,
  });

  const { data: ethnicityFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Ethnicity,
    category: FormCategory.KymIndividual,
  });

  const { data: occupationFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
    category: FormCategory.KymIndividual,
  });

  const { data: institutionFields, isLoading: OrganizationLoading } =
    useGetSettingsOptionsFieldsQuery({
      searchTerm: FormFieldSearchTerm.OrganizationType,
      category: FormCategory.KymInstitution,
    });

  const { data: coopTypeFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.CooperativeType,
    category: FormCategory.KymCoop,
  });

  const { data: coopUnionOrgFields } = useGetSettingsOptionsFieldsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
    category: FormCategory.KymCoopUnion,
  });

  const genderOptions = genderFields?.form?.options?.predefined?.data;
  const maritialOptions = maritialFields?.form?.options?.predefined?.data;
  const educationOptions = educationFields?.form?.options?.predefined?.data;
  const ethnicityOptions = ethnicityFields?.form?.options?.predefined?.data;
  const occupationalOptions = occupationFields?.form?.options?.predefined?.data;
  const institutionOptions = institutionFields?.form?.options?.predefined?.data;
  const coopTypeOptions = coopTypeFields?.form?.options?.predefined?.data;
  const coopUnionOptions = coopUnionOrgFields?.form?.options?.predefined?.data;

  const GenderList = genderOptions?.map((item) => {
    return {
      label: item?.name?.local,
      value: item?.id,
    };
  });

  const MartialOptions = maritialOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const EducationalOptions = educationOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const InstituitionList = institutionOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const CoopTypeList = coopTypeOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const CoopUnionList = coopUnionOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const EthnicityList = ethnicityOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  const OccupationOptions = occupationalOptions?.map((item) => {
    return {
      label: item?.name.local,
      value: item?.id,
    };
  });

  if (
    ageCheck ||
    genderCheck ||
    marriageCheck ||
    occupationCheck ||
    educationCheck ||
    ethnicityCheck ||
    foreignCheck ||
    nobusInstitution ||
    cooperativeUnionstatus ||
    coperativeStatus
  ) {
    return (
      <BoxContainer
        p="s16"
        border={'1px solid'}
        borderColor="border.layout"
        borderRadius={'4px'}
      >
        <InputGroupContainer rowGap={'s32'}>
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            ageCheck &&
            ageCheck.indexOf('AGE') !== -1 && (
              <FormInput
                name="minAge"
                placeholder={t['depositProductEnterMinimumAge']}
                label={t['depositProductMinAge']}
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            ageCheck &&
            ageCheck.indexOf('AGE') !== -1 && (
              <FormInput
                name="maxAge"
                placeholder={t['depositProductEnterMaxinumAge']}
                label={t['depositProductMaxAge']}
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            genderCheck &&
            genderCheck.indexOf('GENDER') !== -1 && (
              <FormSelect
                name="genderId"
                options={GenderList}
                label={t['depositProductGender']}
                placeholder={t['depositProductSelectGender']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            marriageCheck &&
            marriageCheck.indexOf('MARITAL_STATUS') !== -1 && (
              <FormSelect
                name="maritalStatusId"
                options={MartialOptions}
                label={t['depositProductMaritalStatus']}
                placeholder={t['depositProductSelectMaritalStatus']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            educationCheck &&
            educationCheck.indexOf('EDUCATION_QUALIFICATION') !== -1 && (
              <FormSelect
                name="educationQualification"
                options={EducationalOptions}
                label={t['depositProductEducationQualification']}
                placeholder={t['depositProductSelectEducationQualification']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            ethnicityCheck &&
            ethnicityCheck.indexOf('ETHNICITY') !== -1 && (
              <FormSelect
                name="ethnicity"
                options={EthnicityList}
                label={t['depositProductEthinicity']}
                placeholder={t['depositProductSelectEthinicity']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            occupationCheck &&
            occupationCheck.indexOf('OCCUPATION_DETAILS') !== -1 && (
              <FormSelect
                name="occupation"
                options={OccupationOptions}
                label={t['depositProductOccupationDetails']}
                placeholder={t['depositProductSelectOccupationDetails']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            foreignCheck &&
            foreignCheck.indexOf('FOREIGN_EMPLOYMENT') !== -1 && (
              <BoxContainer>
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['depositProductForeignEmploymentDetails']}
                </Text>
                <FormSwitchTab
                  name="foreignEmployment"
                  options={CheckboxYesNo}
                />
              </BoxContainer>
            )}
          {memberType &&
            memberType?.indexOf('INSTITUTION') !== -1 &&
            nobusInstitution &&
            nobusInstitution.indexOf('NATURE_OF_BUSINESS_INSTITUTIONS') !==
              -1 && (
              <FormSelect
                name="natureOfBusinessInstitution"
                label={t['depositProductNatureofBusinessIns']}
                placeholder={t['depositProductSelectNatureofBusiness']}
                options={InstituitionList}
                isLoading={OrganizationLoading}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('COOPERATIVE_UNION') !== -1 &&
            cooperativeUnionstatus &&
            cooperativeUnionstatus.indexOf('NATURE_OF_BUSINESS_COOPUNION') !==
              -1 && (
              <FormSelect
                name="natureOFBusinessCoop"
                options={CoopUnionList}
                label={t['depositProductNatureofBusinessCoopUnion']}
                placeholder={t['depositProductSelectNatureofBusiness']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('COOPERATIVE') !== -1 &&
            coperativeStatus &&
            coperativeStatus.indexOf('COOPERATIVE_TYPE') !== -1 && (
              <BoxContainer>
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['depositProductCoorperativeType']}
                </Text>
                <FormCheckboxGroup
                  name="cooperativeType"
                  label={t['depositProductCoorperativeType']}
                  list={CoopTypeList}
                  orientation="column"
                />
              </BoxContainer>
            )}
        </InputGroupContainer>
      </BoxContainer>
    );
  } else {
    return <Box></Box>;
  }
};
