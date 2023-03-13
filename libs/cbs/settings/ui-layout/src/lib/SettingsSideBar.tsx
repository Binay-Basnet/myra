import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

import { Icon, TabColumn } from '@myra-ui';

import { AclKey, ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

type TabList = {
  label: string;
  route: string;
  aclKey: AclKey;
};

const orgTabList: TabList[] = [
  {
    label: 'serviceCenterSettings',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST,
  },
  {
    label: 'settingsSideBarChartsOfAccounts',
    aclKey: 'SETTINGS_COA',
    route: ROUTES.SETTINGS_GENERAL_COA,
  },
  {
    label: 'EOD Setup',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_EOD_SETUP,
  },
  {
    label: 'bank',
    aclKey: 'SETTINGS_BANK',
    route: ROUTES.SETTINGS_GENERAL_BANK,
  },
  {
    label: 'Print Preference',
    aclKey: 'SETTINGS_PRINT_PREFERENCE',
    route: ROUTES.SETTINGS_GENERAL_PRINT_PREFERENCE,
  },
];

const tabList: TabList[] = [
  {
    label: 'settingsSideBarMembers',
    aclKey: 'SETTINGS_MEMBER',

    route: ROUTES.SETTINGS_GENERAL_MEMBERS,
  },
  {
    label: 'settingsSideBarShare',
    aclKey: 'SETTINGS_SHARE',

    route: ROUTES.SETTINGS_GENERAL_SHARE,
  },
  {
    label: 'settingsSideBarDeposit',
    aclKey: 'SETTINGS_SAVING_PARAMETERS',

    route: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
  },
  {
    label: 'settingsSideBarDepositProducts',
    aclKey: 'SETTINGS_SAVING_PRODUCTS',

    route: ROUTES.SETTINGS_GENERAL_SP_LIST,
  },
  {
    label: 'settingsSideBarLoan',
    aclKey: 'SETTINGS_LOAN_PARAMETERS',

    route: ROUTES.SETTINGS_GENERAL_LOAN,
  },

  {
    label: 'settingsSideBarLoanProducts',
    aclKey: 'SETTINGS_LOAN_PRODUCTS',
    route: ROUTES.SETTINGS_GENERAL_LP_LIST,
  },
];

const otherTabList: TabList[] = [
  {
    label: 'Code Management',
    aclKey: 'SETTINGS_CODE_MANAGEMENT',
    route: ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS,
  },
  {
    label: 'settingsAlternativeChannel',
    aclKey: 'SETTINGS_ALTERNATIVE_CHANNELS',
    route: ROUTES.SETTINGS_GENERAL_ALTERNATIVE_CHANNELS,
  },
  {
    label: 'Indexing',
    route: ROUTES.SETTINGS_GENERAL_INDEXING,
    aclKey: 'SETTINGS_INDEXING',
  },
];

export const SettingSideBar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Box position="sticky">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
      >
        <Box height="50px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['settingsGeneral']}
          </Text>
        </Box>
        <Box py="s16" px="s16">
          <Accordion allowToggle defaultIndex={0}>
            <AccordionItem bg="transparent" border="none">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    border="none"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    // _hover={{
                    //   bg: 'highlight.500',
                    //   borderRadius: 'br2',
                    // }}
                    _expanded={{}}
                    pl="s8"
                    w="100%"
                    h="40px"
                    pr="0"
                  >
                    <Text
                      color="gray.800"
                      fontWeight="500"
                      w="fit-content"
                      fontSize="r1"
                      _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => router.push(ROUTES?.SETTINGS_GENERAL_SERVICE_CENTER_LIST)}
                    >
                      Organization
                    </Text>
                    <Box flex={1} pointerEvents="none" />
                    <Box
                      _hover={{
                        bg: 'gray.200',
                        borderRadius: 'br2',
                      }}
                      p="s8"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon
                        as={isExpanded ? IoChevronUpSharp : IoChevronDownSharp}
                        color="gray.800"
                        flexShrink={0}
                      />
                    </Box>
                  </AccordionButton>

                  <AccordionPanel px="s8" py="s4">
                    <TabColumn list={orgTabList} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem bg="transparent" border="none">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    border="none"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    // _hover={{
                    //   bg: 'highlight.500',
                    //   borderRadius: 'br2',
                    // }}
                    _expanded={{}}
                    pl="s8"
                    w="100%"
                    h="40px"
                    pr="0"
                  >
                    <Text
                      color="gray.800"
                      fontWeight="500"
                      fontSize="r1"
                      _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => router.push(ROUTES?.SETTINGS_GENERAL_MEMBERS)}
                    >
                      Core Banking System
                    </Text>
                    <Box flex={1} pointerEvents="none" />
                    <Box
                      _hover={{
                        bg: 'gray.200',
                        borderRadius: 'br2',
                      }}
                      p="s8"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon
                        as={isExpanded ? IoChevronUpSharp : IoChevronDownSharp}
                        color="gray.800"
                        flexShrink={0}
                      />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel px="s8" py="s4">
                    <TabColumn list={tabList} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            {/* <Divider my="s16" /> */}

            {/* <Divider my="s16" /> */}
            <AccordionItem bg="transparent" border="none">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    border="none"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    // _hover={{
                    //   bg: 'highlight.500',
                    //   borderRadius: 'br2',
                    // }}
                    _expanded={{}}
                    pl="s8"
                    w="100%"
                    h="40px"
                    pr="0"
                  >
                    <Text
                      color="gray.800"
                      fontWeight="500"
                      fontSize="r1"
                      _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => router.push(ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS)}
                    >
                      Others
                    </Text>
                    <Box
                      _hover={{
                        bg: 'gray.200',
                        borderRadius: 'br2',
                      }}
                      p="s8"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon
                        as={isExpanded ? IoChevronUpSharp : IoChevronDownSharp}
                        color="gray.800"
                        flexShrink={0}
                      />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel px="s8" py="s4">
                    <TabColumn list={otherTabList} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};
