import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Container, FormFooter, Icon, IconButton, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddInventoryForm } from '../component/form/AddInventoryForm';

/* eslint-disable-next-line */
export interface AddInventoryProps {}

export const AddInventory = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Container
        minW="container.lg"
        height="fit-content"
        pb="55px"
        bg="gray.0"
        minH="calc(100vh - 170px)"
      >
        <Box margin="0px auto" width="100%" zIndex="10">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="s16"
            py="s20"
            background="neutralColorLight.Gray-0"
            borderBottom="1px solid"
            borderColor="border.layout"
          >
            <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
              {t['invFormNewInventoryEntry']}
            </Text>

            <IconButton
              variant="ghost"
              aria-label="close"
              icon={<Icon as={IoCloseOutline} size="md" />}
              onClick={() => router.back()}
            />
          </Box>

          <AddInventoryForm />
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.lg" height="fit-content" p={0}>
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
                    Press Save to save form
                  </Text>
                </Box>
              }
              mainButtonLabel={t['save']}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
