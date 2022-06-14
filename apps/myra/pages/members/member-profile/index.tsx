import React, { ReactElement, useState } from 'react';
import {
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineUp,
  AiOutlineEye,
} from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { MemberPagesLayout, TabColumn } from '@coop/myra/components';
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
  Avatar,
  Modal,
} from '@coop/shared/ui';
import { Img } from '@chakra-ui/react';

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
    img: 'https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png',
    title: 'Citizenship Document',
    previewLink: '/members/list',
  },
  {
    img: 'https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png',
    title: 'Fingerprint',
    previewLink: '/members/list',
  },
  {
    img: 'https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png',
    title: 'Signature ',
    previewLink: '/members/list',
  },
  {
    img: 'https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png',
    title: 'View KYM Form',
    previewLink: '/members/list',
  },
];

const AccountCards = ({ cardItem }) => {
  return (
    <Grid
      templateColumns="repeat(2,1fr)"
      borderRadius="br3"
      border="1px solid"
      borderColor="border.layout"
      p="s8"
    >
      <GridItem>
        <Text color="primary.500" fontWeight="SemiBold" fontSize="r1">
          {cardItem.accountName}
        </Text>
      </GridItem>

      <GridItem>
        <Text
          color="neutralColorLight.Gray-80"
          fontWeight="Medium"
          fontSize="r2"
        >
          {cardItem.amount}
        </Text>
      </GridItem>

      <GridItem>
        <Text
          color="neutralColorLight.Gray-70"
          fontWeight="Regular"
          fontSize="s3"
        >
          {cardItem.accNum}
        </Text>
      </GridItem>

      <GridItem>
        <Text
          color="neutralColorLight.Gray-60"
          fontWeight="Regular"
          fontSize="s3"
        >
          Interest Rate: {cardItem.intrestRate}
        </Text>
      </GridItem>
    </Grid>
  );
};

const DocumentCard = ({ img, title, previewLink }) => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box
      px="s8"
      py="s12"
      display="flex"
      justifyContent="space-between"
      border="1px solid"
      borderColor="border.layout"
      borderRadius="br3"
    >
      <Avatar size="sm" src={img} />
      <Text fontSize="r1" fontWeight="Medium" color="neutralColorLight.Gray-80">
        {title}
      </Text>

      <Icon
        size="md"
        as={AiOutlineEye}
        onClick={() => {
          onOpenModal();
        }}
      />

      <Modal
        open={openModal}
        onClose={onCloseModal}
        isCentered={true}
        title={
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            Citizenship Document
          </Text>
        }
      >
        test
      </Modal>
    </Box>
  );
};

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
            bg="gray.0"
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

          <GridItem
            p="s16"
            bg="gray.0"
            rowSpan={10}
            colSpan={2}
            borderRadius="br3"
          >
            <Box height="100px">
              <Box borderRadius="br3">
                <Img
                  src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
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

          <GridItem rowSpan={4} colSpan={6}>
            <Grid gap={5} templateColumns="repeat(6,1fr)">
              <GridItem borderRadius="br3" colSpan={4}>
                <Box
                  display="flex"
                  bg="gray.0"
                  flexDirection="column"
                  justifyContent="center"
                  alignContent="center"
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
              <GridItem h="100%" colSpan={2}>
                <Box bg="gray.0" p="s16" borderRadius="br3">
                  <Box h="100%" display="flex" justifyContent="space-between">
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
                        previewLink={item.previewLink}
                      />
                    ))}
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem
            p="s16"
            bg="gray.0"
            rowSpan={7}
            colSpan={6}
            borderRadius="br3"
          >
            <Box height="100px">
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
                    <AccountCards cardItem={item} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </GridItem>

          <GridItem
            p="s16"
            bg="gray.0"
            rowSpan={4}
            colSpan={6}
            borderRadius="br3"
          >
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Loan Account
              </Text>
              <Grid mt="s16" gap={3} templateColumns="repeat(2,1fr)">
                {loanAccountDetails.map((item, index) => (
                  <GridItem key={index}>
                    <AccountCards cardItem={item} />
                  </GridItem>
                ))}
              </Grid>
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
