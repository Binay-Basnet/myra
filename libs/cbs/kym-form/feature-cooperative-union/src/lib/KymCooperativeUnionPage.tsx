/* eslint-disable-next-line */
import { useTranslation } from '@coop/shared/utils';
import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Text,
  IconButton,
  Button,
  Icon,
  FormFooter,
} from '@coop/shared/ui';
import { IoCloseOutline } from 'react-icons/io5';
import { useFormContext } from 'react-hook-form';

import {
  InstituteInfo,
  DirectorDetails,
  AccountOperatorDetails,
  CentralRepresentativeDetails,
  MemberDetails,
  EconomicDetails,
  Declaration,
} from '../components';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddCOOPUnion } from '@coop/myra/components';

export function KYMCooperativeUnionPage() {
  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();
  const router = useRouter();

  const setSection = (section?: { section: string; subSection: string }) => {
    setKymCurrentSection(section);
  };
  return (
    <>
      {/* // Top Bar */}
      <Box position="relative" margin="0px auto">
        <Box
          position="fixed"
          margin="0px auto"
          bg="gray.100"
          width="100%"
          zIndex="10"
        >
          <Container minW="container.xl" height="fit-content" p={0}>
            <Box
              height="60px"
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
              px="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
            >
              <Text fontSize="r2" fontWeight="SemiBold">
                {t['membersFormAddNewMembers']}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoCloseOutline} size="md" />}
                onClick={() => router.push('/members/list')}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Container minW="container.xl" height="fit-content" p={0}>
        <Box display="flex" width="100%">
          <Box display="flex" w="100%">
            <Box
              w={320}
              p={2}
              position="fixed"
              borderRight="1px solid #E6E6E6"
              minHeight="100%"
              bg="white"
            >
              <AccorrdianAddCOOPUnion kymCurrentSection={kymCurrentSection} />
            </Box>

            <Box background="white" ml={320} px="s20" pb="120px" w="100%">
              <SectionContainer>
                <Text fontSize="r3" fontWeight="600">
                  {t['kymCoopUnionInstitutionInformation']}
                </Text>
                <InstituteInfo setSection={setSection} />
                <DirectorDetails setSection={setSection} />
                <AccountOperatorDetails setSection={setSection} />
                <CentralRepresentativeDetails setSection={setSection} />
                {/* <MemberDetails setSection={setSection} /> */}
                <EconomicDetails setSection={setSection} />
                <Declaration setSection={setSection} />
              </SectionContainer>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content" p={0}>
            {/* <Box
              display="flex"
              height="60px"
              justifyContent="space-between"
              alignItems="center"
              background="white"
              borderTopLeftRadius="br3"
              borderTopRightRadius="br3"
              px="5"
              boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
            >
              <Text>{t['formDetails']}</Text>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignSelf="center"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignSelf="center"
                >
                  <Button type="submit" variant="ghost">
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
                </Box>
                &nbsp;
                <Button>{t['next']}</Button>
              </Box>
            </Box> */}

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
                <Button type="submit" variant="ghost">
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
              mainButtonHandler={() => console.log('save')}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMCooperativeUnionPage;
