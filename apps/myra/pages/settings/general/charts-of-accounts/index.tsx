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
        display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        px="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        borderTopRadius={5}
      >
        <Text fontSize="r2" fontWeight="600">
          Charts Of Accounts
        </Text>
        <Box>
          <ChakraTab
            onclick={switchTabsFxn}
            tabList={['Full View', 'Account List']}
          />
        </Box>
        <Box>
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
