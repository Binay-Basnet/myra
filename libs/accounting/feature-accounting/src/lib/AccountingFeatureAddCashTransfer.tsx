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
        <FormHeader title={t['accountingCashTransferAddNewCashTransfer']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <FormSelect
                  name="transferredFromAccount"
                  label={t['accountingCashTransferAddTransferredFromAccount']}
                  options={[]}
                />
                <FormInput name="date" type="date" label={t['accountingCashTransferAddDate']} />

                <FormInput
                  name="reference"
                  type="text"
                  label={t['accountingCashTransferAddReference']}
                />
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <CashTransferTable />
                </GridItem>
              </FormSection>

              <FormSection>
                <GridItem colSpan={2}>
                  <FormTextArea name="note" label={t['accountingCashTransferAddNotes']} rows={5} />
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

export default AccountingFeatureAddCashTransfer;
