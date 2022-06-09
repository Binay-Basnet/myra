import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { AccountList, FullView } from '@coop/myra/components';
import { Box, Button, ChakraTab, Text } from '@coop/myra/ui';
import { useRouter } from 'next/router';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const ChartsOfAccounts = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>('Full View');

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
        borderTopRadius="br3"
        height="60px"
      >
        <Box background="white" display="flex" gap="s48">
          <Text fontSize="r2" fontWeight="600" my="auto">
            Charts Of Accounts
          </Text>

          <ChakraTab
            onclick={switchTabsFxn}
            tabList={['Full View', 'Account List']}
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
            New Account
          </Button>
        </Box>
      </Box>
      <Box>
        {selectedTab === 'Full View' && <FullView />}
        {selectedTab === 'Account List' && <AccountList />}
      </Box>
    </Box>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
