import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckbox,
  FormCheckboxGroup,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@coop/shared/ui';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

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
  return (
    <BoxContainer p="s16" border={'1px solid'} borderColor="border.layout">
      <InputGroupContainer rowGap={'s32'}>
        {ageCheck && ageCheck.indexOf('age') !== -1 && (
          <BoxContainer>
            <Text fontSize={'s3'} fontWeight="500" color="gray.700">
              Age
            </Text>
            <FormInput
              name="maxAge"
              label="Minimum Age"
              placeholder="Enter Minimum Age"
            />
            <FormInput
              name="minAge"
              label="Maximum Age"
              placeholder="Enter Maxinum Age"
            />
          </BoxContainer>
        )}
        {genderCheck && genderCheck.indexOf('gender') !== -1 && (
          <FormSelect
            name="selectGender"
            options={GenderOptions}
            label="Gender"
            isMulti
          />
        )}
        {marriageCheck && marriageCheck.indexOf('martialStatus') !== -1 && (
          <FormSelect
            name="selectMarialOptions"
            options={MartialOptions}
            label="Marital Status"
          />
        )}
        {educationCheck &&
          educationCheck.indexOf('educationQualification') !== -1 && (
            <FormSelect
              name="selectEducationOptions"
              options={EducationalOptions}
              label="Education Qualification"
            />
          )}
        {ethnicityCheck && ethnicityCheck.indexOf('ethinicity') !== -1 && (
          <FormSelect
            name="selectEthniciyOptions"
            options={EthnicityOptions}
            label="Ethinicity"
          />
        )}
        {occupationCheck &&
          occupationCheck.indexOf('occupationDetails') !== -1 && (
            <FormSelect
              name="selectOccupationalOptions"
              options={OccupationalOptions}
              label="Occupational Details"
            />
          )}
        {foreignCheck && foreignCheck.indexOf('foreignEmployment') !== -1 && (
          <BoxContainer>
            <Text fontSize={'s3'} fontWeight="500" color="gray.700">
              Foreign Employment Details{' '}
            </Text>
            <FormCheckboxGroup
              name="foreignEmploymentRequired"
              orientation="column"
              list={CheckboxYesNo}
            />
          </BoxContainer>
        )}
        {nobusInstitution &&
          nobusInstitution.indexOf('nOBInstitution') !== -1 && (
            <FormSelect
              name="selectbusinessInstitution"
              options={OccupationalOptions}
              label="Nature of Business (Institutions)"
            />
          )}
        {coperativeStatus &&
          coperativeStatus.indexOf('cooperativeType') !== -1 && (
            <BoxContainer>
              <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                Coorperative Type
              </Text>
              <FormCheckboxGroup
                name="selectCooperativeType"
                label="Coorperative Type"
                list={CoOperativeType}
                orientation="column"
              />
            </BoxContainer>
          )}
        {cooperativeUnionstatus &&
          cooperativeUnionstatus.indexOf('noBCOOPunion') !== -1 && (
            <FormSelect
              name="selectbusinessInstitution"
              options={OccupationalOptions}
              label="Nature of Business (COOP Union)"
            />
          )}
      </InputGroupContainer>
    </BoxContainer>
  );
};
