import { GrClose } from 'react-icons/gr';
import {
  Box,
  Container,
  Heading,
  Grid,
  Flex,
  Spacer,
  GridItem,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Navbar, TabMenu } from '@saccos/myra/ui';
import { Button } from '@saccos/myra/ui';

import MemberCommonForm from '../components/MemberCommonForm';
import personalInfo from '../utils/personalInfo.json';
import familyInfo from '../utils/familyInfo.json';
import permanentAddressInfo from '../utils/permanentAddressInfo.json';
import contactInfo from '../utils/contactInfo.json';
import nomineeInfo from '../utils/nomineeInfo.json';
import validationSchema from '../utils/validationSchema';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data, e) => console.log('data', data);
  console.log('hello', validationSchema);
  return (
    <>
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              {personalInfo.title}
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              <MemberCommonForm
                fields={personalInfo?.fields}
                register={register}
                error={errors}
              />
            </Grid>
          </Box>
        </Container>
        <Container
          maxW="904px"
          height="fit-content"
          background="white"
          mt="5"
          p="0"
          pb="55px"
          pt="5px"
        >
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              {familyInfo?.title}
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={familyInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
        </Container>
        <Container
          maxW="904px"
          height="fit-content"
          background="white"
          mt="5"
          p="0"
          pb="55px"
          pt="5px"
        >
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              Permanent Address
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={permanentAddressInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
        </Container>
        <Container
          maxW="904px"
          height="fit-content"
          background="white"
          mt="5"
          p="0"
          pb="55px"
          pt="5px"
        >
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              Contact Information
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={contactInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
        </Container>
        <Container
          maxW="904px"
          height="fit-content"
          background="white"
          mt="5"
          p="0"
          pb="55px"
          pt="5px"
        >
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              {nomineeInfo.title}
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={nomineeInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
        </Container>
        <Container
          maxW="904px"
          height="280px"
          background="white"
          mt="5"
          p="0"
          pb="55px"
          pt="5px"
          mb={10}
        >
          <Box px="5">
            <Heading fontSize="14px" my="5" color="#006837">
              Photo
            </Heading>
            <Box>
              <Grid templateColumns="repeat(2, 1fr)" gap={'3em'}>
                <GridItem w="100%" h="10">
                  <FormControl>
                    <FormLabel htmlFor="email">
                      Member Photo
                      <Box
                        mt="4"
                        background={'#EEF2F7'}
                        width="400px"
                        height="148px"
                        display={'flex'}
                        justifyContent="center"
                        alignItems={'center'}
                      >
                        <Text color="#006837">
                          Drop or click here to upload photo
                        </Text>
                      </Box>
                    </FormLabel>
                  </FormControl>
                </GridItem>
                <GridItem w="100%" h="10">
                  <FormControl>
                    <FormLabel htmlFor="email">
                      Member Signature
                      <Box
                        mt="4"
                        background={'#EEF2F7'}
                        width="400px"
                        height="148px"
                        display={'flex'}
                        justifyContent="center"
                        alignItems={'center'}
                      >
                        <Text color="#006837">
                          Drop or click here to upload photo
                        </Text>
                      </Box>
                    </FormLabel>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Box position="fixed" bottom={0} width="100%" bg={'#EEF2F7'}>
          <Container
            maxW="904px"
            height="40px"
            background="white"
            mt="2"
            p="0"
            pb="55px"
            pt="5px"
          >
            <Flex>
              <Box p="4">form data saved in draft</Box>
              <Spacer />
              <Box p="4">
                <Button type="submit" colorScheme="teal" size="md">
                  <a>Next</a>
                </Button>
              </Box>
            </Flex>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default Index;
