import { FormProvider, useForm } from 'react-hook-form';

import { FormInput, FormTextArea } from '@coop/shared/form';
import {
  Box,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  SwitchTabs,
} from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { JournalVouchersTable } from '../components';

/* eslint-disable-next-line */
export interface AccountingFeatureAddJournalVoucherProps {}

export const AccountingFeatureAddJournalVoucher = () => {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      data: [
        {
          dr_amount: 4500,
          cr_amount: '',
          transferred_to: 'savings_account',
          paymentMode: 'cash',
        },
        {
          dr_amount: '',
          cr_amount: 4500,
          transferred_to: 'nic-asia',
          paymentMode: 'cash',
        },
      ],
    },
  });

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title={t['accountingJournalVoucherAddNewJournalVoucher']} />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <FormInput
                  name="dueDate"
                  type="date"
                  label={t['accountingJournalVoucherAddDueDate']}
                />
                <FormInput
                  name="reference"
                  type="text"
                  label={t['accountingJournalVoucherAddReference']}
                />
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <JournalVouchersTable />
                </GridItem>
              </FormSection>

              <FormSection>
                <GridItem colSpan={3}>
                  <SwitchTabs
                    name="paymentMode"
                    label="Payment Mode"
                    defaultValue="cash"
                    options={[
                      { label: 'Cash', value: 'cash' },
                      { label: 'Cheque', value: 'cheque' },
                    ]}
                  />
                </GridItem>

                <GridItem colSpan={1}>
                  <FormInput name="chequeNo" label="Cheque No" />
                </GridItem>
              </FormSection>
              <FormSection divider={false}>
                <GridItem colSpan={2}>
                  <FormTextArea
                    name="note"
                    label={t['accountingJournalVoucherAddNotes']}
                    rows={3}
                  />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter mainButtonLabel={t['save']} />
        </Container>
      </Box>
    </>
  );
};

export default AccountingFeatureAddJournalVoucher;
