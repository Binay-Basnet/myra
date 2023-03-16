import { Box, Grid, GridItem, Text, VStack } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const MemberRiskLevel = () => {
  const { t } = useTranslation();

  const riskArray = [
    {
      label: t['settingsGeneralRisk'],
      name: 'generalRisk',
    },
    {
      label: t['settingsMediumRisk'],
      name: 'mediumRisk',
    },
    {
      label: t['settingsHighRisk'],
      name: 'highRisk',
    },
  ];

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
        height="60px"
      >
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="SemiBold" lineHeight="16.25px">
            {t['settingsMemberRisk']}
          </Text>
        </Box>
      </Box>
      <Box p="s16" width="100%">
        <Grid templateColumns="repeat(3, 1fr)" p="s12">
          <GridItem colSpan={2}>
            <Text fontSize="s3" fontWeight="Medium" color="gray.800" lineHeight={1.5}>
              {t['settingsMemberRiskLevel']}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize="s3" fontWeight="Medium" color="gray.800" lineHeight={1.5}>
              {t['settingsMemberYearsTillKYMUpdate']}
            </Text>
          </GridItem>
        </Grid>
        <Box display="flex" flexDir="column" gap="s12" p="s12">
          {riskArray.map((risk) => (
            <Grid key={risk.label} h="s36" templateColumns="repeat(3, 1fr)">
              <GridItem colSpan={2} display="flex" alignItems="center">
                <Text fontSize="r1" fontWeight="Regular" color="gray.800">
                  {risk.label}
                </Text>
              </GridItem>
              <GridItem>
                <FormInput type="number" textAlign="right" name={`risk.${risk.name}`} size="sm" />
              </GridItem>
            </Grid>
          ))}
        </Box>
      </Box>
    </VStack>
  );
};
