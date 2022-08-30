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
        <Box>
          <Box
            w={320}
            p="s16"
            pr="s20"
            position="fixed"
            borderRight="1px solid "
            borderColor="border.layout"
            minHeight="100%"
            bg="gray.0"
            zIndex={2}
          >
            <AccorrdianAddCOOPUnion kymCurrentSection={kymCurrentSection} />
          </Box>

          <Box zIndex={1} background="gray.0" ml="320" pb="120px">
            <InstituteInfo setSection={setSection} />
            <DirectorDetails setSection={setSection} />
            <AccountOperatorDetails setSection={setSection} />
            <CentralRepresentativeDetails setSection={setSection} />
            <EconomicDetails setSection={setSection} />
            <Declaration setSection={setSection} />
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
            mainButtonHandler={() => router.push(`/members/translation/${id}`)}
          />
        </Container>
      </Box>
    </>
  );
}

export default KYMCooperativeUnionPage;
