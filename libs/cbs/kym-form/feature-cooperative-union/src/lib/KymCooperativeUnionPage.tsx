/* eslint-disable-next-line */
import { getRouterQuery, useTranslation } from '@coop/shared/utils';
import React from 'react';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
} from '@coop/shared/ui';

import {
  AccountOperatorDetails,
  CentralRepresentativeDetails,
  Declaration,
  DirectorDetails,
  EconomicDetails,
  InstituteInfo,
} from '../components';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddCOOPUnion } from '@coop/myra/components';
import { useRouter } from 'next/router';

export function KYMCooperativeUnionPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const id = String(router?.query?.['id']);
  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const setSection = (section?: { section: string; subSection: string }) => {
    setKymCurrentSection(section);
  };
  return (
    <>
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <FormHeader
            title={t['membersFormAddNewMembers']}
            closeLink="/members/list"
          />
        </Container>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <Box pb="s40" display="flex" width="100%">
          <Box display="flex" width="100%">
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

            <Box
              background="white"
              ml={320}
              px="s20"
              pb="120px"
              pt="s20"
              width="100%"
            >
              <SectionContainer>
                <InstituteInfo setSection={setSection} />
                <DirectorDetails setSection={setSection} />
                <AccountOperatorDetails setSection={setSection} />
                <CentralRepresentativeDetails setSection={setSection} />
                <EconomicDetails setSection={setSection} />
                <Declaration setSection={setSection} />
              </SectionContainer>
            </Box>
          </Box>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
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
              mainButtonHandler={() =>
                router.push(`/members/translation/${id}`)
              }
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMCooperativeUnionPage;
