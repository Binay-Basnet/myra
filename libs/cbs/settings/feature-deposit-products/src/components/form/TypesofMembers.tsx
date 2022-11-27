import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const TypesOfMember = () => {
  const { t } = useTranslation();

  const typesOfMember = [
    {
      label: t['depositProductIndividual'],
      value: KymMemberTypesEnum.Individual,
    },
    {
      label: t['depositProductInstitutional'],
      value: KymMemberTypesEnum.Institution,
    },
    {
      label: t['depositProductCooperative'],
      value: KymMemberTypesEnum.Cooperative,
    },
    {
      label: t['depositProductCooperativeUnion'],
      value: KymMemberTypesEnum.CooperativeUnion,
    },
  ];

  return (
    <FormSection header="depositProductTypeofmember">
      <FormCheckboxGroup name="typeOfMember" list={typesOfMember} orientation="column" />
    </FormSection>
  );
};
