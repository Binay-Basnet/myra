import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactElement, useMemo } from 'react';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { Box, Button, Column, MainLayout, Table } from '@saccos/myra/ui';
import { TabColumn, TabRow } from '@saccos/myra/components';
import {
  Gender,
  useMembersQuery,
  useGetNewIdMutation,
} from '../../generated/graphql';
import { useTranslation } from '@saccos/myra/util';

const column = [
  'memberList',
  'balanceReport',
  'memberDetails',
  'memberSettings',
];
const rows = [
  'memberNavActive',
  'memberNavInactive',
  'memberNavWip',
  'memberNavDraft',
];

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

const Member = () => {
  const { data } = useMembersQuery();
  const { t } = useTranslation();

  const rowData = useMemo(() => data && data?.members?.list, [data]);
  const router = useRouter();

  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Member #',
        accessor: 'id',
        maxWidth: 4,
      },

      {
        Header: 'First Name',
        accessor: 'firstName',
        width: '80%',

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
        Header: 'Title',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Gender',
        accessor: 'gender',
        maxWidth: 2,
        disableSortBy: true,
      },
      {
        Header: 'Date Of Birth',
        accessor: 'dateOfBirth',
        maxWidth: 2,
      },
      /*
      {
           accessor: 'actions',
           Cell: () => (
             <IconButton
               variant="ghost"
               aria-label="Search database"
               icon={<BsThreeDotsVertical />}
             />
           ),
         }
       */
    ],
    []
  );

  const newId = useGetNewIdMutation();

  return (
    <Box mt="100px" p="16px" display="flex">
      <Box mt="24px">
        <Text fontSize="20px" fontWeight="600" pl="16px">
          {t.members}
        </Text>

        <Box mt="58px" display="flex" flexDirection="column" width="238px">
          <Box pl="16px">
            <Button
              width="184px"
              leftIcon={<AddIcon h="11px" />}
              bg="#006837"
              fontSize="14px"
              borderRadius="0"
              onClick={() =>
                newId
                  .mutateAsync({})
                  .then((res) => router.push(`members/addMember/${res?.newId}`))
              }
            >
              {t.membersAddNewMembers}
            </Button>
          </Box>
          {/* <Modal
            isCentered={true}
            // autoFocus={false}
            modalButtonProp="Click me"
            titleProps="Test"
            footerPrimary2Props="Delete"
            footerSecondaryProps="Cancel"
            onClickPrimary={() => alert('Deleted!!!')}
          >
            <p>Hey tyhis si a a test project</p>
          </Modal> */}
          <br />

          <TabColumn list={column} t={t} />
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
                {t.memberList}
              </Text>
            </Box>
            <Box ml="48px" display="flex" alignItems="flex-end">
              <TabRow t={t} list={rows} />
            </Box>
          </Flex>
        </Box>
        <Box
          h="50px"
          w="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          borderBottom="1px solid #E6E6E6"
        >
          <Box w="500px" pt="15px" pl="20px">
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none" h="22px" zIndex="0">
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
          {rowData && (
            <Table data={rowData.slice(0, 10)} columns={columns} sort={true} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Member;
