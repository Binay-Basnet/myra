import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const TypesOfMember = () => {
  const { t } = useTranslation();

  const typesOfMember = [
    { label: t['loanProductIndividual'], value: KymMemberTypesEnum.Individual },
    {
      label: t['loanProductInstitiutional'],
      value: KymMemberTypesEnum.Institution,
    },
    {
      label: t['loanProductCooperative'],
      value: KymMemberTypesEnum.Cooperative,
    },
    {
      label: t['loanProductCooperativeUnion'],
      value: KymMemberTypesEnum.CooperativeUnion,
    },
  ];
  return (
    <FormSection header="loanProductMemberCategory">
      <Box>
        <FormCheckboxGroup name="typeOfMember" list={typesOfMember} orientation="column" />
      </Box>
    </FormSection>
  );
};
