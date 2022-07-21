import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

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
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText> {t['depositProductCriteria']} </TopText>
        <SubText>{t['depositProductSelectedChecklistwillgenerate']}</SubText>
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
            name="criteria.educationalQualification"
            list={educationalQuality}
          />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup name="criteria.ethnicity" list={ethnicity} />
        )}
        {memberType && memberType?.indexOf('individual') !== -1 && (
          <FormCheckboxGroup
            name="criteria.occupationalDetails"
            list={occupationDetails}
          />
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
