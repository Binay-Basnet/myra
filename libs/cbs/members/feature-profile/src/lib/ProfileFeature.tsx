import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineDown, AiOutlineRight, AiOutlineUp } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { TabColumn } from '@coop/myra/components';
import { Box, Collapse, Grid, GridItem, Icon, Text } from '@coop/shared/ui';
import { AccountCards } from '../components/AccountCards';
import { LoanCard } from '../components/LoanCard';
import { DocumentCard } from '../components/DocumentCard';

const memberProfileColumns = [
  {
    title: 'memberOverview',
    link: '/members/list',
  },
  {
    title: 'memberAccount',
    link: '/members/reports',
  },
  {
    title: 'memberShare',
    link: '/members/list',
  },
  {
    title: 'memberDeposit',
    link: '/members/reports',
  },
  {
    title: 'memberReports',
    link: '/members/reports',
  },
];

const personalInfoDetails = [
  {
    label: 'Gender',
    value: 'Male',
  },
  {
    label: 'Marital Status',
    value: 'Unmarried',
  },
  {
    label: 'Contact Number',
    value: '9865000000',
  },
  {
    label: 'Email',
    value: 'ajitnepal65@gmail.com',
  },
  {
    label: 'Address ',
    value: 'Kathmandu, Tokha Municipality-10',
  },
  {
    label: 'Father’s Name',
    value: 'Ram Nepal',
  },
  {
    label: 'Mother’s Name',
    value: 'Sita Nepal',
  },
  {
    label: 'Grandfather’s Name',
    value: 'Hari Bahadur Nepal',
  },
  {
    label: 'Date of Birth',
    value: '2045-02-13',
  },
  {
    label: 'Occupation',
    value: 'Engineer',
  },
  {
    label: 'Religion',
    value: 'Hindu',
  },
  {
    label: 'Education Qualification',
    value: 'SEE',
  },
];

const loanAccountDetails = [
  {
    accountName: 'Loan Account 1',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'SLoan Account 2',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
];

const savingAccountDetails = [
  {
    accountName: 'Womens Account',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Senior Citizens’ Account',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Children Account',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Gold Saving Account',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 1',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 2',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 3',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 4',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 5',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
  {
    accountName: 'Saving Account 6',
    accNum: '00123019238240012',
    amount: '8,42,000.00',
    intrestRate: '3%',
  },
];

const documentDetails = [
  {
    img: '/citizenship.jpeg',
    title: 'Citizenship Document',
  },
  {
    img: '/fingerprint.jpg',
    title: 'Fingerprint',
  },
  {
    img: '/signature.jpg',
    title: 'Signature ',
  },
  {
    img: '/citizenship.jpeg',
    title: 'View KYM Form',
  },
];

export const ProfileFeature = () => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleToggle = () => setOpenCollapse(!openCollapse);
  return (
    <>
      <Box w="100%" height="fit-content" p="0">
        <Grid
          gap={3}
          bg="background.500"
          templateRows="repeat(1,5fr)"
          templateColumns="repeat(10,1fr)"
        >
          <GridItem
            bg="gray.0"
            display="flex"
            colSpan={10}
            borderRadius="br3"
            p="s16"
          >
            <Text>Member List</Text>
            <Icon mx="12px" my="5px" size="sm" as={AiOutlineRight} />
            <Text>Ajit Nepal</Text>
          </GridItem>

          <GridItem
            p="s16"
            bg="gray.0"
            rowSpan={6}
            colSpan={1}
            borderRadius="br3"
            w="300px"
          >
            <Box>
              <Box display="flex" justifyContent="center" borderRadius="br3">
                <Image
                  height={268}
                  width={268}
                  src={'/passport.jpg'}
                  alt="chart"
                />
              </Box>
              <Box mt="s24" ml="s8">
                <Text
                  fontSize="s3"
                  fontWeight="Medium"
                  color="neutralColorLight.Gray-70"
                >
                  ID: 23524364456
                </Text>

                <Text
                  fontSize="r3"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-80"
                >
                  Ajit Nepal
                </Text>

                <Text
                  mt="s8"
                  fontSize="s3"
                  fontWeight="Regular"
                  color="neutralColorLight.Gray-60"
                >
                  Member since 2077/03/45
                </Text>
              </Box>

              <Box mt="s24">
                <TabColumn list={memberProfileColumns} />
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={9}>
            <Grid gap={3} templateColumns="repeat(5,1fr)">
              <GridItem borderRadius="br3" colSpan={4}>
                <Box
                  borderRadius="br3"
                  display="flex"
                  bg="gray.0"
                  flexDirection="column"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Collapse startingHeight={315} in={openCollapse}>
                    <Box p="s16">
                      <Box
                        mb="s32"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text
                          fontWeight="SemiBold"
                          fontSize="r1"
                          color="neutralColorLight.Gray-80"
                        >
                          Personal Information
                        </Text>
                        <Box as="button">
                          <Icon mr="5px" h="12px" w="12px" as={FaRegEdit} />
                          Edit
                        </Box>
                      </Box>
                      <Grid templateColumns="repeat(2,1fr)">
                        <GridItem>
                          <Grid templateColumns="repeat(1,1fr)">
                            {personalInfoDetails.map((item, index) => (
                              <GridItem key={index}>
                                <Text
                                  color="neutralColorLight.Gray-80"
                                  fontWeight="Regular"
                                  fontSize="s3"
                                >
                                  {item.label}
                                </Text>
                              </GridItem>
                            ))}
                          </Grid>
                        </GridItem>

                        <GridItem>
                          <Grid templateColumns="repeat(1,1fr)">
                            {personalInfoDetails.map((item, index) => (
                              <GridItem key={index}>
                                <Text
                                  color="neutralColorLight.Gray-80"
                                  fontWeight="Medium"
                                  fontSize="s3"
                                >
                                  {item.value}
                                </Text>
                              </GridItem>
                            ))}
                          </Grid>
                        </GridItem>
                      </Grid>
                    </Box>
                  </Collapse>
                  <Box mb="s16" mt="s16" onClick={handleToggle} as="button">
                    {!openCollapse ? (
                      <Text
                        color="primary.500"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        See More
                        <Icon
                          ml="5px"
                          size="sm"
                          color="primary.500"
                          as={AiOutlineDown}
                        />
                      </Text>
                    ) : (
                      <Text
                        color="primary.500"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        See Less
                        <Icon
                          ml="5px"
                          size="sm"
                          color="primary.500"
                          as={AiOutlineUp}
                        />
                      </Text>
                    )}
                  </Box>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box w="350px" h="100%" bg="gray.0" p="s16" borderRadius="br3">
                  <Box mb="s16" display="flex" justifyContent="space-between">
                    <Text
                      fontWeight="SemiBold"
                      fontSize="r1"
                      color="neutralColorLight.Gray-80"
                    >
                      Documents
                    </Text>
                    <Box as="button">
                      <Icon mr="5px" h="12px" w="12px" as={FaRegEdit} />
                      Edit
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={4}
                  >
                    {documentDetails.map((item, index) => (
                      <DocumentCard
                        key={index}
                        img={item.img}
                        title={item.title}
                      />
                    ))}
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem p="s16" bg="gray.0" colSpan={9} borderRadius="br3">
            <Box>
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Saving Account
              </Text>
              <Grid mt="s16" gap={3} templateColumns="repeat(2,1fr)">
                {savingAccountDetails.map((item, index) => (
                  <GridItem key={index}>
                    <AccountCards {...item} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </GridItem>

          <GridItem
            p="s16"
            bg="gray.0"
            rowSpan={4}
            colSpan={9}
            borderRadius="br3"
          >
            <Box>
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Loan Account
              </Text>
              {loanAccountDetails ? (
                <Grid mt="s16" gap={3} templateColumns="repeat(2,1fr)">
                  {loanAccountDetails.map((item, index) => (
                    <GridItem key={index}>
                      <LoanCard {...item} />
                    </GridItem>
                  ))}
                </Grid>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="s1" fontWeight="Regular" color="gray.600">
                    There is no Loan Account at them Moment.
                  </Text>
                  <Text fontSize="r1" fontWeight="Medium" color="primary.500">
                    Click to Refresh
                  </Text>
                </Box>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ProfileFeature;
