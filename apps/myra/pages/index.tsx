import { useState } from 'react';
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

// NAV
// import { Flex, Image, InputGroup, InputLeftElement } from '@chakra-ui/react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { MyraUiNavbar } from '@saccos/myra/ui/navbar';
// import Logo from 'assets/logo.svg';
// import Avatar from 'assets/avatar.png';

import { Navbar } from '@saccos/myra/ui';
// Tab

import { AiOutlineAppstore } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { VscListFlat } from 'react-icons/vsc';
import { BiTransfer } from 'react-icons/bi';
import { MdBackupTable } from 'react-icons/md';
import { CgDropOpacity } from 'react-icons/cg';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

const icons = {
  Share: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 4.875C14.505 4.875 13.5 5.88 13.5 7.125C13.5 7.1775 13.5 7.23 13.5075 7.2825L11.985 7.7925C11.505 6.885 10.62 6.225 9.57 6.0525V4.4325C10.53 4.1775 11.25 3.3 11.25 2.25C11.25 1.005 10.245 0 9 0C7.755 0 6.75 1.005 6.75 2.25C6.75 3.3 7.47 4.1775 8.4375 4.4325V6.0525C7.3875 6.225 6.5025 6.885 6.0225 7.7925L4.4925 7.2825C4.5 7.23 4.5 7.1775 4.5 7.125C4.5 5.88 3.495 4.875 2.25 4.875C1.005 4.875 0 5.88 0 7.125C0 8.37 1.005 9.375 2.25 9.375C3.045 9.375 3.735 8.9625 4.14 8.3475L5.6625 8.8575C5.5125 9.825 5.79 10.8525 6.48 11.625L5.4225 12.9525C5.1375 12.8175 4.83 12.75 4.5 12.75C3.255 12.75 2.25 13.755 2.25 15C2.25 16.245 3.255 17.25 4.5 17.25C5.745 17.25 6.75 16.245 6.75 15C6.75 14.49 6.585 14.025 6.3 13.65L7.3575 12.3225C8.3775 12.8925 9.6225 12.885 10.635 12.3225L11.6925 13.65C11.415 14.025 11.25 14.49 11.25 15C11.25 16.245 12.255 17.25 13.5 17.25C14.745 17.25 15.75 16.245 15.75 15C15.75 13.755 14.745 12.75 13.5 12.75C13.17 12.75 12.8625 12.8175 12.5775 12.945L11.52 11.6175C12.2175 10.8375 12.4875 9.8175 12.3375 8.85L13.86 8.34C14.2575 8.955 14.955 9.3675 15.75 9.3675C16.995 9.3675 18 8.3625 18 7.1175C18 5.8725 16.995 4.875 15.75 4.875ZM2.25 7.875C1.8375 7.875 1.5 7.5375 1.5 7.125C1.5 6.7125 1.8375 6.375 2.25 6.375C2.6625 6.375 3 6.7125 3 7.125C3 7.5375 2.6625 7.875 2.25 7.875ZM4.5 15.75C4.0875 15.75 3.75 15.4125 3.75 15C3.75 14.5875 4.0875 14.25 4.5 14.25C4.9125 14.25 5.25 14.5875 5.25 15C5.25 15.4125 4.9125 15.75 4.5 15.75ZM8.25 2.25C8.25 1.8375 8.5875 1.5 9 1.5C9.4125 1.5 9.75 1.8375 9.75 2.25C9.75 2.6625 9.4125 3 9 3C8.5875 3 8.25 2.6625 8.25 2.25ZM9 11.25C7.965 11.25 7.125 10.41 7.125 9.375C7.125 8.34 7.965 7.5 9 7.5C10.035 7.5 10.875 8.34 10.875 9.375C10.875 10.41 10.035 11.25 9 11.25ZM13.5 14.25C13.9125 14.25 14.25 14.5875 14.25 15C14.25 15.4125 13.9125 15.75 13.5 15.75C13.0875 15.75 12.75 15.4125 12.75 15C12.75 14.5875 13.0875 14.25 13.5 14.25ZM15.75 7.875C15.3375 7.875 15 7.5375 15 7.125C15 6.7125 15.3375 6.375 15.75 6.375C16.1625 6.375 16.5 6.7125 16.5 7.125C16.5 7.5375 16.1625 7.875 15.75 7.875Z"
        fill="#8CC63F"
      />
    </svg>
  ),
};

const getIcon = (name: keyof typeof icons) => icons[name];

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

const demotabs = [
  {
    title: 'Dashboard',
  },
  {
    title: 'Members',
  },
  {
    title: 'Share',
  },
  {
    title: 'Accounts',
  },
  {
    title: 'Transactions',
  },
  {
    title: 'Loan',
  },
  {
    title: 'Reports',
  },
  {
    title: 'Utilities',
  },
];

const getTabIcon = (iconName: string, isActive: boolean) => {
  switch (iconName) {
    case 'Dashboard':
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
    case 'Members':
      return <FaUser size={18} color="#8CC63F" />;
    case 'Share':
      return getIcon(iconName);
    case 'Accounts':
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
    case 'Transactions':
      return <VscListFlat size={18} color="#8CC63F" />;
    case 'Loan':
      return <BiTransfer size={18} color="#8CC63F" />;
    case 'Reports':
      return <MdBackupTable size={18} color="#8CC63F" />;
    case 'Utilities':
      return <CgDropOpacity size={18} color="#8CC63F" />;
    default:
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
  }
};

const TabBar = () => {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <Box
      height="60px"
      px="5"
      background={'primary.dark'}
      alignItems="center"
      display="flex"
    >
      <Tabs
        defaultIndex={1}
        mt="3"
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title }, index) => {
            const isActive = tabIndex === index;
            return (
              <Tab
                isDisabled={true}
                _selected={{
                  background: '#EEF2F7',
                  color: '#042E33',
                }}
                style={{
                  color: isActive ? '#042E33' : 'white',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  height: 50,
                  borderRadius: 0,
                  outline: 'none',
                }}
                key={index}
              >
                {getTabIcon(title, isActive)}
                <Text mx="2">{title}</Text>
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
};

const Header = () => {
  return (
    <>
      {/* <MyraUiNavbar /> */}
      <Navbar />
      <TabBar />
    </>
  );
};

const Index = () => {
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
    </>
  );
};

export default Index;
