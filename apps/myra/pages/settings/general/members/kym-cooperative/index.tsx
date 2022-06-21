import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { SettingsGeneralMember } from '@coop/myra/components';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const KYMCoperative = () => {
  const { t } = useTranslation();
  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display={'flex'}
        alignItems={'center'}
        h="60px"
      >
        <Text
          fontSize="r2"
          px="s16"
          fontWeight="600"
          color="neutralColorLight.Gray-80"
        >
          {t['settingsKymCoopMembers']}
        </Text>
      </Box>
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box
          w="300px"
          px="s8"
          py="s16"
          borderRight={'1px'}
          borderRightColor="border.layout"
        >
          <SettingsGeneralMember />
        </Box>
      </Box>
    </Box>
  );
};

export default KYMCoperative;
KYMCoperative.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
