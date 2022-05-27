import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useForm } from 'react-hook-form';

import {
  Box,
  Container,
  Navbar,
  TabMenu,
  Text,
  Divider,
  Button,
  Grid,
  Checkbox,
  Switch,
  GridItem,
} from '@saccos/myra/ui';

import {
  MemberCommonForm,
  FormInput,
  FormSelect,
} from '@saccos/myra/components';
import { useTranslation } from '@saccos/myra/util';
import {
  personalInfo,
  contactInfo,
  citizenshipData,
  permanentAddress,
  rentedDetails,
} from '@saccos/myra/jsonData';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

const Header = ({ t }) => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const AddMember = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const { control, handleSubmit } = useForm();

  // const debounced = () => console.log('hello123', getValues());

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header t={t} />
      </Box>
      <Container
        minW="container.xl"
        height="fit-content"
        mt="130"
        p="0"
        pb="55px"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          background="white"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
          boxShadow="xl"
        >
          <Text fontSize="r2" fontWeight="600">
            {t.membersFormAddNewMembers}
          </Text>
          <GrClose size="14px" color="#91979F" />
        </Box>
        <Box display="flex" width="100%">
          <Box w={320} p={2} minHeight="100%" bg="white">
            <Text fontSize="r1">1. Personal Information</Text>
            <Text fontSize="r1">2. Professional Details</Text>
          </Box>
          <Divider orientation="vertical" />
          <Box w="100%">
            <Box background="white" p={5}>
              <Text fontSize="r3" fontWeight="InterSemiBold">
                1. Personal Information
              </Text>
              <br />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                Basic Information
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="middleName"
                  label="Middle Name"
                  placeholder="Enter Middle name"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last name"
                />
                <FormSelect
                  control={control}
                  name="gender"
                  label="Gender"
                  placeholder="Select Gender"
                  options={[
                    { label: 'male', value: 'male' },
                    { label: 'female', value: 'female' },
                    { label: 'other', value: 'other' },
                  ]}
                />
                <FormInput
                  control={control}
                  type="date"
                  name="dateOfBirthBs"
                  label="Date of Birth(BS)"
                  placeholder="Enter date of birth"
                />
                <FormSelect
                  control={control}
                  name="ethnicity"
                  label="Ethnicity"
                  placeholder="Select Ethnicity"
                  options={[
                    { label: 'Bramins', value: 'bramins' },
                    { label: 'Chetris', value: 'chetris' },
                    { label: 'Newar', value: 'newar' },
                  ]}
                />

                <FormInput
                  control={control}
                  type="text"
                  name="nationality"
                  label="Nationality"
                  placeholder="Enter Nationality"
                />
                <FormSelect
                  control={control}
                  name="educationalQualification"
                  label="Educational Qualification"
                  placeholder="Select Educational Qualification"
                  options={[
                    { label: 'SEE', value: 'see' },
                    { label: '+2', value: 'twelve' },
                    { label: 'Graduate', value: 'graduate' },
                    { label: 'Post Graduate', valiee: 'postGraduate' },
                    { label: 'Doctorate', value: 'doctorate' },
                  ]}
                />
                <FormSelect
                  control={control}
                  name="religion"
                  label="Religion"
                  placeholder="Select Religion"
                  options={[
                    { label: 'Hindu', value: 'hindu' },
                    { label: 'Buddhist', value: 'buddhist' },
                    { label: 'Muslims', value: 'muslims' },
                    { label: 'Christain', value: 'christain' },
                  ]}
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="600">
                Contact Details
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="text"
                  name="mobileNo"
                  label="Mobile No"
                  placeholder="Enter Mobile No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="phoneNo"
                  label="Phone No"
                  placeholder="Enter Phone No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                Identification Details
              </Text>
              <br />
              <Text fontSize="r1" fontWeight="InterMedium">
                Choose identification details
              </Text>
              <br />
              <Box display="flex">
                {identificationDetails.map((item, index) => (
                  <Checkbox mr={5} key={index}>
                    <Text fontSize="s3">{item}</Text>
                  </Checkbox>
                ))}
              </Box>
              <br />
              <Text fontSize="r1" fontWeight="InterMedium">
                Citizenship
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="number"
                  name="citizenshipNo"
                  label="Citizenship No"
                  placeholder="Citizenship No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="citizenshipPlaceOfIssue"
                  label="Place Of Issue"
                  placeholder="Place of Issue"
                />
                <FormInput
                  control={control}
                  type="date"
                  name="citizenshipIssueDate"
                  label="Issue date"
                  placeholder="DD-MM-YYYY"
                />
              </Grid>
              <br />
              <Text fontSize="r1" fontWeight="InterMedium">
                Driving License
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="number"
                  name="divingLicenseNo"
                  label="Driving License No"
                  placeholder="Driving License No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="divingLicensePlaceOfIssue"
                  label="Place of Issue"
                  placeholder="Place of Issue"
                />
                <FormInput
                  control={control}
                  type="date"
                  name="divingLicenseIssuedDate"
                  label="Issue Date"
                  placeholder="Issue Date"
                />
              </Grid>
              <br />
              <Text fontSize="r1">Voters Card</Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="number"
                  name="voterCardNo"
                  label="Voter Card No"
                  placeholder="Voter Card No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="pollingStation"
                  label="Polling Station"
                  placeholder="Polling Station"
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                Permanent Address
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormSelect
                  control={control}
                  name="permananetAddressState"
                  label="State"
                  placeholder="Select State"
                  options={[
                    { label: 'Bagmati', value: 'bagmati' },
                    { label: 'Gandaki', value: 'gandaki' },
                  ]}
                />
                <FormSelect
                  control={control}
                  name="permanantAddressDistrict"
                  label="District"
                  placeholder="Select District"
                  options={[
                    { label: 'Lalitpur', value: 'lalitpur' },
                    { label: 'Kathmandu', value: 'kathmandu' },
                  ]}
                />
                <FormSelect
                  control={control}
                  name="permanantAddressVdc"
                  label="VDC / Muncipality"
                  placeholder="Select VDC / Muncipality"
                  options={[
                    { label: 'Lalitpur-16', value: 'lalitpur16' },
                    { label: 'Kathmandu-5', value: 'kathmandu5' },
                  ]}
                />
                <FormInput
                  control={control}
                  type="number"
                  name="temporaryWardNo"
                  label="Ward No"
                  placeholder="Enter Ward No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="temporaryLocality"
                  label="Locality"
                  placeholder="Enter Locality"
                />
              </Grid>
              <br />
              <Button>Pin on Map</Button>
              <br />
              <br />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                Temporary Address
              </Text>
              <br />
              <Box display="flex" flexDirection="row" alignItems="center">
                <Switch mr={5} />
                <Text fontSize="r1">Temporary Address same as permanent</Text>
              </Box>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormSelect
                  control={control}
                  name="temporaryAddressState"
                  label="State"
                  placeholder="Select State"
                  options={[
                    { label: 'Bagmati', value: 'bagmati' },
                    { label: 'Gandaki', value: 'gandaki' },
                  ]}
                />
                <FormSelect
                  control={control}
                  name="temporaryAddressDistrict"
                  label="District"
                  placeholder="Select District"
                  options={[
                    { label: 'Lalitpur', value: 'lalitpur' },
                    { label: 'Kathmandu', value: 'kathmandu' },
                  ]}
                />
                <FormSelect
                  control={control}
                  name="temporaryAddressVdc"
                  label="VDC / Muncipality"
                  placeholder="Select VDC / Muncipality"
                  options={[
                    { label: 'Lalitpur-16', value: 'lalitpur16' },
                    { label: 'Kathmandu-5', value: 'kathmandu5' },
                  ]}
                />
                <FormInput
                  control={control}
                  type="number"
                  name="teamporaryAddressWardNo"
                  label="Ward No"
                  placeholder="Enter Ward No"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="temporaryAddressLocality"
                  label="Locality"
                  placeholder="Enter Locality"
                />
              </Grid>
              <br />
              <Button>Pin on Map</Button>
              <br /> <br />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                INCASE RESIDING IN RENTED HOUSE
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormInput
                  control={control}
                  type="text"
                  name="landlordsName"
                  label="Landlords Name"
                  placeholder="Landlords Name"
                />
                <FormInput
                  control={control}
                  type="text"
                  name="landlordsContactNo"
                  label="Contact No"
                  placeholder="Contact No"
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                FAMILY DETAILS
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <FormSelect
                  control={control}
                  name="martialStatus"
                  label="Martial Status"
                  placeholder="Select Martial Status"
                  options={[
                    { label: 'Married', value: 'married' },
                    { label: 'Unmarried', value: 'unmarried' },
                  ]}
                />
              </Grid>
              <br />
              <Text>Family members</Text>
              <Box h={190} p={2} boxShadow="xs">
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  h={130}
                  bg="gray.100"
                  borderRadius={5}
                >
                  <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                    <GridItem colSpan={1}>
                      <FormInput
                        control={control}
                        type="text"
                        name="familyMemberRelation"
                        label="Relation"
                        placeholder="Enter Relation"
                      />
                    </GridItem>
                    <GridItem colSpan={2}>
                      <FormInput
                        control={control}
                        type="text"
                        name="familyMemberFullName"
                        label="FullName"
                        placeholder="Enter Fullname"
                      />
                    </GridItem>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="white"
          borderTopRadius={5}
        >
          <Text>Save as Draft</Text>
          <Button>Next</Button>
        </Box>
      </Container>
    </form>
  );
};

export default AddMember;
