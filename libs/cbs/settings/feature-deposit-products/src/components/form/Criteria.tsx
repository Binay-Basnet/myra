import { useFormContext } from 'react-hook-form';

import { CriteriaSection } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const Critera = () => {
  const { watch } = useFormContext();
  const memberType = watch('typeOfMember');
  const { t } = useTranslation();

  const age = [{ label: t['depositProductAge'], value: CriteriaSection.Age }];
  const gender = [{ label: t['depositProductGender'], value: CriteriaSection.Gender }];
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
  const ethnicity = [{ label: t['depositProductEthinicity'], value: CriteriaSection.Ethnicity }];
  const foreignEmployment = [
    {
      label: t['depositProductForeignEmployment'],
      value: CriteriaSection.ForeignEmployment,
    },
  ];

  const nOBInstitution = [
    {
      label: t['depositProductNatureofBusinessIns'],
      value: CriteriaSection.NatureOfBusinessInstitutions,
    },
  ];
  const nOBCoopUnion = [
    {
      label: t['depositProductNatureofBusinessCoopUnion'],
      value: CriteriaSection.NatureOfBusinessCoopunion,
    },
  ];

  const coperativeType = [
    {
      label: t['depositProductCoorperativeType'],
      value: CriteriaSection.CooperativeType,
    },
  ];

  return (
    <FormSection header="depositProductCriteria">
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
