import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { Box, Button, Container, FormFooter, FormHeader, Icon, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { InventoryItemForm } from '../component/form/InventoryItemForm';

/* eslint-disable-next-line */
export interface InventoryFeatureItemProps {}

export const InventoryFeatureItem = () => {
  const { t } = useTranslation();
  // const router = useRouter();
  const methods = useForm({});
  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="55px" bg="gray.0">
        <Box margin="0px auto" width="100%" zIndex="10">
          <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
            <FormHeader title="Add Item" />
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
