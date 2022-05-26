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
} from '@saccos/myra/ui';

import { MemberCommonForm } from '@saccos/myra/components';
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
                <MemberCommonForm
                  control={control}
                  fields={personalInfo.fields}
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="600">
                Contact Details
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  control={control}
                  fields={contactInfo.fields}
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
              <Text fontSize="r1">Citizenship</Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  control={control}
                  fields={citizenshipData.fields}
                />
              </Grid>
              <br />
              <Text fontSize="r1">Driving License</Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  control={control}
                  fields={citizenshipData.fields}
                />
              </Grid>
              <br />
              <Text fontSize="r1">Voters Card</Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  control={control}
                  fields={citizenshipData.fields}
                />
              </Grid>
              <Divider my={8} />
              <Text fontSize="r1" fontWeight="InterSemiBold">
                Permanent Address
              </Text>
              <br />
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  control={control}
                  fields={permanentAddress.fields}
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
                <MemberCommonForm
                  control={control}
                  fields={permanentAddress.fields}
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
                <MemberCommonForm
                  control={control}
                  fields={rentedDetails.fields}
                />
              </Grid>
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
