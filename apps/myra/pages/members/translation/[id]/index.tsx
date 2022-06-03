import React, { ReactElement } from 'react';
import { GrClose } from 'react-icons/gr';
import { useGetMemberTranslationQuery } from '@saccos/myra/graphql';
import {
  Box,
  Button,
  Container,
  Input,
  MainLayout,
  Text,
} from '@saccos/myra/ui';
import { useTranslation } from '@saccos/myra/util';
import { useRouter } from 'next/router';

const Translation = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.id);
  const translatedData = useGetMemberTranslationQuery({ id });
  const translationDataArray =
    translatedData?.data?.members?.individual?.translate;

  return (
    <Container minW="container.xl" height="fit-content" p="0" pb="55px">
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
        <Text fontSize="r2" fontWeight="SemiBold">
          {t.membersFormAddNewMembers}
        </Text>
        <GrClose size="14px" color="#91979F" />
      </Box>
      <Box
        mt={1}
        // height="60px"
        // display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        px="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        boxShadow="xl"
      >
        <Text fontSize="r2" fontWeight="semibold">
          {translationDataArray?.length} texts that needs to be translated
        </Text>
        <br />
        <Box display="flex">
          <Text>Text in English</Text>
          <Box w={200} />
          <Text>Text in Nepali</Text>
        </Box>
        <br />
        <Box display="flex" flexDirection="column">
          {translationDataArray?.map((item) => (
            <>
              <Box display="flex" key={item?.id}>
                <Text w={200}>{item?.data}</Text>
                <Box w={100} />
                <Input
                  type="text"
                  defaultValue={item?.translatedValue}
                  w={400}
                />
              </Box>
              <br />
            </>
          ))}
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
        <Text>Form Details saved to draft</Text>
        <Box>
          <Button variant="ghost">Save Draft</Button>
          &nbsp;
          <Button onClick={() => router.push(`/members/details/${id}`)}>
            Complete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

Translation.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Translation;
