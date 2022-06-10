import React, { ReactElement } from 'react';
import { GrClose } from 'react-icons/gr';
import { useGetMemberTranslationQuery } from '@coop/myra/graphql';
import {
  Box,
  Button,
  Container,
  Input,
  MainLayout,
  Text,
  Icon,
} from '@coop/myra/ui';
import { useTranslation } from '@coop/myra/util';
import { useRouter } from 'next/router';
import { AiOutlineEye } from 'react-icons/ai';

const Translation = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.id);
  const translatedData = useGetMemberTranslationQuery({ id });
  const translationDataArray =
    translatedData?.data?.members?.individual?.translate;

  return (
    <>
      <Container
        minW="container.xl"
        height="fit-content"
        p="0"
        background="white"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          borderBottom="1px solid #E6E6E6"
          borderTopRightRadius="br3"
          borderTopLeftRadius="br3"
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
      </Container>

      <Container minW="container.xl" height="fit-content" p="0">
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="white"
          mt="10px"
          boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
          borderTopRadius={5}
        >
          <Text>Form Details saved to draft</Text>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignSelf="center"
          >
            <Box display="flex" justifyContent="flex-end" alignSelf="center">
              <Button mr="10px" type="submit" variant="ghost">
                <Icon as={AiOutlineEye} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  Preview
                </Text>
              </Button>
            </Box>
            &nbsp;
            <Button onClick={() => router.push(`/members/details/${id}`)}>
              Complete
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

Translation.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Translation;
