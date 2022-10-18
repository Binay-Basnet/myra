import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Container, FormFooter, Icon, IconButton, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { InventoryItemForm } from '../component/form/InventoryItemForm';

/* eslint-disable-next-line */
export interface InventoryFeatureItemProps {}

export const InventoryFeatureItem = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm({});
  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="55px" bg="gray.0">
        <Box margin="0px auto" width="100%" zIndex="10">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="s16"
            py="s20"
            background="neutralColorLight.Gray-0"
            borderBottom="1px solid "
            borderColor="border.layout"
          >
            <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
              {t['invItemAddNewItem']}
            </Text>

            <IconButton
              variant="ghost"
              aria-label="close"
              icon={<Icon as={IoCloseOutline} size="md" />}
              onClick={() => router.back()}
            />
          </Box>
          <FormProvider {...methods}>
            <form>
              <InventoryItemForm />
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.lg" height="fit-content">
            <FormFooter
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
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
