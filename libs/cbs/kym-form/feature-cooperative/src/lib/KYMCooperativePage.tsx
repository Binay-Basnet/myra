/* eslint-disable-next-line */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@coop/shared/utils';
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
import { AccordionKymCoopForm } from '@coop/cbs/kym-form/formElements';
import {
  setCooperativeHasPressedNext,
  useAppSelector,
  useGetKymCooperativeOverallFormStatusQuery,
} from '@coop/cbs/data-access';
import { useDispatch } from 'react-redux';
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
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = useState<{
    section: string;
    subSection: string;
  }>();
  const dispatch = useDispatch();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { refetch } = useGetKymCooperativeOverallFormStatusQuery(
    { id, hasPressedNext: true },
    {
      enabled: false,
    }
  );
  const isFormDirty = useAppSelector((state) => state.cooperative.isFormDirty);
  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader title={t['membersFormAddNewMembers']} closeLink="/members/list" />
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
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" onClick={() => router.push('/members/list')}>
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
            mainButtonLabel={t['next']}
            isMainButtonDisabled={!isFormDirty}
            mainButtonHandler={async () => {
              const response = await refetch();
              const sectionStatus = response?.data?.members?.cooperative?.overallFormStatus;

              const basicErrors = sectionStatus?.coopDetails?.errors;

              if (response) {
                dispatch(setCooperativeHasPressedNext(true));
                if (!basicErrors) {
                  router.push(`/members/translation/${router.query['id']}`);
                } else {
                  toast({
                    id: 'validation-error',
                    message: 'Some fields are empty or have error',
                    type: 'error',
                  });
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
