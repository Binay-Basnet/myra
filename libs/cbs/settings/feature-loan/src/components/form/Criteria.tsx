import { useFormContext } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import { CriteriaSection } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const Critera = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const memberType = watch('typeOfMember');

  const age = [{ label: t['loanProductAge'], value: CriteriaSection.Age }];
  const gender = [{ label: t['loanProductGender'], value: CriteriaSection.Gender }];
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
  const ethnicity = [{ label: t['loanProductEthinicity'], value: CriteriaSection.Ethnicity }];
  const foreignEmployment = [
    {
      label: t['loanProductForeignEmployment'],
      value: CriteriaSection.ForeignEmployment,
    },
  ];

  const nOBInstitution = [
    {
      label: t['loanProductNatureofBusinessIns'],
      value: CriteriaSection.NatureOfBusinessInstitutions,
    },
  ];
  const nOBCoopUnion = [
    {
      label: t['loanProductNatureofBusinessCoopUnion'],
      value: CriteriaSection.NatureOfBusinessCoopunion,
    },
  ];

  const coperativeType = [
    {
      label: t['loanProductCoorperativeType'],
      value: CriteriaSection.CooperativeType,
    },
  ];

  return (
    <FormSection header="loanProductCriteria" subHeader="loanProductSelectedChecklist">
      {memberType && memberType?.indexOf('INDIVIDUAL') !== -1 && (
        <>
          <FormCheckboxGroup name="criteria" list={age} />
          <FormCheckboxGroup name="criteria" list={gender} />
          <FormCheckboxGroup name="criteria" list={maritalStatus} />
          <FormCheckboxGroup name="criteria" list={educationalQuality} />
          <FormCheckboxGroup name="criteria" list={ethnicity} />
          <FormCheckboxGroup name="criteria" list={occupationDetails} />
          <FormCheckboxGroup name="criteria" list={foreignEmployment} />
        </>
      )}
      {memberType && memberType?.indexOf('INSTITUTION') !== -1 && (
        <FormCheckboxGroup name="criteria" list={nOBInstitution} />
      )}
      {memberType && memberType?.indexOf('COOPERATIVE') !== -1 && (
        <FormCheckboxGroup name="criteria" list={coperativeType} />
      )}
      {memberType && memberType?.indexOf('COOPERATIVE_UNION') !== -1 && (
        <FormCheckboxGroup name="criteria" list={nOBCoopUnion} />
      )}
    </FormSection>
  );
};
