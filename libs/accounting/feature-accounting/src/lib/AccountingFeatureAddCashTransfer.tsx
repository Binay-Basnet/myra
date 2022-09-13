import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';

import {
  BoxContainer,
  DividerContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
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

import { CashTransferTable } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeatureAddCashTransferProps {}

export const AccountingFeatureAddCashTransfer = () => {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: { data: [{ transferred_to: '', amount: 45 }] },
  });

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <Box
          height="50px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="neutralColorLight.Gray-0"
          borderBottom="1px solid"
          borderColor="border.layout"
          borderTopRadius={5}
          position="sticky"
          top="110px"
          zIndex={8}
        >
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            {t['accountingCashTransferAddNewCashTransfer']}
          </Text>
          <IconButton
            variant="ghost"
            aria-label="close"
            icon={<GrClose />}
            onClick={() => router.back()}
          />
        </Box>

        <FormProvider {...methods}>
          <form>
            <Box bg="white" p="s20" minH="calc(100vh - 220px)">
              <DividerContainer>
                <BoxContainer>
                  <InputGroupContainer>
                    <FormSelect
                      name="transferredFromAccount"
                      label={
                        t['accountingCashTransferAddTransferredFromAccount']
                      }
                      __placeholder={
                        t['accountingCashTransferAddSelectAccount']
                      }
                      options={[]}
                    />
                    <FormInput
                      name="date"
                      type="date"
                      label={t['accountingCashTransferAddDate']}
                    />

                    <FormInput
                      name="reference"
                      type="text"
                      label={t['accountingCashTransferAddReference']}
                      __placeholder={t['accountingCashTransferAddReference']}
                    />
                  </InputGroupContainer>
                </BoxContainer>

                <CashTransferTable />

                <Box
                  display="grid"
                  gap="s32"
                  gridTemplateColumns="repeat(2,1fr)"
                >
                  <FormTextArea
                    name="note"
                    label={t['accountingCashTransferAddNotes']}
                    __placeholder={t['accountingCashTransferAddNote']}
                    rows={5}
                  />
                </Box>
              </DividerContainer>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
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
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => alert('Submitted')}
          />
        </Container>
      </Box>
    </>
  );
}

export default AccountingFeatureAddCashTransfer;
