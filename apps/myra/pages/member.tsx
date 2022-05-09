import {
  Flex,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { MainLayout } from '@saccos/myra/ui';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Box } from '@saccos/myra/ui';
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TabColumn from '../components/TabforMemberPage';
import TabRow from '../components/TabMemberPageRow';

const column = [
  'Member list',
  'Balance Report',
  'Member Details',
  'Member Settings',
];
const rows = ['Active', 'Inactive', 'WIP', 'Draft'];

const Member = () => {
  return (
    <Box mt="100px" p="16px" display="flex">
      <Box mt="24px">
        <Text fontSize="20px" fontWeight="600" pl="16px">
          Members
        </Text>

        <Box mt="58px" display="flex" flexDirection="column" width="238px">
          <Box pl="16px">
            <Button
              width="184px"
              leftIcon={<AddIcon h="11px" />}
              bg="#006837"
              fontSize="14px"
              borderRadius="0"
            >
              Add New Member
            </Button>
          </Box>
          <br />

          <TabColumn list={column} />
        </Box>
      </Box>
      <Box width="1269px" mt="12px" bg="white">
        <Box h="50px" w="1269px" borderBottom="1px solid #E6E6E6" pl="16px">
          <Flex justify="flex-start" h="100%">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              maxH="50px"
            >
              <Text fontSize="16" fontWeight="600" color="#343C46">
                Member List{' '}
              </Text>
            </Box>
            <Box ml="48px" display="flex" alignItems="flex-end">
              <TabRow list={rows} />
            </Box>
          </Flex>
        </Box>
        <Box
          h="50px"
          w="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          borderBottom="3px solid #E6E6E6"
        >
          <Box w="500px" pt="15px" pl="20px">
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none" h="22px">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                variant="unstyled"
                type="search"
                placeholder="Search Members"
              />
            </InputGroup>
          </Box>
          <Box w="345px"></Box>
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
            {' '}
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
    </Box>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Member;
