import { useState } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { AccountList, FullView } from '@coop/myra/components';
import { Box, Button, ChakraTab, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const ChartsOfAccounts = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(t['settingsCoaFullView']);

  const switchTabsFxn = (data: string) => {
    setSelectedTab(data);
  };

  return (
    <Box width="full">
      <Box
        background="white"
        display="flex"
        px="s16"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderBottomColor="#E6E6E6"
        height="60px"
      >
        <Box background="white" display="flex" gap="s48">
          <Text fontSize="r2" fontWeight="600" my="auto">
            {t['settingsCoa']}
          </Text>

          <ChakraTab
            onclick={switchTabsFxn}
            tabList={[t['settingsCoaFullView'], t['settingsCoaAccountList']]}
          />
        </Box>

        <Box my="auto">
          <Button
            onClick={() =>
              router.push(
                '/settings/general/charts-of-accounts/add-new-account'
              )
            }
            leftIcon={<AddIcon />}
            mr="5"
          >
            {t['settingsCoaNewAccount']}
          </Button>
        </Box>
      </Box>
      <Box>
        {selectedTab === t['settingsCoaFullView'] && <FullView />}
        {selectedTab === t['settingsCoaAccountList'] && <AccountList />}
      </Box>
    </Box>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
