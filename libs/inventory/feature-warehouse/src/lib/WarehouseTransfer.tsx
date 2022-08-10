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

import { WarehouseTransferForm } from '../component/WarehouseTransferForm';

/* eslint-disable-next-line */
export interface WarehouseTransferProps {}

export function WarehouseTransfer() {
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
        <Box margin="0px auto" bg="gray.0" width="100%" zIndex="10">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
            px="s16"
            py="s20"
            background="neutralColorLight.Gray-0"
            borderBottom="1px solid #E6E6E6"
          >
            <Text
              fontSize="r2"
              fontWeight="SemiBold"
              color="neutralColorLight.Gray-80"
            >
              {t['warehouseTransferWarehouseTransfer']}
            </Text>

            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<Icon as={IoCloseOutline} size="md" />}
              onClick={() => router.back()}
            />
          </Box>

          <WarehouseTransferForm />
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.lg" height="fit-content" p={0}>
            <FormFooter
              draftButton={
                <Button type="submit" variant="ghost" shade="neutral">
                  <Icon as={BiSave} />
                  <Text
                    alignSelf="center"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['applyChanges']}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}
