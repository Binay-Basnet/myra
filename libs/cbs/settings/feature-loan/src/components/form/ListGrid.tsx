import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Text } from '@myra-ui';

import {
  CriteriaSection,
  FormCategory,
  FormFieldSearchTerm,
  useGetSettingsOptionsFieldsQuery,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer } from '../formui';

export const GridItems = () => {
  const { t } = useTranslation();
  const { watch, resetField } = useFormContext();
  const criteria = watch('criteria');
  const memberType = watch('typeOfMember');
  const minAge = watch('minAge');

  const CheckboxYesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];
  useEffect(() => {
    if (!criteria?.includes(CriteriaSection.Age)) {
      resetField('minAge');
      resetField('maxAge');
    }
    if (!criteria?.includes(CriteriaSection.Gender)) {
      resetField('genderId');
    }
    if (!criteria?.includes(CriteriaSection.MaritalStatus)) {
      resetField('maritalStatusId');
    }
    if (!criteria?.includes(CriteriaSection.EducationQualification)) {
      resetField('educationQualification');
    }
    if (!criteria?.includes(CriteriaSection.Ethnicity)) {
      resetField('ethnicity');
    }
    if (!criteria?.includes(CriteriaSection.OccupationDetails)) {
      resetField('occupation');
    }
    if (!criteria?.includes(CriteriaSection.ForeignEmployment)) {
      resetField('foreignEmployment');
    }
    if (!criteria?.includes(CriteriaSection.NatureOfBusinessInstitutions)) {
      resetField('natureOfBusinessInstitution');
    }
    if (!criteria?.includes(CriteriaSection.CooperativeType)) {
      resetField('cooperativeType');
    }
    if (!criteria?.includes(CriteriaSection.NatureOfBusinessCoopunion)) {
      resetField('natureOFBusinessCoop');
    }
  }, [criteria]);

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

  const { data: institutionFields } = useGetSettingsOptionsFieldsQuery({
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

  const GenderList = genderOptions?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const MartialOptions = maritialOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const EducationalOptions = educationOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const EthnicityList = ethnicityOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const OccupationOptions = occupationalOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const InstituitionList = institutionOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const CoopTypeList = coopTypeOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const CoopUnionList = coopUnionOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  if (criteria) {
    return (
      <FormSection>
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('AGE') !== -1 && (
            <FormInput name="minAge" label={t['loanProductMinAge']} />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('AGE') !== -1 && (
            <FormInput
              rules={{
                min: {
                  value: minAge,
                  message: 'Max age should be greater than min age',
                },
              }}
              name="maxAge"
              label={t['loanProductMaxAge']}
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('GENDER') !== -1 && (
            <FormSelect
              name="genderId"
              options={GenderList}
              label={t['loanProductGender']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('MARITAL_STATUS') !== -1 && (
            <FormSelect
              name="maritalStatusId"
              options={MartialOptions}
              label={t['loanProductMarital']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('EDUCATION_QUALIFICATION') !== -1 && (
            <FormSelect
              name="educationQualification"
              options={EducationalOptions}
              label={t['loanProductEducationQualification']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('ETHNICITY') !== -1 && (
            <FormSelect
              name="ethnicity"
              options={EthnicityList}
              label={t['loanProductEthinicity']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('OCCUPATION_DETAILS') !== -1 && (
            <FormSelect
              name="occupation"
              options={OccupationOptions}
              label={t['loanProductOccupationDetails']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INSTITUTION') !== -1 &&
          criteria &&
          criteria.indexOf('NATURE_OF_BUSINESS_INSTITUTIONS') !== -1 && (
            <FormSelect
              name="natureOfBusinessInstitution"
              options={InstituitionList}
              label={t['loanProductNatureBusinessIns']}
              isMulti
            />
          )}
        {memberType &&
          memberType?.indexOf('INDIVIDUAL') !== -1 &&
          criteria &&
          criteria.indexOf('FOREIGN_EMPLOYMENT') !== -1 && (
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight="500" color="gray.700">
                {t['loanProductForeignEmployment']}
              </Text>
              <FormSwitchTab name="foreignEmployment" options={CheckboxYesNo} />
            </Box>
          )}
        {memberType &&
          memberType?.indexOf('COOPERATIVE') !== -1 &&
          criteria &&
          criteria.indexOf('COOPERATIVE_TYPE') !== -1 && (
            <BoxContainer>
              <Text fontSize="s3" fontWeight="500" color="gray.700">
                {t['loanProductCoorperativeType']}
              </Text>
              <Box w="40%">
                <FormCheckboxGroup
                  name="cooperativeType"
                  list={CoopTypeList}
                  orientation="column"
                />
              </Box>
            </BoxContainer>
          )}
        {memberType &&
          memberType?.indexOf('COOPERATIVE_UNION') !== -1 &&
          criteria &&
          criteria.indexOf('NATURE_OF_BUSINESS_COOPUNION') !== -1 && (
            <FormSelect
              name="natureOFBusinessCoop"
              options={CoopUnionList}
              label={t['loanProductNatureBusinessCoopUnion']}
              isMulti
            />
          )}
      </FormSection>
    );
  }
  return null;
};
