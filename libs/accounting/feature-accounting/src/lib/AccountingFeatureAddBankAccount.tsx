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
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureAddBankAccountProps {}

export function AccountingFeatureAddBankAccount() {
  const { t } = useTranslation();
  const methods = useForm();
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
            {t['accountingBankAccountAddNewBankAccount']}
          </Text>
          <IconButton
            variant={'ghost'}
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
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-70"
                    fontWeight="medium"
                  >
                    {t['accountingBankAccountAddBank']}
                  </Text>
                  <InputGroupContainer>
                    <FormSelect
                      name="bank"
                      label={t['accountingBankAccountAddSelectBank']}
                      placeholder={t['accountingBankAccountAddSelectBank']}
                      options={[]}
                    />

                    <FormInput
                      name="bankDisplayName"
                      type="text"
                      label={t['accountingBankAccountAddDisplayName']}
                      placeholder={t['accountingBankAccountAddDisplayName']}
                    />

                    <FormInput
                      name="code"
                      type="text"
                      label={t['accountingBankAccountAddCode']}
                      placeholder={t['accountingBankAccountAddCodeEnter']}
                    />
                  </InputGroupContainer>
                </BoxContainer>

                <BoxContainer>
                  <InputGroupContainer>
                    <FormSelect
                      name="accountName"
                      label={t['accountingBankAccountAddAccountName']}
                      placeholder={
                        t['accountingBankAccountAddEnterAccountName']
                      }
                      options={[]}
                    />

                    <FormInput
                      name="accountNumber"
                      type="text"
                      label={t['accountingBankAccountAddAccountNumber']}
                      placeholder={
                        t['accountingBankAccountAddEnterAccountNumber']
                      }
                    />

                    <FormSelect
                      name="accountType"
                      label={t['accountingBankAccountAddAccountType']}
                      placeholder={
                        t['accountingBankAccountAddSelectAccountType']
                      }
                      options={[]}
                    />

                    <FormInput
                      name="openingBalance"
                      type="text"
                      label={t['accountingBankAccountAddOpeningBalance']}
                      placeholder={t['accountingBankAccountAddOpeningBalance']}
                    />

                    <GridItem colSpan={3}>
                      <FormTextArea
                        name="description"
                        label={t['accountingBankAccountAddDesciption']}
                        placeholder={t['accountingBankAccountAddDesciption']}
                        rows={5}
                      />
                    </GridItem>
                  </InputGroupContainer>
                </BoxContainer>
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

export default AccountingFeatureAddBankAccount;
