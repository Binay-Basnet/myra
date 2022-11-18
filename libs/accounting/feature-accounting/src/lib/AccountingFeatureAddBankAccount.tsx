import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureAddBankAccountProps {}

export const AccountingFeatureAddBankAccount = () => {
  const { t } = useTranslation();
  const methods = useForm();
  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title={t['accountingBankAccountAddNewBankAccount']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <FormSelect
                  name="bank"
                  label={t['accountingBankAccountAddSelectBank']}
                  options={[]}
                />
                <FormInput
                  name="bankDisplayName"
                  type="text"
                  label={t['accountingBankAccountAddDisplayName']}
                />
                <FormInput name="code" type="text" label={t['accountingBankAccountAddCode']} />
              </FormSection>

              <FormSection header="bankAccountBankInformation">
                <FormSelect
                  name="accountName"
                  label={t['accountingBankAccountAddAccountName']}
                  options={[]}
                />
                <FormInput
                  name="accountNumber"
                  type="text"
                  label={t['accountingBankAccountAddAccountNumber']}
                />
                <FormSelect
                  name="accountType"
                  label={t['accountingBankAccountAddAccountType']}
                  options={[]}
                />
                <FormInput
                  name="openingBalance"
                  type="text"
                  label={t['accountingBankAccountAddOpeningBalance']}
                />
              </FormSection>

              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormTextArea
                    name="description"
                    label={t['accountingBankAccountAddDesciption']}
                    rows={5}
                  />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
          />
        </Container>
      </Box>
    </>
  );
};

export default AccountingFeatureAddBankAccount;
