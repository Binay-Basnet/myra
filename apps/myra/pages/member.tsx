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
import { Navbar, TabMenu } from '@saccos/myra/ui';
import { useState, useEffect } from 'react';
import { Button } from '@saccos/myra/ui';
import Link from 'next/link';

const InputField = chakra(Input, {
  baseStyle: {
    border: '1px solid #E6E6E6',
    borderRadius: '5px',
    width: '200px',
  },
});

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const Member = () => {
  const [member, setMember] = useState<any>([]);
  useEffect(() => {
    setMember(JSON.parse(window.localStorage.getItem('PersonalInfo')));
  }, []);
  console.log(member);

  return (
    <>
      <Header />
      <Container
        maxW="904px"
        height="fit-content"
        background="white"
        mt="5"
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

        {member.first_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.first_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.first_name} />
            </Box>
          </HStack>
        )}
        {member.middle_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.middle_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.middle_name}
                style={{
                  border: '1px solid #E6E6E6',
                  width: '200px',
                }}
              />
            </Box>
          </HStack>
        )}
        {member.first_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.last_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.last_name} style={{}} />
            </Box>
          </HStack>
        )}
        {member.father_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.father_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.father_name} style={{}} />
            </Box>
          </HStack>
        )}
        {member.mother_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.mother_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.mother_name} style={{}} />
            </Box>
          </HStack>
        )}
        {member.grandfather_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.grandfather_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.grandfather_name}
                style={{}}
              />
            </Box>
          </HStack>
        )}
        {member.grandmother_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.grandmother_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.grandmother_name}
                style={{}}
              />
            </Box>
          </HStack>
        )}
        {member.spouse_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.spouse_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.spouse_name} style={{}} />
            </Box>
          </HStack>
        )}

        {member.nominee_first_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.nominee_first_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.nominee_first_name}
                style={{}}
              />
            </Box>
          </HStack>
        )}
        {member.nominee_middle_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.nominee_middle_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.nominee_middle_name}
                style={{}}
              />
            </Box>
          </HStack>
        )}
        {member.nominee_last_name && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.nominee_last_name}</Text>
            </Box>
            <Box>
              {' '}
              <InputField
                type="text"
                value={member.nominee_last_name}
                style={{}}
              />
            </Box>
          </HStack>
        )}
        {member.locality && (
          <HStack spacing="100px" px="25" mt="15">
            <Box w="200px">
              <Text color="#006837"> {member.locality}</Text>
            </Box>
            <Box>
              {' '}
              <InputField type="text" value={member.locality} style={{}} />
            </Box>
          </HStack>
        )}
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
              Submit
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  );
};
export default Member;
