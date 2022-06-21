import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineEye } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useGetMemberTranslationQuery,
} from '@coop/shared/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  Icon,
  Input,
  MainLayout,
  RadioGroup,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const booleanList = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
];

const Translation = () => {
  const { t } = useTranslation();
  // const methods = useForm<IFormValues>();
  const router = useRouter();
  const id = String(router?.query?.id);
  const translatedData = useGetMemberTranslationQuery({ id });
  const translationDataArray = translatedData?.data?.members?.translate.data;

  const methods = useForm<KymIndMemberInput>({});

  const { control, handleSubmit, getValues, watch, setError } = methods;

  return (
    <Container width="860px">
      <Container height="fit-content" p="0" background="white" pt="s16">
        <FormProvider {...methods}>
          <form>
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

            <Box p="s20" mt={1}>
              <GroupContainer>
                <Text fontSize="r2" fontWeight="600">
                  For Official Use
                </Text>

                <GroupContainer>
                  <FormSwitchTab
                    label="Name Check in Saction List"
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
                    <RadioGroup
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
          </form>
        </FormProvider>
      </Container>

      <Container height="fit-content" p="0">
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="white"
          mt="10px"
          borderTop="1px"
          borderColor="border.layout"
        >
          <Box display="flex" gap="s8">
            <Text as="i" fontSize="r1">
              Form Details saved to draft
            </Text>
            <Text as="i" fontSize="r1">
              09:41 AM
            </Text>
          </Box>
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
    </Container>
  );
};

Translation.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Translation;
