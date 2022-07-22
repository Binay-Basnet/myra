// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup, FormInput, FormSelect } from '@coop/shared/form';
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
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
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

export const GridItems = ({ watch }: any) => {
  const ageCheck = watch('criteria.age');
  const genderCheck = watch('criteria.gender');
  const marriageCheck = watch('criteria.maritalStatus');
  const occupationCheck = watch('criteria.occupationalDetails');
  const educationCheck = watch('criteria.educationalQualification');
  const ethnicityCheck = watch('criteria.ethnicity');
  const foreignCheck = watch('criteria.foreignEmployment');
  const nobusInstitution = watch('criteria.nobInstitution');
  const cooperativeUnionstatus = watch('criteria.nobCOOPUnion');
  const coperativeStatus = watch('criteria.cooperativeType');
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
            memberType?.indexOf('individual') !== -1 &&
            ageCheck &&
            ageCheck.indexOf('age') !== -1 && (
              <FormInput
                name="maxAge"
                placeholder="Enter Minimum Age"
                label="Minimum Age"
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            ageCheck &&
            ageCheck.indexOf('age') !== -1 && (
              <FormInput
                name="minAge"
                placeholder="Enter Maxinum Age"
                label="Maximum Age"
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            genderCheck &&
            genderCheck.indexOf('gender') !== -1 && (
              <FormSelect
                name="selectGender"
                options={GenderOptions}
                label={t['loanProductGender']}
                isMulti
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            marriageCheck &&
            marriageCheck.indexOf('martialStatus') !== -1 && (
              <FormSelect
                name="selectMarialOptions"
                options={MartialOptions}
                label={t['loanProductMarital']}
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            educationCheck &&
            educationCheck.indexOf('educationQualification') !== -1 && (
              <FormSelect
                name="selectEducationOptions"
                options={EducationalOptions}
                label={t['loanProductEducationQualification']}
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            ethnicityCheck &&
            ethnicityCheck.indexOf('ethinicity') !== -1 && (
              <FormSelect
                name="selectEthniciyOptions"
                options={EthnicityOptions}
                label={t['loanProductEthinicity']}
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            occupationCheck &&
            occupationCheck.indexOf('occupationDetails') !== -1 && (
              <FormSelect
                name="selectOccupationalOptions"
                options={OccupationalOptions}
                label={t['loanProductOccupationDetails']}
              />
            )}
          {memberType &&
            memberType?.indexOf('individual') !== -1 &&
            foreignCheck &&
            foreignCheck.indexOf('foreignEmployment') !== -1 && (
              <BoxContainer>
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['loanProductForeignEmployment']}
                </Text>
                <FormCheckboxGroup
                  name="foreignEmploymentRequired"
                  orientation="column"
                  list={CheckboxYesNo}
                />
              </BoxContainer>
            )}
          {memberType &&
            memberType?.indexOf('institiutional') !== -1 &&
            nobusInstitution &&
            nobusInstitution.indexOf('nOBInstitution') !== -1 && (
              <FormSelect
                name="selectbusinessInstitution"
                options={OccupationalOptions}
                label={t['loanProductNatureBusinessIns']}
              />
            )}
          {memberType &&
            memberType?.indexOf('cooperative') !== -1 &&
            coperativeStatus &&
            coperativeStatus.indexOf('cooperativeType') !== -1 && (
              <BoxContainer>
                <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                  {t['loanProductCoorperativeType']}
                </Text>
                <FormCheckboxGroup
                  name="selectCooperativeType"
                  label={t['loanProductCoorperativeType']}
                  list={CoOperativeType}
                  orientation="column"
                />
              </BoxContainer>
            )}
          {memberType &&
            memberType?.indexOf('cooperativeUnion') !== -1 &&
            cooperativeUnionstatus &&
            cooperativeUnionstatus.indexOf('noBCOOPunion') !== -1 && (
              <FormSelect
                name="selectbusinessInstitution"
                options={OccupationalOptions}
                label={t['loanProductNatureBusinessCoopUnion']}
              />
            )}
        </InputGroupContainer>
      </BoxContainer>
    );
  } else {
    return <Box></Box>;
  }
};
