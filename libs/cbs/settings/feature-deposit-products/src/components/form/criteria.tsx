import React from 'react';
import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { CriteriaSection } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

export const Critera = () => {
  const { watch } = useFormContext();
  const memberType = watch('typeOfMember');
  const { t } = useTranslation();

  const age = [{ label: t['depositProductAge'], value: CriteriaSection.Age }];
  const gender = [
    { label: t['depositProductGender'], value: CriteriaSection.Gender },
  ];
  const maritalStatus = [
    {
      label: t['depositProductMaritalStatus'],
      value: CriteriaSection.MaritalStatus,
    },
  ];
  const occupationDetails = [
    {
      label: t['depositProductOccupationDetails'],
      value: CriteriaSection.OccupationDetails,
    },
  ];
  const educationalQuality = [
    {
      label: t['depositProductEducationQualification'],
      value: CriteriaSection.EducationQualification,
    },
  ];
  const ethnicity = [
    { label: t['depositProductEthinicity'], value: CriteriaSection.Ethnicity },
  ];
  const foreignEmployment = [
    {
      label: t['depositProductForeignEmployment'],
      value: CriteriaSection.ForeignEmployment,
    },
  ];

  const NOBInstitution = [
    {
      label: t['depositProductNatureofBusinessIns'],
      value: CriteriaSection.NatureOfBusinessInstitutions,
    },
  ];
  const NOBCoopUnion = [
    {
      label: t['depositProductNatureofBusinessCoopUnion'],
      value: CriteriaSection.NatureOfBusinessCoopunion,
    },
  ];

  const CoperativeType = [
    {
      label: t['depositProductCoorperativeType'],
      value: CriteriaSection.CooperativeType,
    },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText> {t['depositProductCriteria']} </TopText>
        <SubText>{t['depositProductSelectedChecklistwillgenerate']}</SubText>
      </TextBoxContainer>
      <InputGroupContainer>
        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={age} />
        )}
        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={gender} />
        )}
        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={maritalStatus} />
        )}

        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={educationalQuality} />
        )}
        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={ethnicity} />
        )}
        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={occupationDetails} />
        )}

        {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
          <FormCheckboxGroup name="criteria" list={foreignEmployment} />
        )}
        {memberType && memberType?.indexOf('INSTITUTION') !== -1 && (
          <FormCheckboxGroup name="criteria" list={NOBInstitution} />
        )}

        {memberType && memberType?.indexOf('COOPERATIVE') !== -1 && (
          <FormCheckboxGroup name="criteria" list={CoperativeType} />
        )}
        {memberType && memberType?.indexOf('COOPERATIVE_UNION') !== -1 && (
          <FormCheckboxGroup name="criteria" list={NOBCoopUnion} />
        )}
      </InputGroupContainer>
    </BoxContainer>
  );
};
