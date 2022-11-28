import { InstitutionSettings } from '@coop/cbs/settings/members';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsMemberLayout,
} from '@coop/cbs/settings/ui-layout';
import { Box, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

const KYMInstitutional = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="row" h="fit-content">
      <Box flex={1} p="s16">
        <Box borderBottom="1px" borderBottomColor="border.layout" py="s8" w="100%">
          <Text fontSize="r2" fontWeight="600" color="neutralColorLight.Gray-80">
            {t['settingsKymInsForm']}
          </Text>
          <Text pt="s2" fontSize="r1" fontWeight="400" color="gray.400">
            {t['settingsKymInsSettingsChange']}
          </Text>
        </Box>
        <Box mt="s16">
          <InstitutionSettings />
        </Box>
      </Box>
    </Box>
  );
};

export default KYMInstitutional;
KYMInstitutional.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsMemberLayout>{page}</SettingsMemberLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
