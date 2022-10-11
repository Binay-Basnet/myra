import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

import {
  FormCategory,
  FormFieldSearchTerm,
  useGetSettingsOptionsFieldsQuery,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer } from '../formui';

export const GridItems = () => {
  const { watch, resetField } = useFormContext();
  const criteria = watch('criteria');
  const memberType = watch('typeOfMember');

  useEffect(() => {
    if (!criteria?.includes('AGE')) {
      resetField('minAge');
      resetField('maxAge');
    }
    if (!criteria?.includes('GENDER')) {
      resetField('genderId');
    }
    if (!criteria?.includes('MARITAL_STATUS')) {
      resetField('maritalStatusId');
    }
    if (!criteria?.includes('EDUCATION_QUALIFICATION')) {
      resetField('educationQualification');
    }
    if (!criteria?.includes('ETHNICITY')) {
      resetField('ethnicity');
    }
    if (!criteria?.includes('OCCUPATION_DETAILS')) {
      resetField('occupation');
    }
    if (!criteria?.includes('FOREIGN_EMPLOYMENT')) {
      resetField('foreignEmployment');
    }
    if (!criteria?.includes('NATURE_OF_BUSINESS_INSTITUTIONS')) {
      resetField('natureOfBusinessInstitution');
    }
    if (!criteria?.includes('COOPERATIVE_TYPE')) {
      resetField('cooperativeType');
    }
    if (!criteria?.includes('NATURE_OF_BUSINESS_COOPUNION')) {
      resetField('natureOFBusinessCoop');
    }
  }, [JSON.stringify(criteria)]);

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

  const EthnicityList = ethnicityOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));

  const OccupationOptions = occupationalOptions?.map((item) => ({
    label: item?.name.local as string,
    value: item?.id as string,
  }));
  if (isEmpty(criteria)) {
    return null;
  }
  return (
    <FormSection>
      {' '}
      {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && criteria?.includes('AGE') && (
        <FormInput name="minAge" label={t['depositProductMinAge']} />
      )}
      {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && criteria?.includes('AGE') && (
        <FormInput name="maxAge" label={t['depositProductMaxAge']} />
      )}
      {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && criteria?.includes('GENDER') && (
        <FormSelect
          name="genderId"
          options={GenderList}
          label={t['depositProductGender']}
          isMulti
        />
      )}
      {memberType &&
        memberType?.indexOf('INDIVIDUAL') !== -1 &&
        criteria?.includes('MARITAL_STATUS') && (
          <FormSelect
            name="maritalStatusId"
            options={MartialOptions}
            label={t['depositProductMaritalStatus']}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('INDIVIDUAL') !== -1 &&
        criteria?.includes('EDUCATION_QUALIFICATION') && (
          <FormSelect
            name="educationQualification"
            options={EducationalOptions}
            label={t['depositProductEducationQualification']}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('INDIVIDUAL') !== -1 &&
        criteria?.includes('ETHNICITY') && (
          <FormSelect
            name="ethnicity"
            options={EthnicityList}
            label={t['depositProductEthinicity']}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('INDIVIDUAL') !== -1 &&
        criteria?.includes('OCCUPATION_DETAILS') && (
          <FormSelect
            name="occupation"
            options={OccupationOptions}
            label={t['depositProductOccupationDetails']}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('INDIVIDUAL') !== -1 &&
        criteria?.includes('FOREIGN_EMPLOYMENT') && (
          <BoxContainer>
            <Text fontSize="s3" fontWeight="500" color="gray.700">
              {t['depositProductForeignEmploymentDetails']}
            </Text>
            <FormSwitchTab name="foreignEmployment" options={CheckboxYesNo} />
          </BoxContainer>
        )}
      {memberType &&
        memberType?.indexOf('INSTITUTION') !== -1 &&
        criteria?.includes('NATURE_OF_BUSINESS_INSTITUTIONS') && (
          <FormSelect
            name="natureOfBusinessInstitution"
            label={t['depositProductNatureofBusinessIns']}
            options={InstituitionList}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('COOPERATIVE_UNION') !== -1 &&
        criteria?.includes('NATURE_OF_BUSINESS_COOPUNION') && (
          <FormSelect
            name="natureOFBusinessCoop"
            options={CoopUnionList}
            label={t['depositProductNatureofBusinessCoopUnion']}
            isMulti
          />
        )}
      {memberType &&
        memberType?.indexOf('COOPERATIVE') !== -1 &&
        criteria?.includes('COOPERATIVE_TYPE') && (
          <BoxContainer>
            <Text fontSize="s3" fontWeight="500" color="gray.700">
              {t['depositProductCoorperativeType']}
            </Text>
            <Box w="40%">
              <FormCheckboxGroup name="cooperativeType" list={CoopTypeList} orientation="column" />
            </Box>
          </BoxContainer>
        )}
    </FormSection>
  );
};
