// import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

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

const GenderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
const MartialOptions = [
  { label: 'Married', value: 'married' },
  { label: 'Unmarried', value: 'unmarried' },
  { label: 'Single', value: 'single' },
];
const EducationalOptions = [
  { label: '+2', value: '+2' },
  { label: 'Bachelors', value: 'bachelors' },
  { label: 'Masters', value: 'masters' },
];
const EthnicityOptions = [
  { label: 'Brahmin', value: 'brahmin' },
  { label: 'Chettri', value: 'chettri' },
  { label: 'Newar', value: 'newar' },
];

const OccupationalOptions = [
  { label: 'Farmer', value: 'farmer' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Doctor', value: 'doctor' },
];

const CheckboxYesNo = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];
const CoOperativeType = [
  {
    label: 'Saving & Loan',
    value: 'savaingLoan',
  },
  {
    label: 'Agricultural',
    value: 'agricultural',
  },
  {
    label: 'Industrial',
    value: 'industrial',
  },
  {
    label: 'Business',
    value: 'business',
  },
  {
    label: 'Multi Purpose',
    value: 'multiPropose',
  },
  {
    label: 'Dairy',
    value: 'dairy',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

export const GridItems = () => {
  const { watch } = useFormContext();
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

  const { t } = useTranslation();

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
                name="maxAge"
                placeholder="Enter Minimum Age"
                label="Minimum Age"
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            ageCheck &&
            ageCheck.indexOf('AGE') !== -1 && (
              <FormInput
                name="minAge"
                placeholder="Enter Maxinum Age"
                label="Maximum Age"
              />
            )}
          {memberType &&
            memberType?.indexOf('INDIVIDUAL') !== -1 &&
            genderCheck &&
            genderCheck.indexOf('GENDER') !== -1 && (
              <FormSelect
                name="genderId"
                options={GenderOptions}
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
                options={EthnicityOptions}
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
                options={OccupationalOptions}
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
                options={OccupationalOptions}
                label={t['depositProductNatureofBusinessIns']}
                placeholder={t['depositProductSelectNatureofBusiness']}
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
                options={OccupationalOptions}
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
                  list={CoOperativeType}
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
