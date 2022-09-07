import { useFormContext } from 'react-hook-form';

import {
  KymMemberTypesEnum,
  NatureOfDepositProduct,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
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
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Text fontWeight="500" fontSize={'s3'} color="gray.700">
        {t['depositProductTypeofmember']}
      </Text>
      {/* <Box w="16%">
        <FormCheckboxGroup
          name="typeOfMember"
          list={typesOfMember}
          orientation="column"
        />
      </Box> */}

      {depositNature === NatureOfDepositProduct.Mandatory ? (
        <Box w="16%">
          <FormCheckboxGroup
            name="typeOfMember"
            list={typesOfMemberForMandatory}
            orientation="column"
          />
        </Box>
      ) : (
        <Box w="16%">
          <FormCheckboxGroup
            name="typeOfMember"
            list={typesOfMember}
            orientation="column"
          />
        </Box>
      )}
    </Box>
  );
};
