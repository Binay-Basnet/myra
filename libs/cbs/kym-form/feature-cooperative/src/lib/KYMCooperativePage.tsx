/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { featureCode, useTranslation } from '@coop/shared/utils';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
  toast,
} from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccordionKymCoopForm, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import {
  addCooperativeAccountError,
  addCooperativeDirectorError,
  addCooperativeError,
  setCooperativeHasPressedNext,
  useAppSelector,
  useGetKymCooperativeOverallFormStatusQuery,
} from '@coop/cbs/data-access';
import { useDispatch } from 'react-redux';
import { ROUTES } from '@coop/cbs/utils';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import {
  KymAccountHolderDeclaration,
  KymCoopAccountOperatorDetail,
  KymCoopAddCoopDetails,
  KymCoopAssets,
  KymCoopBasicInfo,
  KymCoopBoardDirectorDetail,
  KymCoopContactDetails,
  KymCoopCurrentMembers,
  KymCoopDate,
  KymCoopDocumentDeclarationForm,
  KymCoopNoEmployee,
  KymCoopOpAddress,
  KymCoopRegdAddress,
  KymCoopRepresentative,
  KymEquityLiabilities,
} from '../components/form';

export const KYMCooperativePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = useState<{
    section: string;
    subSection: string;
  }>();

  const isFormLoading = useAppSelector((state) => state.cooperative.isFormLoading);
  const dispatch = useDispatch();

  const router = useRouter();
  const id = String(router?.query?.['id']);
  const action = String(router.query['action']);

  const { refetch } = useGetKymCooperativeOverallFormStatusQuery(
    { id, hasPressedNext: true },
    {
      enabled: false,
    }
  );
  const isFormDirty = useAppSelector((state) => state.cooperative.isFormDirty);
  const totalAssets = useAppSelector((state) => state.cooperative.totalAssets);
  const totalEquity = useAppSelector((state) => state.cooperative.totalEquity);

  return (
    <>
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader
            isFormDirty={isFormLoading}
            title={`${t['membersFormAddNewMembers']} - ${featureCode?.newMemberCooperative}`}
            closeLink={ROUTES.CBS_MEMBER_LIST}
            alertTitle="Saving in Progress: Your Form Changes are Being Safeguarded!"
            alertDescription="Please Hold On! We're in the middle of saving your valuable modifications to ensure nothing gets lost. If you close now. Everything will be lost"
          />
        </Container>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <Box>
          <Box
            w={320}
            p="s16"
            pr="s20"
            position="fixed"
            borderRight="1px solid"
            borderColor="border.layout"
            minHeight="100%"
            bg="gray.0"
          >
            <AccordionKymCoopForm kymCurrentSection={kymCurrentSection} />
          </Box>

          <Box background="gray.0" ml="320" pb="120px">
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop1InformationofOrganization']}
              </Text>
              <KymCoopBasicInfo setSection={setKymCurrentSection} />

              <KymCoopRegdAddress setSection={setKymCurrentSection} />
              <KymCoopOpAddress setSection={setKymCurrentSection} />

              <KymCoopContactDetails setSection={setKymCurrentSection} />
              <KymCoopCurrentMembers setSection={setKymCurrentSection} />
              <KymCoopDate setSection={setKymCurrentSection} />
              <KymCoopRepresentative setSection={setKymCurrentSection} />
              <KymCoopAddCoopDetails setSection={setKymCurrentSection} />
              <KymCoopNoEmployee setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop2EconomicDetails']}
              </Text>
              <KymEquityLiabilities setSection={setKymCurrentSection} />
              <KymCoopAssets setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop3DetailsofBoardDirectors']}
              </Text>
              <KymCoopBoardDirectorDetail setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop4DetailsofAccountOperators']}
              </Text>
              <KymCoopAccountOperatorDetail setSection={setKymCurrentSection} />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop5Declaration']}
              </Text>
              <KymAccountHolderDeclaration setSection={setKymCurrentSection} />
              <KymCoopDocumentDeclarationForm setSection={setKymCurrentSection} />
            </SectionContainer>

            <Box p="s20" display="flex" gap="s16" alignItems="start">
              <Checkbox fontSize="s3" />
              <Text variant="formInput" mt="-6px">
                I/We agree to the&nbsp;
                <Text as="span" variant="link">
                  Terms and condition.
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>

      <Box position="sticky" bottom="0" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <KYMUpdateModal isOpen={isOpen} onClose={onClose} />

          <FormFooter
            status={
              <Box display="flex" gap="s8">
                {isFormLoading ? (
                  <>
                    <Spinner />
                    <Text as="i" fontSize="r1">
                      Form is Being Saved. Please Don&apos;t Close the form
                    </Text>
                  </>
                ) : (
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                )}
              </Box>
            }
            draftButton={
              <Button
                type="submit"
                variant="ghost"
                onClick={() => router.push(ROUTES.CBS_MEMBER_LIST)}
              >
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={action === 'update' ? 'Update' : t['next']}
            isMainButtonDisabled={!isFormDirty || !(totalAssets === totalEquity)}
            mainButtonHandler={async () => {
              if (action === 'update') {
                onOpen();
              } else {
                const response = await refetch();
                const sectionStatus = response?.data?.members?.cooperative?.overallFormStatus;

                const basicErrors = sectionStatus?.coopDetails?.errors;

                const directorDetailsErrors = sectionStatus?.accountOperatorDetails?.map(
                  (director, index) => ({
                    directorId: String(index),
                    errors: director?.errors ?? {},
                  })
                );

                const accountDetailsErrors = sectionStatus?.accountOperatorDetails?.map(
                  (accountOperator, index) => ({
                    operatorId: String(index),
                    errors: accountOperator?.errors ?? {},
                  })
                );

                if (basicErrors) {
                  dispatch(addCooperativeError(basicErrors));
                }

                if (directorDetailsErrors) {
                  dispatch(addCooperativeDirectorError(directorDetailsErrors));
                }

                if (accountDetailsErrors) {
                  dispatch(addCooperativeAccountError(accountDetailsErrors));
                }

                if (response) {
                  dispatch(setCooperativeHasPressedNext(true));
                  if (!basicErrors) {
                    router.push(`${ROUTES.CBS_MEMBER_TRANSLATION}/${router.query['id']}`);
                  } else {
                    toast({
                      id: 'validation-error',
                      message: 'Some fields are empty or have error',
                      type: 'error',
                    });
                  }
                }
              }
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default KYMCooperativePage;
