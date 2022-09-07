import React from 'react';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { useGetCoopUnionSectionStatusQuery } from '@coop/cbs/data-access';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
  // const { sectionStatus, refetch } = useCoopUnionSectionStatus();

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
          mainButtonHandler={() => {
            // await refetch().then(() => {
            //   if (sectionStatus) {
            //     if (checkKYMValidity(sectionStatus)) {
            router.push(`/members/translation/${router.query['id']}`);
            //     } else {
            //       toast({
            //         id: 'validation-error',
            //         message: 'Some fields are empty or have error',
            //         type: 'error',
            //       });
            //     }
            //   }
            // });
          }}
        />
      </Container>
    </Box>
  );
};
