import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';

import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { CoaAccountListTable } from '@coop/myra/components';
import {
  Box,
  Button,
  ChakraTab,
  Icon,
  IconButton,
  Input,
  Text,
} from '@coop/shared/ui';

const ChartsOfAccounts = () => {
  return (
    <Box width="full" borderBottom="1px" borderBottomColor="border.layout">
      <Box
        w="100%"
        display="flex"
        px="s12"
        justifyContent="space-between"
        alignItems="center"
        background="gray.0"
        borderBottom="1px solid #E0E5EB"
      >
        <Box display="flex">
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            Charts Of Accounts
          </Text>
          <Box>
            <ChakraTab tabList={['Full View', 'Account List']} />
          </Box>
        </Box>
        <Button leftIcon={<AddIcon />} mr="5">
          New Account
        </Button>
      </Box>
      <Box
        h="50px"
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box w="100%" pt="15px" pl="20px">
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none" h="22px" zIndex="0">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              variant="unstyled"
              type="search"
              placeholder="Search Account"
            />
          </InputGroup>
        </Box>
        <Box display="flex">
          <Box
            w="184px"
            borderLeft="1px solid #E6E6E6"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              aria-label="Previous"
              variant="ghost"
              icon={<ChevronLeftIcon />}
              h="100%"
            />
            <Text fontSize="13px" fontWeight="600" color="#252525">
              1 - 20 / 50
            </Text>
            <IconButton
              variant="ghost"
              aria-label="Next"
              icon={<ChevronRightIcon />}
              h="100%"
            />
          </Box>
          <Box
            flex={1}
            borderLeft="1px solid #E6E6E6"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="ghost">
              <HamburgerIcon color="#1DB954" /> <Text ml="10px">Default</Text>
            </Button>
            <Button variant="ghost">
              <Icon as={BsThreeDotsVertical} color="#636972" />{' '}
              <Text ml="10px">Options</Text>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box width={'100%'}>
        <CoaAccountListTable />
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
