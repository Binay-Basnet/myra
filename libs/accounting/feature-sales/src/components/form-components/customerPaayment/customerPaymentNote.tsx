// import debounce from 'lodash/debounce';
import { FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CustomerPaymentBox = () => {
  const { t } = useTranslation();

  return (
    <FormTextArea
      name="note"
      label={t['accountingCustomerPaymentAddNotes']}
      __placeholder={t['accountingCustomerPaymentAddNote']}
      rows={5}
    />
  );
};
