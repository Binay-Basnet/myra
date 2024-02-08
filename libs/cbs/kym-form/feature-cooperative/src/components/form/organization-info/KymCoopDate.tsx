import { FormSection } from '@myra-ui';

import { FormDatePicker } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopDate = () => {
  const { t } = useTranslation();

  return (
    <FormSection id="kymCoopAccCooperativeDate">
      <FormDatePicker name="lastAuditDate" label={t['kymCoopLastAuditDate']} maxToday />

      <FormDatePicker name="lastAgmDate" label={t['kymCoopLastAGMDate']} maxToday isRequired />
    </FormSection>
  );
};
