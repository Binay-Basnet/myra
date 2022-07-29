import React from 'react';

import {
  Box,
  Divider,
  Grid,
  GridItem,
  Input,
  Text,
  VStack,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const MemberRiskLevel = () => {
  const { t } = useTranslation();

  const riskArray = [
    t['settingsGeneralRisk'],
    t['settingsMediumRisk'],
    t['settingsHighRisk'],
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
            {t['settingsMemberRisk']}
          </Text>
        </Box>
      </Box>
      <Box p="s16" width="100%">
        <Grid templateColumns="repeat(3, 1fr)" p="s12">
          <GridItem colSpan={2}>
            <Text
              fontSize="s3"
              fontWeight="500"
              color="gray.800"
              lineHeight={1.5}
            >
              {t['settingsMemberRiskLevel']}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontSize="s3"
              fontWeight="500"
              color="gray.800"
              lineHeight={1.5}
            >
              {t['settingsMemberYearsTillKYMUpdate']}
            </Text>
          </GridItem>
        </Grid>
        <Box display="flex" flexDir="column" gap="s12" p="s12">
          {riskArray.map((risk, index) => (
            <Grid h="s36" templateColumns="repeat(3, 1fr)">
              <GridItem colSpan={2} display="flex" alignItems="center">
                <Text fontSize="r1" fontWeight="400" color="gray.800">
                  {risk}
                </Text>
              </GridItem>
              <GridItem>
                <Input size="sm" value={Math.floor(Math.random() * 120)} />
              </GridItem>
            </Grid>
          ))}
        </Box>
      </Box>
    </VStack>
  );
};
