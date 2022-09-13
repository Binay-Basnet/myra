import { MemberRiskLevel, TypeOfMember } from '@coop/cbs/settings/members';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsMemberLayout,
} from '@coop/cbs/settings/ui-layout';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Members = () => {
  const { t } = useTranslation();

  // const checkBox = [
  //   t['settingsIndividual'],
  //   t['settingsInstitutional'],
  //   t['settingsCooperative'],
  //   t['settingsCorporativeUnion'],
  // ];

  // const riskArray = [
  //   t['settingsGeneralRisk'],
  //   t['settingsMediumRisk'],
  //   t['settingsHighRisk'],
  // ];
  return (
    <Box display="flex" flexDirection="row" h="fit-content">
      <Box flex={1} p="s16">
        <Box
          borderBottom="1px"
          borderBottomColor="border.layout"
          py="s8"
          w="100%"
        >
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            {t['settingsGeneral']}
          </Text>
          <Text pt="s2" fontSize="r1" fontWeight="400" color="gray.400">
            {t['settingsTheseSettings']}
          </Text>
        </Box>
        <Box mt="s16" display="flex" flexDir="column" gap="s16">
          <TypeOfMember />
          <MemberRiskLevel />
        </Box>
      </Box>
    </Box>
  );
};

export default Members;
Members.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsMemberLayout>{page}</SettingsMemberLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
