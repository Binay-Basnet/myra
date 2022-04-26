import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Img,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import { ReactElement, useEffect, useState } from 'react';
import { Button, MainLayout } from '@saccos/myra/ui';
import Link from 'next/link';
interface IPersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  title: string;
  dob: string;
  nationality: string;
  citizenshipNo: string;
  citizenshipPlaceOfIssue: string;
  citizenshipIssueDate: string;
  occupation: string;
  panNumber: string;
}
interface IfamilyInfo {
  fatherName: string;
  motherName: string;
  grandfatherName: string;
  grandmotherName: string;
  spouseName: string;
}
interface IaddressInfo {
  state: string;
  district: string;
  vdc: string;
  wardNo: string;
  locality: string;
}
interface IcontactInfo {
  officePhone: string;
  residensePhone: string;
  contactNo: number;
}
interface InomineeInfo {
  nomineeFirstName: string;
  nomineeMiddleName: string;
  nomineeLastName: string;
  nomineeTilte: string;
  nomineeRelation: string;
  nomineePermanentAdd: string;
  nomineeCitizenshipNum: string;
  nomineeCitizenshipIssPlace: string;
  nomineeContactNumber: number;
}
const MemberDetails = () => {
  const [personalInfo, setPersonalInfo] = useState<IPersonalDetails>();
  const [familyDetails, setFamilyDetails] = useState<IfamilyInfo>();
  const [permanentAdd, setPermanentAdd] = useState<IaddressInfo>();
  const [contactInfo, setContactInfo] = useState<IcontactInfo>();
  const [nomineeInfo, setNomineeInfo] = useState<InomineeInfo>();
  useEffect(() => {
    const personalDetailsFromLocalStorage =
      localStorage.getItem('PersonalDetails');
    const familyDetailsFromLocalStorage =
      localStorage.getItem('FamilyInformation');
    const permanentAddressFromLocalStorage =
      localStorage.getItem('PermanentAddress');
    const contactInfoFromLocalStorage = localStorage.getItem('ContactInfo');
    const nomineeInfoFromLocalStorage = localStorage.getItem('NomineeInfo');

    personalDetailsFromLocalStorage &&
      setPersonalInfo(JSON.parse(personalDetailsFromLocalStorage));
    familyDetailsFromLocalStorage &&
      setFamilyDetails(JSON.parse(familyDetailsFromLocalStorage));
    permanentAddressFromLocalStorage &&
      setPermanentAdd(JSON.parse(permanentAddressFromLocalStorage));
    contactInfoFromLocalStorage &&
      setContactInfo(JSON.parse(contactInfoFromLocalStorage));
    nomineeInfoFromLocalStorage &&
      setNomineeInfo(JSON.parse(nomineeInfoFromLocalStorage));
  }, []);
  console.log(personalInfo);
  console.log(familyDetails);
  console.log(permanentAdd);
  console.log(contactInfo);
  console.log(nomineeInfo);

  if (!personalInfo) return null;

  const pe = [
    {
      label: 'First Name',
      en: personalInfo.firstName ? personalInfo.firstName : '--',
      np: personalInfo.firstName ? personalInfo.firstName : '--',
    },
    {
      label: 'Middle Name',
      en: personalInfo.middleName ? personalInfo.middleName : '--',
      np: personalInfo.middleName ? personalInfo.middleName : '--',
    },
    {
      label: 'Last Name',
      en: personalInfo.lastName ? personalInfo.lastName : '--',
      np: personalInfo.lastName ? personalInfo.lastName : '--',
    },
    {
      label: 'Gender',
      en: personalInfo.gender ? personalInfo.gender : '--',
      np: personalInfo.gender ? personalInfo.gender : '--',
    },
    {
      label: 'Tilte',
      en: personalInfo.title ? personalInfo.title : '',
      np: personalInfo.title ? personalInfo.title : '',
    },
    {
      label: 'DOB',
      en: personalInfo.dob ? personalInfo.dob : '--',
      np: personalInfo.dob ? personalInfo.dob : '--',
    },
    {
      label: 'Nationality',
      en: personalInfo.nationality ? personalInfo.nationality : '--',
      np: personalInfo.nationality ? personalInfo.nationality : '--',
    },
    {
      label: 'citizenshipNo',
      en: personalInfo.citizenshipNo ? personalInfo.citizenshipNo : '--',
      np: personalInfo.citizenshipNo ? personalInfo.citizenshipNo : '--',
    },
    {
      label: 'Place of Issue',
      en: personalInfo.citizenshipIssueDate
        ? personalInfo.citizenshipIssueDate
        : '--',
      np: personalInfo.citizenshipIssueDate
        ? personalInfo.citizenshipIssueDate
        : '--',
    },
    {
      label: 'Citizenship Issue Date',
      en: personalInfo.citizenshipIssueDate
        ? personalInfo.citizenshipIssueDate
        : '--',
      np: personalInfo.citizenshipIssueDate
        ? personalInfo.citizenshipIssueDate
        : '--',
    },
    {
      label: 'Occupation',
      en: personalInfo.occupation ? personalInfo.occupation : '--',
      np: personalInfo.occupation ? personalInfo.occupation : '--',
    },
    {
      label: 'PAN Number',
      en: personalInfo.panNumber ? personalInfo.panNumber : '--',
      np: personalInfo.panNumber ? personalInfo.panNumber : '--',
    },
  ];
  if (!familyDetails) return null;
  const familyInformation = [
    {
      label: "Father's Name",
      en: familyDetails.fatherName ?? '--',
      np: familyDetails.fatherName ?? '--',
    },
    {
      label: "Mothers's Name",
      en: familyDetails.motherName ?? '--',
      np: familyDetails.motherName ?? '--',
    },
    {
      label: "Grandfather's Name",
      en: familyDetails.grandfatherName ?? '--',
      np: familyDetails.grandfatherName ?? '--',
    },
    {
      label: "Grandmother's Name",
      en: familyDetails.grandmotherName ?? '--',
      np: familyDetails.grandmotherName ?? '--',
    },
    {
      label: "Spouse's name",
      en: familyDetails.spouseName ?? '--',
      np: familyDetails.spouseName ?? '--',
    },
  ];
  if (!permanentAdd) return null;
  const permanentAddress = [
    {
      label: 'State',
      en: permanentAdd.state ?? '--',
      np: permanentAdd.state ?? '--',
    },
    {
      label: 'District',
      en: permanentAdd.district ?? '--',
      np: permanentAdd.district ?? '--',
    },
    {
      label: 'VDC/Municipality',
      en: permanentAdd.vdc ?? '--',
      np: permanentAdd.vdc ?? '--',
    },
    {
      label: 'Ward No',
      en: permanentAdd.wardNo ?? '--',
      np: permanentAdd.wardNo ?? '--',
    },
    {
      label: 'Locality',
      en: permanentAdd.locality ?? '--',
      np: permanentAdd.locality ?? '--',
    },
  ];
  const tempAddress = [
    {
      label: 'State',
      en: permanentAdd.state ?? '--',
      np: permanentAdd.state ?? '--',
    },
    {
      label: 'District',
      en: permanentAdd.district ?? '--',
      np: permanentAdd.district ?? '--',
    },
    {
      label: 'VDC/Municipality',
      en: permanentAdd.vdc ?? '--',
      np: permanentAdd.vdc ?? '--',
    },
    {
      label: 'Ward No',
      en: permanentAdd.wardNo ?? '--',
      np: permanentAdd.wardNo ?? '--',
    },
    {
      label: 'Locality',
      en: permanentAdd.locality ?? '--',
      np: permanentAdd.locality ?? '--',
    },
  ];
  if (!contactInfo) return null;
  const contactDetails = [
    {
      label: 'Office phone',
      en: contactInfo.officePhone ?? '--',
      np: contactInfo.officePhone ?? '--',
    },
    {
      label: 'Residense phone',
      en: contactInfo.residensePhone ?? '--',
      np: contactInfo.residensePhone ?? '--',
    },
    {
      label: 'Mobile phone',
      en: contactInfo.contactNo ?? '--',
      np: contactInfo.contactNo ?? '--',
    },
  ];
  if (!nomineeInfo) return null;
  const nomineeInformation = [
    {
      label: 'First Name',
      en: nomineeInfo.nomineeFirstName ?? '--',
      np: nomineeInfo.nomineeFirstName ?? '--',
    },
    {
      label: 'Middle Name',
      en: nomineeInfo.nomineeMiddleName ?? '--',
      np: nomineeInfo.nomineeMiddleName ?? '--',
    },
    {
      label: 'Last Name',
      en: nomineeInfo.nomineeLastName ?? '--',
      np: nomineeInfo.nomineeLastName ?? '--',
    },
    {
      label: 'Tilte',
      en: nomineeInfo.nomineeTilte ?? '--',
      np: nomineeInfo.nomineeTilte ?? '--',
    },
    {
      label: 'Relation',
      en: nomineeInfo.nomineeRelation ?? '--',
      np: nomineeInfo.nomineeRelation ?? '--',
    },
    {
      label: 'Permanent Address',
      en: nomineeInfo.nomineePermanentAdd ?? '--',
      np: nomineeInfo.nomineePermanentAdd ?? '--',
    },
    {
      label: 'citizenshipNo',
      en: nomineeInfo.nomineeCitizenshipNum ?? '--',
      np: nomineeInfo.nomineeCitizenshipNum ?? '--',
    },
    {
      label: 'Place of Issue',
      en: nomineeInfo.nomineeCitizenshipIssPlace ?? '--',
      np: nomineeInfo.nomineeCitizenshipIssPlace ?? '--',
    },
    {
      label: 'Contact number ',
      en: nomineeInfo.nomineeContactNumber ?? '--',
      np: nomineeInfo.nomineeContactNumber ?? '--',
    },
  ];
  const memberInformationpics = [
    { label: 'Member photo', image: '/avatar.png' },
    { label: 'Signature', image: '/avatar.png' },
  ];
  return (
    <>
      <Container maxW="904px">
        <Box background="white" mt="130" pb="10">
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
          <Box mt={10} px="5">
            <Heading size="16px" as="h4">
              Personal Information
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {pe.map((item) => {
                return (
                  <GridItem w="100%" mt={10} key={item.label}>
                    <Text
                      minW={275}
                      color="gray.800"
                      fontSize="14px"
                      fontWeight="bold"
                    >
                      {item.label}
                    </Text>
                    <Text>{item.en}</Text>
                    <Text>{item.np}</Text>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Box>

        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Family Information
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {familyInformation.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Permanent Address
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {permanentAddress.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Temporary Address
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {tempAddress.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Permanent Address
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {permanentAddress.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Temporary Address
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {tempAddress.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Contact Information
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {contactDetails.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box background="white" mt="5" px="5" pt={10} pb="55px">
          <Box>
            <Heading size="16px" as="h4">
              Nominee Information
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {nomineeInformation.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text
                    minW={275}
                    color="gray.800"
                    fontSize="14px"
                    fontWeight="bold"
                  >
                    {item.label}
                  </Text>
                  <Text>{item.en}</Text>
                  <Text>{item.np}</Text>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box mt={5} px="5" pt={10} pb="55px" mb={45} bg="white">
          <Box>
            <Heading size="16px" as="h4">
              Photos
            </Heading>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {memberInformationpics.map((item) => {
              return (
                <GridItem w="100%" mt={10} key={item.label}>
                  <Text fontSize="14px" fontWeight="bold" color="gray.800">
                    {item.label}
                  </Text>
                  <Img src={item.image} alt={item.label} />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Box bg="#EEF2F7" h="fit-content" position="fixed" bottom={0} w="100%">
        <Container maxW="904">
          <Box pt={10} pb="10px" bg="white" mt={2} pr="5" pl={5}>
            <Flex>
              <Box>
                <Text>form data saved to draft</Text>
              </Box>
              <Spacer />
              <Box>
                <HStack spacing={25}>
                  <Button colorScheme={'teal'} size="md" variant="ghost">
                    {' '}
                    Edit Details{' '}
                  </Button>
                  <Button colorScheme={'blue'} size="md">
                    {' '}
                    Save{' '}
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

MemberDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MemberDetails;
