import { FormTextArea } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CustomerPaymentBox = () => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormTextArea name="notes" label={t['accountingCustomerPaymentAddNotes']} rows={5} />
      </GridItem>
    </FormSection>
  );
};
