import React, { ReactElement, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { Box, Container, FormFooter, FormHeader, MainLayout, Scrollable, Text } from '@myra-ui';

import {
  OfficialUseRiskCategory,
  useGetOfficialUseQuery,
  useSetOfficialUseMutation,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormRadioGroup, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

const Translation = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = String(router?.query?.id);
  const isIndividual = router?.asPath?.slice(-4)?.includes('INDI');
  // const translatedData = useGetMemberTranslationQuery({ id });
  // const translationDataArray = translatedData?.data?.members?.translate.data;

  const { mutateAsync } = useSetOfficialUseMutation();
  const methods = useForm({
    defaultValues: {
      isStaff: false,
      checkSanction: false,
      docCollectedAndVerified: false,
      acceptableAddressDoc: false,
      checkNegative: false,
      riskCategory: 'Low Risk',
    },
  });
  const { watch, reset, setValue } = methods;

  const risk = watch('riskCategory');

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

  const riskCategoryOptions = {
    'Low Risk': OfficialUseRiskCategory?.Low,
    'Medium Risk': OfficialUseRiskCategory?.Medium,
    'High Risk': OfficialUseRiskCategory?.High,
    'PEP Risk': OfficialUseRiskCategory?.Pep,
  };

  const riskCategoryReverseOptions = {
    LOW: 'Low Risk',
    MEDIUM: 'Medium Risk',
    HIGH: 'High Risk',
    PEP: 'PEP Risk',
  };

  const { data: editValues, refetch } = useGetOfficialUseQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  React.useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutateAsync({
            ...data,
            id,
            riskCategory: riskCategoryOptions[data?.riskCategory],
          }).then(() => refetch());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    if (!risk) setValue('riskCategory', 'Low Risk');
  }, [risk]);

  React.useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.officialUse?.record;
      const riskCategory = editValueData?.riskCategory;

      const riskOption = riskCategoryReverseOptions[riskCategory] ?? '';
      if (riskOption === ' ') setValue('riskCategory', 'Low Risk');

      reset({ ...editValueData, riskCategory: riskOption as string });
    }
  }, [editValues]);

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Container height="fit-content" minW="container.xl" p="0" background="white" pb="110px">
            <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
              <FormHeader title={t['membersFormAddNewMembers']} />
            </Box>
            <Box p="s20" mt={1}>
              <GroupContainer>
                <Text fontSize="r2" fontWeight="600">
                  For Official Use
                </Text>

                <GroupContainer>
                  {isIndividual && (
                    <>
                      {' '}
                      {/* <Box>
                        <FormSwitchTab
                          label="Is Member a Staff?"
                          options={booleanList}
                          name="isStaff"
                        />
                      </Box>
                      <FormSwitchTab
                        label="Name Check In Sanction List"
                        options={booleanList}
                        name="checkSanction"
                      />
                      <Box>
                        <FormSwitchTab
                          label="Name Check in Negative List"
                          options={booleanList}
                          name="checkNegative"
                        />
                      </Box> */}
                      <Box>
                        <FormRadioGroup
                          label="Risk Category"
                          orientation="vertical"
                          name="riskCategory"
                          radioList={['Low Risk', 'Medium Risk', 'High Risk', 'PEP Risk']}
                          labelFontSize="s3"
                        />
                      </Box>
                    </>
                  )}

                  <FormSwitchTab
                    label="Above documents collected and verified with original?"
                    options={booleanList}
                    name="docCollectedAndVerified"
                  />

                  <FormSwitchTab
                    label="Acceptable address verifying document obtained?"
                    options={booleanList}
                    name="acceptableAddressDoc"
                  />
                </GroupContainer>
              </GroupContainer>
            </Box>

            {/* <Box p="s20">
              <Accordion allowToggle>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="s60">
                        <Box flex="1" textAlign="left">
                          <Text fontSize="r2" fontWeight="600" textTransform="capitalize">
                            {translationDataArray?.length} texts needs to be translated to Nepali
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
                              <Box display="flex" key={item?.id}>
                                <Text fontSize="r1" w={200}>
                                  {item?.data}
                                </Text>
                                <Box w={100} />
                                <Input type="text" defaultValue={item?.translatedValue} w={400} />
                              </Box>
                            ))}
                          </Box>
                        </Flex>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box> */}
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
                </Box>
              }
              // draftButton={
              //   <Button type="submit" variant="ghost" onClick={() => router.push(`/pdf?id=${id}`)}>
              //     <Icon as={AiOutlineEye} color="primary.500" />
              //     <Text
              //       alignSelf="center"
              //       color="primary.500"
              //       fontWeight="Medium"
              //       fontSize="s2"
              //       ml="5px"
              //     >
              //       {t['sharePreview']}
              //     </Text>
              //   </Button>
              // }
              mainButtonLabel={t['complete']}
              mainButtonHandler={() => router.push(`${ROUTES.CBS_MEMBER_ACTIVATION}?id=${id}`)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

Translation.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default Translation;
