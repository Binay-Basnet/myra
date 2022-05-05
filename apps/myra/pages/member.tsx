import {
  Box,
  Container,
  Heading,
  HStack,
  Flex,
  Spacer,
  Text,
  chakra,
  Input,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import { ReactElement, useEffect, useState } from 'react';
import { MainLayout } from '@saccos/myra/ui';
import Link from 'next/link';
import { AddIcon} from '@chakra-ui/icons';

import { Button, ChakraTab } from '@saccos/myra/ui';


const InputField = chakra(Input, {
  baseStyle: {
    border: '1px solid #E6E6E6',
    borderRadius: '5px',
  },
});

const Member = () => {
  const [member, setMember] = useState({});

  useEffect(() => {
    setMember(JSON.parse(localStorage.getItem('PersonalInfo')));
  }, []);
  const translatableFieldsArray = Object.keys(member);

  if(true) {
    return (
      <Box mt="130" p={5} display='flex'>
        <Box  >
          <Text fontSize={20} fontWeight={600}>Members</Text>
          <br /><br />
          <Box display='flex' flexDirection='column' alignItems='center' >
            <Button
              width={184}
              leftIcon={<AddIcon h={11} />}
              bg='#006837'
              fontSize={14}
              borderRadius={0}
            >
              Add New Member
            </Button>
            <br />
            <ChakraTab
              orientation='vertical'
              tabList={['Member List', 'Balance Report', 'Member Activity', 'Member Settings']}
              tabWidth={216}
            />
          </Box>
        </Box>
        <Box width={1269} display='flex' flexDirection='column'>
          <Box>
            table
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <>
      <Container
        maxW="904px"
        height="fit-content"
        background="white"
        mt="130"
        p="0"
        pb="55px"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          style={{
            borderBottom: '1px solid #E6E6E6',
          }}
          px="5"
        >
          <Heading size="16px" as="h4">
            Add New Member
          </Heading>
          <GrClose size="14px" color="#91979F" />
        </Box>

        <Box w={'80%'}>
          {translatableFieldsArray.map((key) => {
            if (!member[key]) return null;
            return (
              <HStack
                spacing="100px"
                px="25"
                mt="15"
                key={key}
                justifyContent="space-between"
              >
                <Box>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {' '}
                    {member[key]}
                  </Text>
                </Box>
                <InputField flex={1} type="text" value={member[key]} />
              </HStack>
            );
          })}
        </Box>
      </Container>
      <Container
        maxW="904px"
        height="40px"
        background="white"
        mt="35"
        p="0"
        pb="55px"
        pt="5px"
      >
        <Flex>
          <Box p="4">data saved successfully</Box>
          <Spacer />
          <Box p="4">
            <Button colorScheme="teal" size="md">
              <Link href="/">
                <a>Go back</a>
              </Link>
            </Button>
            <Button mx="25px" colorScheme="teal" size="md">
              <Link href="/memberDetails">
                <a>Submit</a>
              </Link>
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Member;
