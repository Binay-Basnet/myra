import React, { ReactElement, useState } from 'react';
import { AiOutlineDown, AiOutlineRight, AiOutlineUp } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { MemberPagesLayout } from '@coop/myra/components';
import {
  Box,
  Collapse,
  Container,
  Grid,
  GridItem,
  // Button,
  Icon,
  MainLayout,
  Text,
} from '@coop/shared/ui';

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

const MemberProfile = () => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleToggle = () => setOpenCollapse(!openCollapse);
  return (
    <>
      <Container minW="container.xl" height="fit-content" p="0" pb="55px">
        <Grid
          gap={5}
          bg="background.500"
          templateRows="repeat(10,1fr)"
          templateColumns="repeat(10,1fr)"
        >
          <GridItem
            bg="red"
            display="flex"
            rowSpan={1}
            colSpan={10}
            borderRadius="br3"
            p="s16"
          >
            <Text>Member List</Text>
            <Icon mx="12px" my="5px" size="sm" as={AiOutlineRight} />
            <Text>Ajit Nepal</Text>
          </GridItem>

          <GridItem bg="blue" rowSpan={9} colSpan={2} borderRadius="br3">
            <Box height="100px">sidebar</Box>
          </GridItem>

          <GridItem
            display="flex"
            bg="gray.0"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            rowSpan={5}
            colSpan={4}
            borderRadius="br3"
          >
            <Collapse startingHeight={300} in={openCollapse}>
              <Box p="10px" height="100px">
                <Box display="flex" justifyContent="space-between">
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
                {personalInfoDetails.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Text
                        color="neutralColorLight.Gray-80"
                        fontWeight="Regular"
                        fontSize="s3"
                      >
                        {item.label}
                      </Text>
                    </Box>
                    <Box textAlign="start">
                      <Text
                        color="neutralColorLight.Gray-80"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        {item.value}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
            <Box onClick={handleToggle} as="button">
              {openCollapse ? (
                <Text color="primary.500" fontWeight="Medium" fontSize="s3">
                  See More
                  <Icon
                    ml="5px"
                    size="sm"
                    color="primary.500"
                    as={AiOutlineDown}
                  />
                </Text>
              ) : (
                <Text color="primary.500" fontWeight="Medium" fontSize="s3">
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
          </GridItem>

          <GridItem bg="green" rowSpan={5} colSpan={2} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Documents
              </Text>
            </Box>
          </GridItem>

          <GridItem bg="purple" rowSpan={5} colSpan={8} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Saving Account
              </Text>
            </Box>
          </GridItem>

          <GridItem bg="cyan" rowSpan={9} colSpan={8} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Loan Account
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

MemberProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default MemberProfile;
