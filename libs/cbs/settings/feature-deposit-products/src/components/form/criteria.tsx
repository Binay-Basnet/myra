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

import { GridItems } from './listGrid';
import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

const typesOfMember = [
  { label: 'Individual', value: 'individual' },
  { label: 'Institiutional', value: 'institiutional' },
  { label: 'Cooperative', value: 'cooperative' },
  { label: 'Cooperative Union', value: 'cooperativeUnion' },
];

const age = [{ label: 'Age', value: 'age' }];
const gender = [{ label: 'Gender', value: 'gender' }];
const maritalStatus = [{ label: 'Marital Status', value: 'martialStatus' }];
const occupationDetails = [
  { label: 'Occupation Details', value: 'occupationDetails' },
];
const educationalQuality = [
  { label: 'Education Qualification', value: 'educationQualification' },
];
const ethnicity = [{ label: 'Ethinicity', value: 'ethinicity' }];
const foreignEmployment = [
  { label: 'Foreign Employment', value: 'foreignEmployment' },
];

const NOBInstitution = [
  { label: 'Nature of Business (Institutions)', value: 'nOBInstitution' },
];
const NOBCoopUnion = [
  { label: 'Nature of Business (COOP Union)', value: 'noBCOOPunion' },
];

const CoperativeType = [{ label: 'Coperative Type', value: 'cooperativeType' }];
export const Critera = ({ watch }: any) => {
  const memberType = watch('typeOfMember');
  console.log('membertype', memberType?.indexOf('individual'));
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Deposit Frequency</TopText>
        <SubText>
          Select deposit frequency. Further details have to be added during
          account opening.
        </SubText>
      </TextBoxContainer>
      <InputGroupContainer>
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup name="criteria.age" list={age} />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup name="criteria.gender" list={gender} />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup
            name="criteria.maritalStatus"
            list={maritalStatus}
          />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup
            name="criteria.occupationalDetails"
            list={occupationDetails}
          />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup
            name="criteria.educationalQualification"
            list={educationalQuality}
          />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup name="criteria.ethnicity" list={ethnicity} />
        )}

        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup
            name="criteria.foreignEmployment"
            list={foreignEmployment}
          />
        )}
        {memberType && memberType?.indexOf('institiutional') !== -1 && (
          <FormCheckboxGroup
            name="criteria.nobInstitution"
            list={NOBInstitution}
          />
        )}

        {memberType && memberType?.indexOf('cooperative') !== -1 && (
          <FormCheckboxGroup
            name="criteria.cooperativeType"
            list={CoperativeType}
          />
        )}
        {memberType && memberType?.indexOf('cooperativeUnion') !== -1 && (
          <FormCheckboxGroup name="criteria.nobCOOPUnion" list={NOBCoopUnion} />
        )}
      </InputGroupContainer>
    </BoxContainer>
  );
};
