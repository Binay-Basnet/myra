import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
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
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Text fontWeight="500" fontSize={'s3'} color="gray.700">
        {t['loanProductMemberCategory']}
      </Text>

      <FormCheckboxGroup
        name="typeOfMember"
        list={typesOfMember}
        orientation="column"
      />
    </Box>
  );
};
