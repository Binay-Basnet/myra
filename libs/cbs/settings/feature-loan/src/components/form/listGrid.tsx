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

const CheckboxYesNo = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const GridItems = () => {
  const { t } = useTranslation();
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

  const GenderList = genderOptions?.map((item) => {
    return {
      label: item?.name?.local as string,
      value: item?.id as string,
    };
  });

  const MartialOptions = maritialOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const EducationalOptions = educationOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const EthnicityList = ethnicityOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const OccupationOptions = occupationalOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const InstituitionList = institutionOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const CoopTypeList = coopTypeOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  const CoopUnionList = coopUnionOptions?.map((item) => {
    return {
      label: item?.name.local as string,
      value: item?.id as string,
    };
  });

  if (criteria) {
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
            criteria &&
            criteria.indexOf('AGE') !== -1 && (
              <FormInput
                name="maxAge"
                __placeholder={t['loanProductMinAgeEnter']}
                label={t['loanProductMinAge']}
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            criteria &&
            criteria.indexOf('AGE') !== -1 && (
              <FormInput
                name="minAge"
                __placeholder={t['loanProductMaxAgeEnter']}
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
                __placeholder={t['loanProductSelectGender']}
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
                __placeholder={t['loanProductSelectMaritalStatus']}
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
                __placeholder={t['loanProductSelectEducationQualification']}
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
                __placeholder={t['loanProductSelectEthinicity']}
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
                __placeholder={t['loanProductSelectOccupationDetails']}
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
                __placeholder={t['loanProductSelectNatureofBusiness']}
                isMulti
              />
            )}

          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            criteria &&
            criteria.indexOf('FOREIGN_EMPLOYMENT') !== -1 && (
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['loanProductForeignEmployment']}
                </Text>
                <FormSwitchTab
                  name="foreignEmployment"
                  options={CheckboxYesNo}
                />
              </Box>
            )}

          {memberType &&
            memberType?.indexOf('COOPERATIVE') !== -1 &&
            criteria &&
            criteria.indexOf('COOPERATIVE_TYPE') !== -1 && (
              <BoxContainer>
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['loanProductCoorperativeType']}
                </Text>
                <Box w="40%">
                  <FormCheckboxGroup
                    name="cooperativeType"
                    label={t['loanProductCoorperativeType']}
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
                __placeholder={t['loanProductSelectNatureofBusiness']}
                isMulti
              />
            )}
        </InputGroupContainer>
      </BoxContainer>
    );
  } else {
    return <Box></Box>;
  }
};
