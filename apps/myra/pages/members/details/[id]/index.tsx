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
  GridItem,
} from '@coop/myra/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from '../../../../assets/svgs/namunaLogo.svg';
import { BiEdit } from 'react-icons/bi';
import {
  FamilyMemberTable,
  MainOccupationTable,
  IncomeSourceTable,
} from '@coop/myra/components';

const TextComponent = ({ label, value }) => {
  return (
    <>
      <Text fontSize="s3" fontWeight="medium">
        {label}
      </Text>
      <Text fontSize="r1" color="neutralColorLight.Gray-70">
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
  { label: 'Ethinicity', value: 'Brahmin' },
  { label: 'Nationality', value: 'Nepali' },
];

const contactDetails = [
  { label: 'Mobile No', value: '980000000' },
  { label: 'Phone No', value: '9845000000' },
  { label: 'Email', value: 'abc@123' },
];

const identificationDetails = [
  { label: 'Citizenship No', value: '343523-454-434' },
  { label: 'Place Of Issue', value: 'Lalitpur, Lalitpur' },
  { label: 'Issued Date', value: '23-11-2022' },
];

const permanentAddress = [
  { label: 'State', value: 'Bagmati' },
  { label: 'District', value: 'Lalitpur' },
  { label: 'Municipality', value: 'Lalitpur Municipality' },
  { label: 'Ward No', value: '11' },
];

const rentedHouse = [
  { label: 'Contact No', value: '9865000000' },
  { label: 'Landlords Name', value: 'Hari Bahadur' },
];
const familyDetails = [{ label: 'Martial Status', value: 'Married' }];
const coopDetails = [
  { label: 'Main Purpose of Becoming a Member', value: 'Saving' },
  { label: 'Member of Another Cooperative', value: 'No' },
  { label: 'Family Member in this institution', value: 'No' },
];

const depositedAmountDetails = [
  { label: 'Ordinary Share', value: '500' },
  { label: 'Savings', value: '3,00,000' },
  { label: 'Loan', value: '1,00,000' },
  { label: 'Other', value: '-' },
];

const estimatedAmountDetails = [
  {
    label: 'Estimated annual account transaction (Debit/Credit)',
    value: '500',
  },
  { label: 'Estimated no of Annual Transaction', value: 'Upto 50' },
  { label: 'Estimated Annual Deposit', value: '1,00,000' },
  { label: 'Estimated Annual Loan', value: '4,55,000' },
];

const localContactDetails = [
  { label: 'Relationship', value: 'Son' },
  { label: 'Name', value: 'Suman Nepal' },
  { label: 'Contact No', value: '9845089432' },
  { label: 'Address', value: 'Tokha-11, Kathmandu' },
];

const declarationDetails = [
  {
    label:
      'Declaration of convicted/Non-convicted for any crimes in pasttionship',
    value: 'No',
  },
  {
    label: 'Do you hold residential permit of foreign country?',
    value: 'No',
  },
];

const relationDetails = [
  {
    label: 'Relationship',
    value: 'Son',
  },
  {
    label: 'Name',
    value: 'Suman Nepal',
  },
];

const Details = () => {
  const router = useRouter();
  return (
    <>
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
          <Box
            height="125px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Image src={logo} alt="logo" />
              <Box ml={5}>
                <Text color="primary.500" fontSize="r2" fontWeight="medium">
                  Namuna Savings and Credit Co-operative Ltd.
                </Text>
                <Text color="primary.500" fontSize="r1" fontWeight="medium">
                  नमुना सहकारी तथा बित्तिय संस्था
                </Text>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box
                mb="10px"
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <Text color="primary.500" fontSize="s3" fontWeight="SemiBold">
                  जि. स. का. द. नं. १ / ०४९ / ०५०
                </Text>
                <Text
                  ml="10px"
                  color="primary.500"
                  fontSize="s3"
                  fontWeight="SemiBold"
                >
                  मिति: २०७९ / ०२ / ०५
                </Text>
              </Box>
              <Text color="primary.500" fontSize="r2" fontWeight="SemiBold">
                KNOW YOUR MEMBER FORM (INDIVIDUAL)
              </Text>
            </Box>
          </Box>

          <Divider my={8} />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            BASIC INFORMATION
          </Text>

          <Grid templateColumns="repeat(4, 1fr)" gap="s16">
            {basicInfo?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Divider my="s16" />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            CONTACT DETAILS
          </Text>

          <Grid templateColumns="repeat(3, 1fr)" gap="s16">
            {contactDetails?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Divider my="s16" />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            IDENTIFICATION DETAILS
          </Text>

          <Grid templateColumns="repeat(3, 1fr)" gap="s16">
            {identificationDetails?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Divider my="s16" />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            PERMANENT ADDRESS
          </Text>

          <Grid templateColumns="repeat(4, 1fr)" gap="s16">
            {permanentAddress?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Divider my="s16" />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            INCASE RESIDING IN A RENTED HOUSE
          </Text>

          <Grid templateColumns="repeat(3, 1fr)" gap="s16">
            {rentedHouse?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Divider my="s16" />
          <Text mb="s16" fontSize="r1" fontWeight="semibold">
            FAMILY DETAILS
          </Text>

          <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
            {familyDetails?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>

          <Text
            color="neutralColorLight.Gray-70"
            fontSize="r1"
            fontWeight="semibold"
          >
            FAMILY MEMBERS
          </Text>
          <Box mt="s8" border="1px solid" borderColor="border.layout">
            <FamilyMemberTable />
          </Box>

          <Divider my="s16" />

          {/* (Profession) */}
          <Text mb="s8" fontSize="r1" fontWeight="semibold">
            Profession
          </Text>

          <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
            <Text mb="s8" fontSize="s3" fontWeight="Regular">
              Agriculture, Business
            </Text>
          </Grid>

          <Text
            color="neutralColorLight.Gray-70"
            fontSize="r1"
            fontWeight="semibold"
          >
            Main Occupation
          </Text>
          <Box mt="s8" border="1px solid" borderColor="border.layout">
            <MainOccupationTable />
          </Box>
          <Divider my="s16" />

          {/* (Income Source Details ) */}
          <Text mb="s8" fontSize="r1" fontWeight="semibold">
            Annual Family Income
          </Text>

          <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
            <Text mb="s8" fontSize="s3" fontWeight="Regular">
              4 Lakhs to 1 Million
            </Text>
          </Grid>

          <Text
            color="neutralColorLight.Gray-70"
            fontSize="r1"
            fontWeight="semibold"
          >
            Income Source
          </Text>
          <Box mt="s8" border="1px solid" borderColor="border.layout">
            <IncomeSourceTable />
          </Box>

          {/* ( COOP Membership ) */}
          <Box mt="s8">
            <Text mb="s8" fontSize="r1" fontWeight="semibold">
              COOP Membership
            </Text>

            <Grid mb="s16" templateColumns="repeat(3, 1fr)" gap="s16">
              {coopDetails?.map((item, index) => (
                <Box key={index}>
                  <TextComponent label={item.label} value={item.value} />
                </Box>
              ))}
            </Grid>

            <Text
              color="neutralColorLight.Gray-70"
              fontSize="r1"
              fontWeight="semibold"
            >
              Income Source
            </Text>
            <Box mt="s8" border="1px solid" borderColor="border.layout">
              <FamilyMemberTable />
            </Box>
          </Box>

          <Box mt="s8">
            <Text mb="s8" fontSize="r1" fontWeight="semibold">
              Details of the amount initially deposited in the instituion or
              deposited till now
            </Text>

            <Grid mb="s16" templateColumns="repeat(4, 1fr)" gap="s16">
              {depositedAmountDetails?.map((item, index) => (
                <Box key={index}>
                  <TextComponent label={item.label} value={item.value} />
                </Box>
              ))}
            </Grid>
          </Box>

          <Divider my="s16" />

          <Box mt="s8">
            <Text mb="s8" fontSize="r1" fontWeight="semibold">
              Estimated withdraw/deposit amount in the institution
            </Text>

            <Grid mb="s16" templateColumns="repeat(4, 1fr)" gap="s16">
              {estimatedAmountDetails?.map((item, index) => (
                <Box key={index}>
                  <TextComponent label={item.label} value={item.value} />
                </Box>
              ))}
            </Grid>
          </Box>

          <Divider my="s16" />

          <Box mt="s8">
            <Text mb="s8" fontSize="r1" fontWeight="semibold">
              Next to Kin / Local Contact
            </Text>

            <Grid mb="s16" templateColumns="repeat(4, 1fr)" gap="s16">
              {localContactDetails?.map((item, index) => (
                <Box key={index}>
                  <TextComponent label={item.label} value={item.value} />
                </Box>
              ))}
            </Grid>
          </Box>

          <Divider my="s16" />
          <Box mb="s8" display="flex">
            <Text
              fontSize="r1"
              fontWeight="Medium"
              color="neutralColorLight.Gray-70"
            >
              Are you or any of your family politically exposed person?
            </Text>

            <Text
              ml="s16"
              fontWeight="Medium"
              fontSize="r1"
              color="neutralColorLight.Gray-70"
            >
              Yes
            </Text>
          </Box>
          <Divider my="s16" />

          <Box>
            <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem display="flex">
                <Text
                  fontSize="r1"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  Do you have a beneficial owner?
                </Text>

                <Text
                  ml="s16"
                  fontWeight="Medium"
                  fontSize="r1"
                  color="neutralColorLight.Gray-70"
                >
                  Yes
                </Text>
              </GridItem>
              <GridItem display="flex">
                <Text
                  fontSize="r1"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  Do you have a beneficial owner?
                </Text>

                <Text
                  ml="s16"
                  fontWeight="Medium"
                  fontSize="r1"
                  color="neutralColorLight.Gray-70"
                >
                  Yes
                </Text>
              </GridItem>
            </Grid>
            <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem>
                <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
                  {relationDetails?.map((item, index) => (
                    <Box key={index}>
                      <TextComponent label={item.label} value={item.value} />
                    </Box>
                  ))}
                </Grid>
              </GridItem>

              <GridItem>
                <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
                  {relationDetails?.map((item, index) => (
                    <Box key={index}>
                      <TextComponent label={item.label} value={item.value} />
                    </Box>
                  ))}
                </Grid>
              </GridItem>
            </Grid>

            <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem display="flex">
                <Text
                  fontSize="r1"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  Declaration of convicted/Non-convicted for any crimes in Past.
                </Text>

                <Text
                  ml="s16"
                  fontWeight="Medium"
                  fontSize="r1"
                  color="neutralColorLight.Gray-70"
                >
                  Yes
                </Text>
              </GridItem>
              <GridItem display="flex">
                <Text
                  fontSize="r1"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  Do you hold residential permit of foreign country?
                </Text>

                <Text
                  ml="s16"
                  fontWeight="Medium"
                  fontSize="r1"
                  color="neutralColorLight.Gray-70"
                >
                  Yes
                </Text>
              </GridItem>
            </Grid>

            <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
              <GridItem display="flex">
                <Text
                  fontSize="r1"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  I have been in jail for a theft case.
                </Text>
              </GridItem>
              <GridItem display="flex">
                <TextComponent
                  label={'Residential Status'}
                  value={'Permanent Resident'}
                />
              </GridItem>
            </Grid>
          </Box>

          <Divider my="s16" />
          <Grid mb="s16" templateColumns="repeat(2, 1fr)" gap="s16">
            {declarationDetails?.map((item, index) => (
              <Box key={index}>
                <TextComponent label={item.label} value={item.value} />
              </Box>
            ))}
          </Grid>
        </Box>
      </Container>

      <Container minW="container.xl" height="fit-content" p="0">
        <Box
          bottom={0}
          bg="gray.0"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="s20"
          py="s16"
          boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
          borderTopRadius="br3"
        >
          <Box display="flex">
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<Icon size="sm" as={BiEdit} />}
            >
              <Text
                color="primary.500"
                alignSelf="center"
                fontSize="s2"
                fontWeight="medium"
              >
                Back to Editing
              </Text>
            </Button>
          </Box>

          <Box>
            <Button
              mr="10px"
              variant="ghost"
              leftIcon={<Icon size="md" as={AiOutlinePrinter} />}
            >
              Print
            </Button>
            &nbsp;
            <Button onClick={() => router.push('/members/list')}>
              Complete
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

Details.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Details;
