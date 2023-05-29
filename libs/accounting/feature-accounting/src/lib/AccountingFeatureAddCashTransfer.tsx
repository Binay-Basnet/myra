import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { Box, Button, FormSection, GridItem, Icon, Text } from '@myra-ui';

import { FormInput, FormLayout, FormSelect, FormTextArea } from '@coop/shared/form';
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
    <FormLayout methods={methods}>
      <FormLayout.Header title={t['accountingCashTransferAddNewCashTransfer']} />

      <FormLayout.Content>
        <FormLayout.Form>
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
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
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
    </FormLayout>
  );
};

export default AccountingFeatureAddCashTransfer;
