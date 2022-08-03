// import debounce from 'lodash/debounce';
import { KymMemberTypesEnum } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
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
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Text fontWeight="500" fontSize={'s3'} color="gray.700">
        {t['depositProductTypeofmember']}
      </Text>

      <FormCheckboxGroup
        name="typeOfMember"
        list={typesOfMember}
        orientation="column"
      />
    </Box>
  );
};
