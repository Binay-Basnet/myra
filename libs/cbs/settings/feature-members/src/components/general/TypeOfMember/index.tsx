import { Box, Text, VStack } from '@myra-ui';

import { FormCheckbox } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const TypeOfMember = () => {
  const { t } = useTranslation();

  return (
    <VStack
      width="100%"
      border="1px"
      spacing="0"
      alignItems="start"
      borderColor="border.layout"
      borderRadius="br2"
    >
      <Box
        borderBottom="1px"
        borderColor="border.layout"
        w="100%"
        display="flex"
        alignItems="center"
        px="s12"
        height="s60"
      >
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="SemiBold" lineHeight="16.25px">
            {t['settingsTypesOfNewMember']}
          </Text>

          <Text fontSize="s3" color="gray.600" fontWeight="Medium" lineHeight="16.25px">
            {t['settingsChooseMember']}
          </Text>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" p="s16" gap="s16" width="100%">
        <FormCheckbox name="memberType.individual" label={t['settingsIndividual']} />
        <FormCheckbox name="memberType.institution" label={t['settingsInstitutional']} />
        <FormCheckbox name="memberType.cooperative" label={t['settingsCooperative']} />
        <FormCheckbox name="memberType.cooperativeUnion" label={t['settingsCooperativeUnion']} />
      </Box>
    </VStack>
  );
};
