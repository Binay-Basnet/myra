import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { NeosysUsersForm } from '../form/NeosysUsersForm';

/* eslint-disable-next-line */
export interface NeosysFeatureUsersAddProps {}

export function NeosysFeatureUsersAdd(props: NeosysFeatureUsersAddProps) {
  const { t } = useTranslation();
  const methods = useForm({});
  const router = useRouter();

  const { watch } = methods;
  return (
    <>
      <Container minW="container.lg" height="fit-content" paddingBottom="55px">
        <Box margin="0px auto" bg="gray.0" width="100%" zIndex="10">
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
              {t['neoUsersNewUser']}
            </Text>
            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<IoCloseOutline />}
              onClick={() => router.back()}
            />
          </Box>
          <NeosysUsersForm />
        </Box>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.lg" height="fit-content">
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
              mainButtonHandler={() => router.push(`/members/translation}`)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}
