import { GrClose } from 'react-icons/gr';
import { Box, Container, Heading, Grid, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Navbar, TabMenu } from '@saccos/myra/ui';
import { Button } from '@saccos/myra/ui';

import { MemberCommonForm } from '@saccos/myra/components';
import {
  personalInfo,
  familyInfo,
  permanentAddressInfo,
  contactInfo,
  nomineeInfo,
} from '@saccos/myra/jsonData';

import { validationSchema } from '@saccos/myra/util';
import { useTranslation } from '@saccos/myra/util';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data, e) => console.log('data', data);
  console.log('hello', personalInfo);
  return (
    <>
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header t={t} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxW="904px" height="fit-content" mt="130" p="0" pb="55px">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
            style={{
              borderBottom: '1px solid #E6E6E6',
            }}
            px="5"
            background="white"
          >
            <Heading size="16px" as="h4">
              {t.membersFormAddNewMembers}
            </Heading>
            <GrClose size="14px" color="#91979F" />
          </Box>
          <Box background="white" p={5}>
            <Heading fontSize="14px" color="#006837">
              {personalInfo.title}
            </Heading>
            <br />
            <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
              <MemberCommonForm
                fields={personalInfo?.fields}
                register={register}
                error={errors}
              />
            </Grid>
          </Box>
          <br />
          <Box background="white" p={5}>
            <Heading fontSize="14px" color="#006837">
              {familyInfo?.title}
            </Heading>
            <br />
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={familyInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
          <br />
          <Box bg="white" p={5}>
            <Heading fontSize="14px" color="#006837">
              {t.memberPermanentAddress}
            </Heading>
            <br />
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={permanentAddressInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
          <br />
          <Box bg="white" p={5}>
            <Heading fontSize="14px" color="#006837">
              {t.memberContactInformation}
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={contactInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
          <br />
          <Box bg="white" p={5}>
            <Heading fontSize="14px" color="#006837">
              {nomineeInfo.title}
            </Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
                <MemberCommonForm
                  fields={nomineeInfo?.fields}
                  register={register}
                  error={errors}
                />
              </Grid>
            </Box>
          </Box>
          <br />
          <Box bg="white" p="5">
            <Heading fontSize="14px" color="#006837">
              {t.memberPhoto}
            </Heading>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Text>{t.memberPhotoUpload}</Text>
                <Box
                  w={423}
                  h={148}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="#EEF2F7"
                >
                  {t.memberDropOrClickToUploadPhoto}
                </Box>
              </Box>
              <Box>
                <Text>{t.memberSignature}</Text>
                <Box
                  w={423}
                  h={148}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="#EEF2F7"
                >
                  {t.memberDropOrClickToUploadPhoto}
                </Box>
              </Box>
            </Box>
          </Box>
          <br />
          <Box width="100%" bg="white" p="5">
            <Button
              textColor="white"
              type="submit"
              variant="primary"
              size="md"
              bg="primary"
            >
              {t.saveMember}
            </Button>
          </Box>
        </Container>
      </form>
    </>
  );
};

export default AddMember;
