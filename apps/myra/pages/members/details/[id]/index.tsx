import React, { ReactElement } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  MainLayout,
  Text,
} from '@saccos/myra/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

import flowerSvg from '../../../../assets/svgs/flower.svg';

const TextComponent = ({ label, value }) => {
  return (
    <>
      <Text fontSize="s3" fontWeight="medium">
        {label}
      </Text>
      <Text fontSize="r1" color="gray.500">
        {value}
      </Text>
    </>
  );
};
const basicInfo = [
  { label: 'First Name', value: 'Enter First name (पिहलो नाम)' },
  { label: 'Middle Name', value: 'Enter Middle name' },
  { label: 'Last Name', value: 'Enter Last name' },
  { label: 'Gender', value: 'Male' },
  { label: 'Date of Birth(BS)', value: '22-03-2079' },
  { label: 'Date of Birth(AD)', value: '23-01-2022' },
];

const contactDetails = [
  { label: 'Mobile No', value: '980000000' },
  { label: 'Phone No', value: '9845000000' },
  { label: 'Email', value: 'abc@123' },
];

const identificationDetails = [
  { label: 'Citizenship No', value: '343523-454-434' },
  { label: 'Citizenship Issued Place', value: 'Lalitpur, Lalitpur' },
  { label: 'Citizenship Issue Date', value: '23-11-2022' },
  { label: 'Educational Qualification', value: 'Literate' },
  { label: 'Religion', value: 'Hindu' },
];

const permanentAddress = [
  { label: 'State', value: 'Bagmati' },
  { label: 'District', value: 'Lalitpur' },
  { label: 'VDC / Municipality', value: 'Lalitpur Municipality' },
  { label: 'Ward No', value: '11' },
  { label: 'Locality', value: 'Lagankhel' },
];

const rentedHouse = [
  { label: 'Contact No', value: '9865000000' },
  { label: 'Landlords Name', value: 'Hari Bahadur' },
];

const familyDetails = [{ label: 'Martial Status', value: 'Married' }];

const familyMembers = [
  { label: 'Relationship', value: 'Grandfather' },
  { label: 'Full Name', value: 'fname lname' },
];

const Details = () => {
  const router = useRouter();
  return (
    <Container minW="container.xl" height="fit-content" p="0" pb="55px">
      <Box
        borderRadius={5}
        justifyContent="center"
        alignItems={'center'}
        p="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        boxShadow="xl"
      >
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="semibold">
            जि. स. का. द. नं. १ / ०४९ / ०५०{' '}
          </Text>
          <Text fontSize="s3" fontWeight="semibold">
            मिति: २०७९ / ०२ / ०५{' '}
          </Text>
        </Box>
        <br />
        <Box display="flex" justifyContent="center">
          <Image src={flowerSvg} alt="" />
          <Box ml={5}>
            <Text fontSize="l2" fontWeight="medium">
              VYCCU Savings and Credit Co-operative Ltd.
            </Text>
            <Text fontSize="l1" fontWeight="medium">
              बचत तथा ऋण सहकारी सस्था लिमिटेड
            </Text>
          </Box>
        </Box>
        <br />
        <br />
        <Text textAlign="center" fontSize="l2" fontWeight="semibold">
          KNOW YOUR MEMBER FORM (INDIVIDUAL)
        </Text>
        <Divider my={8} />
        <Text fontSize="r1" fontWeight="semibold">
          BASIC INFORMATION
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {basicInfo?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          CONTACT DETAILS
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {contactDetails?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          IDENTIFICATION DETAILS
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {identificationDetails?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          PERMANENT ADDRESS
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {permanentAddress?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          INCASE RESIDING IN A RENTED HOUSE
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {rentedHouse?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          FAMILY DETAILS
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {familyDetails?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>

        <Divider my={10} />
        <Text fontSize="r1" fontWeight="semibold">
          FAMILY MEMBERS
        </Text>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap="s16">
          {familyMembers?.map((item, index) => (
            <Box key={index}>
              <TextComponent label={item.label} value={item.value} />
            </Box>
          ))}
        </Grid>
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
        <Text>Back to Editing</Text>
        <Box>
          <Button
            variant="ghost"
            leftIcon={<Icon size="md" as={AiOutlinePrinter} />}
          >
            Pin on Map
          </Button>
          &nbsp;
          <Button onClick={() => router.push('/members/list')}>Complete</Button>
        </Box>
      </Box>
    </Container>
  );
};

Details.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Details;
