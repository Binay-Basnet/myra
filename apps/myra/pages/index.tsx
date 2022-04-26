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
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import { Button } from '@saccos/myra/ui';
import Link from 'next/link';
// NAV
// import { Flex, Image, InputGroup, InputLeftElement } from '@chakra-ui/react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { MyraUiNavbar } from '@saccos/myra/ui/navbar';
// import Logo from 'assets/logo.svg';
// import Avatar from 'assets/avatar.png';

import { Navbar, TabMenu } from '@saccos/myra/ui';
import { useState } from 'react';
// Tab

type FormType = {
  label: string;
  required?: boolean;
  placeholder?: string;
  name: keyof IPersonalInformation;
  type?: string;
  component?: string;
};

const forms: FormType[] = [
  {
    label: 'First Name',
    required: true,
    placeholder: 'First Name',
    name: 'first_name',
  },
  {
    label: 'Middle Name',
    required: false,
    placeholder: 'Middle Name',
    type: 'text',
    name: 'middle_name',
  },
  {
    label: 'Last Name',
    required: true,
    placeholder: 'Last Name',
    name: 'last_name',
  },
  {
    label: 'Gender',
    required: false,
    placeholder: 'Select Gender',
    type: 'select',
    name: 'gender',
    component: 'select',
  },
  {
    label: 'Title',
    required: false,
    placeholder: 'Title',
    name: 'title',
  },
  {
    label: 'Date of birth',
    required: false,
    placeholder: 'Date of Birth',
    type: 'date',
    component: 'datePicker',
    name: 'dob',
  },
  {
    label: 'Nationality',
    required: false,
    name: 'nationality',
  },
  {
    label: 'Citizenship No.',
    required: false,
    name: 'citizenship_no',
  },
  {
    label: 'Place of Issue',
    required: false,
    name: 'citizenship_issue_place',
  },
  {
    label: 'Citizenship Issued Date',
    type: 'date',
    component: 'datePicker',
    name: 'citizenship_issue_date',
  },
  {
    label: 'Occupation',
    required: false,
    name: 'occupation',
  },
  {
    label: 'PAN Number',
    required: false,
    name: 'panNumber',
  },
];

const family = [
  {
    label: "Father's Name",
    required: false,
    placeholder: "Father's Name",
    component: '',
    name: 'father_name',
  },
  {
    label: "Mother's Name",
    required: false,
    placeholder: "Mother's Name",
    type: 'text',
    component: '',
    name: 'mother_name',
  },
  {
    label: "Grandfather's Name",
    required: false,
    placeholder: "Grandfather's Name",
    component: '',
    name: 'grandfather_name',
  },
  {
    label: "Grandmother's Name",
    required: false,
    placeholder: "Grandmother's Name",
    component: '',
    name: 'grandmother_name',
  },
  {
    label: "Spouse's Name",
    required: false,
    placeholder: "Spouse's Name",
    component: '',
    name: 'spouse_name',
  },
];

const perAddress = [
  {
    label: 'State',
    required: false,
    placeholder: 'State',
    component: 'select',
    type: 'text',
    name: 'state',
  },
  {
    label: 'District',
    required: false,
    placeholder: 'District',
    component: 'select',
    name: 'district',
    type: 'text',
  },
  {
    label: 'VDC / Municipality',
    required: false,
    placeholder: 'VDC / Municipality',
    component: 'select',
    name: 'vdc',
    type: 'text',
  },
  {
    label: 'Ward No.',
    required: false,
    placeholder: 'Ward No.',
    type: 'text',
    name: 'ward_no',
  },
  {
    label: 'Locality',
    required: false,
    placeholder: 'Locality',
    type: 'text',
    name: 'locality',
  },
];

const contactInfo = [
  {
    label: 'Office Phone',
    required: false,
    type: 'text',
    placeholder: 'Office Phone',
    component: '',
    name: 'office_ph',
  },
  {
    label: 'Residence Phone',
    required: false,
    type: 'text',
    placeholder: 'Residence Phone',
    component: '',
    name: 'residense_phn',
  },
  {
    label: 'Mobile Phone',
    required: false,
    type: 'text',
    placeholder: 'Mobile Phone',
    component: '',
    name: 'mob_num',
  },
];

const nomineeInformation = [
  {
    label: 'First Name',
    required: true,
    placeholder: 'First Name',
    component: '',
    name: 'nominee_first_name',
  },
  {
    label: 'Middle Name',
    required: false,
    placeholder: 'Middle Name',
    type: 'text',
    component: '',
    name: 'nominee_middle_name',
  },
  {
    label: 'Last Name',
    required: true,
    placeholder: 'Last Name',
    component: '',
    name: 'nominee_last_name',
  },
  {
    label: 'Title',
    required: false,
    placeholder: 'Title',
    component: '',
    name: 'nominee_title',
  },
  {
    label: 'Relation',
    required: false,
    placeholder: 'Relation',
    component: '',
    name: 'nominee_relation',
  },
  {
    label: 'Permanent Address',
    required: false,
    placeholder: 'Address',
    component: '',
    name: 'nominee_per_address',
  },
  {
    label: 'Citizenship No.',
    required: false,
    placeholder: 'Citizenship No.',
    component: '',
    name: 'nominee_citizenship_no',
  },
  {
    label: 'Place of Issue',
    required: false,
    placeholder: 'Place of Issue',
    component: '',
    name: 'nominee_citizenship_issusePlace',
  },
  {
    label: 'Contact Number',
    required: false,
    placeholder: 'Contact Number',
    component: '',
    name: 'nominee_contactno_no',
  },
];

const Index = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

interface IPersonalInformation {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  title: string;
  dob: string;
  nationality: string;
  citizenship_no: string;
  citizenship_issue_place: string;
  citizenship_issue_date: string;
  occupation: string;
  panNumber: number;
  father_name: string;
  mother_name: string;
  grandfather_name: string;
  grandmother_name: string;
  spouse_name: string;
  state: string;
  district: string;
  vdc: string;
  ward_no: string;
  locality: string;
  office_ph: string;
  residense_phn: string;
  mob_num: number;
  nominee_first_name: string;
  nominee_middle_name: string;
  nominee_last_name: string;
  nominee_title: string;
  nominee_relation: string;
  nominee_per_address: string;
  nominee_citizenship_no: string;
  nominee_citizenship_issusePlace: string;
  nominee_contactno_no: number;
}

// interface IPersonalDetails {
//   first_name: string;
//   middle_name: string;
//   last_name: string;
//   gender: string;
//   title: string;
//   dob: string;
//   nationality: string;
//   citizenship_no: string;
//   citizenship_issue_place: string;
//   citizenship_issue_date: string;
//   occupation: string;
//   panNumber: number;
// }

// interface IFamilyInformation {
//   father_name: string;
//   mother_name: string;
//   grandfather_name: string;
//   grandmother_name: string;
//   spouse_name: string;
// }

// interface IAddressInformation {
//   state: string;
//   district: string;
//   vdc: string;
//   ward_no: string;
//   locality: string;
// }

// interface IContactInformation {
//   office_ph: string;
//   residense_phn: string;
//   mob_num: number;
// }

// interface INomineeInformation {
//   nominee_first_name: string;
//   nominee_middle_name: string;
//   nominee_last_name: string;
//   nominee_title: string;
//   nominee_relation: string;
//   nominee_per_address: string;
//   nominee_citizenship_no: string;
//   nominee_citizenship_issusePlace: string;
//   nominee_contactno_no: number;
// }

interface IJpt {
  first_name: string;
  last_name: string;
}

const Index = () => {
  const [personalInformation, setPersonalInformation] =
    useState<IPersonalInformation>({
      first_name: '',
      last_name: '',
    });

  const onSubmit = () => {
    console.log(personalInformation);

    if (!personalInformation) return;
    const translatableFields = {
      firstName: personalInformation.first_name,
      middleName: personalInformation.middle_name,
      lastName: personalInformation.last_name,
      fatherName: personalInformation.father_name,
      motherName: personalInformation.mother_name,
      spouseName: personalInformation.spouse_name,
      grandMotherName: personalInformation.grandmother_name,
      grandFatherName: personalInformation.grandfather_name,
      locality: personalInformation.locality,
      nomineeLastName: personalInformation.nominee_last_name,
      nomineeFirstName: personalInformation.nominee_first_name,
      nomineeMiddleName: personalInformation.nominee_middle_name,
    };
    window.localStorage.setItem(
      'PersonalInfo',
      JSON.stringify(translatableFields)
    );
    const personalDetails = {
      firstName: personalInformation.first_name,
      middleName: personalInformation.middle_name,
      lastName: personalInformation.last_name,
      gender: personalInformation.gender,
      title: personalInformation.title,
      dob: personalInformation.dob,
      nationality: personalInformation.nationality,
      citizenshipNo: personalInformation.citizenship_no,
      citizenshipPlaceOfIssue: personalInformation.citizenship_issue_place,
      citizenshipIssueDate: personalInformation.citizenship_issue_date,
      occupation: personalInformation.occupation,
      panNumber: personalInformation.panNumber,
    };
    window.localStorage.setItem(
      'PersonalDetails',
      JSON.stringify(personalDetails)
    );
    const familyInfo = {
      fatherName: personalInformation.father_name,
      motherName: personalInformation.mother_name,
      grandfatherName: personalInformation.grandfather_name,
      grandmotherName: personalInformation.grandmother_name,
      spouseName: personalInformation.spouse_name,
    };

    window.localStorage.setItem(
      'FamilyInformation',
      JSON.stringify(familyInfo)
    );
    const permanentAdd = {
      state: personalInformation.state,
      district: personalInformation.district,
      vdc: personalInformation.vdc,
      wardNo: personalInformation.ward_no,
      locality: personalInformation.locality,
    };
    window.localStorage.setItem(
      'PermanentAddress',
      JSON.stringify(permanentAdd)
    );
    const contactInfo = {
      officePhone: personalInformation.office_ph,
      residensePhone: personalInformation.residense_phn,
      contactNo: personalInformation.mob_num,
    };
    window.localStorage.setItem('ContactInfo', JSON.stringify(contactInfo));
    const nomineeInfo = {
      nomineeFirstName: personalInformation.nominee_first_name,
      nomineeMiddleName: personalInformation.nominee_middle_name,
      nomineeLastName: personalInformation.nominee_last_name,
      nomineeTilte: personalInformation.nominee_title,
      nomineeRelation: personalInformation.nominee_relation,
      nomineePermanentAdd: personalInformation.nominee_per_address,
      nomineeCitizenshipNum: personalInformation.nominee_citizenship_no,
      nomineeCitizenshipIssPlace:
        personalInformation.nominee_citizenship_issusePlace,
      nomineeContactNumber: personalInformation.nominee_contactno_no,
    };
    window.localStorage.setItem('NomineeInfo', JSON.stringify(nomineeInfo));
  };

  console.log('personal Information', personalInformation);
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
            Personal Information
          </Heading>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              {forms.map(
                (
                  { label, component, type, placeholder, required, name },
                  index
                ) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10" key={label}>
                      <FormControl>
                        <FormLabel htmlFor="email">
                          <>{label} </>
                        </FormLabel>

                        <Select
                          onChange={(e) => {
                            const { value, name } = e.target;

                            setPersonalInformation({
                              ...personalInformation,
                              [name]: value,
                            });
                          }}
                          placeholder="Select gender"
                          borderRadius="2px"
                          borderColor="#CBD0D6"
                          name={'hello'}
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
                          name={name}
                          onChange={(e) => {
                            setPersonalInformation((personalInformation) => ({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            }));
                          }}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                (
                  { label, component, type, placeholder, required, name },
                  index
                ) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                (
                  { label, component, type, placeholder, required, name },
                  index
                ) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                (
                  { label, component, type, placeholder, required, name },
                  index
                ) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                (
                  { label, component, type, placeholder, required, name },
                  index
                ) =>
                  component === 'select' ? (
                    <GridItem w="100%" h="10">
                      <FormControl>
                        <FormLabel htmlFor="email">{label}</FormLabel>
                        <Select
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
                          onChange={(e) => {
                            setPersonalInformation({
                              ...personalInformation,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name={name}
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
              <Button onClick={() => onSubmit()} colorScheme="teal" size="md">
                <Link href="/member">
                  <a>Next</a>
                </Link>
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Index;
