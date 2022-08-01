import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { CriteriaSection } from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

export const Critera = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const memberType = watch('typeOfMember');

  const age = [{ label: t['loanProductAge'], value: CriteriaSection.Age }];
  const gender = [
    { label: t['loanProductGender'], value: CriteriaSection.Gender },
  ];
  const maritalStatus = [
    {
      label: t['loanProductMaritalStatus'],
      value: CriteriaSection.MaritalStatus,
    },
  ];
  const occupationDetails = [
    {
      label: t['loanProductOccupationDetails'],
      value: CriteriaSection.OccupationDetails,
    },
  ];
  const educationalQuality = [
    {
      label: t['loanProductEducationQualification'],
      value: CriteriaSection.EducationQualification,
    },
  ];
  const ethnicity = [
    { label: t['loanProductEthinicity'], value: CriteriaSection.Ethnicity },
  ];
  const foreignEmployment = [
    {
      label: t['loanProductForeignEmployment'],
      value: CriteriaSection.ForeignEmployment,
    },
  ];

  const NOBInstitution = [
    {
      label: t['loanProductNatureofBusinessIns'],
      value: CriteriaSection.NatureOfBusinessInstitutions,
    },
  ];
  const NOBCoopUnion = [
    {
      label: t['loanProductNatureofBusinessCoopUnion'],
      value: CriteriaSection.NatureOfBusinessCoopunion,
    },
  ];

  const CoperativeType = [
    {
      label: t['loanProductCoorperativeType'],
      value: CriteriaSection.CooperativeType,
    },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductCriteria']} </TopText>
        <SubText>{t['loanProductSelectedChecklist']}</SubText>
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
