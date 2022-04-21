import {
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import { withTheme } from '@rjsf/core';
import { theme } from '@saccos/myra/util';

const Form = withTheme(theme);
// NAV
// import { Flex, Image, InputGroup, InputLeftElement } from '@chakra-ui/react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { MyraUiNavbar } from '@saccos/myra/ui/navbar';
// import Logo from 'assets/logo.svg';
// import Avatar from 'assets/avatar.png';

import { Navbar, TabMenu } from '@saccos/myra/ui';
// Tab

const schema = {
  title: 'A registration form',
  description:
    'This is the same as the simple form, but it is rendered as a bootstrap grid. Try shrinking the browser window to see it in action.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};
const forms = [
  {
    label: 'First Name',
    required: true,
    placeholder: 'First Name',
  },
  {
    label: 'Middle Name',
    required: false,
    placeholder: 'Middle Name',
    type: 'text',
  },
  {
    label: 'Last Name',
    required: true,
    placeholder: 'Last Name',
  },
  {
    label: 'Gender',
    required: false,
    placeholder: 'Select Gender',
    type: 'select',
    component: 'select',
  },
  {
    label: 'Title',
    required: false,
    placeholder: 'Title',
  },
  {
    label: 'Date of birth',
    required: false,
    placeholder: 'Date of Birth',
    type: 'date',
    component: 'datePicker',
  },
  {
    label: 'Nationality',
    required: false,
  },
  {
    label: 'Citizenship No.',
    required: false,
  },
  {
    label: 'Place of Issue',
    required: false,
  },
  {
    label: 'Citizenship Issued Date',
    type: 'date',
    component: 'datePicker',
  },
  {
    label: 'Occupation',
    required: false,
  },
  {
    label: 'PAN Number',
    required: false,
  },
];

const family = [
  {
    label: "Father's Name",
    required: false,
    placeholder: "Father's Name",
    component: '',
  },
  {
    label: "Mother's Name",
    required: false,
    placeholder: "Mother's Name",
    type: 'text',
    component: '',
  },
  {
    label: "Grandfather's Name",
    required: false,
    placeholder: "Grandfather's Name",
    component: '',
  },
  {
    label: "Grandmother's Name",
    required: false,
    placeholder: "Grandmother's Name",
    component: '',
  },
  {
    label: "Spouse's Name",
    required: false,
    placeholder: "Spouse's Name",
    component: '',
  },
];

const perAddress = [
  {
    label: 'State',
    required: false,
    placeholder: 'State',
    component: 'select',
    type: 'text',
  },
  {
    label: 'District',
    required: false,
    placeholder: 'District',
    component: 'select',
    type: 'text',
  },
  {
    label: 'VDC / Municipality',
    required: false,
    placeholder: 'VDC / Municipality',
    component: 'select',
    type: 'text',
  },
  {
    label: 'Ward No.',
    required: false,
    placeholder: 'Ward No.',
    type: 'text',
  },
  {
    label: 'Locality',
    required: false,
    placeholder: 'Locality',
    type: 'text',
  },
];

const contactInfo = [
  {
    label: 'Office Phone',
    required: false,
    type: 'text',
    placeholder: 'Office Phone',
    component: '',
  },
  {
    label: 'Residence Phone',
    required: false,
    type: 'text',
    placeholder: 'Residence Phone',
    component: '',
  },
  {
    label: 'Mobile Phone',
    required: false,
    type: 'text',
    placeholder: 'Mobile Phone',
    component: '',
  },
];

const nomineeInformation = [
  {
    label: 'First Name',
    required: true,
    placeholder: 'First Name',
    component: '',
  },
  {
    label: 'Middle Name',
    required: false,
    placeholder: 'Middle Name',
    type: 'text',
    component: '',
  },
  {
    label: 'Last Name',
    required: true,
    placeholder: 'Last Name',
    component: '',
  },
  {
    label: 'Title',
    required: false,
    placeholder: 'Title',
    component: '',
  },
  {
    label: 'Relation',
    required: false,
    placeholder: 'Relation',
    component: '',
  },
  {
    label: 'Permanent Address',
    required: false,
    placeholder: 'Address',
    component: '',
  },
  {
    label: 'Citizenship No.',
    required: false,
    placeholder: 'Citizenship No.',
    component: '',
  },
  {
    label: 'Place of Issue',
    required: false,
    placeholder: 'Place of Issue',
    component: '',
  },
  {
    label: 'Contact Number',
    required: false,
    placeholder: 'Contact Number',
    component: '',
  },
];

const Index = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
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
        <Box px="5">
          <Heading fontSize="14px" my="5" color="#006837">
            Personal Information
          </Heading>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              {forms.map(
                ({ label, component, type, placeholder, required }, index) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10" key={label}>
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          placeholder="Select gender"
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  ) : component === 'datePicker' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <input
                          type={type}
                          style={{
                            borderRadius: '2px',
                            border: '1px solid #CBD0D6',
                            padding: '5px',
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  ) : (
                    <GridItem w="100%" h="10" key={index}>
                      <FormControl isRequired={required}>
                        <FormLabel htmlFor={type}>{label}</FormLabel>
                        <Input
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          placeholder={placeholder || label}
                          id={type}
                          type={type || 'text'}
                        />
                      </FormControl>
                    </GridItem>
                  )
              )}
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
            Family
          </Heading>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              {family.map(
                ({ label, component, type, placeholder, required }, index) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          placeholder="Select gender"
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  ) : component === 'datePicker' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <input
                          type={type}
                          style={{
                            borderRadius: '2px',
                            border: '1px solid #CBD0D6',
                            padding: '5px',
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  ) : (
                    <GridItem w="100%" h="10" key={index}>
                      <FormControl isRequired={required}>
                        <FormLabel htmlFor={type}>{label}</FormLabel>
                        <Input
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          placeholder={placeholder || label}
                          id={type}
                          type={type || 'text'}
                        />
                      </FormControl>
                    </GridItem>
                  )
              )}
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
              {perAddress.map(
                ({ label, component, type, placeholder, required }, index) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          placeholder={placeholder}
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  ) : component === 'datePicker' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <input
                          type={type}
                          style={{
                            borderRadius: '2px',
                            border: '1px solid #CBD0D6',
                            padding: '5px',
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  ) : (
                    <GridItem w="100%" h="10" key={index}>
                      <FormControl isRequired={required}>
                        <FormLabel htmlFor={type}>{label}</FormLabel>
                        <Input
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          placeholder={placeholder || label}
                          id={type}
                          type={type || 'text'}
                        />
                      </FormControl>
                    </GridItem>
                  )
              )}
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
              {contactInfo.map(
                ({ label, component, type, placeholder, required }, index) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          placeholder={placeholder}
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  ) : component === 'datePicker' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <input
                          type={type}
                          style={{
                            borderRadius: '2px',
                            border: '1px solid #CBD0D6',
                            padding: '5px',
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  ) : (
                    <GridItem w="100%" h="10" key={index}>
                      <FormControl isRequired={required}>
                        <FormLabel htmlFor={type}>{label}</FormLabel>
                        <Input
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          placeholder={placeholder || label}
                          id={type}
                          type={type || 'text'}
                        />
                      </FormControl>
                    </GridItem>
                  )
              )}
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
            Nominee Information
          </Heading>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              {nomineeInformation.map(
                ({ label, component, type, placeholder, required }, index) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          placeholder={placeholder}
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  ) : component === 'datePicker' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <input
                          type={type}
                          style={{
                            borderRadius: '2px',
                            border: '1px solid #CBD0D6',
                            padding: '5px',
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  ) : (
                    <GridItem w="100%" h="10" key={index}>
                      <FormControl isRequired={required}>
                        <FormLabel htmlFor={type}>{label}</FormLabel>
                        <Input
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          placeholder={placeholder || label}
                          id={type}
                          type={type || 'text'}
                        />
                      </FormControl>
                    </GridItem>
                  )
              )}
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
      <Form schema={schema} />
    </>
  );
};

export default Index;
