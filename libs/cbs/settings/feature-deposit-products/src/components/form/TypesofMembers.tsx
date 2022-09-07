import { useFormContext } from 'react-hook-form';

import {
  KymMemberTypesEnum,
  NatureOfDepositProduct,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const TypesOfMember = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const depositNature = watch('nature');

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

  const typesOfMemberForMandatory = [
    {
      label: t['depositProductIndividual'],
      value: KymMemberTypesEnum.Individual,
    },
    {
      label: t['depositProductInstitutional'],
      value: KymMemberTypesEnum.Institution,
    },
  ];

  return (
    <FormSection header="depositProductTypeofmember">
      {depositNature === NatureOfDepositProduct.Mandatory ? (
        <FormCheckboxGroup
          name="typeOfMember"
          list={typesOfMemberForMandatory}
          orientation="column"
        />
      ) : (
        <FormCheckboxGroup
          name="typeOfMember"
          list={typesOfMember}
          orientation="column"
        />
      )}
    </FormSection>
  );
};
