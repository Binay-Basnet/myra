import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineEye } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react';

import {
  KymIndMemberInput,
  useGetMemberTranslationQuery,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormRadioGroup, FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Input,
  MainLayout,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Translation = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = String(router?.query?.id);
  const translatedData = useGetMemberTranslationQuery({ id });
  const translationDataArray = translatedData?.data?.members?.translate.data;

  const methods = useForm<KymIndMemberInput>({});

  const booleanList = [
    {
      label: t['yes'],
      value: true,
    },
    {
      label: t['no'],
      value: false,
    },
  ];

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Container
            height="fit-content"
            minW="container.xl"
            p="0"
            background="white"
            pb="110px"
          >
            <Box
              position="sticky"
              top="110px"
              bg="gray.100"
              width="100%"
              zIndex="10"
            >
              <FormHeader title={t['membersFormAddNewMembers']} />
            </Box>
            <Box p="s20" mt={1}>
              <GroupContainer>
                <Text fontSize="r2" fontWeight="600">
                  For Official Use
                </Text>

                <GroupContainer>
                  <FormSwitchTab
                    label="Name Check In Sanction List"
                    options={booleanList}
                    name="nameCheckInSactionList"
                  />

                  <Box>
                    <FormSwitchTab
                      label="Name Check in Negative List"
                      options={booleanList}
                      name="nameCheckInNegative List"
                    />
                  </Box>

                  <Box>
                    <Text
                      fontWeight="Regular"
                      fontSize="s3"
                      color="neutralColorLight.gray-80"
                    >
                      Risk Category
                    </Text>
                    <FormRadioGroup
                      name="riskCategory"
                      radioList={[
                        'Low Risk',
                        'Medium Risk',
                        'High Risk',
                        'PEP',
                      ]}
                      labelFontSize="s3"
                    />
                  </Box>

                  <FormSwitchTab
                    label="Above documents collected and verified with original?"
                    options={booleanList}
                    name="nameCheckInNegative List"
                  />

                  <FormSwitchTab
                    label="Acceptable address verifying document obtained?"
                    options={booleanList}
                    name="nameCheckInNegative List"
                  />
                </GroupContainer>
              </GroupContainer>
            </Box>

            <Box p="s20">
              <Accordion allowToggle>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        bg={isExpanded ? '#E0E5EB' : ''}
                        h="60px"
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            fontSize="r2"
                            fontWeight="600"
                            textTransform="capitalize"
                          >
                            {translationDataArray?.length} texts needs to be
                            translated to Nepali
                          </Text>
                        </Box>
                        {isExpanded ? (
                          <IoChevronUpOutline fontSize="18px" />
                        ) : (
                          <IoChevronDownOutline fontSize="18px" />
                        )}
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Flex direction="column" gap="s16">
                          <Box display="flex">
                            <Text fontSize="r1" color="gray.600">
                              Text in English
                            </Text>
                            <Box w={200} />
                            <Text fontSize="r1" color="gray.600">
                              Text in Nepali
                            </Text>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            {translationDataArray?.map((item) => (
                              <>
                                <Box display="flex" key={item?.id}>
                                  <Text fontSize="r1" w={200}>
                                    {item?.data}
                                  </Text>
                                  <Box w={100} />
                                  <Input
                                    type="text"
                                    defaultValue={item?.translatedValue}
                                    w={400}
                                  />
                                </Box>
                              </>
                            ))}
                          </Box>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>
          </Container>
        </form>
      </FormProvider>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button
                  type="submit"
                  variant="ghost"
                  onClick={() => router.push(`/members/details/${id}`)}
                >
                  <Icon as={AiOutlineEye} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['sharePreview']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['complete']}
              mainButtonHandler={() => router.push(`/members/list`)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

Translation.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Translation;
