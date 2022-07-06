import React from 'react';

import { Box, CheckboxGroup, Divider, Text, VStack } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const TypeOfMember = () => {
  const { t } = useTranslation();

  const checkBox = [
    t['settingsIndividual'],
    t['settingsInstitutional'],
    t['settingsCooperative'],
    t['settingsCorporativeUnion'],
  ];

  return (
    <VStack
      width="100%"
      border="1px"
      spacing="0"
      alignItems="start"
      divider={<Divider border="1px" borderColor="border.layout" />}
      borderColor="border.layout"
      borderRadius="br2"
    >
      <Box display="flex" alignItems="center" px="s12" height="s60">
        <Box display="flex" flexDir="column" gap="s4">
          <Text
            fontSize="r1"
            color="gray.800"
            fontWeight="600"
            lineHeight={'16.25px'}
          >
            {t['settingsTypesOfNewMember']}
          </Text>

          <Text
            fontSize="s3"
            color="gray.600"
            fontWeight="500"
            lineHeight={'16.25px'}
          >
            {t['settingsChooseMember']}
          </Text>
        </Box>
      </Box>
      <Box p="s16" width="100%">
        <CheckboxGroup
          direction="column"
          spacing={4}
          checkList={checkBox}
          variant="simple"
        />
      </Box>
    </VStack>
  );
};
