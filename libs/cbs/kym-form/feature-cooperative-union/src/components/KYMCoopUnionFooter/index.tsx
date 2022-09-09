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
  toast,
} from '@coop/shared/ui';
import {
  addAccountIncomplete,
  addBodIncomplete,
  addCentralRepIncomplete,
  addIncomplete,
  useAppDispatch,
  useAppSelector,
  useTranslation,
} from '@coop/shared/utils';

export const KYMCoopUnionFooter = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query['id'] as string;
  const dispatch = useAppDispatch();
  const isFormDirty = useAppSelector((state) => state.coopUnion.isFormDirty);

  const { refetch } = useGetCoopUnionSectionStatusQuery(
    { id },
    {
      enabled: false,
    }
  );

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
          isMainButtonDisabled={!isFormDirty}
          mainButtonLabel={t['next']}
          mainButtonHandler={async () => {
            const response = await refetch();
            const sectionStatus =
              response?.data?.members?.cooperativeUnion?.formState
                ?.sectionStatus;

            const institutionAllErrors =
              response?.data?.members?.cooperativeUnion?.formState
                ?.sectionStatus?.institutionInformation?.errors;

            const bodAllErrors =
              response?.data?.members?.cooperativeUnion?.formState?.sectionStatus?.bodDetails?.map(
                (bodDetail, index) => ({
                  directorId: String(index),
                  incomplete: bodDetail.errors,
                })
              );

            const accountOperatorErrors =
              response?.data?.members?.cooperativeUnion?.formState?.sectionStatus?.accountOperatorDetails?.map(
                (accountOpDetail, index) => ({
                  operatorId: String(index),
                  incomplete: accountOpDetail.errors,
                })
              );

            const centralRepErrors =
              response?.data?.members?.cooperativeUnion?.formState
                ?.sectionStatus?.centralRepresentativeDetails?.errors;

            if (institutionAllErrors) {
              dispatch(addIncomplete(institutionAllErrors));
            } else {
              dispatch(addIncomplete(null));
            }

            if (bodAllErrors) {
              dispatch(addBodIncomplete(bodAllErrors));
            }

            if (accountOperatorErrors) {
              dispatch(addAccountIncomplete(accountOperatorErrors));
            }

            if (centralRepErrors) {
              dispatch(addCentralRepIncomplete(centralRepErrors));
            }

            if (response) {
              if (
                !sectionStatus.institutionInformation.errors &&
                !sectionStatus.centralRepresentativeDetails.errors &&
                sectionStatus.bodDetails.some((bod) => !bod.errors) &&
                sectionStatus.accountOperatorDetails.some((bod) => !bod.errors)
              ) {
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
  );
};
