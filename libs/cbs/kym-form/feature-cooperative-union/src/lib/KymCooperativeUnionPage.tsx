import React, { useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useGetCoopUnionSectionStatusQuery } from '@coop/cbs/data-access';
import { AccorrdianAddCOOPUnion } from '@coop/myra/components';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Icon,
  Text,
  toast,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountOperatorDetails,
  CentralRepresentativeDetails,
  Declaration,
  DirectorDetails,
  EconomicDetails,
  InstituteInfo,
} from '../components';
import { checkKYMValidity } from '../utils/checkKYMValidity';

type KYMSection = {
  section: string;
  subSection: string;
};

export function KYMCooperativeUnionPage() {
  const { t } = useTranslation();

  const [kymCurrentSection, setKymCurrentSection] = useState<KYMSection>();

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
            <InstituteInfo setSection={setKymCurrentSection} />
            <DirectorDetails setSection={setKymCurrentSection} />
            <AccountOperatorDetails setSection={setKymCurrentSection} />
            <CentralRepresentativeDetails setSection={setKymCurrentSection} />
            <EconomicDetails setSection={setKymCurrentSection} />
            <Declaration setSection={setKymCurrentSection} />
          </Box>
        </Box>
      </Container>

      <KYMCoopUnionFooter />
    </>
  );
}

const useCoopUnionSectionStatus = () => {
  const router = useRouter();

  const { data: sectionStatusData, refetch } =
    useGetCoopUnionSectionStatusQuery(
      {
        id: router.query['id'] as string,
      },
      {
        enabled: false,
      }
    );

  const sectionStatus =
    sectionStatusData?.members?.cooperativeUnion?.formState.sectionStatus;

  return { sectionStatus, refetch };
};

export const KYMCoopUnionFooter = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { sectionStatus, refetch } = useCoopUnionSectionStatus();

  return (
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
          mainButtonHandler={async () => {
            await refetch().then(() => {
              if (sectionStatus) {
                if (checkKYMValidity(sectionStatus)) {
                  router.push(`/members/translation/${router.query['id']}`);
                } else {
                  toast({
                    id: 'validation-error',
                    message: 'Some fields are empty or have error',
                    type: 'error',
                  });
                }
              }
            });
          }}
        />
      </Container>
    </Box>
  );
};

export default KYMCooperativeUnionPage;
