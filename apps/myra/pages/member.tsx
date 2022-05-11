import {
  Flex,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Box, MainLayout } from '@saccos/myra/ui';
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TabColumn from '../components/TabforMemberPage';
import TabRow from '../components/TabMemberPageRow';
import TableComponent from '../components/TableComponent';

const column = [
  'Member list',
  'Balance Report',
  'Member Details',
  'Member Settings',
];
const rows = ['Active', 'Inactive', 'WIP', 'Draft'];

const Member = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Member #',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => (
          <Flex alignItems="center" gap="2">
            <Avatar
              name="Dan Abrahmov"
              size="sm"
              src="https://bit.ly/dan-abramov"
            />
            <span>{value}</span>
          </Flex>
        ),
      },
      {
        Header: 'Address',
        accessor: 'address',
        style: {
          width: '550px',
        },
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
      {
        Header: 'Date Joined',
        accessor: 'dateJoined',
      },
      {
        accessor: 'actions',
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDotsVertical />}
          />
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        id: 123432,
        name: 'Taylor',
        address: 'USA',
        contact: 98213123,
        dateJoined: '2022/02/12',
      },
      {
        id: 223422,
        name: 'Ariana',
        address: 'USA',
        contact: 3423653,
        dateJoined: '2021/12/12',
      },
      {
        id: 654323,
        name: 'Lana',
        address: 'USA',
        contact: 789324234,
        dateJoined: '1996/12/26',
      },
      {
        id: 454223,
        name: 'Mikael',
        address: 'Sweden',
        contact: 12312453,
        dateJoined: '1999/07/05',
      },
      {
        id: 565432,
        name: 'Steven',
        address: 'UK',
        contact: 876345,
        dateJoined: '1976/02/15',
      },
    ],
    []
  );
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
        <Box width={'100%'}>
          <TableComponent data={data} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Member;
